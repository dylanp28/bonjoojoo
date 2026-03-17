'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  
  // Set GSAP defaults for Pandora-style animations
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6
  })
  
  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    scroller: 'body'
  })
}

export const useScrollAnimations = () => {
  const tl = useRef<gsap.core.Timeline>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create main timeline
    tl.current = gsap.timeline()

    // Header scroll animations - exact Pandora behavior
    const header = document.querySelector('header')
    const logo = document.querySelector('.logo')
    const searchBar = document.querySelector('.search-bar')
    
    if (header) {
      ScrollTrigger.create({
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress
          const scrollY = self.scroll()
          
          // Header background opacity and blur - Pandora style
          if (scrollY > 50) {
            gsap.to(header, {
              duration: 0.3,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              ease: 'power2.out'
            })
          } else {
            gsap.to(header, {
              duration: 0.3,
              backdropFilter: 'blur(0px)',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderBottomColor: 'rgba(0, 0, 0, 0.05)',
              ease: 'power2.out'
            })
          }
          
          // Logo size change on scroll
          if (logo) {
            const scale = scrollY > 100 ? 0.85 : 1
            gsap.to(logo, {
              duration: 0.3,
              scale: scale,
              ease: 'power2.out'
            })
          }
        }
      })
    }

    // Hero section parallax - Pandora style
    const heroSections = document.querySelectorAll('.hero-section')
    heroSections.forEach((section, index) => {
      const videoBackground = section.querySelector('.video-background')
      const textOverlay = section.querySelector('.text-overlay')
      const ctaButton = section.querySelector('.cta-button')

      if (videoBackground) {
        // Parallax video background
        gsap.to(videoBackground, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }

      if (textOverlay) {
        // Text fade in/out with scroll
        gsap.fromTo(textOverlay, 
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Text fade out as section leaves viewport
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom 80%',
          end: 'bottom 20%',
          onUpdate: (self) => {
            const opacity = 1 - self.progress
            gsap.to(textOverlay, {
              opacity: opacity,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
        })
      }

      if (ctaButton) {
        // CTA button entrance animation
        gsap.fromTo(ctaButton,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'back.out(1.7)',
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    // Category grid animations - Pandora stagger effect
    const categoryItems = document.querySelectorAll('.category-item')
    if (categoryItems.length > 0) {
      gsap.fromTo(categoryItems,
        {
          opacity: 0,
          y: 80,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power3.out',
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'start'
          },
          scrollTrigger: {
            trigger: '.category-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Section reveal animations - fade up effect
    const sections = document.querySelectorAll('.reveal-section')
    sections.forEach(section => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Video play/pause on scroll position
    const videos = document.querySelectorAll('video')
    videos.forEach(video => {
      ScrollTrigger.create({
        trigger: video.closest('.hero-section'),
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          if (video.paused) video.play()
        },
        onLeave: () => {
          if (!video.paused) video.pause()
        },
        onEnterBack: () => {
          if (video.paused) video.play()
        },
        onLeaveBack: () => {
          if (!video.paused) video.pause()
        }
      })
    })

    // Smooth scrolling behavior
    gsap.set('html', {
      scrollBehavior: 'smooth'
    })

    // Progress indicator (scroll-based)
    const progressBar = document.querySelector('.scroll-progress')
    if (progressBar) {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          gsap.to(progressBar, {
            scaleX: self.progress,
            duration: 0.1,
            ease: 'none'
          })
        }
      })
    }

    // Background color changes between sections
    const colorSections = [
      { selector: '.hero-section:nth-child(1)', color: '#ffffff' },
      { selector: '.hero-section:nth-child(2)', color: '#ffffff' },
      { selector: '.hero-section:nth-child(3)', color: '#ffffff' },
      { selector: '.hero-section:nth-child(4)', color: '#ffffff' },
      { selector: '.category-section', color: '#ffffff' }
    ]

    colorSections.forEach(({ selector, color }) => {
      const section = document.querySelector(selector)
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to('body', {
              backgroundColor: color,
              duration: 0.5,
              ease: 'power2.out'
            })
          }
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (tl.current) tl.current.kill()
    }
  }, [])

  return tl
}

// Scroll momentum and easing
export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Custom scroll momentum - Pandora style
    let isScrolling = false
    let scrollTimer: NodeJS.Timeout

    const handleScroll = () => {
      if (!isScrolling) {
        document.body.classList.add('is-scrolling')
        isScrolling = true
      }

      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('is-scrolling')
        isScrolling = false
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [])
}

// Intersection Observer for lazy loading and animations
export const useIntersectionAnimations = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          } else {
            entry.target.classList.remove('in-view')
          }
        })
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    // Observe all animatable elements
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [])
}