'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, SlidersHorizontal, ChevronDown, Grid3X3, List } from 'lucide-react'
import { Product } from '@/data/products'
import { LuxuryReveal } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating'
type ViewMode = 'grid' | 'list'

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/inventory/search?category=${category}`)
        const data = await response.json()
        setProducts(data.products || [])
        setFilteredProducts(data.products || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchProducts()
    }
  }, [category])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Apply price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        selectedColors.some(color => 
          p.tags.some(tag => tag.toLowerCase().includes(color.toLowerCase()))
        )
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // Keep featured order
        break
    }

    setFilteredProducts(filtered)
  }, [products, sortBy, priceRange, selectedColors])

  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  if (loading) {
    return (
      <div className="min-h-screen bg-bj-offwhite">
        <div className="grain-overlay" aria-hidden="true" />
        
        {/* Header skeleton */}
        <div className="bg-white border-b border-bj-gray-100">
          <div className="container-bj-wide py-16">
            <div className="loading-shimmer h-12 w-64 mx-auto mb-4"></div>
            <div className="loading-shimmer h-6 w-32 mx-auto"></div>
          </div>
        </div>

        {/* Product grid skeleton */}
        <div className="container-bj-wide py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="loading-shimmer aspect-[4/5]"></div>
                <div className="space-y-2">
                  <div className="loading-shimmer h-4 w-3/4"></div>
                  <div className="loading-shimmer h-4 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="category-page-content bg-bj-offwhite">
      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-bj-gray-100 py-4">
        <div className="container-bj-wide">
          <nav className="flex items-center space-x-3 text-[13px]">
            <Link href="/" className="text-bj-gray-400 hover:text-bj-black transition-colors">Home</Link>
            <span className="text-bj-gray-300">/</span>
            <span className="text-bj-black font-medium capitalize">{categoryName}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero */}
      <div className="bg-gradient-to-b from-white to-bj-offwhite py-16 lg:py-24">
        <div className="container-bj-wide text-center">
          <LuxuryReveal direction="up">
            <p className="text-overline text-bj-pink mb-4 tracking-[0.3em]">Our Selection</p>
            <h1 className="text-display-xl text-bj-black mb-6">{categoryName}</h1>
            <p className="text-body-lg max-w-2xl mx-auto">
              {category === 'rings' && 'From delicate bands to statement pieces, discover rings crafted with lab-grown diamonds and exceptional artistry.'}
              {category === 'necklaces' && 'Elegant necklaces and pendants featuring brilliant lab-grown diamonds, designed to complement your unique style.'}
              {category === 'earrings' && 'Sophisticated earrings that capture light beautifully, from timeless studs to dramatic drops.'}
              {category === 'bracelets' && 'Luxurious bracelets that add sparkle to every moment, crafted with sustainable lab-grown diamonds.'}
              {!['rings', 'necklaces', 'earrings', 'bracelets'].includes(category) && 'Discover our exquisite selection of fine jewelry, handcrafted with lab-grown diamonds.'}
            </p>
          </LuxuryReveal>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white border-b border-bj-gray-100">
        <div className="container-bj-wide py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <LuxuryReveal direction="left">
                <p className="text-caption text-bj-gray-500">
                  Showing <span className="font-medium text-bj-black">{filteredProducts.length}</span> of <span className="font-medium text-bj-black">{products.length}</span> pieces
                </p>
              </LuxuryReveal>
            </div>

            <div className="flex items-center gap-4">
              <LuxuryReveal direction="right">
                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="flex border border-bj-gray-200 rounded">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-bj-black text-white' 
                          : 'bg-white text-bj-gray-400 hover:text-bj-black'
                      }`}
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-bj-black text-white' 
                          : 'bg-white text-bj-gray-400 hover:text-bj-black'
                      }`}
                    >
                      <List size={16} />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none bg-white border border-bj-gray-200 px-4 py-2 pr-8 text-caption font-medium text-bj-black focus:outline-none focus:border-bj-black"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-bj-gray-400 pointer-events-none" />
                  </div>

                  {/* Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-bj-gray-200 hover:border-bj-black transition-colors text-caption font-medium text-bj-black"
                  >
                    <SlidersHorizontal size={14} />
                    <span>Filter</span>
                  </button>
                </div>
              </LuxuryReveal>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <LuxuryReveal direction="up" delay={0.1}>
              <div className="mt-6 pt-6 border-t border-bj-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Price Range */}
                  <div>
                    <h4 className="text-overline text-bj-black mb-4">Price Range</h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-caption text-bj-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>

                  {/* Metal Type */}
                  <div>
                    <h4 className="text-overline text-bj-black mb-4">Metal</h4>
                    <div className="space-y-2">
                      {['Yellow Gold', 'White Gold', 'Rose Gold', 'Sterling Silver'].map((metal) => (
                        <label key={metal} className="flex items-center gap-2 text-caption text-bj-gray-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(metal)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedColors([...selectedColors, metal])
                              } else {
                                setSelectedColors(selectedColors.filter(c => c !== metal))
                              }
                            }}
                            className="w-4 h-4 text-bj-black border-bj-gray-300 rounded focus:ring-bj-black"
                          />
                          <span>{metal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Size (for rings) */}
                  {category === 'rings' && (
                    <div>
                      <h4 className="text-overline text-bj-black mb-4">Ring Size</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {['4', '5', '6', '7', '8', '9', '10', '11'].map((size) => (
                          <button
                            key={size}
                            onClick={() => {
                              if (selectedSizes.includes(size)) {
                                setSelectedSizes(selectedSizes.filter(s => s !== size))
                              } else {
                                setSelectedSizes([...selectedSizes, size])
                              }
                            }}
                            className={`aspect-square text-caption font-medium transition-all ${
                              selectedSizes.includes(size)
                                ? 'bg-bj-black text-white border-bj-black'
                                : 'bg-white text-bj-black border-bj-gray-200 hover:border-bj-black'
                            } border`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </LuxuryReveal>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="container-bj-wide py-12">
        {filteredProducts.length > 0 ? (
          <PandoraStaggerGrid 
            staggerDelay={0.1} 
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              : "space-y-8"
            }
          >
            {filteredProducts.map((product, index) => (
              <PandoraStaggerItem key={product.id}>
                {viewMode === 'grid' ? (
                  // Grid View - Pandora Style
                  <Link href={`/product/${product.id}`} className="group product-card block">
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
                        <span className="absolute top-3 left-3 bg-bj-pink text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">Sale</span>
                      )}
                      {product.tags.includes('bestseller') && !product.originalPrice && (
                        <span className="absolute top-3 left-3 bg-bj-black text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">Best Seller</span>
                      )}

                      {/* Wishlist */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleWishlist(product.id)
                        }}
                        className="wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
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

                      {/* Quick Add */}
                      <div className="quick-add absolute bottom-0 left-0 right-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // Handle quick add to cart
                          }}
                          className="w-full py-3 bg-bj-black/90 backdrop-blur-sm text-white text-[10px] font-medium tracking-[0.15em] uppercase hover:bg-bj-black transition-colors"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="space-y-2">
                      <h3 className="text-caption font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={10} className={s <= Math.round(product.rating) ? 'text-bj-gold fill-current' : 'text-bj-gray-200 fill-current'} />
                          ))}
                        </div>
                        <span className="text-[10px] text-bj-gray-400">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-body font-medium text-bj-black">{formatPrice(product.price)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-caption text-bj-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      {/* Color swatches */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="w-3 h-3 rounded-full bg-bj-rose-gold border border-bj-gray-200" />
                        <div className="w-3 h-3 rounded-full bg-bj-gold border border-bj-gray-200" />
                        <div className="w-3 h-3 rounded-full bg-gray-400 border border-bj-gray-200" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  // List View
                  <Link href={`/product/${product.id}`} className="group flex gap-6 bg-white p-6 hover:shadow-lg transition-all duration-300">
                    <div className="relative w-32 h-32 bg-bj-gray-50 flex-shrink-0 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover img-editorial"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-bj-gray-400 text-[10px]">{product.name}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-body font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} size={12} className={s <= Math.round(product.rating) ? 'text-bj-gold fill-current' : 'text-bj-gray-200 fill-current'} />
                            ))}
                          </div>
                          <span className="text-caption text-bj-gray-400">({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      <p className="text-caption text-bj-gray-500 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-body font-medium text-bj-black">{formatPrice(product.price)}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-caption text-bj-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              toggleWishlist(product.id)
                            }}
                            className="p-2 rounded-full border border-bj-gray-200 hover:border-bj-black transition-colors"
                          >
                            <Heart 
                              size={16} 
                              className={wishlist.has(product.id) ? 'text-bj-pink fill-current' : 'text-bj-gray-500'} 
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </PandoraStaggerItem>
            ))}
          </PandoraStaggerGrid>
        ) : (
          <LuxuryReveal direction="up">
            <div className="text-center py-20">
              <h2 className="text-display-sm text-bj-black mb-4">No pieces found</h2>
              <p className="text-body text-bj-gray-500 mb-8">Try adjusting your filters or explore other categories.</p>
              <Link href="/search" className="btn-primary">
                Explore All Jewelry
              </Link>
            </div>
          </LuxuryReveal>
        )}
      </div>

      {/* Category Education */}
      <div className="bg-white py-20">
        <div className="container-bj">
          <LuxuryReveal direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-overline text-bj-pink mb-4">Why Choose Bonjoojoo</p>
              <h2 className="text-display-md text-bj-black mb-6">Sustainable Luxury</h2>
              <p className="text-body-lg mb-12">
                Every piece in our {categoryName.toLowerCase()} selection features IGI and GIA certified lab-grown diamonds. 
                Same brilliance, same beauty, 95% less environmental impact. Handcrafted with intention in Los Angeles.
              </p>
              
              <PandoraStaggerGrid staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PandoraStaggerItem>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-bj-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">IGI</span>
                    </div>
                    <h4 className="text-overline text-bj-black mb-2">Certified Excellence</h4>
                    <p className="text-caption text-bj-gray-500">IGI & GIA certified lab-grown diamonds with full documentation</p>
                  </div>
                </PandoraStaggerItem>
                
                <PandoraStaggerItem>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-bj-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">95%</span>
                    </div>
                    <h4 className="text-overline text-bj-black mb-2">Less Impact</h4>
                    <p className="text-caption text-bj-gray-500">Reduced carbon footprint compared to traditional mining</p>
                  </div>
                </PandoraStaggerItem>
                
                <PandoraStaggerItem>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-bj-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">LA</span>
                    </div>
                    <h4 className="text-overline text-bj-black mb-2">Handcrafted</h4>
                    <p className="text-caption text-bj-gray-500">Designed and crafted by artisans in Los Angeles</p>
                  </div>
                </PandoraStaggerItem>
              </PandoraStaggerGrid>
            </div>
          </LuxuryReveal>
        </div>
      </div>
    </div>
  )
}