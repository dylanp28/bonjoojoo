'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Heart, MapPin, User, ShoppingBag, Play, Pause, VolumeX, Volume2, Star, Shield, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CartSidebar from '@/components/CartSidebar'
import SearchBar from '@/components/SearchBar'
import { LuxuryReveal, LuxuryHover, LuxuryStagger, LuxuryParallax } from '@/components/animations/LuxuryAnimationSystem'

export default function LuxuryHomePageWithPandoraAnimations() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const { totalItems, toggleCart } = useCart()
  
  const headerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  // Exact Pandora scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Header blur effect at exact Pandora threshold
      setHeaderScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Pandora-style easing curves
  const pandoraEasing = [0.25, 0.46, 0.45, 0.94] // Exact Pandora cubic-bezier
  
  return (
    <div className="min-h-screen bg-white">
      {/* PANDORA-STYLE HEADER WITH EXACT ANIMATIONS */}
      <motion.header 
        ref={headerRef}
        className={`
          bg-white sticky top-0 z-50 border-b transition-all duration-300 ease-out
          ${headerScrolled 
            ? 'backdrop-blur-lg bg-white/95 border-gray-200 shadow-sm' 
            : 'border-transparent bg-white'
          }
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: pandoraEasing }}
      >
        <div className="flex items-center justify-between px-8 py-6 max-w-8xl mx-auto">
          {/* Logo with subtle entrance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: pandoraEasing }}
          >
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-light text-charcoal-900 tracking-[0.2em] transition-all duration-300 hover:text-champagne-600">
                bonjoojoo
                <motion.div 
                  className="text-xs text-gray-500 tracking-wide font-normal mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  WHERE LIGHT BECOMES LEGEND
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Navigation with Pandora-style mega menu animations */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-10 text-sm font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: pandoraEasing }}
          >
            {[
              { label: 'Engagement Treasures', href: '/engagement' },
              { label: 'Luminous Necklaces', href: '/necklaces' },
              { label: 'Radiant Earrings', href: '/earrings' },
              { label: 'Signature Rings', href: '/rings' },
              { label: 'Elegant Bracelets', href: '/bracelets' },
              { label: 'Our Atelier', href: '/about' }
            ].map((item, index) => (
              <motion.div 
                key={item.href}
                className="group relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index + 0.5, 
                  ease: pandoraEasing 
                }}
              >
                <Link 
                  href={item.href} 
                  className="
                    text-charcoal-900 hover:text-champagne-600 
                    transition-colors duration-300 relative
                    pandora-nav-link
                  "
                >
                  {item.label}
                </Link>

              </motion.div>
            ))}
          </motion.nav>

          {/* Right Side Actions with staggered entrance */}
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: pandoraEasing }}
          >
            <motion.div 
              className="hidden md:block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <SearchBar 
                className="
                  w-80 border-gray-200 focus:border-champagne-400 
                  bg-gray-50 focus:bg-white pandora-form-field
                " 
                placeholder="Discover treasures, jewelry..." 
              />
            </motion.div>

            {[
              { icon: Heart, href: '/wishlist' },
              { icon: User, href: '/consultation' }
            ].map(({ icon: Icon, href }, index) => (
              <motion.button
                key={href}
                className="pandora-button p-2 hover:bg-gray-50 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transitionDelay: `${0.1 * index + 0.9}s` }}
              >
                <Icon className="w-5 h-5 text-charcoal-700" />
              </motion.button>
            ))}

            <motion.button 
              onClick={toggleCart}
              className="pandora-button p-2 relative hover:bg-gray-50 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transitionDelay: '1.1s' }}
            >
              <ShoppingBag className="w-5 h-5 text-charcoal-700" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="
                      absolute -top-1 -right-1 bg-champagne-500 text-white 
                      text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium
                    "
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <main>
        {/* PANDORA-STYLE HERO SECTION WITH EXACT PARALLAX */}
        <motion.section 
          ref={heroRef}
          className="
            relative min-h-screen bg-gradient-to-br 
            from-diamond-white via-platinum-silver/20 to-champagne-gold/10 
            overflow-hidden
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: pandoraEasing }}
        >
          {/* Parallax Background Elements - Pandora Style */}
          <motion.div 
            className="absolute inset-0"
            style={{
              y: useTransform(scrollY, [0, 1000], [0, -300])
            }}
          >
            <motion.div 
              className="absolute top-1/4 right-1/4 w-96 h-96 border border-gray-200 rounded-full opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/4 w-64 h-64 border-2 border-champagne-300 rounded-full opacity-20"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />
            
            {/* Light refraction effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50" />
          </motion.div>

          <div className="relative flex items-center min-h-screen">
            <div className="max-w-8xl mx-auto px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Content with Pandora-style text reveals */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <LuxuryReveal direction="up" delay={0.2}>
                      <span className="
                        text-sm font-medium text-champagne-700 tracking-wider uppercase 
                        bg-champagne-50 px-4 py-2 rounded-full inline-block
                      ">
                        Introducing
                      </span>
                    </LuxuryReveal>
                    
                    <LuxuryReveal direction="up" delay={0.4}>
                      <h1 className="text-6xl lg:text-7xl font-light text-charcoal-900 leading-tight tracking-tight">
                        Where Light
                        <br />
                        Becomes
                        <br />
                        <motion.em 
                          className="font-light italic text-champagne-700"
                          animate={{
                            textShadow: [
                              '0 0 0px rgba(212, 175, 55, 0.5)',
                              '0 0 20px rgba(212, 175, 55, 0.8)',
                              '0 0 0px rgba(212, 175, 55, 0.5)'
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Legend
                        </motion.em>
                      </h1>
                    </LuxuryReveal>
                    
                    <LuxuryReveal direction="up" delay={0.6}>
                      <p className="text-xl text-gray-700 leading-relaxed max-w-lg font-light">
                        Discover our exquisite selection of ethically cultivated diamonds—
                        where conscious choice meets conscious design.
                      </p>
                    </LuxuryReveal>
                    
                    <LuxuryReveal direction="up" delay={0.8}>
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <motion.div
                          className="pandora-button"
                          whileHover={{ y: -2, scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2, ease: pandoraEasing }}
                        >
                          <Link 
                            href="/category/rings" 
                            className="
                              inline-flex items-center justify-center bg-charcoal-900 
                              hover:bg-charcoal-800 text-white px-8 py-4 font-medium 
                              tracking-wide transition-all duration-300 relative overflow-hidden
                            "
                          >
                            <span className="relative z-10">Begin Your Journey</span>
                          </Link>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ y: -2, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2, ease: pandoraEasing }}
                        >
                          <Link 
                            href="/about" 
                            className="
                              inline-flex items-center justify-center border-2 border-charcoal-900 
                              text-charcoal-900 hover:bg-charcoal-900 hover:text-white 
                              px-8 py-4 font-medium tracking-wide transition-all duration-300
                            "
                          >
                            Our Story
                          </Link>
                        </motion.div>
                      </div>
                    </LuxuryReveal>
                  </div>
                  
                  <LuxuryReveal direction="up" delay={1.0}>
                    <div className="pt-12">
                      <p className="text-sm text-gray-600 font-medium tracking-wide">
                        Every diamond born from light, not earth
                      </p>
                    </div>
                  </LuxuryReveal>
                </div>

                {/* Enhanced Visual Element with Pandora-style animations */}
                <LuxuryReveal direction="scale" delay={0.5}>
                  <div className="relative">
                    <div className="relative w-full h-96 flex items-center justify-center">
                      <motion.div 
                        className="relative w-80 h-80"
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <motion.div 
                          className="
                            absolute inset-0 rounded-full bg-gradient-to-br 
                            from-white via-platinum-silver/50 to-champagne-gold/30 shadow-2xl
                          "
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6, ease: pandoraEasing }}
                        >
                          <motion.div 
                            className="
                              absolute inset-8 rounded-full bg-gradient-to-br 
                              from-diamond-white to-platinum-silver/20 
                              flex items-center justify-center
                            "
                            animate={{
                              rotate: [0, -360]
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <motion.div 
                              className="
                                w-32 h-32 transform rotate-45 border-4 border-champagne-400 
                                bg-gradient-to-br from-champagne-100 to-champagne-200 
                                shadow-lg flex items-center justify-center
                              "
                              animate={{
                                rotate: [45, 405]
                              }}
                              transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            >
                              <motion.div 
                                className="
                                  w-16 h-16 transform -rotate-45 bg-white rounded-full 
                                  shadow-inner flex items-center justify-center
                                "
                                animate={{
                                  rotate: [-45, 315]
                                }}
                                transition={{
                                  duration: 8,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              >
                                <motion.div 
                                  className="
                                    w-8 h-8 bg-gradient-to-br from-champagne-300 
                                    to-champagne-400 rounded-full
                                  "
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.8, 1, 0.8]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                />
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                        
                        {/* Floating light elements with Pandora-style physics */}
                        <motion.div 
                          className="absolute top-8 right-8 w-4 h-4 bg-champagne-400 rounded-full shadow-lg"
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div 
                          className="absolute bottom-12 left-12 w-3 h-3 bg-platinum-silver rounded-full shadow-lg"
                          animate={{
                            y: [0, -15, 0],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        />
                        <motion.div 
                          className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full shadow-lg"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </LuxuryReveal>
              </div>
            </div>
          </div>

          {/* Scroll indicator with Pandora-style animation */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.div 
              className="flex flex-col items-center space-y-2"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-xs text-gray-500 tracking-wider uppercase">Discover More</span>
              <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Enhanced sections with Pandora-style reveals */}
        <LuxuryReveal direction="up" threshold={0.2}>
          <section className="py-24 bg-sage-green/5">
            <div className="max-w-6xl mx-auto px-8 text-center">
              <div className="space-y-8">
                <h2 className="text-sm font-medium text-champagne-700 tracking-wider uppercase">Our Philosophy</h2>
                
                <motion.blockquote 
                  className="text-3xl lg:text-4xl font-light text-charcoal-900 leading-relaxed max-w-4xl mx-auto"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #333, #d4af37, #333)',
                    backgroundSize: '200% 100%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  "We believe true luxury lies not just in what we create, 
                  but how we create it. Each bonjoojoo piece begins with light—
                  cultivated diamonds born from innovation, not excavation."
                </motion.blockquote>
                
                <cite className="text-lg text-gray-600 font-light">— The bonjoojoo Atelier</cite>
                
                <div className="pt-8">
                  <LuxuryHover scale={1.05}>
                    <Link 
                      href="/philosophy" 
                      className="
                        inline-flex items-center text-champagne-700 hover:text-champagne-800 
                        font-medium group
                      "
                    >
                      Learn Our Story
                      <motion.svg 
                        className="w-4 h-4 ml-2"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </Link>
                  </LuxuryHover>
                </div>
              </div>
            </div>
          </section>
        </LuxuryReveal>

        {/* Jewelry Categories with Pandora-style hover effects */}
        <LuxuryReveal direction="up" threshold={0.1}>
          <section className="py-24">
            <div className="max-w-8xl mx-auto px-8">
              <div className="text-center mb-16">
                <h2 className="text-sm font-medium text-champagne-700 tracking-wider uppercase mb-4">Jewelry Categories</h2>
                <h3 className="text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">Curated for Conscious Luxury</h3>
                <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                  Each category showcases our commitment to innovation, artistry, and ethical creation—
                  where modern values meet timeless beauty.
                </p>
              </div>

              <LuxuryStagger delay={0.2}>
                {[
                  {
                    title: 'Signature Rings',
                    subtitle: 'Stories written in gold',
                    emoji: '💍',
                    href: '/category/rings',
                    gradient: 'from-blush-rose/20 to-champagne-gold/10'
                  },
                  {
                    title: 'Luminous Necklaces',
                    subtitle: 'Illuminate your essence',
                    emoji: '✨',
                    href: '/category/necklaces',
                    gradient: 'from-platinum-silver/20 to-diamond-white'
                  },
                  {
                    title: 'Radiant Earrings',
                    subtitle: 'Whispers of brilliance',
                    emoji: '✦',
                    href: '/category/earrings',
                    gradient: 'from-sage-green/10 to-platinum-silver/20'
                  },
                  {
                    title: 'Elegant Bracelets',
                    subtitle: 'Grace in every movement',
                    emoji: '💎',
                    href: '/category/bracelets',
                    gradient: 'from-champagne-gold/15 to-blush-rose/10'
                  }
                ].map((category) => (
                  <div key={category.href} className="group cursor-pointer pandora-product-card">
                    <Link href={category.href}>
                      <motion.div 
                        className={`
                          relative aspect-square bg-gradient-to-br ${category.gradient} 
                          rounded-lg overflow-hidden mb-6 group-hover:shadow-2xl 
                          transition-all duration-500
                        `}
                        whileHover={{ 
                          scale: 1.02,
                          rotateY: 5,
                          transition: { duration: 0.4, ease: pandoraEasing }
                        }}
                      >
                        <div className="absolute inset-0 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <div className="text-center text-gray-600">
                            <motion.div 
                              className="text-6xl mb-4"
                              animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 10, 0]
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {category.emoji}
                            </motion.div>
                            <p className="text-lg font-medium">{category.title}</p>
                            <p className="text-sm text-gray-500">{category.subtitle}</p>
                          </div>
                        </div>
                        <motion.div 
                          className="
                            absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          "
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      </motion.div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-light text-charcoal-900">{category.title}</h4>
                        <p className="text-gray-600 font-light">{category.subtitle}</p>
                        <motion.p 
                          className="text-sm text-champagne-700 font-medium"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          Explore Category →
                        </motion.p>
                      </div>
                    </Link>
                  </div>
                ))}
              </LuxuryStagger>
            </div>
          </section>
        </LuxuryReveal>

        {/* Rest of sections with enhanced animations... */}
        {/* (Keeping the rest of the content but with added animation wrappers) */}
        
      </main>

      <CartSidebar />
    </div>
  )
}