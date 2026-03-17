'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, RefreshCcw, Home, MessageCircle } from 'lucide-react'

// ============================================================================
// ENTERPRISE ERROR BOUNDARY SYSTEM
// Netflix/Stripe Quality Error Handling
// ============================================================================

interface Props {
  children: ReactNode
  fallback?: ReactNode
  level?: 'page' | 'component' | 'critical'
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
}

class EnterpriseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Log to monitoring service (replace with your service)
    console.group('🚨 Enterprise Error Boundary')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Component Stack:', errorInfo.componentStack)
    console.groupEnd()

    // Send to error monitoring
    if (typeof window !== 'undefined') {
      // Example: Sentry.captureException(error, { extra: errorInfo })
      
      // Analytics tracking
      try {
        // Example: gtag('event', 'exception', { 'description': error.message })
      } catch (analyticsError) {
        console.error('Analytics error:', analyticsError)
      }
    }

    // Custom error callback
    this.props.onError?.(error, errorInfo)
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Level-specific error UI
      return (
        <ErrorDisplay
          level={this.props.level || 'component'}
          error={this.state.error}
          errorId={this.state.errorId}
          onRetry={this.retry}
        />
      )
    }

    return this.props.children
  }
}

// Sophisticated error display component
const ErrorDisplay = ({ 
  level, 
  error, 
  errorId, 
  onRetry 
}: {
  level: 'page' | 'component' | 'critical'
  error: Error | null
  errorId: string
  onRetry: () => void
}) => {
  const errorConfig = {
    page: {
      title: 'Something went wrong',
      description: 'We encountered an unexpected error. Our team has been notified.',
      icon: AlertTriangle,
      severity: 'high',
      showDetails: false
    },
    component: {
      title: 'Component Error',
      description: 'This component failed to load properly.',
      icon: AlertTriangle,
      severity: 'medium',
      showDetails: false
    },
    critical: {
      title: 'Critical Error',
      description: 'A critical error occurred. Please refresh the page.',
      icon: AlertTriangle,
      severity: 'critical',
      showDetails: true
    }
  }

  const config = errorConfig[level]
  const Icon = config.icon

  const severityStyles = {
    critical: 'border-red-200 bg-red-50',
    high: 'border-orange-200 bg-orange-50',
    medium: 'border-yellow-200 bg-yellow-50'
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          max-w-lg mx-auto p-8 rounded-lg border 
          ${severityStyles[config.severity]}
          shadow-lg text-center
        `}
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <Icon className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {config.title}
          </h3>
          <p className="text-gray-600 mb-6">
            {config.description}
          </p>

          {/* Error ID */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Error ID for support:</p>
            <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono text-gray-700">
              {errorId}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRetry}
              className="
                flex items-center justify-center gap-2 px-6 py-3 
                bg-black hover:bg-gray-800 text-white rounded-lg
                font-medium transition-colors
              "
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </motion.button>

            {level === 'page' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/'}
                className="
                  flex items-center justify-center gap-2 px-6 py-3 
                  border border-gray-300 hover:border-gray-400 text-gray-700
                  rounded-lg font-medium transition-colors
                "
              >
                <Home className="w-4 h-4" />
                Go Home
              </motion.button>
            )}

            {config.severity === 'critical' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Open support chat or email
                  window.open('mailto:support@bonjoojoo.com?subject=Critical Error&body=Error ID: ' + errorId)
                }}
                className="
                  flex items-center justify-center gap-2 px-6 py-3 
                  border border-blue-300 hover:border-blue-400 text-blue-700
                  rounded-lg font-medium transition-colors
                "
              >
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </motion.button>
            )}
          </div>

          {/* Error Details (for critical errors) */}
          {config.showDetails && error && (
            <motion.details
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-left"
            >
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Technical Details
              </summary>
              <div className="mt-3 p-4 bg-gray-50 rounded border-l-4 border-red-400">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto">
                  {error.message}
                  {error.stack && '\n\nStack trace:\n' + error.stack}
                </pre>
              </div>
            </motion.details>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Specialized error boundaries for different contexts
export const ProductErrorBoundary = ({ children }: { children: ReactNode }) => (
  <EnterpriseErrorBoundary 
    level="component"
    fallback={
      <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">Product Unavailable</h3>
        <p className="text-gray-600 mb-4">This product couldn't be loaded right now.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Refresh Page
        </button>
      </div>
    }
  >
    {children}
  </EnterpriseErrorBoundary>
)

export const CheckoutErrorBoundary = ({ children }: { children: ReactNode }) => (
  <EnterpriseErrorBoundary 
    level="critical"
    onError={(error, errorInfo) => {
      // Critical checkout errors need immediate attention
      console.error('CRITICAL CHECKOUT ERROR:', error, errorInfo)
      // Send alert to monitoring
    }}
  >
    {children}
  </EnterpriseErrorBoundary>
)

export const PageErrorBoundary = ({ children }: { children: ReactNode }) => (
  <EnterpriseErrorBoundary level="page">
    {children}
  </EnterpriseErrorBoundary>
)

export default EnterpriseErrorBoundary