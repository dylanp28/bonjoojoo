'use client'

import { CreditCard, Plus, Shield } from 'lucide-react'

export default function PaymentPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">Payment Methods</h1>
        <p className="text-stone-600">
          Securely manage your payment information for faster checkout.
        </p>
      </div>

      <div className="text-center py-12">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-stone-400" />
        </div>
        <h3 className="text-lg font-medium text-stone-900 mb-2">No payment methods saved</h3>
        <p className="text-stone-600 mb-4">
          Add a payment method to make checkout faster and more convenient.
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </button>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-blue-600 mr-3" />
          <div>
            <h4 className="font-medium text-blue-900">Secure Payment Processing</h4>
            <p className="text-sm text-blue-700 mt-1">
              All payment information is encrypted and processed securely through Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}