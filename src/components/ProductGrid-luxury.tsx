'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { Product } from '@/data/products'
import { useCart } from '@/store/useCart'
import { LuxuryReveal } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'

interface ProductGridProps {
  products: Product[]
  title?: string
  subtitle?: string
  viewMode?: 'grid' | 'list'
  columns?: 2 | 3 | 4 | 5
}

export function ProductGridLuxury({ 
  products, 
  title, 
  subtitle,
  viewMode = 'grid',
  columns = 4
}: ProductGridProps) {
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

  const handleQuickAdd = (product: Product) => {
    addItem(product)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getGridClasses = () => {
    const baseClasses = "grid gap-8"
    const colClasses = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    }
    return `${baseClasses} ${colClasses[columns]}`
  }

  return (
    <section className="bg-bj-offwhite">
      {/* Header */}
      {title && (
        <div className="container-bj py-16 text-center">
          <LuxuryReveal direction="up">
            {subtitle && <p className="text-overline text-bj-pink mb-3 tracking-[0.3em]">{subtitle}</p>}
            <h2 className="text-display-lg text-bj-black">{title}</h2>
          </LuxuryReveal>
        </div>
      )}
      
      {/* Products */}
      <div className="container-bj-wide pb-16">
        {products.length > 0 ? (
          viewMode === 'grid' ? (
            <PandoraStaggerGrid 
              staggerDelay={0.1} 
              className={getGridClasses()}
            >
              {products.map((product, index) => (
                <PandoraStaggerItem key={product.id}>
                  <Link href={`/product/${product.id}`} className="group product-card block">
                    {/* Product Image Container */}
                    <div className="product-image-container relative aspect-[4/5] bg-white mb-4 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover product-card-img img-editorial"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-bj-gray-50">
                          <span className="text-bj-gray-400 text-caption">{product.name}</span>
                        </div>
                      )}

                      {/* Badges */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="absolute top-3 left-3 bg-bj-pink text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 z-10">Sale</span>
                      )}
                      {product.tags.includes('bestseller') && !product.originalPrice && (
                        <span className="absolute top-3 left-3 bg-bj-black text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 z-10">Best Seller</span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleWishlist(product.id)
                        }}
                        className="wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all z-10"
                        aria-label="Add to wishlist"
                      >
                        <Heart 
                          size={14} 
                          className={`transition-colors ${
                            wishlist.has(product.id) 
                              ? 'text-bj-pink fill-current' 
                              : 'text-bj-gray-500 hover:text-bj-pink'
                          }`} 
                          strokeWidth={1.5} 
                        />
                      </button>

                      {/* Quick Add Overlay */}
                      <div className="quick-add absolute bottom-0 left-0 right-0 z-10">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleQuickAdd(product)
                          }}
                          className="w-full py-3.5 bg-bj-black/90 backdrop-blur-sm text-white text-[10px] font-medium tracking-[0.15em] uppercase hover:bg-bj-black transition-colors"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className="space-y-2">
                      {/* Product Name */}
                      <h3 className="text-caption font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors line-clamp-2 leading-tight">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              size={10} 
                              className={star <= Math.round(product.rating) 
                                ? 'text-bj-gold fill-current' 
                                : 'text-bj-gray-200 fill-current'
                              } 
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-bj-gray-400">({product.reviewCount})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-body font-medium text-bj-black">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-caption text-bj-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Color Options */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="w-3 h-3 rounded-full bg-bj-rose-gold border border-bj-gray-200" />
                        <div className="w-3 h-3 rounded-full bg-bj-gold border border-bj-gray-200" />
                        <div className="w-3 h-3 rounded-full bg-gray-400 border border-bj-gray-200" />
                      </div>

                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="pt-2">
                          <span className="text-[10px] text-bj-gray-500 font-medium uppercase tracking-wider">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </PandoraStaggerItem>
              ))}
            </PandoraStaggerGrid>
          ) : (
            // List View
            <PandoraStaggerGrid staggerDelay={0.1} className="space-y-8">
              {products.map((product) => (
                <PandoraStaggerItem key={product.id}>
                  <Link 
                    href={`/product/${product.id}`} 
                    className="group flex gap-8 bg-white p-8 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative w-40 h-40 bg-bj-gray-50 flex-shrink-0 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover img-editorial"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-bj-gray-400 text-caption">{product.name}</span>
                        </div>
                      )}

                      {/* Badges */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="absolute top-2 left-2 bg-bj-pink text-white text-[8px] font-semibold tracking-wider uppercase px-2 py-1">Sale</span>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-body font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                size={12} 
                                className={star <= Math.round(product.rating) 
                                  ? 'text-bj-gold fill-current' 
                                  : 'text-bj-gray-200 fill-current'
                                } 
                              />
                            ))}
                          </div>
                          <span className="text-caption text-bj-gray-400">({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      <p className="text-caption text-bj-gray-500 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          <span className="text-body font-medium text-bj-black">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-caption text-bj-gray-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {/* Color Options */}
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-bj-rose-gold border border-bj-gray-200" />
                            <div className="w-3 h-3 rounded-full bg-bj-gold border border-bj-gray-200" />
                            <div className="w-3 h-3 rounded-full bg-gray-400 border border-bj-gray-200" />
                          </div>

                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              toggleWishlist(product.id)
                            }}
                            className="p-3 rounded-full border border-bj-gray-200 hover:border-bj-black transition-colors"
                            aria-label="Add to wishlist"
                          >
                            <Heart 
                              size={16} 
                              className={wishlist.has(product.id) 
                                ? 'text-bj-pink fill-current' 
                                : 'text-bj-gray-500 hover:text-bj-pink'
                              } 
                            />
                          </button>
                        </div>
                      </div>

                      {!product.inStock && (
                        <div className="pt-2">
                          <span className="text-caption text-bj-gray-500 font-medium uppercase tracking-wider">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </PandoraStaggerItem>
              ))}
            </PandoraStaggerGrid>
          )
        ) : (
          // Empty State
          <LuxuryReveal direction="up">
            <div className="text-center py-20">
              <h3 className="text-display-sm text-bj-black mb-4">No pieces found</h3>
              <p className="text-body text-bj-gray-500 mb-8">
                Our artisans are crafting new treasures. Please check back soon or explore our other collections.
              </p>
              <Link href="/search" className="btn-primary">
                Explore Collections
              </Link>
            </div>
          </LuxuryReveal>
        )}
      </div>
    </section>
  )
}