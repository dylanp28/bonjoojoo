'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown, Leaf, Shield, Award, DollarSign, Phone, MessageCircle } from 'lucide-react'
import { useAnalytics } from '@/utils/analytics'

interface MobileConversionOptimizationProps {
  isProductPage?: boolean
  productPrice?: number
  isLabGrown?: boolean
}

export function MobileConversionOptimization({ 
  isProductPage = false, 
  productPrice,
  isLabGrown = false 
}: MobileConversionOptimizationProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [showTrustBar, setShowTrustBar] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const analytics = useAnalytics()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = window.innerHeight * 0.5

      setIsSticky(scrollY > threshold)
      
      // Show trust bar after 10 seconds or significant scroll
      if (scrollY > threshold || window.scrollY > 1000) {
        setShowTrustBar(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Auto-show trust bar after 10 seconds
    const timer = setTimeout(() => setShowTrustBar(true), 10000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  if (!isMobile) return null

  return (
    <>
      {/* Mobile Trust Bar - Slides down from top */}
      {showTrustBar && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white text-xs py-2 px-4 flex items-center justify-between animate-slide-down">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <div className="flex items-center whitespace-nowrap">
              <Leaf size={12} className="mr-1" />
              95% Less Impact
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Shield size={12} className="mr-1" />
              30-Day Returns
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Award size={12} className="mr-1" />
              IGI Certified
            </div>
            {isLabGrown && productPrice && (
              <div className="flex items-center whitespace-nowrap">
                <DollarSign size={12} className="mr-1" />
                Save 30-40%
              </div>
            )}
          </div>
          <button 
            onClick={() => {
              setShowTrustBar(false)
              analytics.trackTrustSignalClick('mobile_trust_bar_close', 'top_bar')
            }}
            className="text-white/80 hover:text-white ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Mobile Sticky CTA Bar - Product Pages */}
      {isProductPage && isSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {productPrice && (
                <div className="text-lg font-medium text-stone-900">
                  ${productPrice.toLocaleString()}
                </div>
              )}
              {isLabGrown && (
                <div className="flex items-center text-xs text-green-600">
                  <Leaf size={12} className="mr-1" />
                  Lab-Grown Diamond
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => analytics.trackTrustSignalClick('mobile_consultation_click', 'sticky_cta')}
                className="bg-stone-100 text-stone-900 px-4 py-3 rounded-lg font-medium text-sm flex items-center"
              >
                <MessageCircle size={16} className="mr-1" />
                Chat
              </button>
              <button 
                onClick={() => analytics.trackAddToCart('mobile_sticky_add_to_cart', isLabGrown, productPrice || 0)}
                className="bg-stone-900 text-white px-6 py-3 rounded-lg font-medium text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Quick Actions Floating Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <div className="space-y-2">
          {/* Virtual Consultation */}
          <button 
            onClick={() => analytics.trackTrustSignalClick('virtual_consultation', 'mobile_floating')}
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
            title="Virtual Consultation"
          >
            <Phone size={20} />
          </button>
          
          {/* Live Chat */}
          <button 
            onClick={() => analytics.trackTrustSignalClick('live_chat', 'mobile_floating')}
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
            title="Live Chat"
          >
            <MessageCircle size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Lab-Grown Education Drawer */}
      {isLabGrown && (
        <MobileLabGrownDrawer />
      )}

      {/* Mobile Financing Options Banner */}
      {productPrice && productPrice > 500 && (
        <MobileFinancingBanner price={productPrice} />
      )}
    </>
  )
}

// Mobile-specific Lab-Grown Education Drawer
function MobileLabGrownDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const analytics = useAnalytics()

  const educationPoints = [
    {
      icon: <Leaf className="text-green-600" size={16} />,
      title: "95% Less Environmental Impact",
      description: "Created sustainably without mining"
    },
    {
      icon: <Shield className="text-blue-600" size={16} />,
      title: "100% Conflict-Free",
      description: "Ethically created with full traceability"
    },
    {
      icon: <Award className="text-purple-600" size={16} />,
      title: "Same Quality as Mined",
      description: "IGI/GIA certified, identical properties"
    },
    {
      icon: <DollarSign className="text-green-600" size={16} />,
      title: "30-40% Better Value",
      description: "Superior pricing for equivalent quality"
    }
  ]

  return (
    <>
      {/* Floating Education Button */}
      <button
        onClick={() => {
          setIsOpen(true)
          analytics.trackEducationEngagement('mobile_drawer_open', 0)
        }}
        className="fixed bottom-36 right-4 z-40 bg-green-600 text-white px-3 py-2 rounded-full text-xs font-medium shadow-lg flex items-center"
      >
        <Leaf size={14} className="mr-1" />
        Learn More
      </button>

      {/* Education Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[70vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-stone-900">Why Lab-Grown Diamonds?</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  ×
                </button>
              </div>

              {/* Education Points */}
              <div className="space-y-4">
                {educationPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-stone-50 rounded-lg">
                    {point.icon}
                    <div>
                      <h4 className="font-medium text-stone-900 text-sm">{point.title}</h4>
                      <p className="text-xs text-stone-600 mt-1">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button 
                onClick={() => {
                  analytics.trackEducationEngagement('mobile_full_guide_click', 0)
                  setIsOpen(false)
                }}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium text-sm mt-6"
              >
                Read Complete Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Mobile Financing Options Banner
function MobileFinancingBanner({ price }: { price: number }) {
  const [isVisible, setIsVisible] = useState(true)
  const monthlyPayment = Math.round(price / 12)
  const analytics = useAnalytics()

  if (!isVisible) return null

  return (
    <div className="fixed top-16 left-4 right-4 z-40 bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-blue-900">
            Or pay ${monthlyPayment}/month
          </div>
          <div className="text-xs text-blue-700">
            0% APR for 12 months
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => analytics.trackTrustSignalClick('financing_learn_more', 'mobile_banner')}
            className="text-blue-600 text-xs font-medium"
          >
            Learn More
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-blue-500 text-sm"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

// Mobile-specific animations
const mobileAnimations = `
  @keyframes slide-down {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .animate-slide-down {
    animation: slide-down 0.3s ease-out;
  }
`

// Inject animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = mobileAnimations
  document.head.appendChild(style)
}