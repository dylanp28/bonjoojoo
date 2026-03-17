'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Shield, AlertCircle, CheckCircle2, Lock } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
}

interface StripePaymentFormProps {
  amount: number
  currency: string
  shippingInfo: PaymentFormData
  onSuccess: (paymentIntent: any) => void
  onError: (error: string) => void
  onLoading: (loading: boolean) => void
}

function StripePaymentForm({ amount, currency, shippingInfo, onSuccess, onError, onLoading }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState<string>('')

  useEffect(() => {
    // Create payment intent when component mounts
    createPaymentIntent()
  }, [amount])

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: currency.toLowerCase(),
          shippingAddress: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zip,
              country: 'US'
            }
          }
        })
      })

      const data = await response.json()

      if (response.ok && data.clientSecret) {
        setClientSecret(data.clientSecret)
      } else {
        onError(data.error || 'Failed to initialize payment')
      }
    } catch (error) {
      console.error('Payment intent error:', error)
      onError('Failed to initialize payment. Please try again.')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      onError('Payment system not ready. Please wait a moment and try again.')
      return
    }

    setIsProcessing(true)
    onLoading(true)

    const cardNumberElement = elements.getElement(CardNumberElement)
    
    if (!cardNumberElement) {
      onError('Card information is incomplete')
      setIsProcessing(false)
      onLoading(false)
      return
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            phone: shippingInfo.phone,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zip,
              country: 'US'
            }
          }
        },
        shipping: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.zip,
            country: 'US'
          }
        }
      })

      if (error) {
        onError(error.message || 'Payment failed. Please check your card details and try again.')
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent)
      } else {
        onError('Payment was not completed successfully. Please try again.')
      }
    } catch (err) {
      console.error('Payment error:', err)
      onError('An unexpected error occurred. Please try again.')
    } finally {
      setIsProcessing(false)
      onLoading(false)
    }
  }

  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1c1917', // stone-900
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#9ca3af', // stone-400
        },
      },
      invalid: {
        color: '#dc2626', // red-600
        iconColor: '#dc2626',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <Shield size={16} className="text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-800">256-bit SSL Encrypted Payment</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          Your payment information is protected with bank-level security powered by Stripe
        </p>
      </div>

      {/* Payment Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Card Number
          </label>
          <div className="w-full p-3 border border-stone-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
            <CardNumberElement options={elementOptions} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Expiry Date
            </label>
            <div className="w-full p-3 border border-stone-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
              <CardExpiryElement options={elementOptions} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              CVC
            </label>
            <div className="w-full p-3 border border-stone-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
              <CardCvcElement options={elementOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Final Summary */}
      <div className="border border-stone-200 rounded-xl p-4 bg-stone-50">
        <div className="flex justify-between font-medium">
          <span>Order Total</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <p className="text-xs text-stone-600 mt-1">
          Includes all taxes and fees • Processed by Stripe
        </p>
      </div>

      {/* Trust Signals */}
      <div className="text-center text-xs text-stone-600 space-y-1">
        <div className="flex items-center justify-center">
          <Lock size={12} className="mr-1" />
          <span>PCI DSS Level 1 Compliant</span>
        </div>
        <p>✓ 30-day money-back guarantee</p>
        <p>✓ Lifetime warranty included</p>
        <p>✓ Free resizing within 60 days</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center text-sm"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Processing Payment...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  )
}

interface StripeCheckoutFormProps {
  amount: number
  currency?: string
  shippingInfo: PaymentFormData
  onSuccess: (paymentIntent: any) => void
  onError: (error: string) => void
  onLoading: (loading: boolean) => void
}

export default function StripeCheckoutForm({ 
  amount, 
  currency = 'USD', 
  shippingInfo, 
  onSuccess, 
  onError, 
  onLoading 
}: StripeCheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm 
        amount={amount}
        currency={currency}
        shippingInfo={shippingInfo}
        onSuccess={onSuccess}
        onError={onError}
        onLoading={onLoading}
      />
    </Elements>
  )
}