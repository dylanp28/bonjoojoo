'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Grid, List, Heart } from 'lucide-react'
import type { Product } from '@/types/product'

interface SearchResponse {
  products: Product[]
  total: number
  hasMore: boolean
}

const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1000', label: '$500 – $1,000' },
  { value: '1000-2000', label: '$1,000 – $2,000' },
  { value: '2000-plus', label: '$2,000+' },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
]

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'rings', label: 'Rings' },
  { value: 'necklaces', label: 'Necklaces' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'charms', label: 'Charms' },
]

function buildApiParams(
  query: string,
  sortBy: string,
  category: string,
  priceRange: string,
  availability: string
): string {
  const params = new URLSearchParams()
  if (query) params.set('q', query)

  if (sortBy === 'price-asc') {
    params.set('sortBy', 'price')
    params.set('sortOrder', 'asc')
  } else if (sortBy === 'price-desc') {
    params.set('sortBy', 'price')
    params.set('sortOrder', 'desc')
  } else if (sortBy === 'newest') {
    params.set('sortBy', 'newest')
  } else if (sortBy === 'popular') {
    params.set('sortBy', 'popular')
  } else {
    params.set('sortBy', 'name')
  }

  if (priceRange === 'under-500') {
    params.set('maxPrice', '500')
  } else if (priceRange === '500-1000') {
    params.set('minPrice', '500')
    params.set('maxPrice', '1000')
  } else if (priceRange === '1000-2000') {
    params.set('minPrice', '1000')
    params.set('maxPrice', '2000')
  } else if (priceRange === '2000-plus') {
    params.set('minPrice', '2000')
  }

  if (category) params.set('category', category)
  if (availability === 'inStock') params.set('inStock', 'true')
  params.set('limit', '24')
  return params.toString()
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''
  const sortBy = searchParams.get('sort') || 'relevance'
  const category = searchParams.get('category') || ''
  const priceRange = searchParams.get('price') || ''
  const availability = searchParams.get('availability') || 'all'

  const [results, setResults] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const hasActiveFilters = Boolean(category || priceRange || availability !== 'all')

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/search?${params.toString()}`)
  }, [searchParams, router])

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (sortBy && sortBy !== 'relevance') params.set('sort', sortBy)
    router.push(`/search?${params.toString()}`)
  }, [query, sortBy, router])

  const performSearch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const apiParams = buildApiParams(query, sortBy, category, priceRange, availability)
      const response = await fetch(`/api/inventory/search?${apiParams}`)
      if (!response.ok) throw new Error('Search failed')
      const data = await response.json()
      setResults(data)
    } catch {
      setError('Failed to load search results. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [query, sortBy, category, priceRange, availability])

  useEffect(() => {
    performSearch()
  }, [performSearch])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          {query ? (
            <h1 className="text-2xl font-light text-gray-900">
              Search results for &ldquo;<span className="font-medium">{query}</span>&rdquo;
            </h1>
          ) : (
            <h1 className="text-2xl font-light text-gray-900">All Products</h1>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => updateParam('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {PRICE_RANGES.map(range => (
                      <label key={range.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={priceRange === range.value}
                          onChange={() => updateParam('price', range.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => updateParam('availability', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Items</option>
                    <option value="inStock">In Stock Only</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Results area */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {loading
                  ? 'Loading...'
                  : results
                    ? `${results.total} product${results.total !== 1 ? 's' : ''} found`
                    : ''}
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            )}

            {/* Error */}
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

            {/* Product grid / list */}
            {results && !loading && !error && results.products.length > 0 && (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
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
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg'
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize mb-2">
                        {product.category?.replace('-', ' ')}
                      </p>

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
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Add to wishlist"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {product.is_bestseller && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No results */}
            {results && results.products.length === 0 && !loading && !error && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">&#128142;</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {query ? `No results for "${query}"` : 'No products match your filters'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {hasActiveFilters
                    ? 'Try removing some filters to see more results.'
                    : 'Try a different search term or browse our collections below.'}
                </p>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mb-6 px-6 py-2 border border-gray-900 text-gray-900 rounded hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                )}

                <div className="flex flex-wrap justify-center gap-3">
                  {CATEGORIES.slice(1).map(cat => (
                    <Link
                      key={cat.value}
                      href={`/category/${cat.value}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}
