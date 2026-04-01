'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/store/useCart'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'BONJOOJOO10') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code. Try BONJOOJOO10 for 10% off.')
      setPromoApplied(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h1 className="text-3xl font-light text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 text-lg mb-8">
              Discover our collection of sustainable lab-grown diamond jewelry.
            </p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center border-t pt-12">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Free Shipping</p>
              <p className="text-sm text-gray-500">On all orders over $500</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">30-Day Returns</p>
              <p className="text-sm text-gray-500">Hassle-free return policy</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">IGI Certified</p>
              <p className="text-sm text-gray-500">Every diamond is certified</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light text-gray-900 mb-10">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-base font-medium text-gray-900 truncate pr-4">{item.name}</h3>
                      <p className="text-base font-medium text-gray-900 flex-shrink-0">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {item.size && (
                      <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
                    )}
                    {item.engraving && (
                      <p className="text-sm text-gray-500 mb-1">Engraving: {item.engraving}</p>
                    )}
                    <p className="text-sm text-gray-500 mb-4">${item.price.toLocaleString()} each</p>

                    <div className="flex items-center gap-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 text-gray-500 hover:text-gray-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-sm text-gray-900 min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:text-gray-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={() => clearCart()}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Clear cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-12 lg:mt-0">
            <div className="bg-gray-50 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} items)</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Promo discount (10%)</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{subtotal >= 500 ? 'Free' : '$25'}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-medium text-gray-900">
                  <span>Total</span>
                  <span>${(total + (subtotal < 500 ? 25 : 0)).toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
                    onKeyDown={(e) => e.key === 'Enter' && handlePromoCode()}
                  />
                  <button
                    onClick={handlePromoCode}
                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="mt-2 text-sm text-green-600">10% discount applied!</p>
                )}
                {promoError && (
                  <p className="mt-2 text-sm text-red-500">{promoError}</p>
                )}
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full bg-gray-900 text-white text-center py-4 text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="block w-full border border-gray-300 text-gray-700 text-center py-3 text-sm tracking-wide hover:border-gray-900 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure checkout with SSL encryption
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  IGI certified lab-grown diamonds
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free returns within 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
