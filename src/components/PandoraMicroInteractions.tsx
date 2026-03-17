'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

// PANDORA MICRO-INTERACTIONS - EXACT BEHAVIOR PATTERNS

// Heart Animation for Wishlist Button
export const PandoraWishlistHeart: React.FC<{
  isLiked?: boolean
  onToggle?: (liked: boolean) => void
  className?: string
}> = ({ isLiked = false, onToggle, className = '' }) => {
  const [liked, setLiked] = useState(isLiked)
  const controls = useAnimation()

  const handleClick = () => {
    const newLiked = !liked
    setLiked(newLiked)
    onToggle?.(newLiked)

    // Pandora's exact heart animation
    controls.start({
      scale: [1, 1.3, 1],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] // Pandora's bounce
      }
    })
  }

  return (
    <motion.button
      className={`relative p-2 ${className}`}
      onClick={handleClick}
      animate={controls}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Heart SVG with fill animation */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="relative z-10"
      >
        <motion.path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          fill={liked ? '#e91e63' : 'none'}
          stroke={liked ? '#e91e63' : '#666'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            fill: liked ? '#e91e63' : 'rgba(255,255,255,0)'
          }}
          transition={{
            pathLength: { duration: 0.8, ease: 'easeInOut' },
            fill: { duration: 0.3 }
          }}
        />
      </motion.svg>
      
      {/* Heart particles effect */}
      {liked && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-500 rounded-full"
              style={{
                left: '50%',
                top: '50%'
              }}
              initial={{
                scale: 0,
                x: 0,
                y: 0
              }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 60) * (Math.PI / 180)) * 20,
                y: Math.sin((i * 60) * (Math.PI / 180)) * 20
              }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  )
}

// Shopping Bag with Count Animation
export const PandoraShoppingBag: React.FC<{
  itemCount?: number
  className?: string
}> = ({ itemCount = 0, className = '' }) => {
  const [prevCount, setPrevCount] = useState(itemCount)
  const controls = useAnimation()

  useEffect(() => {
    if (itemCount !== prevCount) {
      // Animate bag shake when items added
      controls.start({
        rotate: [0, -5, 5, -5, 0],
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1]
        }
      })
      setPrevCount(itemCount)
    }
  }, [itemCount, prevCount, controls])

  return (
    <motion.button
      className={`relative p-2 ${className}`}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Bag SVG */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="m16 10a4 4 0 0 1-8 0"/>
      </svg>
      
      {/* Item count badge */}
      {itemCount > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 25
          }}
        >
          <motion.span
            key={itemCount} // Re-mount on count change
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        </motion.div>
      )}
    </motion.button>
  )
}

// Pandora Search Bar with Animation
export const PandoraSearchBar: React.FC<{
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}> = ({ onSearch, placeholder = 'Search', className = '' }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isFocused ? 1.02 : 1
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full text-sm focus:outline-none transition-all duration-300"
        animate={{
          borderColor: isFocused ? '#000' : '#d1d5db',
          y: isFocused ? -1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Search icon */}
      <motion.div
        className="absolute right-4 top-3.5 w-5 h-5"
        animate={{
          scale: isFocused ? 1.1 : 1,
          color: isFocused ? '#000' : '#9ca3af'
        }}
        transition={{ duration: 0.2 }}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </motion.div>
      
      {/* Focus ring */}
      <motion.div
        className="absolute inset-0 border-2 border-black rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: isFocused ? 0.1 : 0,
          scale: isFocused ? 1 : 1.05
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// Product Image with Zoom Hover
export const PandoraProductImage: React.FC<{
  src: string
  alt: string
  className?: string
}> = ({ src, alt, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Quick view button */}
      <motion.button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 text-sm font-medium rounded shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: isHovered ? 0 : 20,
          opacity: isHovered ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          delay: isHovered ? 0.2 : 0,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Quick View
      </motion.button>
    </motion.div>
  )
}

// Notification Toast (Pandora Style)
export const PandoraNotification: React.FC<{
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose?: () => void
}> = ({ message, type = 'success', isVisible, onClose }) => {
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }

  return (
    <motion.div
      className={`fixed top-6 right-6 ${bgColors[type]} text-white px-6 py-4 rounded-lg shadow-xl z-50 max-w-sm`}
      initial={{ x: 400, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : 400,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        {onClose && (
          <motion.button
            onClick={onClose}
            className="ml-3 text-white/80 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Loading Spinner (Pandora Style)
export const PandoraLoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg'
  className?: string
}> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 24 24"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="32"
          strokeDashoffset="32"
          animate={{
            strokeDashoffset: [32, 0, 32]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>
    </motion.div>
  )
}

// Price Display with Animation
export const PandoraPrice: React.FC<{
  price: number
  originalPrice?: number
  currency?: string
  className?: string
}> = ({ price, originalPrice, currency = '$', className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <div ref={ref} className={`flex items-center space-x-2 ${className}`}>
      {/* Current Price */}
      <motion.span
        className="text-lg font-bold text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {currency}{price.toFixed(2)}
      </motion.span>
      
      {/* Original Price (if on sale) */}
      {originalPrice && originalPrice > price && (
        <motion.span
          className="text-sm text-gray-500 line-through"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currency}{originalPrice.toFixed(2)}
        </motion.span>
      )}
      
      {/* Sale Badge */}
      {originalPrice && originalPrice > price && (
        <motion.span
          className="bg-red-500 text-white text-xs px-2 py-1 rounded"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 0.3,
            delay: 0.4,
            type: 'spring',
            stiffness: 500
          }}
        >
          SALE
        </motion.span>
      )}
    </div>
  )
}

export default {
  PandoraWishlistHeart,
  PandoraShoppingBag,
  PandoraSearchBar,
  PandoraProductImage,
  PandoraNotification,
  PandoraLoadingSpinner,
  PandoraPrice
}