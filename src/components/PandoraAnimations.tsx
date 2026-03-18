'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

// PANDORA ANIMATION CONSTANTS - EXACT TIMING VALUES
const PANDORA_TIMINGS = {
  // Header animations
  headerBlurThreshold: 50,
  logoScaleThreshold: 100,
  
  // Hover timings
  cardHover: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94], // Pandora's exact cubic-bezier
    scale: 1.02,
    translateY: -8
  },
  
  // Scroll animations
  parallaxSpeed: 0.5,
  fadeInOffset: 100,
  staggerDelay: 0.1,
  
  // Button animations
  buttonHover: {
    duration: 0.2,
    translateY: -2,
    shadowExpansion: 16
  }
}

// Header Scroll Animation Hook
export const usePandoraHeaderScroll = () => {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  
  const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 1])
  const headerBlur = useTransform(scrollY, [0, 50], [0, 10])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85])
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1])
  
  // Smooth spring animations
  const smoothOpacity = useSpring(headerOpacity, { stiffness: 300, damping: 30 })
  const smoothBlur = useSpring(headerBlur, { stiffness: 300, damping: 30 })
  const smoothScale = useSpring(logoScale, { stiffness: 300, damping: 30 })
  const smoothBorder = useSpring(borderOpacity, { stiffness: 300, damping: 30 })
  
  return {
    headerRef,
    logoRef,
    headerStyle: {
      backgroundColor: `rgba(255, 255, 255, ${smoothOpacity.get()})`,
      backdropFilter: `blur(${smoothBlur.get()}px)`,
      borderBottomColor: `rgba(0, 0, 0, ${smoothBorder.get()})`
    },
    logoStyle: {
      transform: `scale(${smoothScale.get()})`
    }
  }
}

// Product Card Hover Animation Component
export const PandoraProductCard: React.FC<{
  children: React.ReactNode
  className?: string
  href?: string
}> = ({ children, className = '', href }) => {
  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      whileHover={{
        scale: PANDORA_TIMINGS.cardHover.scale,
        y: PANDORA_TIMINGS.cardHover.translateY,
        transition: {
          duration: PANDORA_TIMINGS.cardHover.duration,
          ease: PANDORA_TIMINGS.cardHover.ease
        }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 1, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: PANDORA_TIMINGS.cardHover.ease
        }
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div
        className="relative overflow-hidden"
        whileHover={{
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
          transition: {
            duration: PANDORA_TIMINGS.cardHover.duration,
            ease: PANDORA_TIMINGS.cardHover.ease
          }
        }}
      >
        {children}
        
        {/* Hover overlay effect */}
        <motion.div
          className="absolute inset-0 bg-white/10 opacity-0"
          whileHover={{
            opacity: 1,
            transition: {
              duration: PANDORA_TIMINGS.cardHover.duration
            }
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Hero Section Parallax Animation
export const PandoraHeroSection: React.FC<{
  children: React.ReactNode
  videoSrc?: string
  className?: string
}> = ({ children, videoSrc, className = '' }) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.5, 0])
  
  return (
    <motion.section
      ref={ref}
      className={`relative min-h-screen overflow-hidden ${className}`}
      style={{ y, opacity }}
    >
      {/* Video Background with Parallax */}
      {videoSrc && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            y: useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
      )}
      
      {/* Content Overlay */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        initial={{ opacity: 1, y: 100 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        viewport={{ once: true, margin: '-200px' }}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}

// Pandora Button Animation Component
export const PandoraButton: React.FC<{
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
  href?: string
}> = ({ children, variant = 'primary', className = '', onClick, href }) => {
  const baseClasses = 'relative inline-block px-8 py-4 text-sm font-medium rounded transition-all duration-200'
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black border border-black hover:bg-gray-50'
  }
  
  const button = (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{
        y: PANDORA_TIMINGS.buttonHover.translateY,
        boxShadow: `0 ${PANDORA_TIMINGS.buttonHover.shadowExpansion}px 32px rgba(0, 0, 0, 0.15)`,
        transition: {
          duration: PANDORA_TIMINGS.buttonHover.duration,
          ease: PANDORA_TIMINGS.cardHover.ease
        }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 1, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1] // Pandora's bounce effect
        }
      }}
      viewport={{ once: true }}
    >
      <motion.span
        className="relative z-10"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.span>
      
      {/* Hover background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: {
            duration: 0.6,
            ease: 'easeInOut'
          }
        }}
      />
    </motion.button>
  )
  
  if (href) {
    return (
      <a href={href}>
        {button}
      </a>
    )
  }
  
  return button
}

// Staggered Grid Animation
export const PandoraStaggerGrid: React.FC<{
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Individual Grid Item - FIXED: Trust badges now visible by default
export const PandoraStaggerItem: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 1,
          y: 0,
          scale: 1
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Scroll Progress Indicator
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 origin-left z-50"
      style={{
        scaleX: scrollYProgress
      }}
    />
  )
}

// Text Animation with Character Stagger
export const PandoraText: React.FC<{
  children: string
  className?: string
  delay?: number
}> = ({ children, className = '', delay = 0 }) => {
  const letters = children.split('')
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay
          }
        }
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: {
              opacity: 1,
              y: 50,
              rotateX: -90
            },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Navigation Menu Animation
export const PandoraNavigation: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <motion.nav
      className={className}
      initial={{ y: -100, opacity: 1 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2
        }
      }}
    >
      {children}
    </motion.nav>
  )
}

export default {
  usePandoraHeaderScroll,
  PandoraProductCard,
  PandoraHeroSection,
  PandoraButton,
  PandoraStaggerGrid,
  PandoraStaggerItem,
  ScrollProgress,
  PandoraText,
  PandoraNavigation
}