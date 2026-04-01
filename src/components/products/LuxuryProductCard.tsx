'use client'

import { useState } from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useWishlist } from '@/store/useWishlist'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating?: number
  reviewCount?: number
  isWishlisted?: boolean
  inStock?: boolean
  isNew?: boolean
  onSale?: boolean
  salePercent?: number
  description?: string
}

interface LuxuryProductCardProps {
  product: Product
  loading?: boolean
  variant?: 'default' | 'compact' | 'featured'
  onWishlistToggle?: (productId: string) => void
  onAddToCart?: (productId: string) => void
  className?: string
}

const PLACEHOLDER_IMG = '/images/products/placeholder-product.svg'

export const LuxuryProductCard = ({
  product,
  loading = false,
  variant = 'default',
  onWishlistToggle,
  onAddToCart,
  className = ''
}: LuxuryProductCardProps) => {
  const { isWishlisted: checkWishlisted, toggleItem } = useWishlist()
  const isWishlisted = checkWishlisted(product.id)
  const [addedToCart, setAddedToCart] = useState(false)
  const [heartPop, setHeartPop] = useState(false)
  const [imgSrc, setImgSrc] = useState(product.images?.[0] || PLACEHOLDER_IMG)

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="aspect-[3/4] bg-gray-50 loading-shimmer mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded w-16"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-20"></div>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

  const aspectMap = {
    default: 'aspect-[3/4]',
    compact: 'aspect-square',
    featured: 'aspect-[4/5]',
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] || PLACEHOLDER_IMG,
      category: product.category,
    })
    setHeartPop(true)
    setTimeout(() => setHeartPop(false), 300)
    onWishlistToggle?.(product.id)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAddedToCart(true)
    onAddToCart?.(product.id)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className={`group ${className}`}>
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className={`${aspectMap[variant]} bg-white relative overflow-hidden mb-4 product-hover`}>
          {/* Product image — contained with padding for clean e-commerce presentation */}
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            unoptimized={imgSrc.endsWith('.svg')}
            className="object-contain p-6 img-zoom img-warm"
            onError={() => setImgSrc(PLACEHOLDER_IMG)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <span className="bg-bj-black text-white text-[10px] font-medium tracking-wider uppercase px-2 py-1">
                New
              </span>
            )}
            {product.onSale && product.salePercent && (
              <span className="bg-bj-pink text-white text-[10px] font-medium tracking-wider uppercase px-2 py-1">
                -{product.salePercent}%
              </span>
            )}
            {product.inStock === false && (
              <span className="bg-gray-400 text-white text-[10px] font-medium tracking-wider uppercase px-2 py-1">
                Sold Out
              </span>
            )}

          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-300 z-10 ${
              isWishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } ${heartPop ? 'scale-125' : 'scale-100'}`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              className={`transition-colors ${isWishlisted ? 'fill-bj-pink text-bj-pink' : 'text-gray-600 hover:text-bj-pink'}`}
            />
          </button>

          {/* Quick add */}
          {product.inStock !== false && variant !== 'compact' && (
            <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-bj-black/90 text-white text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-bj-black transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                {addedToCart ? 'Added' : 'Quick Add'}
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div>
        <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[14px] font-medium text-bj-black group-hover:text-gray-600 transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>
        </Link>



        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-medium text-bj-black">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[13px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Product Grid
export const LuxuryProductGrid = ({
  products,
  loading = false,
  columns = 4,
  className = ''
}: {
  products: Product[]
  loading?: boolean
  columns?: 2 | 3 | 4 | 5
  className?: string
}) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-5 ${className}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <LuxuryProductCard key={i} product={{} as Product} loading />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-5 ${className}`}>
      {products.map((product) => (
        <LuxuryProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default LuxuryProductCard
