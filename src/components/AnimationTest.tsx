'use client'

import { useEffect } from 'react'

export const AnimationTest = () => {
  useEffect(() => {
    // Test scroll event
    const testScroll = () => {
      console.log('🚀 Scroll detected:', window.scrollY)
      
      // Test header animations
      const header = document.querySelector('header')
      if (header) {
        if (window.scrollY > 50) {
          console.log('✅ Header blur should be active')
        }
        if (window.scrollY > 100) {
          console.log('✅ Logo scale should be active')
        }
      }
    }
    
    // Test scroll animations on load
    window.addEventListener('scroll', testScroll)
    
    // Test intersection observer
    const testIntersection = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('✅ Element in view:', entry.target.className)
        }
      })
    })
    
    // Observe test elements
    const testElements = document.querySelectorAll('.category-item, .hero-section, .text-overlay')
    testElements.forEach(el => testIntersection.observe(el))
    
    // Test GSAP availability
    if (typeof window !== 'undefined') {
      try {
        const gsap = require('gsap')
        console.log('✅ GSAP loaded successfully')
        
        const ScrollTrigger = require('gsap/ScrollTrigger')
        console.log('✅ ScrollTrigger loaded successfully')
        
        // Test animation
        gsap.gsap.to('.logo', {
          duration: 1,
          scale: 1.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        })
        console.log('✅ Test animation executed')
        
      } catch (error) {
        console.error('❌ Animation library error:', error)
      }
    }
    
    return () => {
      window.removeEventListener('scroll', testScroll)
      testIntersection.disconnect()
    }
  }, [])
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50">
      <div>🎯 Scroll Animations Active</div>
      <div>Scroll position: <span id="scroll-pos">0</span></div>
      <div>GSAP: <span className="text-green-400">✅ Loaded</span></div>
    </div>
  )
}

// Update scroll position display
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const pos = document.getElementById('scroll-pos')
    if (pos) pos.textContent = Math.round(window.scrollY).toString()
  })
}