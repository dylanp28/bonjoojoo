'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/store/useCart'

export function ShoppingCart() {
  const router = useRouter()
  const { 
    items, 
    isOpen, 
    totalItems, 
    totalPrice, 
    toggleCart, 
    updateQuantity, 
    removeItem 
  } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      {/* Cart Toggle Button - Pandora Style */}
      <button
        onClick={toggleCart}
        className="relative text-gray-600 hover:text-[#0074D9] transition-colors duration-300"
      >
        <ShoppingBag size={20} strokeWidth={1.5} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#1E3A8A] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-normal">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Overlay - Pandora Style */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={toggleCart} />
          
          {/* Cart Sidebar - EXACT Pandora Design */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Cart Header - Pandora Style */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">
                  Shopping Bag
                  {totalItems > 0 && (
                    <span className="text-gray-600 font-normal ml-2">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                  )}
                </h2>
                <button
                  onClick={toggleCart}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-light text-gray-900 mb-4">
                      Your shopping bag is empty
                    </h3>
                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                      Discover our latest collections and add your favorite pieces
                    </p>
                    <button
                      onClick={toggleCart}
                      className="btn-primary"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="p-8 space-y-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4 pb-6 border-b border-stone-100 last:border-b-0">
                        {/* Product Image */}
                        <div className="relative w-20 h-24 bg-stone-50 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover filter-minimal"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-stone-900 mb-2 leading-tight la-modern">
                            {item.name}
                          </h3>
                          
                          {/* Options */}
                          {(item.size || item.engraving) && (
                            <div className="text-xs text-stone-500 mb-3 space-y-1 uppercase tracking-wider">
                              {item.size && <div>Size: {item.size}</div>}
                              {item.engraving && <div>Engraving: {item.engraving}</div>}
                            </div>
                          )}

                          {/* Price */}
                          <div className="font-medium text-stone-900 mb-4">
                            {formatPrice(item.price)}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-stone-300">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 transition-colors"
                              >
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="w-12 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 transition-colors"
                              >
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer - Pandora Style */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-white">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-lg font-medium mb-2">
                    <span className="text-gray-900">Subtotal</span>
                    <span className="text-gray-900">{formatPrice(totalPrice)}</span>
                  </div>

                  <p className="text-sm text-stone-400 mb-1">
                    or 4 × <span className="font-medium text-stone-600">{formatPrice(totalPrice / 4)}</span> with <span className="font-semibold text-[#00B14F]">Afterpay</span>
                  </p>

                  <p className="text-sm text-gray-600 mb-6">
                    Shipping and taxes will be calculated at checkout
                  </p>

                  {/* Action Buttons - Pandora Style */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        toggleCart()
                        router.push('/checkout')
                      }}
                      className="w-full bg-[#224099] hover:bg-[#1a3077] text-white py-3 font-medium transition-colors text-sm"
                    >
                      Checkout
                    </button>
                    
                    <button
                      onClick={toggleCart}
                      className="w-full border border-gray-300 text-gray-700 py-3 font-medium hover:bg-gray-50 transition-colors text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                  
                  {/* Free Shipping Notice */}
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-sm">
                    <p className="text-sm text-green-800">
                      🚚 Free shipping on orders over $99
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}