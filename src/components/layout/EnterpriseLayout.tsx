'use client'

import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp, Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { PageErrorBoundary } from '@/components/errors/EnterpriseErrorBoundary'
import { LuxuryPageTransition } from '@/components/animations/LuxuryAnimationSystem'

// ============================================================================
// ENTERPRISE LAYOUT SYSTEM
// Professional layout with error handling, performance monitoring, and UX
// ============================================================================

interface EnterpriseLayoutProps {
  children: ReactNode
  showBackToTop?: boolean
  showNetworkStatus?: boolean
  enablePageTransitions?: boolean
  performanceMonitoring?: boolean
}

export const EnterpriseLayout = ({
  children,
  showBackToTop = true,
  showNetworkStatus = true,
  enablePageTransitions = true,
  performanceMonitoring = true
}: EnterpriseLayoutProps) => {
  const [isOnline, setIsOnline] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [performanceAlert, setPerformanceAlert] = useState<string | null>(null)
  
  const { scrollY } = useScroll()

  // Monitor scroll position for back-to-top button
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > 300)
  })

  // Network status monitoring
  useEffect(() => {
    if (!showNetworkStatus || typeof window === 'undefined') return

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [showNetworkStatus])

  // Performance monitoring
  useEffect(() => {
    if (!performanceMonitoring || typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Monitor Largest Contentful Paint
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry.startTime
          if (lcp > 2500) { // Poor LCP threshold
            setPerformanceAlert(`Page loading slower than expected (${Math.round(lcp)}ms)`)
            setTimeout(() => setPerformanceAlert(null), 5000)
          }
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      // LCP not supported, fallback to load event
      const handleLoad = () => {
        const loadTime = performance.now()
        if (loadTime > 3000) {
          setPerformanceAlert(`Page loaded in ${Math.round(loadTime)}ms`)
          setTimeout(() => setPerformanceAlert(null), 5000)
        }
      }
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }

    return () => observer.disconnect()
  }, [performanceMonitoring])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const content = enablePageTransitions ? (
    <LuxuryPageTransition>
      {children}
    </LuxuryPageTransition>
  ) : children

  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        {content}

        {/* Network Status Indicator */}
        {showNetworkStatus && !isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-6 z-50"
          >
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">No internet connection</span>
            </div>
          </motion.div>
        )}

        {/* Performance Alert */}
        <AnimatePresence>
          {performanceAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 right-6 z-50 max-w-sm"
            >
              <div className="bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Performance Notice</p>
                  <p className="text-xs opacity-90">{performanceAlert}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        {showBackToTop && (
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        )}

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
          style={{
            scaleX: scrollY.get() / (document.documentElement.scrollHeight - window.innerHeight) || 0
          }}
        />
      </div>
    </PageErrorBoundary>
  )
}

// Enhanced header with enterprise features
export const EnterpriseHeader = ({ 
  children,
  sticky = true,
  blur = true,
  className = ''
}: {
  children: ReactNode
  sticky?: boolean
  blur?: boolean
  className?: string
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className={`
        ${sticky ? 'sticky top-0' : ''} z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-100' 
          : 'bg-white'
        }
        ${blur ? 'backdrop-blur-md' : ''}
        ${className}
      `}
      animate={{
        y: isScrolled ? 0 : 0,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {children}
    </motion.header>
  )
}

// Professional footer with animations
export const EnterpriseFooter = ({ 
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-white border-t border-gray-200 ${className}`}
    >
      {children}
    </motion.footer>
  )
}

// Loading overlay for page transitions
export const PageLoadingOverlay = ({ 
  isLoading,
  message = 'Loading...'
}: {
  isLoading: boolean
  message?: string
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                ease: "linear",
                repeat: Infinity
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-600 font-medium"
            >
              {message}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Error fallback for layout errors
export const LayoutErrorFallback = ({ 
  error,
  retry 
}: {
  error: Error
  retry: () => void
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Page Error
        </h1>
        
        <p className="text-gray-600 mb-6">
          Something went wrong loading this page. Please try again.
        </p>
        
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={retry}
            className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Try Again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Go Home
          </motion.button>
        </div>
        
        <details className="mt-6 text-left">
          <summary className="text-sm text-gray-500 cursor-pointer">
            Error Details
          </summary>
          <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  )
}

export default EnterpriseLayout