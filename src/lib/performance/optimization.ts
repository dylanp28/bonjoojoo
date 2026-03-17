/**
 * Performance optimization utilities for luxury jewelry ecommerce
 * Focuses on Core Web Vitals and mobile-first experience
 */

import { NextRequest, NextResponse } from 'next/server';

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  
  // Custom metrics
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
  
  // User experience
  pageLoadTime: number;
  resourceLoadTime: Record<string, number>;
  
  // Device context
  deviceType: 'mobile' | 'tablet' | 'desktop';
  connectionType: string;
  viewport: { width: number; height: number };
}

export interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'avif' | 'auto';
  sizes: string;
  priority: boolean;
  placeholder: 'blur' | 'empty';
  blurDataURL?: string;
}

export interface CacheConfig {
  strategy: 'stale-while-revalidate' | 'cache-first' | 'network-first';
  maxAge: number;
  staleWhileRevalidate?: number;
  networkTimeoutSeconds?: number;
}

/**
 * Performance optimization service
 */
export class PerformanceOptimizer {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private imageCache: Map<string, string> = new Map();
  private resourceHints: Map<string, string[]> = new Map();

  constructor() {
    this.initializePerformanceMonitoring();
  }

  /**
   * Initialize performance monitoring
   */
  private initializePerformanceMonitoring(): void {
    if (typeof window !== 'undefined') {
      // Web Vitals monitoring
      this.setupWebVitalsTracking();
      
      // Resource timing monitoring
      this.setupResourceTimingTracking();
      
      // User interaction tracking
      this.setupInteractionTracking();
    }
  }

  /**
   * Setup Web Vitals tracking
   */
  private setupWebVitalsTracking(): void {
    // LCP - Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      this.recordMetric('lcp', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID - First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        this.recordMetric('fid', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.recordMetric('cls', clsValue);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });

    // FCP - First Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        this.recordMetric('fcp', entry.startTime);
      });
    }).observe({ entryTypes: ['paint'] });
  }

  /**
   * Setup resource timing tracking
   */
  private setupResourceTimingTracking(): void {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        const loadTime = entry.responseEnd - entry.requestStart;
        this.recordResourceTiming(entry.name, loadTime);
        
        // Track slow resources
        if (loadTime > 3000) { // > 3 seconds
          this.reportSlowResource(entry.name, loadTime);
        }
      });
    }).observe({ entryTypes: ['resource'] });
  }

  /**
   * Setup interaction tracking
   */
  private setupInteractionTracking(): void {
    // Track Time to Interactive
    document.addEventListener('DOMContentLoaded', () => {
      const tti = performance.now();
      this.recordMetric('timeToInteractive', tti);
    });

    // Track user interactions
    ['click', 'scroll', 'keypress'].forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        this.trackInteraction(event);
      }, { passive: true });
    });
  }

  /**
   * Get optimized image configuration
   */
  getImageConfig(
    src: string,
    priority: boolean = false,
    deviceType?: 'mobile' | 'tablet' | 'desktop'
  ): ImageOptimizationConfig {
    const isMobile = deviceType === 'mobile';
    const isTablet = deviceType === 'tablet';

    // Jewelry images need high quality for detail
    let quality = 85; // High quality for jewelry
    if (isMobile) quality = 75; // Slightly lower for mobile

    // Responsive sizes for jewelry images
    let sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    if (src.includes('hero')) {
      sizes = '100vw'; // Hero images full width
    } else if (src.includes('thumbnail')) {
      sizes = '(max-width: 768px) 50vw, 25vw'; // Product thumbnails
    }

    return {
      quality,
      format: 'auto', // Let Next.js choose best format
      sizes,
      priority: priority || src.includes('hero') || src.includes('main'),
      placeholder: 'blur',
      blurDataURL: this.generateBlurDataURL()
    };
  }

  /**
   * Generate blur placeholder for images
   */
  private generateBlurDataURL(): string {
    // Generate a small, blurred placeholder
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  }

  /**
   * Optimize critical resources loading
   */
  optimizeCriticalResources(): string[] {
    const criticalResources = [
      // Fonts - preload jewelry-specific fonts
      '<link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin>',
      '<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>',
      
      // Critical CSS
      '<link rel="preload" href="/styles/critical.css" as="style">',
      
      // Above-the-fold images
      '<link rel="preload" href="/images/hero-diamond.webp" as="image">',
      
      // JavaScript bundles
      '<link rel="modulepreload" href="/js/critical.js">',
      
      // API endpoints likely to be called
      '<link rel="dns-prefetch" href="//api.stripe.com">',
      '<link rel="dns-prefetch" href="//www.google-analytics.com">',
      '<link rel="preconnect" href="//fonts.googleapis.com">',
      '<link rel="preconnect" href="//fonts.gstatic.com" crossorigin>'
    ];

    return criticalResources;
  }

  /**
   * Get cache strategy for different resource types
   */
  getCacheStrategy(resourceType: string, filePath: string): CacheConfig {
    const strategies: Record<string, CacheConfig> = {
      // Static assets - cache aggressively
      'image': {
        strategy: 'cache-first',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        staleWhileRevalidate: 7 * 24 * 60 * 60 // 7 days
      },
      
      'font': {
        strategy: 'cache-first',
        maxAge: 365 * 24 * 60 * 60, // 1 year
        staleWhileRevalidate: 30 * 24 * 60 * 60 // 30 days
      },
      
      'style': {
        strategy: 'stale-while-revalidate',
        maxAge: 24 * 60 * 60, // 1 day
        staleWhileRevalidate: 7 * 24 * 60 * 60 // 7 days
      },
      
      'script': {
        strategy: 'stale-while-revalidate',
        maxAge: 24 * 60 * 60, // 1 day
        staleWhileRevalidate: 7 * 24 * 60 * 60 // 7 days
      },
      
      // API responses - more dynamic
      'api-product': {
        strategy: 'stale-while-revalidate',
        maxAge: 5 * 60, // 5 minutes
        staleWhileRevalidate: 30 * 60, // 30 minutes
        networkTimeoutSeconds: 3
      },
      
      'api-inventory': {
        strategy: 'network-first',
        maxAge: 60, // 1 minute
        networkTimeoutSeconds: 2
      },
      
      'api-user': {
        strategy: 'network-first',
        maxAge: 0, // No cache for user data
        networkTimeoutSeconds: 5
      }
    };

    return strategies[resourceType] || strategies['api-product'];
  }

  /**
   * Implement critical resource hints
   */
  generateResourceHints(page: string): string[] {
    const pageHints: Record<string, string[]> = {
      // Homepage - preload hero content
      '/': [
        '<link rel="preload" href="/api/products/featured" as="fetch" crossorigin>',
        '<link rel="preload" href="/images/hero-collection.webp" as="image">',
        '<link rel="prefetch" href="/products">',
        '<link rel="prefetch" href="/collections">'
      ],
      
      // Product listing - preload first products
      '/products': [
        '<link rel="preload" href="/api/products?limit=12" as="fetch" crossorigin>',
        '<link rel="preload" href="/api/filters" as="fetch" crossorigin>',
        '<link rel="prefetch" href="/api/products?page=2">'
      ],
      
      // Product detail - preload related products
      '/product/[id]': [
        '<link rel="preload" href="/api/products/related" as="fetch" crossorigin>',
        '<link rel="preload" href="/api/reviews" as="fetch" crossorigin>',
        '<link rel="prefetch" href="/cart">'
      ],
      
      // Cart - preload checkout resources
      '/cart': [
        '<link rel="preload" href="/api/shipping" as="fetch" crossorigin>',
        '<link rel="preload" href="/api/tax" as="fetch" crossorigin>',
        '<link rel="prefetch" href="/checkout">',
        '<link rel="dns-prefetch" href="//js.stripe.com">'
      ],
      
      // Checkout - critical payment resources
      '/checkout': [
        '<link rel="preconnect" href="//js.stripe.com">',
        '<link rel="preconnect" href="//api.stripe.com">',
        '<link rel="modulepreload" href="/js/stripe.js">'
      ]
    };

    return pageHints[page] || [];
  }

  /**
   * Optimize for mobile jewelry shopping
   */
  getMobileOptimizations(): {
    viewport: string;
    touchOptimizations: Record<string, string>;
    loadingStrategy: string;
  } {
    return {
      // Optimal viewport for jewelry viewing on mobile
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=yes, maximum-scale=3',
      
      touchOptimizations: {
        // Larger touch targets for mobile jewelry browsing
        'button': 'min-height: 44px; min-width: 44px;',
        'product-card': 'min-height: 200px; touch-action: manipulation;',
        'zoom-area': 'touch-action: pinch-zoom;', // For jewelry detail viewing
        'scroll-container': 'touch-action: pan-y;',
        'image-gallery': 'touch-action: pan-x;'
      },
      
      loadingStrategy: 'progressive' // Load critical content first
    };
  }

  /**
   * Service Worker caching for offline jewelry browsing
   */
  generateServiceWorkerConfig(): any {
    return {
      // Cache strategies for different content types
      runtimeCaching: [
        // Product images - essential for jewelry
        {
          urlPattern: /^https:\/\/.*\.(jpg|jpeg|png|webp|avif)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'jewelry-images',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            }
          }
        },
        
        // Product API - with network fallback
        {
          urlPattern: /^https:\/\/.*\/api\/products/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'product-api',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 5 * 60 // 5 minutes
            }
          }
        },
        
        // Static assets
        {
          urlPattern: /^https:\/\/.*\.(js|css|woff2)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-assets',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
            }
          }
        }
      ],
      
      // Precache critical pages for offline browsing
      precacheEntries: [
        '/',
        '/products',
        '/collections',
        '/care-guide',
        '/offline' // Offline fallback page
      ]
    };
  }

  /**
   * Monitor and report performance metrics
   */
  async reportPerformanceMetrics(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Collect current metrics
    const metrics = this.collectCurrentMetrics();
    
    // Send to analytics
    await this.sendMetricsToAnalytics(metrics);
    
    // Log Core Web Vitals compliance
    this.logWebVitalsCompliance(metrics);
  }

  /**
   * Collect current performance metrics
   */
  private collectCurrentMetrics(): PerformanceMetrics {
    const navigation = performance.getEntriesByType('navigation')[0] as any;
    
    return {
      lcp: this.getStoredMetric('lcp') || 0,
      fid: this.getStoredMetric('fid') || 0,
      cls: this.getStoredMetric('cls') || 0,
      fcp: this.getStoredMetric('fcp') || 0,
      ttfb: navigation?.responseStart - navigation?.requestStart || 0,
      timeToInteractive: this.getStoredMetric('timeToInteractive') || 0,
      totalBlockingTime: this.calculateTotalBlockingTime(),
      speedIndex: this.calculateSpeedIndex(),
      pageLoadTime: navigation?.loadEventEnd - navigation?.navigationStart || 0,
      resourceLoadTime: this.getResourceLoadTimes(),
      deviceType: this.getDeviceType(),
      connectionType: this.getConnectionType(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  /**
   * Record individual metric
   */
  private recordMetric(name: string, value: number): void {
    const sessionId = sessionStorage.getItem('session_id') || 'unknown';
    const metrics = this.metrics.get(sessionId) || {} as PerformanceMetrics;
    (metrics as any)[name] = value;
    this.metrics.set(sessionId, metrics);
  }

  /**
   * Get stored metric value
   */
  private getStoredMetric(name: string): number {
    const sessionId = sessionStorage.getItem('session_id') || 'unknown';
    const metrics = this.metrics.get(sessionId);
    return (metrics as any)?.[name] || 0;
  }

  /**
   * Track resource timing
   */
  private recordResourceTiming(resourceName: string, loadTime: number): void {
    console.log(`Resource loaded: ${resourceName} in ${loadTime}ms`);
  }

  /**
   * Report slow resources
   */
  private reportSlowResource(resourceName: string, loadTime: number): void {
    console.warn(`Slow resource detected: ${resourceName} took ${loadTime}ms`);
    
    // In production, send to monitoring service
    fetch('/api/performance/slow-resource', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resource: resourceName,
        loadTime,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      })
    }).catch(() => {}); // Don't let monitoring affect performance
  }

  /**
   * Track user interactions
   */
  private trackInteraction(event: Event): void {
    const interactionTime = performance.now();
    
    // Track interaction delays
    if (event.timeStamp) {
      const delay = interactionTime - event.timeStamp;
      if (delay > 100) { // > 100ms delay
        console.warn(`Slow interaction detected: ${event.type} took ${delay}ms`);
      }
    }
  }

  /**
   * Calculate Total Blocking Time
   */
  private calculateTotalBlockingTime(): number {
    // Implementation would analyze long tasks
    return 0; // Placeholder
  }

  /**
   * Calculate Speed Index
   */
  private calculateSpeedIndex(): number {
    // Implementation would analyze visual completeness over time
    return 0; // Placeholder
  }

  /**
   * Get resource load times
   */
  private getResourceLoadTimes(): Record<string, number> {
    const resources = performance.getEntriesByType('resource');
    const loadTimes: Record<string, number> = {};
    
    resources.forEach((resource: any) => {
      const name = resource.name.split('/').pop();
      loadTimes[name] = resource.duration;
    });
    
    return loadTimes;
  }

  /**
   * Get device type
   */
  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Get connection type
   */
  private getConnectionType(): string {
    return (navigator as any).connection?.effectiveType || 'unknown';
  }

  /**
   * Send metrics to analytics
   */
  private async sendMetricsToAnalytics(metrics: PerformanceMetrics): Promise<void> {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics)
      });
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
    }
  }

  /**
   * Log Core Web Vitals compliance
   */
  private logWebVitalsCompliance(metrics: PerformanceMetrics): void {
    const compliance = {
      lcp: metrics.lcp <= 2500, // Good: ≤2.5s
      fid: metrics.fid <= 100,   // Good: ≤100ms
      cls: metrics.cls <= 0.1    // Good: ≤0.1
    };

    const passed = Object.values(compliance).every(Boolean);
    
    console.log('Core Web Vitals:', {
      lcp: `${metrics.lcp}ms (${compliance.lcp ? 'PASS' : 'FAIL'})`,
      fid: `${metrics.fid}ms (${compliance.fid ? 'PASS' : 'FAIL'})`,
      cls: `${metrics.cls} (${compliance.cls ? 'PASS' : 'FAIL'})`,
      overall: passed ? 'PASS' : 'FAIL'
    });
  }
}

// Global performance optimizer instance
export const performanceOptimizer = new PerformanceOptimizer();

// Middleware for performance optimization
export function performanceMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add performance hints headers
  const hints = performanceOptimizer.generateResourceHints(request.nextUrl.pathname);
  if (hints.length > 0) {
    response.headers.set('Link', hints.join(', '));
  }
  
  // Add cache headers based on resource type
  const resourceType = getResourceType(request.nextUrl.pathname);
  const cacheConfig = performanceOptimizer.getCacheStrategy(resourceType, request.nextUrl.pathname);
  
  if (cacheConfig.maxAge > 0) {
    response.headers.set('Cache-Control', `public, max-age=${cacheConfig.maxAge}`);
  }
  
  return response;
}

/**
 * Determine resource type from path
 */
function getResourceType(pathname: string): string {
  if (pathname.match(/\.(jpg|jpeg|png|webp|avif|gif)$/i)) return 'image';
  if (pathname.match(/\.(woff2|woff|ttf)$/i)) return 'font';
  if (pathname.match(/\.css$/i)) return 'style';
  if (pathname.match(/\.js$/i)) return 'script';
  if (pathname.startsWith('/api/products')) return 'api-product';
  if (pathname.startsWith('/api/inventory')) return 'api-inventory';
  if (pathname.startsWith('/api/')) return 'api-user';
  return 'page';
}

export default PerformanceOptimizer;