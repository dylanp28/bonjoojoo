'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User, ShoppingBag, Heart, Settings, LogOut, Package, CreditCard, Gift, RefreshCcw } from 'lucide-react'
import { AuthModal } from '@/components/AuthModal'
import { useAuthModal } from '@/hooks/useAuth'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated, isLoading, logout, refreshUser } = useAuth()
  const { isOpen, mode, openLogin, close, switchMode } = useAuthModal()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      // Redirect to home page if not authenticated
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router, mounted])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Show loading state
  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  // Show auth required if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-stone-600" />
            </div>
            
            <h2 className="text-xl font-serif font-medium text-stone-900 mb-3">
              Account Access Required
            </h2>
            
            <p className="text-stone-600 mb-6 leading-relaxed">
              Please sign in to access your bonjoojoo account and view your orders.
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

        <AuthModal
          isOpen={isOpen}
          onClose={close}
          initialMode={mode}
          mode={mode}
          onSwitchMode={switchMode}
          onSuccess={() => refreshUser()}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              
              {/* User Info */}
              <div className="border-b border-stone-200 pb-4 mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-stone-900">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-stone-600">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <a
                  href="/account/orders"
                  className="flex items-center px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <ShoppingBag size={18} className="mr-3" />
                  My Orders
                </a>
                
                <a
                  href="/account/profile"
                  className="flex items-center px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Settings size={18} className="mr-3" />
                  Profile Settings
                </a>
                
                <a
                  href="/account/wishlist"
                  className="flex items-center px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </a>
                
                <a
                  href="/account/shipping"
                  className="flex items-center px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Package size={18} className="mr-3" />
                  Shipping Addresses
                </a>
                
                <a
                  href="/account/payment"
                  className="flex items-center px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </a>

                <a
                  href="/account/returns"
                  className="flex items-center px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <RefreshCcw size={18} className="mr-3" />
                  Returns
                </a>

                <a
                  href="/account/referral"
                  className="flex items-center px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Gift size={18} className="mr-3" />
                  Refer a Friend
                </a>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {children}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}