'use client'

import { useEffect, useState } from 'react'
import { useAnalytics } from '@/utils/analytics'

interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
}

export function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const analytics = useAnalytics()

  useEffect(() => {
    // Preload critical lab-grown diamond content
    const preloadCriticalContent = () => {
      // Preload hero images
      const heroImages = [
        '/images/lab-grown-hero-1.webp',
        '/images/lab-grown-hero-2.webp',
        '/images/lab-grown-hero-3.webp'
      ]

      heroImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      })

      // Note: fonts are loaded via Google Fonts with display=swap in layout.tsx
      // No additional font preloading needed — preconnect hints handle connection warm-up

      // Prefetch likely next pages
      const prefetchPages = [
        '/category/rings',
        '/education/lab-grown-diamonds',
        '/category/necklaces'
      ]

      prefetchPages.forEach(href => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = href
        document.head.appendChild(link)
      })
    }

    // Execute after initial load
    setTimeout(preloadCriticalContent, 100)

    // Performance monitoring
    const measurePerformance = () => {
      if ('web-vital' in window) return // Already measured

      // Web Vitals measurement
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                analytics.track({
                  action: 'performance_metric',
                  category: 'Core Web Vitals',
                  label: 'FCP',
                  value: Math.round(entry.startTime),
                  customParameters: {
                    metric_name: 'first_contentful_paint',
                    value_ms: entry.startTime,
                    is_mobile: window.innerWidth < 768
                  }
                })
              }
              break
            
            case 'largest-contentful-paint':
              analytics.track({
                action: 'performance_metric',
                category: 'Core Web Vitals',
                label: 'LCP',
                value: Math.round(entry.startTime),
                customParameters: {
                  metric_name: 'largest_contentful_paint',
                  value_ms: entry.startTime,
                  is_mobile: window.innerWidth < 768
                }
              })
              break

            case 'layout-shift':
              analytics.track({
                action: 'performance_metric', 
                category: 'Core Web Vitals',
                label: 'CLS',
                value: Math.round(entry.value * 1000),
                customParameters: {
                  metric_name: 'cumulative_layout_shift',
                  value: entry.value,
                  is_mobile: window.innerWidth < 768
                }
              })
              break
          }
        })
      })

      // Observe performance metrics
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] })

      // Mark as measured
      ;(window as any)['web-vital'] = true
    }

    measurePerformance()

    // Image optimization for mobile
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-optimize="true"]')
      const isMobile = window.innerWidth < 768

      images.forEach((img) => {
        const element = img as HTMLImageElement
        const originalSrc = element.src

        if (isMobile && !originalSrc.includes('?mobile=true')) {
          // Apply mobile-specific optimizations
          element.src = `${originalSrc}?mobile=true&w=600&q=75&f=webp`
        }
      })
    }

    optimizeImages()
    window.addEventListener('resize', optimizeImages)

    return () => {
      window.removeEventListener('resize', optimizeImages)
    }
  }, [analytics])

  // Progressive loading for below-the-fold content
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            
            // Lazy load images
            const lazyImages = element.querySelectorAll('img[data-src]')
            lazyImages.forEach((img) => {
              const image = img as HTMLImageElement
              image.src = image.dataset.src || ''
              image.removeAttribute('data-src')
            })

            // Load video content
            const lazyVideos = element.querySelectorAll('video[data-src]')
            lazyVideos.forEach((video) => {
              const videoElement = video as HTMLVideoElement
              videoElement.src = videoElement.dataset.src || ''
              videoElement.load()
            })

            // Initialize animations
            element.classList.add('animate-fade-in')

            intersectionObserver.unobserve(element)
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    )

    // Observe elements marked for lazy loading
    const lazyElements = document.querySelectorAll('[data-lazy]')
    lazyElements.forEach((el) => intersectionObserver.observe(el))

    return () => intersectionObserver.disconnect()
  }, [])

  // Critical CSS inlining for above-the-fold content
  useEffect(() => {
    const inlineCriticalCSS = () => {
      const criticalCSS = `
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .lab-grown-badge {
          background: #16a34a;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .trust-signal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }

        .trust-signal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-sticky-bar {
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .mobile-sticky-bar.visible {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .hero-text {
            font-size: 2.5rem;
            line-height: 1.1;
          }
          
          .mobile-optimized {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `

      const style = document.createElement('style')
      style.textContent = criticalCSS
      document.head.appendChild(style)
    }

    inlineCriticalCSS()
  }, [])

  // Service Worker registration for caching
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
          
          // Track successful SW registration
          analytics.track({
            action: 'service_worker_registered',
            category: 'Performance',
            customParameters: {
              sw_scope: registration.scope
            }
          })
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [analytics])

  return null // This is a utility component that doesn't render anything
}

// Critical Resource Hints Component
export function CriticalResourceHints() {
  return (
    <>
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />

      {/* Preconnect for critical external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Preload critical CSS */}
      <link 
        rel="preload" 
        href="/css/critical.css" 
        as="style" 
        onLoad="this.onload=null;this.rel='stylesheet'"
      />

      {/* Preload critical JavaScript */}
      <link rel="modulepreload" href="/js/critical.js" />

      {/* Resource hints for lab-grown diamond imagery */}
      <link rel="preload" href="/images/lab-grown-hero.webp" as="image" />
      <link rel="prefetch" href="/images/lab-grown-hero.webp" />
      <link rel="prefetch" href="/images/sustainability-hero.webp" />

      {/* Prefetch critical pages for lab-grown education flow */}
      <link rel="prefetch" href="/education/lab-grown-diamonds" />
      <link rel="prefetch" href="/category/rings" />
    </>
  )
}

// Mobile Performance Optimizations
export function MobilePerformanceOptimizer() {
  useEffect(() => {
    // Touch optimization for mobile
    const optimizeTouch = () => {
      document.body.style.touchAction = 'manipulation'
      
      // Add touch-specific styles
      const touchStyle = document.createElement('style')
      touchStyle.textContent = `
        .btn, button, [role="button"] {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        
        .product-card {
          will-change: transform;
        }
        
        .mobile-scroll {
          -webkit-overflow-scrolling: touch;
        }
      `
      document.head.appendChild(touchStyle)
    }

    // Viewport optimization
    const optimizeViewport = () => {
      let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
      
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta')
        viewportMeta.name = 'viewport'
        document.head.appendChild(viewportMeta)
      }
      
      viewportMeta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
    }

    // Mobile-specific optimizations
    if (window.innerWidth < 768) {
      optimizeTouch()
      optimizeViewport()
    }
  }, [])

  return null
}