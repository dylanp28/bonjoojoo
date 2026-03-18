// Critical JavaScript for above-the-fold functionality

// Performance monitoring
(function() {
  'use strict';
  
  // Web Vitals tracking
  function trackWebVitals() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // First Contentful Paint
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcp) {
        console.log('FCP:', fcp.startTime);
      }

      // Largest Contentful Paint
      if ('web-vitals' in window) {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      }
    }
  }

  // Lazy loading optimization
  function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Critical resource preloader
  function preloadCriticalResources() {
    const criticalResources = [
      { rel: 'preload', href: '/css/critical.css', as: 'style' },
      { rel: 'preload', href: '/videos/model-hero.mp4', as: 'video', type: 'video/mp4' },
      { rel: 'prefetch', href: '/api/inventory/search', as: 'fetch', crossorigin: 'anonymous' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      Object.keys(resource).forEach(key => {
        link[key] = resource[key];
      });
      document.head.appendChild(link);
    });
  }

  // Header scroll behavior
  function initHeaderBehavior() {
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
      const header = document.querySelector('.header-bj');
      const currentScrollY = window.scrollY;
      
      if (header) {
        if (currentScrollY > 100) {
          header.classList.add('fixed');
        } else {
          header.classList.remove('fixed');
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Initialize critical functions when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initHeaderBehavior();
      setupLazyLoading();
      preloadCriticalResources();
      trackWebVitals();
    });
  } else {
    initHeaderBehavior();
    setupLazyLoading();
    preloadCriticalResources();
    trackWebVitals();
  }

  // Service Worker registration for caching
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('SW registered: ', registration);
        })
        .catch(function(registrationError) {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

})();