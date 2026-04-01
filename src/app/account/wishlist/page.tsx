'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Trash2, Plus, Share2, Check } from 'lucide-react'
import { useWishlist } from '@/store/useWishlist'
import { useCart } from '@/store/useCart'

const PLACEHOLDER_IMG = '/images/products/placeholder-product.svg'

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const addItem = useCart(state => state.addItem)
  const [shareToast, setShareToast] = useState(false)
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      images: [item.image],
    })
    setAddedToCart(item.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  const handleShareWishlist = async () => {
    const ids = items.map(i => i.id).join(',')
    const url = `${window.location.origin}/wishlist?items=${encodeURIComponent(ids)}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // fallback: try share API
      if (navigator.share) {
        await navigator.share({ title: 'My bonjoojoo Wishlist', url })
        return
      }
    }
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2500)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

  return (
    <div className="p-6">
      {/* Share toast */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium">
          <Check size={15} className="text-green-400" />
          Wishlist link copied!
        </div>
      )}

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">My Wishlist</h1>
          <p className="text-stone-600">
            {items.length > 0
              ? `${items.length} saved piece${items.length !== 1 ? 's' : ''}`
              : 'Save your favorite bonjoojoo pieces for later.'}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={handleShareWishlist}
            className="flex items-center gap-2 px-4 py-2 border border-stone-200 text-stone-600 text-sm hover:border-stone-400 hover:text-stone-900 transition-colors rounded-md flex-shrink-0"
          >
            <Share2 size={15} />
            Share Wishlist
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group border border-stone-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
              {/* Product Image */}
              <Link href={`/product/${item.id}`} className="block">
                <div className="aspect-square bg-gradient-to-b from-stone-50 to-stone-100 relative overflow-hidden">
                  <Image
                    src={item.image || PLACEHOLDER_IMG}
                    alt={item.name}
                    fill
                    unoptimized={(item.image || '').endsWith('.svg')}
                    className="object-contain p-4"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG }}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                {item.category && (
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{item.category}</p>
                )}
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-medium text-stone-900 hover:text-stone-600 transition-colors line-clamp-2 mb-2">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-medium text-stone-900">{formatPrice(item.price)}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-stone-400 line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors rounded-md"
                  >
                    {addedToCart === item.id ? (
                      <>
                        <Check size={14} />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-9 h-9 flex items-center justify-center border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 transition-colors rounded-md"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-2">Your wishlist is empty</h3>
          <p className="text-stone-600 mb-4">
            Tap the heart icon on any product to save it here.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Browse Collections
          </Link>
        </div>
      )}
    </div>
  )
}
