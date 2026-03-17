'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'

// ============================================================================
// ENTERPRISE PERFORMANCE MONITORING SYSTEM
// Netflix/Google Quality Performance & User Experience
// ============================================================================

interface PerformanceMetrics {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  fcp: number // First Contentful Paint
  ttfb: number // Time to First Byte
  domContentLoaded: number
  loadComplete: number
}

interface PerformanceAlertProps {
  metric: string
  value: number
  threshold: number
  severity: 'good' | 'warning' | 'poor'
  onDismiss: () => void
}

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({})
  const [alerts, setAlerts] = useState<PerformanceAlertProps[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Core Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry.startTime
          setMetrics(prev => ({ ...prev, lcp }))
          
          if (lcp > 2500) {
            setAlerts(prev => [...prev, {
              metric: 'LCP',
              value: lcp,
              threshold: 2500,
              severity: lcp > 4000 ? 'poor' : 'warning',
              onDismiss: () => setAlerts(prev => prev.filter(a => a.metric !== 'LCP'))
            }])
          }
        }

        if (entry.entryType === 'first-input') {
          const fid = entry.processingStart - entry.startTime
          setMetrics(prev => ({ ...prev, fid }))
          
          if (fid > 100) {
            setAlerts(prev => [...prev, {
              metric: 'FID',
              value: fid,
              threshold: 100,
              severity: fid > 300 ? 'poor' : 'warning',
              onDismiss: () => setAlerts(prev => prev.filter(a => a.metric !== 'FID'))
            }])
          }
        }

        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          const cls = entry.value
          setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + cls }))
          
          if (cls > 0.1) {
            setAlerts(prev => [...prev, {
              metric: 'CLS',
              value: cls,
              threshold: 0.1,
              severity: cls > 0.25 ? 'poor' : 'warning',
              onDismiss: () => setAlerts(prev => prev.filter(a => a.metric !== 'CLS'))
            }])
          }
        }
      }
    })

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      console.warn('Performance Observer not supported:', e)
    }

    // Navigation timing metrics
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          setMetrics(prev => ({
            ...prev,
            ttfb: navEntry.responseStart - navEntry.requestStart,
            fcp: navEntry.responseEnd - navEntry.responseStart,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.navigationStart,
            loadComplete: navEntry.loadEventEnd - navEntry.navigationStart
          }))
        }
      }
    })

    try {
      navigationObserver.observe({ entryTypes: ['navigation'] })
    } catch (e) {
      console.warn('Navigation Observer not supported:', e)
    }

    // Cleanup
    return () => {
      observer.disconnect()
      navigationObserver.disconnect()
    }
  }, [])

  const dismissAlert = (metric: string) => {
    setAlerts(prev => prev.filter(alert => alert.metric !== metric))
  }

  return { metrics, alerts, dismissAlert }
}

// Performance alert component
const PerformanceAlert = ({ alert }: { alert: PerformanceAlertProps }) => {
  const severityConfig = {
    good: {
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-800',
      bgColor: 'bg-green-50'
    },
    warning: {
      icon: AlertTriangle,
      color: 'bg-orange-500',
      textColor: 'text-orange-800',
      bgColor: 'bg-orange-50'
    },
    poor: {
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-800',
      bgColor: 'bg-red-50'
    }
  }

  const config = severityConfig[alert.severity]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={`
        fixed top-20 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg border
        ${config.bgColor} ${config.textColor}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`p-1 rounded-full ${config.color} text-white`}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-sm">Performance Notice</h4>
          <p className="text-sm mt-1">
            {alert.metric}: {Math.round(alert.value)}ms (threshold: {alert.threshold}ms)
          </p>
          <p className="text-xs mt-2 opacity-75">
            This may affect user experience. Consider optimizing images and scripts.
          </p>
        </div>

        <button
          onClick={alert.onDismiss}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// Performance dashboard for development
export const PerformanceDashboard = ({ 
  show = process.env.NODE_ENV === 'development' 
}: {
  show?: boolean
}) => {
  const { metrics, alerts } = usePerformanceMonitoring()
  const [isExpanded, setIsExpanded] = useState(false)

  if (!show) return null

  const getScoreColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-500'
    if (value <= thresholds[1]) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <>
      {/* Performance Alerts */}
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <PerformanceAlert key={`${alert.metric}-${index}`} alert={alert} />
        ))}
      </AnimatePresence>

      {/* Performance Dashboard */}
      <motion.div
        className="fixed bottom-4 left-4 z-50 bg-black text-white rounded-lg shadow-xl overflow-hidden"
        animate={{
          width: isExpanded ? 400 : 200
        }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="font-medium">Performance</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="ml-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-700"
            >
              <div className="p-3 space-y-2 text-sm">
                {metrics.lcp && (
                  <div className="flex justify-between">
                    <span>LCP:</span>
                    <span className={getScoreColor(metrics.lcp, [2500, 4000])}>
                      {Math.round(metrics.lcp)}ms
                    </span>
                  </div>
                )}
                
                {metrics.fid && (
                  <div className="flex justify-between">
                    <span>FID:</span>
                    <span className={getScoreColor(metrics.fid, [100, 300])}>
                      {Math.round(metrics.fid)}ms
                    </span>
                  </div>
                )}
                
                {metrics.cls && (
                  <div className="flex justify-between">
                    <span>CLS:</span>
                    <span className={getScoreColor(metrics.cls * 1000, [100, 250])}>
                      {metrics.cls.toFixed(3)}
                    </span>
                  </div>
                )}
                
                {metrics.ttfb && (
                  <div className="flex justify-between">
                    <span>TTFB:</span>
                    <span className={getScoreColor(metrics.ttfb, [800, 1800])}>
                      {Math.round(metrics.ttfb)}ms
                    </span>
                  </div>
                )}
                
                {metrics.loadComplete && (
                  <div className="flex justify-between">
                    <span>Load:</span>
                    <span className={getScoreColor(metrics.loadComplete, [3000, 5000])}>
                      {Math.round(metrics.loadComplete)}ms
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>Core Web Vitals</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

// Image optimization component with lazy loading and performance tracking
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  onLoad,
  ...props
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  onLoad?: () => void
  [key: string]: any
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loadTime, setLoadTime] = useState<number | null>(null)

  const handleLoad = () => {
    const endTime = performance.now()
    setLoadTime(endTime)
    setLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    setLoading(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: loading ? 0 : 1,
          scale: loading ? 1.1 : 1
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        {...props}
      />

      {/* Loading skeleton */}
      {loading && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse shimmer" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Image failed to load</span>
          </div>
        </div>
      )}

      {/* Performance indicator (dev only) */}
      {process.env.NODE_ENV === 'development' && loadTime && (
        <div className="absolute top-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
          {Math.round(loadTime)}ms
        </div>
      )}
    </div>
  )
}

// Bundle analyzer component (dev only)
export const BundleAnalyzer = ({ 
  show = process.env.NODE_ENV === 'development' 
}: {
  show?: boolean
}) => {
  const [bundleInfo, setBundleInfo] = useState<any>(null)

  useEffect(() => {
    if (!show || typeof window === 'undefined') return

    // Estimate bundle size from performance entries
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const jsResources = resources.filter(r => r.name.includes('.js'))
    const cssResources = resources.filter(r => r.name.includes('.css'))
    
    const totalJSSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
    const totalCSSSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0)

    setBundleInfo({
      js: totalJSSize,
      css: totalCSSSize,
      jsCount: jsResources.length,
      cssCount: cssResources.length
    })
  }, [show])

  if (!show || !bundleInfo) return null

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Bundle Size
      </h4>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>JavaScript ({bundleInfo.jsCount} files):</span>
          <span className="font-mono">{formatBytes(bundleInfo.js)}</span>
        </div>
        <div className="flex justify-between">
          <span>CSS ({bundleInfo.cssCount} files):</span>
          <span className="font-mono">{formatBytes(bundleInfo.css)}</span>
        </div>
        <div className="flex justify-between font-semibold border-t pt-1">
          <span>Total:</span>
          <span className="font-mono">{formatBytes(bundleInfo.js + bundleInfo.css)}</span>
        </div>
      </div>
    </div>
  )
}

export default usePerformanceMonitoring