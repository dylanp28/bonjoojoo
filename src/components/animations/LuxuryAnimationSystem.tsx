'use client'

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode, useRef, useEffect, useState } from 'react'

// ============================================================================
// ENTERPRISE-GRADE ANIMATION SYSTEM
// Netflix/Airbnb/Stripe Quality Standards
// ============================================================================

interface LuxuryRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  className?: string
  threshold?: number
}

// Premium reveal animation with sophisticated easing
export const LuxuryReveal = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '',
  threshold = 0.1 
}: LuxuryRevealProps) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
    rootMargin: '-50px 0px'
  })

  const variants = {
    up: {
      hidden: { opacity: 0, y: 60, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 }
    },
    down: {
      hidden: { opacity: 0, y: -60, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 }
    },
    left: {
      hidden: { opacity: 0, x: -60, scale: 0.95 },
      visible: { opacity: 1, x: 0, scale: 1 }
    },
    right: {
      hidden: { opacity: 0, x: 60, scale: 0.95 },
      visible: { opacity: 1, x: 0, scale: 1 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  }

  const transition = {
    duration: 0.8,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94], // Professional easing curve
    scale: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Sophisticated parallax scrolling effect
export const LuxuryParallax = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}: { 
  children: ReactNode
  speed?: number
  className?: string 
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Professional hover animations for interactive elements
interface LuxuryHoverProps {
  children: ReactNode
  className?: string
  scale?: number
  elevation?: boolean
  glow?: boolean
}

export const LuxuryHover = ({ 
  children, 
  className = '', 
  scale = 1.02,
  elevation = true,
  glow = false
}: LuxuryHoverProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      style={{
        boxShadow: isHovered && elevation 
          ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)'
          : elevation
          ? '0 4px 8px rgba(0, 0, 0, 0.05)'
          : 'none',
        filter: glow && isHovered 
          ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
          : 'none'
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animations for lists/grids
export const LuxuryStagger = ({ 
  children, 
  className = '',
  delay = 0.1 
}: { 
  children: ReactNode[]
  className?: string
  delay?: number 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Premium page transitions
export const LuxuryPageTransition = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Sophisticated loading states
export const LuxuryLoader = ({ 
  size = 'md',
  color = 'primary' 
}: {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'accent'
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colors = {
    primary: 'border-blue-500',
    secondary: 'border-gray-500', 
    accent: 'border-purple-500'
  }

  return (
    <motion.div
      className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }}
    />
  )
}

// Magnetic hover effect for premium buttons
export const MagneticHover = ({ 
  children, 
  strength = 20,
  className = ''
}: {
  children: ReactNode
  strength?: number
  className?: string
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / strength
    const y = (e.clientY - centerY) / strength
    
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      {children}
    </motion.div>
  )
}

// Smooth scroll reveal for text
export const LuxuryTextReveal = ({ 
  children,
  className = '',
  delay = 0
}: {
  children: string
  className?: string
  delay?: number
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const words = children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay
      }
    }
  }

  const child = {
    hidden: { 
      opacity: 0,
      y: 20,
      rotateX: 90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export {
  LuxuryReveal as default
}