'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'

// ============================================================================
// ENTERPRISE LOADING SYSTEM
// Stripe/Airbnb Quality Loading States & Skeleton Screens
// ============================================================================

interface LoadingState {
  isLoading: boolean
  progress?: number
  message?: string
  type?: 'spinner' | 'skeleton' | 'progressive' | 'shimmer'
}

// Master loading wrapper with sophisticated states
export const EnterpriseLoader = ({
  isLoading,
  children,
  skeleton,
  type = 'shimmer',
  message = 'Loading...',
  progress,
  minLoadTime = 500 // Minimum loading time for smooth UX
}: {
  isLoading: boolean
  children: ReactNode
  skeleton?: ReactNode
  type?: LoadingState['type']
  message?: string
  progress?: number
  minLoadTime?: number
}) => {
  const [showContent, setShowContent] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    if (!isLoading && !loadingComplete) {
      // Ensure minimum loading time for smooth experience
      const timer = setTimeout(() => {
        setLoadingComplete(true)
        setShowContent(true)
      }, minLoadTime)

      return () => clearTimeout(timer)
    } else if (isLoading) {
      setShowContent(false)
      setLoadingComplete(false)
    }
  }, [isLoading, loadingComplete, minLoadTime])

  return (
    <AnimatePresence mode="wait">
      {!showContent ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {skeleton || <LoadingComponent type={type} message={message} progress={progress} />}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Sophisticated loading component with multiple types
const LoadingComponent = ({ 
  type, 
  message, 
  progress 
}: {
  type: LoadingState['type']
  message: string
  progress?: number
}) => {
  switch (type) {
    case 'spinner':
      return <LuxurySpinner message={message} />
    case 'progressive':
      return <ProgressiveLoader progress={progress || 0} message={message} />
    case 'skeleton':
      return <GenericSkeleton />
    case 'shimmer':
    default:
      return <ShimmerLoader />
  }
}

// Premium spinner with elegant animation
const LuxurySpinner = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        className="relative w-12 h-12 mb-6"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          ease: "linear",
          repeat: Infinity
        }}
      >
        <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-black border-t-transparent rounded-full"></div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 font-medium"
      >
        {message}
      </motion.p>
    </div>
  )
}

// Progressive loading with progress bar
const ProgressiveLoader = ({ 
  progress, 
  message 
}: { 
  progress: number 
  message: string 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{message}</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Professional shimmer loader
const ShimmerLoader = () => {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full shimmer"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded shimmer"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4 shimmer"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded shimmer"></div>
        <div className="h-4 bg-gray-300 rounded shimmer"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 shimmer"></div>
      </div>
    </div>
  )
}

// Generic skeleton for unknown content
const GenericSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  )
}

// Specialized skeleton components for different content types
export const ProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animate-pulse"
    >
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 shimmer"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded shimmer"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 shimmer"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3 shimmer"></div>
      </div>
    </motion.div>
  )
}

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  )
}

export const ProductDetailSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse"
    >
      {/* Image gallery skeleton */}
      <div className="space-y-4">
        <div className="aspect-square bg-gray-200 rounded-lg shimmer"></div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded shimmer"></div>
          ))}
        </div>
      </div>
      
      {/* Product info skeleton */}
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded shimmer"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 shimmer"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded shimmer"></div>
          <div className="h-4 bg-gray-200 rounded shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded shimmer"></div>
        <div className="h-12 bg-gray-200 rounded shimmer"></div>
      </div>
    </motion.div>
  )
}

export const CheckoutSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse"
    >
      {/* Form skeleton */}
      <div className="space-y-6">
        <div className="h-6 bg-gray-200 rounded shimmer"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded shimmer"></div>
          <div className="h-12 bg-gray-200 rounded shimmer"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded shimmer"></div>
            <div className="h-12 bg-gray-200 rounded shimmer"></div>
          </div>
        </div>
      </div>
      
      {/* Order summary skeleton */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
        <div className="h-6 bg-gray-200 rounded shimmer"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/3 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 shimmer"></div>
          </div>
        ))}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-200 rounded w-1/4 shimmer"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3 shimmer"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Loading state hook for components
export const useLoadingState = (initialState: boolean = false) => {
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: initialState,
    type: 'shimmer'
  })

  const startLoading = (
    type: LoadingState['type'] = 'shimmer',
    message?: string
  ) => {
    setLoading({
      isLoading: true,
      type,
      message
    })
  }

  const updateProgress = (progress: number, message?: string) => {
    setLoading(prev => ({
      ...prev,
      progress,
      message: message || prev.message
    }))
  }

  const stopLoading = () => {
    setLoading(prev => ({
      ...prev,
      isLoading: false
    }))
  }

  return {
    loading,
    startLoading,
    updateProgress,
    stopLoading
  }
}

export default EnterpriseLoader