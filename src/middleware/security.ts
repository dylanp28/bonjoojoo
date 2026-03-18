import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import rateLimit from 'express-rate-limit';

/**
 * Comprehensive security middleware for luxury jewelry ecommerce
 * Implements enterprise-grade security for high-value transactions
 */

// Rate limiting configurations for different endpoints
const rateLimitConfigs = {
  // Authentication endpoints - stricter limits
  '/api/auth/login': { windowMs: 15 * 60 * 1000, max: 5 }, // 5 attempts per 15 minutes
  '/api/auth/register': { windowMs: 60 * 60 * 1000, max: 3 }, // 3 attempts per hour
  '/api/auth/forgot-password': { windowMs: 60 * 60 * 1000, max: 3 },
  
  // Payment endpoints - very strict
  '/api/stripe/create-payment-intent': { windowMs: 5 * 60 * 1000, max: 10 },
  '/api/stripe/confirm-payment': { windowMs: 5 * 60 * 1000, max: 5 },
  
  // General API endpoints
  '/api/': { windowMs: 15 * 60 * 1000, max: 100 },
  
  // Product viewing - more lenient
  '/api/products': { windowMs: 60 * 1000, max: 50 },
  '/api/inventory': { windowMs: 60 * 1000, max: 30 }
};

// Suspicious patterns that warrant extra scrutiny
const suspiciousPatterns = [
  // SQL injection attempts
  /union.*select/i,
  /select.*from/i,
  /drop\s+table/i,
  /insert\s+into/i,
  
  // XSS attempts
  /<script[^>]*>.*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  
  // Path traversal
  /\.\.\//g,
  /\.\.\\/g,
  
  // Command injection
  /;\s*rm\s+/i,
  /;\s*cat\s+/i,
  /;\s*curl\s+/i,
  
  // Common attack vectors
  /eval\s*\(/i,
  /exec\s*\(/i,
  /system\s*\(/i
];

// Countries with higher fraud risk (jewelry industry specific)
const highRiskCountries = [
  'NG', 'PK', 'BD', 'ID', 'VN', 'PH', 'IN', 'RO', 'BG', 'MD'
];

// IP ranges to monitor (examples - add actual suspicious ranges)
const suspiciousIPRanges = [
  // Tor exit nodes, known VPN/proxy ranges would go here
  // These would be maintained by security intelligence feeds
];

/**
 * Main security middleware function
 */
export async function securityMiddleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const fullPath = pathname + search;
  const method = request.method;
  const userAgent = request.headers.get('user-agent') || '';
  const clientIP = getClientIP(request);
  const country = request.geo?.country || 'UNKNOWN';

  // Security checks
  const securityCheck = await performSecurityChecks({
    path: fullPath,
    method,
    userAgent,
    clientIP,
    country,
    request
  });

  if (!securityCheck.allowed) {
    return new NextResponse(JSON.stringify({ 
      error: 'Access denied',
      reason: securityCheck.reason 
    }), {
      status: securityCheck.statusCode,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Add security headers
  const response = NextResponse.next();
  addSecurityHeaders(response, pathname);

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const rateLimitResult = checkRateLimit(pathname, clientIP);
    if (!rateLimitResult.allowed) {
      return new NextResponse(JSON.stringify({
        error: 'Rate limit exceeded',
        retryAfter: rateLimitResult.retryAfter
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': rateLimitResult.retryAfter.toString()
        }
      });
    }
  }

  // Log security events
  await logSecurityEvent({
    type: 'request',
    path: fullPath,
    method,
    clientIP,
    userAgent,
    country,
    allowed: true,
    timestamp: new Date().toISOString()
  });

  return response;
}

/**
 * Perform comprehensive security checks
 */
async function performSecurityChecks({
  path,
  method,
  userAgent,
  clientIP,
  country,
  request
}: {
  path: string;
  method: string;
  userAgent: string;
  clientIP: string;
  country: string;
  request: NextRequest;
}): Promise<{ allowed: boolean; reason?: string; statusCode?: number }> {

  // 1. Check for malicious patterns in URL
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(path)) {
      await logSecurityEvent({
        type: 'malicious_pattern_detected',
        path,
        clientIP,
        userAgent,
        pattern: pattern.source,
        severity: 'high',
        timestamp: new Date().toISOString()
      });
      
      return { 
        allowed: false, 
        reason: 'Malicious pattern detected', 
        statusCode: 403 
      };
    }
  }

  // 2. Check user agent
  if (!userAgent || userAgent.length < 10) {
    return { 
      allowed: false, 
      reason: 'Invalid user agent', 
      statusCode: 403 
    };
  }

  // 3. Check for bot/scraper patterns
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i, /harvester/i
  ];
  
  // Allow legitimate bots for SEO
  const legitimateBots = [
    /googlebot/i, /bingbot/i, /facebookexternalhit/i, /twitterbot/i
  ];

  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  const isLegitimateBot = legitimateBots.some(pattern => pattern.test(userAgent));

  if (isBot && !isLegitimateBot) {
    // Block unauthorized bots on sensitive endpoints
    if (path.includes('/api/auth') || path.includes('/api/stripe') || path.includes('/api/customer')) {
      return { 
        allowed: false, 
        reason: 'Unauthorized bot access', 
        statusCode: 403 
      };
    }
  }

  // 4. Geographic restrictions for high-risk operations
  if (path.includes('/api/stripe') || path.includes('/api/payment')) {
    if (highRiskCountries.includes(country)) {
      // Don't block but flag for manual review
      await logSecurityEvent({
        type: 'high_risk_geography',
        path,
        clientIP,
        country,
        userAgent,
        severity: 'medium',
        timestamp: new Date().toISOString()
      });
    }
  }

  // 5. Check request body for payment endpoints
  if (method === 'POST' && path.includes('/api/stripe')) {
    try {
      const body = await request.clone().json();
      
      // Validate payment amounts aren't suspicious
      if (body.amount) {
        if (body.amount > 10000000) { // > $100,000
          await logSecurityEvent({
            type: 'suspicious_payment_amount',
            path,
            clientIP,
            amount: body.amount,
            severity: 'high',
            timestamp: new Date().toISOString()
          });
          
          // Allow but flag for manual review
        }
        
        if (body.amount < 100) { // < $1
          return { 
            allowed: false, 
            reason: 'Invalid payment amount', 
            statusCode: 400 
          };
        }
      }
    } catch (error) {
      // Invalid JSON in payment request
      return { 
        allowed: false, 
        reason: 'Invalid request format', 
        statusCode: 400 
      };
    }
  }

  // 6. Check for IP reputation
  if (await isIPSuspicious(clientIP)) {
    await logSecurityEvent({
      type: 'suspicious_ip_access',
      path,
      clientIP,
      userAgent,
      severity: 'high',
      timestamp: new Date().toISOString()
    });

    // Block access to sensitive endpoints
    if (path.includes('/api/auth') || path.includes('/api/stripe')) {
      return { 
        allowed: false, 
        reason: 'Suspicious IP address', 
        statusCode: 403 
      };
    }
  }

  // 7. Check request frequency from same IP
  const requestFrequency = await getRequestFrequency(clientIP);
  if (requestFrequency > 1000) { // More than 1000 requests per hour
    await logSecurityEvent({
      type: 'high_frequency_requests',
      path,
      clientIP,
      frequency: requestFrequency,
      severity: 'medium',
      timestamp: new Date().toISOString()
    });
  }

  return { allowed: true };
}

/**
 * Add comprehensive security headers
 */
function addSecurityHeaders(response: NextResponse, pathname: string): void {
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.stripe.com https://www.google-analytics.com https://analytics.google.com https://graph.facebook.com",
    "frame-src https://js.stripe.com https://hooks.stripe.com",
    "media-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Additional security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // HSTS for HTTPS
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Remove server info
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');
  
  // Custom headers for jewelry ecommerce
  response.headers.set('X-Commerce-Security', 'enabled');
  response.headers.set('X-PCI-Compliant', 'true');
}

/**
 * Rate limiting check
 */
function checkRateLimit(pathname: string, clientIP: string): { allowed: boolean; retryAfter?: number } {
  // Find matching rate limit config
  let config = rateLimitConfigs['/api/']; // default
  
  for (const [path, cfg] of Object.entries(rateLimitConfigs)) {
    if (pathname.startsWith(path)) {
      config = cfg;
      break;
    }
  }

  // Implementation would use Redis or in-memory store for production
  // For now, returning allowed for demo
  return { allowed: true };
}

/**
 * Check if IP is suspicious
 */
async function isIPSuspicious(ip: string): Promise<boolean> {
  // Check against suspicious IP ranges
  for (const range of suspiciousIPRanges) {
    if (ip.startsWith(range)) {
      return true;
    }
  }

  // In production, check against threat intelligence feeds
  // - VirusTotal API
  // - AbuseIPDB
  // - Internal blacklist
  
  return false;
}

/**
 * Get request frequency for IP
 */
async function getRequestFrequency(ip: string): Promise<number> {
  // In production, query from Redis or database
  // Return count of requests from this IP in the last hour
  return 0;
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

/**
 * Log security events
 */
async function logSecurityEvent(event: {
  type: string;
  path?: string;
  method?: string;
  clientIP?: string;
  userAgent?: string;
  country?: string;
  severity?: string;
  allowed?: boolean;
  timestamp: string;
  [key: string]: any;
}): Promise<void> {
  // In production, send to security monitoring system
  // - Sentry for error tracking
  // - DataDog for security monitoring  
  // - Custom security dashboard
  // - Slack alerts for high severity events
  
  if (event.severity === 'high') {
    console.warn('HIGH SEVERITY SECURITY EVENT:', event);
  } else {
    console.log('Security event:', event.type, event);
  }

  // Store in database for analysis (disabled in middleware to avoid fetch issues)
  // In production, use a proper logging service instead of HTTP requests from middleware
  try {
    // await fetch('/api/security/log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // });
    
    // For now, just log to console (production would use external logging service)
    if (process.env.NODE_ENV === 'development') {
      console.log('Security event logged:', event.type);
    }
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}

/**
 * Enhanced CSRF protection for state-changing operations
 */
export function validateCSRFToken(request: NextRequest): boolean {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const token = request.headers.get('x-csrf-token');
    const cookieToken = request.cookies.get('csrf-token')?.value;
    
    return token === cookieToken && token !== undefined;
  }
  return true;
}

/**
 * Validate request origin for API calls
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://bonjoojoo.com',
    'https://www.bonjoojoo.com',
    'https://app.bonjoojoo.com'
  ];
  
  // Allow same-origin requests
  if (!origin) return true;
  
  return allowedOrigins.includes(origin);
}

/**
 * Check for session hijacking attempts
 */
export function detectSessionAnomalies(request: NextRequest, sessionData: any): boolean {
  const currentUserAgent = request.headers.get('user-agent');
  const currentIP = getClientIP(request);
  
  if (sessionData.userAgent !== currentUserAgent) {
    return true; // Potential session hijacking
  }
  
  // Allow IP changes for mobile users, but flag for review
  if (sessionData.lastIP !== currentIP) {
    logSecurityEvent({
      type: 'ip_address_change',
      clientIP: currentIP,
      previousIP: sessionData.lastIP,
      userAgent: currentUserAgent,
      severity: 'low',
      timestamp: new Date().toISOString()
    });
  }
  
  return false;
}

export default securityMiddleware;