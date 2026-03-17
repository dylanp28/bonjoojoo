'use client'

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ReactNode, useState, useRef, useEffect } from 'react'
import { Heart, ShoppingBag, Star, Plus, Check, ArrowRight } from 'lucide-react'

// ============================================================================
// PREMIUM MICRO-INTERACTIONS SYSTEM
// Netflix/Stripe/Airbnb Quality Interactive Elements
// ============================================================================

// Professional button with sophisticated feedback
export const LuxuryButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  [key: string]: any
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary: 'bg-black hover:bg-gray-800 text-white border-black',
    secondary: 'bg-white hover:bg-gray-50 text-black border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }

  return (
    <motion.button
      className={`
        relative overflow-hidden inline-flex items-center justify-center gap-2
        border rounded-lg font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center gap-2"
          >
            {icon && (
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
            )}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Animated wishlist button with heart
export const WishlistButton = ({
  isWishlisted = false,
  onToggle,
  size = 'md'
}: {
  isWishlisted?: boolean
  onToggle?: () => void
  size?: 'sm' | 'md' | 'lg'
}) => {
  const [liked, setLiked] = useState(isWishlisted)

  const handleClick = () => {
    setLiked(!liked)
    onToggle?.()
  }

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <motion.button
      className={`
        ${sizes[size]} rounded-full border-2 flex items-center justify-center
        ${liked ? 'bg-red-500 border-red-500 text-white' : 'bg-white border-gray-300 text-gray-600'}
        hover:shadow-lg transition-colors
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <motion.div
        animate={{
          scale: liked ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`${iconSizes[size]} ${liked ? 'fill-current' : ''}`}
        />
      </motion.div>
    </motion.button>
  )
}

// Sophisticated add to cart button
export const AddToCartButton = ({
  inCart = false,
  onAdd,
  disabled = false,
  className = ''
}: {
  inCart?: boolean
  onAdd?: () => void
  disabled?: boolean
  className?: string
}) => {
  const [isAdded, setIsAdded] = useState(inCart)
  const [isAdding, setIsAdding] = useState(false)

  const handleClick = async () => {
    if (disabled || isAdding) return

    setIsAdding(true)
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setIsAdded(true)
    setIsAdding(false)
    onAdd?.()

    // Reset after delay
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <LuxuryButton
      variant={isAdded ? 'secondary' : 'primary'}
      loading={isAdding}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      icon={
        <AnimatePresence mode="wait">
          {isAdded ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Check className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      }
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Added to Cart!
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </LuxuryButton>
  )
}

// Professional rating display
export const InteractiveRating = ({
  rating = 0,
  maxRating = 5,
  onRate,
  readonly = false,
  size = 'md'
}: {
  rating?: number
  maxRating?: number
  onRate?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}) => {
  const [hoverRating, setHoverRating] = useState(0)

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= (hoverRating || rating)

        return (
          <motion.button
            key={index}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            whileHover={readonly ? {} : { scale: 1.1 }}
            whileTap={readonly ? {} : { scale: 0.95 }}
            onMouseEnter={() => !readonly && setHoverRating(starValue)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            onClick={() => !readonly && onRate?.(starValue)}
            disabled={readonly}
          >
            <motion.div
              animate={{
                scale: isFilled && !readonly ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <Star
                className={`
                  ${sizes[size]} transition-colors duration-200
                  ${isFilled 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                  }
                `}
              />
            </motion.div>
          </motion.button>
        )
      })}
    </div>
  )
}

// Sophisticated quantity selector
export const QuantitySelector = ({
  value = 1,
  min = 1,
  max = 10,
  onChange,
  disabled = false
}: {
  value?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  disabled?: boolean
}) => {
  const [quantity, setQuantity] = useState(value)

  const handleChange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <motion.button
        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={() => handleChange(quantity - 1)}
        disabled={disabled || quantity <= min}
      >
        <motion.div
          animate={{ rotate: quantity <= min ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          -
        </motion.div>
      </motion.button>

      <motion.div
        key={quantity}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-2 min-w-[3rem] text-center font-medium"
      >
        {quantity}
      </motion.div>

      <motion.button
        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={() => handleChange(quantity + 1)}
        disabled={disabled || quantity >= max}
      >
        <motion.div
          animate={{ rotate: quantity >= max ? 0 : 90 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </div>
  )
}

// Magnetic card hover effect
export const MagneticCard = ({
  children,
  className = '',
  intensity = 15
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2.5deg", "-2.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2.5deg", "2.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`luxury-hover ${className}`}
      whileHover={{
        z: 10,
        transition: { duration: 0.3 }
      }}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

// Smooth expanding search bar
export const ExpandingSearchBar = ({
  placeholder = "Search...",
  onSearch,
  className = ""
}: {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsExpanded(true)
    inputRef.current?.focus()
  }

  const handleBlur = () => {
    if (!query) {
      setIsExpanded(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      className={`relative ${className}`}
    >
      <motion.div
        className="relative overflow-hidden border border-gray-300 rounded-full bg-white"
        animate={{
          width: isExpanded ? '320px' : '48px'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full h-12 px-4 pl-12 bg-transparent outline-none"
          animate={{
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ delay: isExpanded ? 0.2 : 0, duration: 0.2 }}
        />
        
        <motion.button
          type="button"
          onClick={handleFocus}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.button>

        {query && (
          <motion.button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </motion.form>
  )
}

export { LuxuryButton as default }