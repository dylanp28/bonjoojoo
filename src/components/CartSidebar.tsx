'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/store/useCart'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-bj-black/20" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-350"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-250"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[420px]">
                  <div className="flex h-full flex-col bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                      <h2 className="font-display text-[20px] text-bj-black">
                        Shopping Bag
                        <span className="text-gray-400 font-body text-[14px] ml-2">({totalItems})</span>
                      </h2>
                      <button
                        onClick={toggleCart}
                        className="p-1.5 text-gray-400 hover:text-bj-black transition-colors"
                      >
                        <X size={20} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                      {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-16 px-6">
                          <div className="w-16 h-16 rounded-full bg-bj-offwhite flex items-center justify-center mb-5">
                            <ShoppingBag size={24} className="text-gray-300" strokeWidth={1.5} />
                          </div>
                          <h3 className="font-display text-[18px] text-bj-black mb-2">Your bag is empty</h3>
                          <p className="text-[14px] text-gray-400 text-center mb-8 max-w-xs">
                            Discover our collection of lab-grown diamond jewelry.
                          </p>
                          <Link
                            href="/collections"
                            onClick={toggleCart}
                            className="btn-primary"
                          >
                            Shop Now
                          </Link>
                        </div>
                      ) : (
                        <div className="px-6 py-6 space-y-6">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              {/* Image */}
                              <div className="w-20 h-24 flex-shrink-0 bg-bj-offwhite overflow-hidden">
                                {item.image ? (
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={96}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border border-gray-200"></div>
                                  </div>
                                )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between gap-2">
                                  <h3 className="text-[14px] font-medium text-bj-black truncate">
                                    {item.name}
                                  </h3>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="flex-shrink-0 text-gray-300 hover:text-bj-black transition-colors p-2 -mt-1 -mr-1"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                                {item.size && (
                                  <p className="text-[12px] text-gray-400 mt-0.5">Size: {item.size}</p>
                                )}
                                {item.engraving && (
                                  <p className="text-[12px] text-gray-400">Engraving: &ldquo;{item.engraving}&rdquo;</p>
                                )}

                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center border border-gray-200">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-bj-black transition-colors"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="w-8 text-center text-[13px] font-medium text-bj-black">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-bj-black transition-colors"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                  <span className="text-[14px] font-medium text-bj-black">
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-100 px-6 py-6 bg-bj-offwhite">
                        <div className="flex justify-between mb-1">
                          <span className="text-[14px] text-gray-500">Subtotal</span>
                          <span className="text-[16px] font-medium text-bj-black">{formatPrice(totalPrice)}</span>
                        </div>
                        <p className="text-[12px] text-gray-400 mb-5">
                          Shipping & taxes calculated at checkout
                        </p>

                        <Link
                          href="/checkout"
                          onClick={toggleCart}
                          className="btn-primary w-full text-center flex items-center justify-center gap-2"
                        >
                          Checkout
                          <ArrowRight size={14} />
                        </Link>

                        <button
                          onClick={toggleCart}
                          className="w-full mt-3 text-center text-[13px] text-gray-500 hover:text-bj-black transition-colors py-2"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
