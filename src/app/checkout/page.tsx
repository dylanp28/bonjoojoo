'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/useCart'
import { useAuth } from '@/hooks/useAuth'
import { LabGrownCheckout } from '@/components/LabGrownCheckout'
import { AuthModal } from '@/components/AuthModal'
import { useAuthModal } from '@/hooks/useAuth'

export default function CheckoutPage() {
  const router = useRouter()
  const { items } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { isOpen: authModalOpen, mode, openLogin, close, switchMode } = useAuthModal()
  const [showAuthRequired, setShowAuthRequired] = useState(false)

  // Transform cart items to checkout items format
  const checkoutItems = items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image || '/images/placeholder-product.jpg',
    isLabGrown: true, // bonjoojoo specializes in lab-grown diamonds
    certification: 'IGI' as const, // Default to IGI, could be GIA
    environmentalImpact: {
      carbonSaved: '2.5kg', // Estimated carbon saving per item
      waterSaved: '890L'     // Estimated water saving per item
    }
  }))

  useEffect(() => {
    // If cart is empty, redirect to home
    if (items.length === 0) {
      router.push('/')
      return
    }

    // Check authentication after a short delay to allow auth context to initialize
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setShowAuthRequired(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [items.length, isAuthenticated, router])

  const handleCloseCheckout = () => {
    router.push('/')
  }

  const handleAuthSuccess = () => {
    setShowAuthRequired(false)
    close()
  }

  // Show authentication requirement if not logged in
  if (showAuthRequired && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-serif font-medium text-stone-900 mb-3">
              Sign in to continue
            </h2>
            
            <p className="text-stone-600 mb-6 leading-relaxed">
              Please sign in to your bonjoojoo account to complete your purchase of lab-grown diamond jewelry.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={openLogin}
                className="w-full bg-stone-900 text-white py-3 px-4 rounded-md hover:bg-stone-800 transition-colors font-medium"
              >
                Sign In
              </button>
              
              <button
                onClick={() => {
                  switchMode('register')
                  openLogin()
                }}
                className="w-full border border-stone-300 text-stone-700 py-3 px-4 rounded-md hover:bg-stone-50 transition-colors font-medium"
              >
                Create Account
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full text-stone-600 hover:text-stone-900 transition-colors text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Authentication Modal */}
        <AuthModal 
          isOpen={authModalOpen}
          onClose={close}
          initialMode={mode}
          onSuccess={handleAuthSuccess}
        />
      </div>
    )
  }

  // Show loading state while checking authentication
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <LabGrownCheckout 
        items={checkoutItems}
        isOpen={true}
        onClose={handleCloseCheckout}
      />
    </div>
  )
}