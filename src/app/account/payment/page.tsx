'use client'

import { CreditCard, Shield, Lock } from 'lucide-react'
import Link from 'next/link'

export default function PaymentPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">Payment Methods</h1>
        <p className="text-stone-600">
          Manage your payment information.
        </p>
      </div>

      <div className="max-w-md">
        <div className="border border-stone-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-stone-500" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-2">Manage payment during checkout</h3>
          <p className="text-stone-600 text-sm mb-6 leading-relaxed">
            For your security, payment details are entered at checkout and processed securely through Stripe. No card information is stored in your account.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
          >
            Go to Checkout
          </Link>
        </div>

        <div className="mt-6 bg-stone-50 border border-stone-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-stone-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-stone-900 text-sm">Secure Payment Processing</h4>
              <p className="text-stone-600 text-sm mt-1">
                All transactions are encrypted with TLS and processed via Stripe. Your card details are never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-stone-50 border border-stone-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-stone-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-stone-900 text-sm">Accepted Payment Methods</h4>
              <p className="text-stone-600 text-sm mt-1">
                We accept all major credit and debit cards — Visa, Mastercard, American Express, and Discover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
