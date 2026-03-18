'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Shield, Lock, Truck, ArrowLeft, CreditCard, Smartphone, Wallet, CheckCircle2 } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/AuthModal'
import { useAuthModal } from '@/hooks/useAuth'
import { LuxuryReveal } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'klarna'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, total } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { isOpen: authModalOpen, mode, openLogin, close, switchMode } = useAuthModal()
  
  const [showAuthRequired, setShowAuthRequired] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: ''
  })

  const shipping = 0 // Free shipping
  const tax = Math.round(total * 0.0875) // 8.75% tax
  const grandTotal = total + shipping + tax

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

  useEffect(() => {
    // Pre-fill shipping info if user is logged in
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }))
    }
  }, [user])

  const handleAuthSuccess = () => {
    setShowAuthRequired(false)
    close()
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    // In real app, would process payment and create order
    router.push('/order-confirmation')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Show authentication requirement if not logged in
  if (showAuthRequired && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-bj-offwhite flex items-center justify-center">
        <div className="grain-overlay" aria-hidden="true" />
        
        <div className="max-w-md w-full mx-4">
          <LuxuryReveal direction="up">
            <div className="bg-white p-10 text-center shadow-xl">
              <div className="w-20 h-20 bg-bj-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Lock className="w-10 h-10 text-bj-gray-400" strokeWidth={1} />
              </div>
              
              <h2 className="text-display-sm text-bj-black mb-4">
                Secure Your Purchase
              </h2>
              
              <p className="text-body text-bj-gray-500 mb-8 leading-relaxed">
                Sign in to your Bonjoojoo account to complete your luxury jewelry purchase with confidence and security.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={openLogin}
                  className="w-full btn-primary py-4"
                >
                  Sign In to Continue
                </button>
                
                <button
                  onClick={() => {
                    switchMode('register')
                    openLogin()
                  }}
                  className="w-full btn-secondary py-4"
                >
                  Create New Account
                </button>
                
                <button
                  onClick={() => router.push('/search')}
                  className="w-full text-bj-gray-500 hover:text-bj-black transition-colors text-caption mt-6"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </LuxuryReveal>
        </div>

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
      <div className="min-h-screen bg-bj-offwhite flex items-center justify-center">
        <div className="grain-overlay" aria-hidden="true" />
        
        <div className="text-center">
          <div className="loading-shimmer rounded-full h-16 w-16 mx-auto mb-6"></div>
          <p className="text-body text-bj-gray-500">Loading your luxury experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bj-offwhite">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Header */}
      <div className="bg-white border-b border-bj-gray-100">
        <div className="container-bj-wide py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-3 text-bj-gray-500 hover:text-bj-black transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-caption">Back</span>
            </button>
            
            <div className="text-center">
              <Link href="/" className="font-display text-[20px] tracking-[0.15em] text-bj-black uppercase">
                Bonjoojoo
              </Link>
              <p className="text-[10px] text-bj-gray-400 tracking-widest uppercase mt-1">Secure Checkout</p>
            </div>

            <div className="flex items-center gap-2 text-bj-gray-400">
              <Shield size={16} />
              <span className="text-[10px] uppercase tracking-wider">Secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-bj-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Forms */}
          <div className="space-y-12">
            {/* Shipping Information */}
            <LuxuryReveal direction="left">
              <div className="bg-white p-8 shadow-sm">
                <h2 className="text-display-sm text-bj-black mb-8">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-overline text-bj-black mb-2">First Name*</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input-bj"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-overline text-bj-black mb-2">Last Name*</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input-bj"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-overline text-bj-black mb-2">Email Address*</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="input-bj"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-overline text-bj-black mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="input-bj"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-overline text-bj-black mb-2">Street Address*</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="input-bj"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-overline text-bj-black mb-2">Apartment, Suite, etc.</label>
                  <input
                    type="text"
                    value={shippingInfo.apartment}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, apartment: e.target.value }))}
                    className="input-bj"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-overline text-bj-black mb-2">City*</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      className="input-bj"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-overline text-bj-black mb-2">State*</label>
                    <select
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                      className="input-bj"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      {/* Add more states */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-overline text-bj-black mb-2">ZIP Code*</label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="input-bj"
                      required
                    />
                  </div>
                </div>
              </div>
            </LuxuryReveal>

            {/* Payment Method */}
            <LuxuryReveal direction="left" delay={0.1}>
              <div className="bg-white p-8 shadow-sm">
                <h2 className="text-display-sm text-bj-black mb-8">Payment Method</h2>
                
                {/* Payment Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 flex items-center gap-3 transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-bj-black bg-bj-offwhite' 
                        : 'border-bj-gray-200 hover:border-bj-gray-300'
                    }`}
                  >
                    <CreditCard size={20} />
                    <span className="text-caption font-medium">Credit Card</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 flex items-center gap-3 transition-all ${
                      paymentMethod === 'paypal' 
                        ? 'border-bj-black bg-bj-offwhite' 
                        : 'border-bj-gray-200 hover:border-bj-gray-300'
                    }`}
                  >
                    <Wallet size={20} />
                    <span className="text-caption font-medium">PayPal</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-4 border-2 flex items-center gap-3 transition-all ${
                      paymentMethod === 'apple' 
                        ? 'border-bj-black bg-bj-offwhite' 
                        : 'border-bj-gray-200 hover:border-bj-gray-300'
                    }`}
                  >
                    <Smartphone size={20} />
                    <span className="text-caption font-medium">Apple Pay</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-4 border-2 flex items-center gap-3 transition-all ${
                      paymentMethod === 'klarna' 
                        ? 'border-bj-black bg-bj-offwhite' 
                        : 'border-bj-gray-200 hover:border-bj-gray-300'
                    }`}
                  >
                    <span className="font-bold text-pink-500">K</span>
                    <span className="text-caption font-medium">Klarna</span>
                  </button>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-overline text-bj-black mb-2">Card Number*</label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                        className="input-bj"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-overline text-bj-black mb-2">Month*</label>
                        <select
                          value={paymentInfo.expiryMonth}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryMonth: e.target.value }))}
                          className="input-bj"
                          required
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-overline text-bj-black mb-2">Year*</label>
                        <select
                          value={paymentInfo.expiryYear}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryYear: e.target.value }))}
                          className="input-bj"
                          required
                        >
                          <option value="">YYYY</option>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={String(new Date().getFullYear() + i)}>
                              {new Date().getFullYear() + i}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-overline text-bj-black mb-2">CVV*</label>
                        <input
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                          className="input-bj"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-overline text-bj-black mb-2">Name on Card*</label>
                      <input
                        type="text"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, nameOnCard: e.target.value }))}
                        className="input-bj"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'klarna' && (
                  <div className="bg-pink-50 p-6 rounded border">
                    <p className="text-caption text-bj-gray-600 mb-4">
                      Pay in 4 interest-free payments of <strong>{formatPrice(grandTotal / 4)}</strong>
                    </p>
                    <p className="text-[11px] text-bj-gray-500">
                      You'll be redirected to Klarna to complete your purchase securely.
                    </p>
                  </div>
                )}
              </div>
            </LuxuryReveal>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <LuxuryReveal direction="right">
              <div className="bg-white p-8 shadow-sm sticky top-8">
                <h2 className="text-display-sm text-bj-black mb-8">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant?.id || 'default'}`} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-bj-gray-50 flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-bj-gray-400 text-[10px]">{item.name}</span>
                          </div>
                        )}
                        <div className="absolute top-1 right-1 w-5 h-5 bg-bj-black rounded-full flex items-center justify-center">
                          <span className="text-white text-[10px] font-medium">{item.quantity}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-caption font-medium text-bj-black truncate">{item.name}</h3>
                        {item.variant && (
                          <p className="text-[11px] text-bj-gray-500 mt-1">{item.variant.name}</p>
                        )}
                        {item.size && (
                          <p className="text-[11px] text-bj-gray-500">Size {item.size}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-caption font-medium text-bj-black">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 py-6 border-t border-bj-gray-100">
                  <div className="flex justify-between text-caption">
                    <span className="text-bj-gray-500">Subtotal</span>
                    <span className="text-bj-black">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-caption">
                    <span className="text-bj-gray-500">Shipping</span>
                    <span className="text-bj-black">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-caption">
                    <span className="text-bj-gray-500">Tax</span>
                    <span className="text-bj-black">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-body font-medium pt-3 border-t border-bj-gray-200">
                    <span className="text-bj-black">Total</span>
                    <span className="text-bj-black">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full btn-primary py-4 mb-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      <span>Place Order</span>
                    </>
                  )}
                </button>

                {/* Trust Signals */}
                <PandoraStaggerGrid staggerDelay={0.1} className="space-y-3 text-center">
                  <PandoraStaggerItem>
                    <div className="flex items-center justify-center gap-2 text-bj-gray-500">
                      <Shield size={14} />
                      <span className="text-[11px]">256-bit SSL encrypted checkout</span>
                    </div>
                  </PandoraStaggerItem>
                  <PandoraStaggerItem>
                    <div className="flex items-center justify-center gap-2 text-bj-gray-500">
                      <Truck size={14} />
                      <span className="text-[11px]">Free shipping & 30-day returns</span>
                    </div>
                  </PandoraStaggerItem>
                  <PandoraStaggerItem>
                    <div className="flex items-center justify-center gap-2 text-bj-gray-500">
                      <CheckCircle2 size={14} />
                      <span className="text-[11px]">Lifetime warranty included</span>
                    </div>
                  </PandoraStaggerItem>
                </PandoraStaggerGrid>
              </div>
            </LuxuryReveal>
          </div>
        </div>
      </div>
    </div>
  )
}