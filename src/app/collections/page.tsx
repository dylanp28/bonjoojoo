'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, User, ShoppingBag, Star, Filter, Grid, List } from 'lucide-react'
import { useCart } from '@/store/useCart'
import CartSidebar from '@/components/CartSidebar'
import SearchBar from '@/components/SearchBar'

interface Product {
  id: string
  name: string
  price: number
  compare_at_price?: number
  images: string[]
  category: string
  rating?: number
  reviews?: number
  is_featured?: boolean
  is_bestseller?: boolean
}

export default function CollectionsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const { totalItems, toggleCart, addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        limit: '20',
        sortBy: sortBy === 'price-low' ? 'price' : sortBy === 'price-high' ? 'price' : 'name',
        sortOrder: sortBy === 'price-high' ? 'desc' : 'asc'
      })

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }

      const response = await fetch(`/api/inventory/search?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data.products || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'charms', label: 'Charms' },
    { value: 'engagement-rings', label: 'Engagement Rings' }
  ]

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price Low to High' },
    { value: 'price-high', label: 'Price High to Low' }
  ]

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-black tracking-wide">BONJOOJOO</div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link href="/new-featured" className="text-black hover:text-gray-600">New & featured</Link>
            <Link href="/shop-by" className="text-black hover:text-gray-600">Shop by</Link>
            <Link href="/charms" className="text-black hover:text-gray-600">Charms</Link>
            <Link href="/bracelets" className="text-black hover:text-gray-600">Bracelets</Link>
            <Link href="/necklaces" className="text-black hover:text-gray-600">Necklaces</Link>
            <Link href="/rings" className="text-black hover:text-gray-600">Rings</Link>
            <Link href="/earrings" className="text-black hover:text-gray-600">Earrings</Link>
            <Link href="/lab-grown-diamonds" className="text-black hover:text-gray-600">Lab-grown diamonds</Link>
            <Link href="/engraving" className="text-black hover:text-gray-600">Engraving</Link>
            <Link href="/gifts" className="text-black hover:text-gray-600">Gifts</Link>
            <Link href="/collections" className="text-black hover:text-gray-600 font-bold">Collections</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchBar className="w-80" placeholder="Search collections..." />
            </div>

            <button className="p-2"><Heart className="w-5 h-5" /></button>
            <Link href="/login" className="p-2"><User className="w-5 h-5" /></Link>
            <button onClick={toggleCart} className="p-2 relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black font-medium">Collections</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">All Collections</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete range of lab-grown diamond jewelry. From timeless classics 
            to contemporary designs, find the perfect piece for every moment.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-6'
          }>
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
                  viewMode === 'list' ? 'flex space-x-4 p-4' : 'p-4'
                }`}
              >
                {/* Product Image */}
                <Link 
                  href={`/product/${product.id}`}
                  className={viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square mb-4 block'}
                >
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm text-center">{product.name.charAt(0)}</span>
                    </div>
                  )}
                </Link>

                {/* Product Info */}
                <div className="flex-1 space-y-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-gray-600 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 capitalize">
                    {product.category.replace('-', ' ')}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating || 0) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews || 0})
                    </span>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatPrice(product.compare_at_price)}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-black text-white px-3 py-1 text-sm rounded hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex space-x-2">
                    {product.is_bestseller && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Bestseller
                      </span>
                    )}
                    {product.is_featured && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different category or adjusting your filters
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              View All Products
            </button>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  )
}