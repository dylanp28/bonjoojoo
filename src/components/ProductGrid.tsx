'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/data/products'
import { useCart } from '@/store/useCart'

interface ProductGridProps {
  products: Product[]
  title?: string
}

export function ProductGrid({ products, title }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const addItem = useCart(state => state.addItem)
  
  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }



  return (
    <section>
      {title && (
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-light text-gray-900">{title}</h2>
        </div>
      )}
      
      {/* EXACT Pandora Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
              
              {/* Sale Badge - Pandora Style */}
              {product.compare_at_price && product.compare_at_price > product.price && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-medium uppercase">
                  Sale
                </div>
              )}
              
              {/* Wishlist Button - Pandora Position */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart
                    size={16}
                    className={`${
                      wishlist.has(product.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Quick Shop Overlay - Pandora Style */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-white text-black py-2 px-4 text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Quick Shop
                </button>
              </div>
            </div>

            {/* Product Details - Pandora Layout */}
            <div className="space-y-2">
              {/* Product Name */}
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                {product.name}
              </h3>



              {/* Price - Pandora Styling */}
              <div className="flex items-center space-x-2">
                <span className="text-lg font-medium text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>

              {/* Product Colors/Options - Gold Colors */}
              <div className="flex items-center space-x-1 pt-1">
                <div className="w-4 h-4 rounded-full bg-yellow-400 border border-gray-300" title="Yellow Gold"></div>
                <div className="w-4 h-4 rounded-full bg-rose-400 border border-gray-300" title="Rose Gold"></div>
                <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300" title="White Gold"></div>
              </div>

              {/* Stock Status */}
              {product.availability_status === 'out_of_stock' && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500 font-medium">Out of Stock</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* No Products State - Pandora Style */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-500 mb-4 font-medium text-lg">No products found</div>
          <p className="text-gray-400">Please try adjusting your search or filters.</p>
        </div>
      )}
    </section>
  )
}