'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Filter, Grid, List, SortAsc, SortDesc, Heart } from 'lucide-react'


interface Product {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  subcategory: string
  description: string

  bestseller?: boolean
  featured?: boolean
}

interface SearchResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || 'relevance')
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    availability: 'all'
  })

  useEffect(() => {
    const performSearch = async () => {
      console.log('performSearch called with:', { query, sortBy, filters })
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          q: query,
          sortBy: sortBy === 'relevance' ? 'name' : sortBy,
          limit: '24'
        })

        // Add filters
        if (filters.category) params.append('category', filters.category)
        if (filters.minPrice) params.append('minPrice', filters.minPrice)
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
        if (filters.availability === 'inStock') params.append('inStock', 'true')

        const url = `/api/inventory/search?${params}`
        console.log('Fetching from:', url)
        
        const response = await fetch(url)
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error('Search failed')
        }

        const data = await response.json()
        console.log('Search results:', data)
        setResults(data)
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to load search results. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query, sortBy, filters])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'charms', label: 'Charms' }
  ]

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price', label: 'Price Low to High' },
    { value: '-price', label: 'Price High to Low' },

  ]

  return (
    <div className="search-page-content bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">

          
          {query && (
            <h1 className="text-2xl font-light text-gray-900 text-center">
              Search results for "{query}"
            </h1>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-1"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Items</option>
                    <option value="inStock">In Stock Only</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({
                    category: '',
                    minPrice: '',
                    maxPrice: '',
                    rating: '',
                    availability: 'all'
                  })}
                  className="w-full text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {results ? (
                  `${results.total} product${results.total !== 1 ? 's' : ''} found`
                ) : (
                  'Loading...'
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
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

                {/* View Mode */}
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

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={performSearch}
                  className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Results Grid/List */}
            {results && !loading && !error && (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-6'
              }>
                {results.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex space-x-4 p-4' : 'p-4'
                    }`}
                  >
                    <div className={viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square mb-4'}>
                      <img
                        src={product.images?.[0] || '/images/products/placeholder-product.svg'}
                        alt={product.name}
                        className="w-full h-full object-contain p-2 rounded-lg"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize mb-2">
                        {product.category.replace('-', ' ')}
                      </p>
                      


                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-medium text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </div>
                        <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {product.bestseller && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {results && results.products.length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <Link
                  href="/category/rings"
                  className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800"
                >
                  Browse All Categories
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}