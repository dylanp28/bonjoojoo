'use client'

import { useState } from 'react'
import { Shield, Leaf, Award, CheckCircle, CreditCard, Package, Truck, AlertCircle } from 'lucide-react'
import StripeCheckoutForm from './StripeCheckoutForm'

interface CheckoutItem {
  id: string
  name: string
  price: number
  image: string
  isLabGrown: boolean
  certification: 'IGI' | 'GIA'
  environmentalImpact: {
    carbonSaved: string
    waterSaved: string
  }
}

interface LabGrownCheckoutProps {
  items: CheckoutItem[]
  isOpen: boolean
  onClose: () => void
}

export function LabGrownCheckout({ items, isOpen, onClose }: LabGrownCheckoutProps) {
  const [step, setStep] = useState<'summary' | 'shipping' | 'payment' | 'confirmation'>('summary')
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })
  const [paymentError, setPaymentError] = useState<string>('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState<any>(null)
  const [orderId, setOrderId] = useState<string>('')

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const shipping = subtotal > 500 ? 0 : 25
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const totalEnvironmentalImpact = items.reduce((acc, item) => {
    if (item.isLabGrown) {
      return {
        carbonSaved: parseFloat(acc.carbonSaved) + parseFloat(item.environmentalImpact.carbonSaved),
        waterSaved: parseFloat(acc.waterSaved) + parseFloat(item.environmentalImpact.waterSaved)
      }
    }
    return acc
  }, { carbonSaved: '0', waterSaved: '0' })

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // Create order record
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
          })),
          shippingInfo,
          subtotal,
          shipping,
          tax,
          total: paymentIntent.amount / 100,
          environmentalImpact: totalEnvironmentalImpact
        })
      })

      if (orderResponse.ok) {
        const orderData = await orderResponse.json()
        setOrderId(orderData.orderId || `BJ-${Date.now()}`)
        setPaymentSuccess(paymentIntent)
        setStep('confirmation')
        
        // Send confirmation email
        await fetch('/api/orders/send-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
            email: shippingInfo.email
          })
        }).catch(console.error)
      }
    } catch (error) {
      console.error('Order creation error:', error)
      setPaymentError('Payment successful but order processing failed. Please contact support.')
    }
  }

  const handlePaymentError = (error: string) => {
    setPaymentError(error)
  }

  const handlePaymentLoading = (loading: boolean) => {
    setPaymentLoading(loading)
  }

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip']
    for (const field of required) {
      if (!shippingInfo[field as keyof typeof shippingInfo]?.trim()) {
        setPaymentError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`)
        return false
      }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(shippingInfo.email)) {
      setPaymentError('Please enter a valid email address')
      return false
    }
    
    return true
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif">Conscious Luxury Checkout</h2>
            <button onClick={onClose} className="text-white hover:text-stone-300">
              ✕
            </button>
          </div>
          <p className="text-sm text-stone-300 mt-1">
            Sustainable luxury with lab-grown diamonds
          </p>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-stone-200">
          <div className="flex justify-between text-xs">
            {[
              { id: 'summary', label: 'Summary' },
              { id: 'shipping', label: 'Shipping' },
              { id: 'payment', label: 'Payment' },
              { id: 'confirmation', label: 'Done' }
            ].map((stepItem, index) => (
              <div key={stepItem.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === stepItem.id ? 'bg-green-600 text-white' : 
                  ['summary', 'shipping', 'payment'].indexOf(step) > ['summary', 'shipping', 'payment'].indexOf(stepItem.id)
                    ? 'bg-green-100 text-green-600' : 'bg-stone-200 text-stone-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`mt-1 ${step === stepItem.id ? 'text-green-600 font-medium' : 'text-stone-500'}`}>
                  {stepItem.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          
          {/* Summary Step */}
          {step === 'summary' && (
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-4">Your Order</h3>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="w-16 h-16 bg-stone-100 rounded-lg"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex items-center mt-1">
                          <Leaf size={12} className="text-green-600 mr-1" />
                          <span className="text-xs text-green-600">Lab-Grown Diamond</span>
                          <Award size={12} className="text-blue-600 ml-2 mr-1" />
                          <span className="text-xs text-blue-600">{item.certification} Certified</span>
                        </div>
                        <p className="text-sm font-medium mt-1">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Impact Summary */}
              <div className="bg-green-50 p-4 rounded-xl">
                <h4 className="font-medium text-green-800 mb-3 flex items-center">
                  <Leaf size={16} className="mr-2" />
                  Your Environmental Impact
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {totalEnvironmentalImpact.carbonSaved}
                    </div>
                    <div className="text-xs text-green-700">Tons CO₂ Saved</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {totalEnvironmentalImpact.waterSaved}
                    </div>
                    <div className="text-xs text-green-700">Gallons Water Saved</div>
                  </div>
                </div>
                <p className="text-xs text-green-700 text-center mt-2">
                  vs. equivalent mined diamonds
                </p>
              </div>

              {/* Trust Signals */}
              <div className="bg-stone-50 p-4 rounded-xl">
                <h4 className="font-medium text-stone-800 mb-3">Why Choose Lab-Grown?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle size={14} className="text-green-600 mr-2" />
                    <span>Identical to mined diamonds in every way</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={14} className="text-green-600 mr-2" />
                    <span>30-40% better value than mined equivalents</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={14} className="text-green-600 mr-2" />
                    <span>95% less environmental impact</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={14} className="text-green-600 mr-2" />
                    <span>100% conflict-free and traceable</span>
                  </div>
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-stone-200 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t border-stone-200 pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep('shipping')}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Continue to Shipping
              </button>
            </div>
          )}

          {/* Shipping Step */}
          {step === 'shipping' && (
            <div className="space-y-6">
              <h3 className="font-medium">Shipping Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

                <input
                  type="text"
                  placeholder="Street Address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, zip: e.target.value }))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Shipping Options */}
              <div className="border border-stone-200 rounded-xl p-4">
                <h4 className="font-medium mb-3">Shipping Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" name="shipping" className="mr-3" defaultChecked />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Standard Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                      </div>
                      <p className="text-sm text-stone-600">5-7 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="shipping" className="mr-3" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Express Shipping</span>
                        <span>$45</span>
                      </div>
                      <p className="text-sm text-stone-600">2-3 business days</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep('summary')}
                  className="flex-1 border border-stone-300 py-3 rounded-lg font-medium hover:bg-stone-50 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => {
                    if (validateShippingInfo()) {
                      setPaymentError('')
                      setStep('payment')
                    }
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <div className="space-y-6">
              <h3 className="font-medium">Payment Information</h3>
              
              {/* Payment Error */}
              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <AlertCircle size={20} className="text-red-600 mr-3" />
                  <span className="text-red-800 text-sm">{paymentError}</span>
                </div>
              )}
              
              {/* Stripe Payment Form */}
              <StripeCheckoutForm
                amount={total}
                currency="USD"
                shippingInfo={shippingInfo}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onLoading={handlePaymentLoading}
              />

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep('shipping')}
                  disabled={paymentLoading}
                  className="flex-1 border border-stone-300 py-3 rounded-lg font-medium hover:bg-stone-50 transition-colors disabled:bg-stone-100 disabled:cursor-not-allowed"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-stone-900 mb-2">
                  Order Confirmed!
                </h3>
                <p className="text-stone-600">
                  Thank you for choosing sustainable luxury
                </p>
              </div>

              {/* Environmental Impact */}
              <div className="bg-green-50 p-4 rounded-xl">
                <h4 className="font-medium text-green-800 mb-2">
                  🌱 Your Positive Impact
                </h4>
                <p className="text-sm text-green-700">
                  By choosing lab-grown diamonds, you've saved {totalEnvironmentalImpact.carbonSaved} tons of CO₂ 
                  and {totalEnvironmentalImpact.waterSaved} gallons of water compared to mined diamonds.
                </p>
              </div>

              <div className="space-y-3 text-sm text-stone-600">
                <p className="font-medium">Order #: {orderId || `BJ-${Date.now().toString().slice(-6)}`}</p>
                {paymentSuccess && (
                  <p className="font-medium text-green-600">
                    Payment Confirmed: ${(paymentSuccess.amount / 100).toFixed(2)}
                  </p>
                )}
                <p>Confirmation email sent to {shippingInfo.email}</p>
                <p>Expected delivery: 5-7 business days</p>
                <p className="text-xs">
                  Payment ID: {paymentSuccess?.id?.slice(-8) || 'Processed'}
                </p>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}