import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityMiddleware } from './src/middleware/security';
import { performanceMiddleware } from './src/lib/performance/optimization';

/**
 * Main middleware for bonjoojoo luxury jewelry platform
 * Handles security, performance, and routing
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static assets and internal Next.js routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/_') ||
    pathname.includes('.') && !pathname.includes('/api/')
  ) {
    return NextResponse.next();
  }

  try {
    // 1. Security checks (highest priority)
    const securityResponse = await securityMiddleware(request);
    if (securityResponse.status !== 200) {
      return securityResponse;
    }

    // 2. Performance optimizations
    const performanceResponse = performanceMiddleware(request);
    
    // 3. Custom routing for jewelry-specific needs
    const routingResponse = await handleCustomRouting(request);
    if (routingResponse) {
      return routingResponse;
    }

    // 4. Add jewelry-specific headers
    const response = performanceResponse || NextResponse.next();
    addJewelryHeaders(response, pathname);

    // 5. Handle authentication for protected routes
    if (requiresAuthentication(pathname)) {
      const authResponse = await checkAuthentication(request, response);
      if (authResponse) return authResponse;
    }

    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    
    // Return a safe fallback response
    return new NextResponse('Service temporarily unavailable', {
      status: 503,
      headers: { 'Retry-After': '60' }
    });
  }
}

/**
 * Handle custom routing for jewelry ecommerce
 */
async function handleCustomRouting(request: NextRequest): Promise<NextResponse | null> {
  const { pathname, searchParams } = request.nextUrl;

  // Redirect old product URLs to new structure
  if (pathname.match(/^\/products\/(\d+)$/)) {
    const productId = pathname.split('/')[2];
    const newUrl = new URL(`/product/${productId}`, request.url);
    return NextResponse.redirect(newUrl, 301);
  }

  // Handle jewelry category redirects
  const categoryMappings: Record<string, string> = {
    '/engagement-rings': '/collections/engagement-rings',
    '/wedding-bands': '/collections/wedding-bands',
    '/necklaces': '/collections/necklaces',
    '/earrings': '/collections/earrings',
    '/bracelets': '/collections/bracelets'
  };

  if (categoryMappings[pathname]) {
    const newUrl = new URL(categoryMappings[pathname], request.url);
    // Preserve search parameters for filters
    searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(newUrl, 301);
  }

  // Handle international customers
  const country = request.geo?.country;
  if (country && pathname === '/') {
    // Redirect to appropriate international store
    const internationalStores: Record<string, string> = {
      'CA': '/ca',
      'GB': '/uk',
      'AU': '/au',
      'EU': '/eu' // Handle EU countries
    };

    const euCountries = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT'];
    const storeCode = euCountries.includes(country) ? 'EU' : country;
    
    if (internationalStores[storeCode] && !searchParams.get('no-redirect')) {
      const newUrl = new URL(internationalStores[storeCode], request.url);
      return NextResponse.redirect(newUrl, 302);
    }
  }

  return null;
}

/**
 * Add jewelry-specific headers
 */
function addJewelryHeaders(response: NextResponse, pathname: string): void {
  // Add luxury ecommerce specific headers
  response.headers.set('X-Industry', 'luxury-jewelry');
  response.headers.set('X-Business-Type', 'ecommerce');
  
  // Add appropriate cache headers for different content types
  if (pathname.startsWith('/api/products/')) {
    // Product data - cache for 5 minutes
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  } else if (pathname.startsWith('/api/inventory/')) {
    // Inventory data - cache for 1 minute
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  } else if (pathname.startsWith('/collections/') || pathname.startsWith('/products/')) {
    // Product pages - cache for 10 minutes
    response.headers.set('Cache-Control', 'public, max-age=600, stale-while-revalidate=1800');
  }

  // Add jewelry-specific meta information
  if (pathname.includes('/product/') || pathname.includes('/collections/')) {
    response.headers.set('X-Content-Type', 'jewelry-product');
    response.headers.set('X-Price-Currency', 'USD');
  }

  // Add trust signals for luxury shoppers
  response.headers.set('X-Security-Level', 'enterprise');
  response.headers.set('X-Payment-Security', 'pci-compliant');
  response.headers.set('X-Shipping-Security', 'insured-delivery');
}

/**
 * Check if route requires authentication
 */
function requiresAuthentication(pathname: string): boolean {
  const protectedPaths = [
    '/account',
    '/orders',
    '/wishlist',
    '/api/customer',
    '/api/orders',
    '/api/wishlist'
  ];

  return protectedPaths.some(path => pathname.startsWith(path));
}

/**
 * Check user authentication
 */
async function checkAuthentication(
  request: NextRequest, 
  response: NextResponse
): Promise<NextResponse | null> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    // For API routes, return 401
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // For pages, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Validate token (implement actual validation)
  const isValidToken = await validateAuthToken(token);
  
  if (!isValidToken) {
    // Invalid token - redirect to login
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('error', 'session_expired');
    return NextResponse.redirect(loginUrl);
  }

  return null;
}

/**
 * Validate authentication token
 */
async function validateAuthToken(token: string): Promise<boolean> {
  try {
    // In production, validate JWT token
    // For now, return true as placeholder
    return token.length > 10;
  } catch (error) {
    return false;
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};