'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Trash2, Share2, Check, X } from 'lucide-react'
import { useWishlist } from '@/store/useWishlist'
import { useCart } from '@/store/useCart'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const PLACEHOLDER_IMG = '/images/products/placeholder-product.svg'

function WishlistContent() {
  const { items, removeFromWishlist, addToWishlist } = useWishlist()
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  const [sharedIds, setSharedIds] = useState<string[]>([])

  // Handle shared wishlist URL: /wishlist?ids=sku1,sku2,sku3
  useEffect(() => {
    const ids = searchParams?.get('ids')
    if (ids) {
      setSharedIds(ids.split(',').filter(Boolean))
    }
  }, [searchParams])

  const displayItems = sharedIds.length > 0
    ? items.filter(i => sharedIds.includes(i.id))
    : items

  const isSharedView = sharedIds.length > 0

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

  const handleShare = async () => {
    if (items.length === 0) return
    const ids = items.map(i => i.id).join(',')
    const url = `${window.location.origin}/wishlist?ids=${ids}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback: select the URL in a prompt
      window.prompt('Copy this wishlist link:', url)
    }
  }

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      images: [item.image],
      compare_at_price: item.originalPrice,
    })
  }

  // Empty state
  if (displayItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white">
        <div className="container-bj py-16">
          <nav className="flex items-center gap-2 text-[12px] text-bj-gray-400 mb-10">
            <Link href="/" className="hover:text-bj-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-bj-black">Wishlist</span>
          </nav>

          <h1 className="font-display text-[2rem] tracking-[0.05em] text-bj-black uppercase mb-12">
            My Wishlist
          </h1>

          <div className="text-center py-20 border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bj-blush flex items-center justify-center">
              <Heart size={28} className="text-bj-pink" />
            </div>
            <h2 className="text-[1.25rem] font-light text-bj-black mb-3">Your wishlist is empty</h2>
            <p className="text-body text-bj-gray-500 max-w-sm mx-auto mb-8">
              Save your favorite pieces and come back to them whenever you&apos;re ready.
            </p>
            <Link href="/search" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag size={16} />
              Explore Collection
            </Link>
          </div>

          <div className="mt-16">
            <p className="text-[11px] uppercase tracking-[0.15em] text-bj-gray-400 text-center mb-6">
              Browse by Category
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Rings', href: '/category/rings' },
                { label: 'Necklaces', href: '/category/necklaces' },
                { label: 'Earrings', href: '/category/earrings' },
                { label: 'Bracelets', href: '/category/bracelets' },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="border border-gray-200 py-5 text-center text-[13px] text-bj-gray-500 hover:text-bj-black hover:border-bj-black transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-white">
      <div className="container-bj py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-bj-gray-400 mb-10">
          <Link href="/" className="hover:text-bj-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-bj-black">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-[2rem] tracking-[0.05em] text-bj-black uppercase">
              {isSharedView ? 'Shared Wishlist' : 'My Wishlist'}
            </h1>
            <p className="text-[13px] text-bj-gray-400 mt-1">
              {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {!isSharedView && items.length > 0 && (
            <button
              onClick={handleShare}
              className="flex items-center gap-2 border border-bj-black text-bj-black text-[12px] tracking-[0.08em] uppercase py-2.5 px-5 hover:bg-bj-black hover:text-white transition-colors"
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {copied ? 'Link Copied!' : 'Share Wishlist'}
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {displayItems.map((item) => (
            <div key={item.id} className="group relative">
              {/* Product Image */}
              <Link href={`/product/${item.id}`} className="block">
                <div className="relative aspect-square bg-bj-offwhite overflow-hidden mb-4">
                  <Image
                    src={item.image || PLACEHOLDER_IMG}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    unoptimized={(item.image || '').endsWith('.svg')}
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG }}
                  />
                </div>
              </Link>

              {/* Remove button */}
              {!isSharedView && (
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-bj-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove from wishlist"
                >
                  <X size={14} />
                </button>
              )}

              {/* Product Info */}
              <div className="space-y-2">
                <Link href={`/product/${item.id}`} className="block">
                  <h3 className="text-[13px] font-medium text-bj-black leading-tight line-clamp-2 hover:text-bj-gray-500 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-bj-black">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-[13px] text-bj-gray-400 line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full btn-primary text-[11px] py-2.5 flex items-center justify-center gap-2 mt-3"
                >
                  <ShoppingBag size={13} />
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue shopping */}
        <div className="text-center border-t border-gray-100 pt-10">
          <Link href="/search" className="text-[12px] uppercase tracking-[0.1em] text-bj-gray-500 hover:text-bj-black transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function WishlistPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-bj-black border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <WishlistContent />
    </Suspense>
  )
}
