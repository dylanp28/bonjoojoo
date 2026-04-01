'use client'

import { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, List, Heart, SlidersHorizontal, X } from 'lucide-react'
import type { Product } from '@/types/product'

interface SearchResponse {
  products: Product[]
  total: number
  hasMore: boolean
}

// ─── Filter constants ─────────────────────────────────────────────────────────

const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: 'under-50', label: 'Under $50' },
  { value: '50-100', label: '$50 – $100' },
  { value: '100-plus', label: '$100+' },
]

const SORT_OPTIONS = [
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'relevance', label: 'Relevance' },
]

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'rings', label: 'Rings' },
  { value: 'necklaces', label: 'Necklaces' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'charms', label: 'Charms' },
  { value: 'bundles', label: 'Bundles' },
]

const METAL_OPTIONS = ['Gold', 'Silver', 'Rose Gold', 'Mixed'] as const
type MetalOption = typeof METAL_OPTIONS[number]

const OCCASION_OPTIONS = ['Everyday', 'Gift', 'Special Occasion', 'Bridal'] as const
type OccasionOption = typeof OCCASION_OPTIONS[number]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProductMetals(product: Product): MetalOption[] {
  const metals = new Set<MetalOption>()
  const variants: Array<{ metal?: string }> = (product as any).variants || []

  const hasYellow = variants.some(v => v.metal?.includes('Yellow'))
  const hasRose = variants.some(v => v.metal?.includes('Rose'))
  const hasWhite = variants.some(v => v.metal?.includes('White'))

  if (hasYellow || product.tags.includes('gold')) metals.add('Gold')
  if (hasRose) metals.add('Rose Gold')
  if (hasWhite) metals.add('Silver')

  if (metals.size >= 2) metals.add('Mixed')
  if (metals.size === 0) metals.add('Gold')

  return Array.from(metals)
}

function getProductOccasions(product: Product): OccasionOption[] {
  const occ = new Set<OccasionOption>()
  const tags = product.tags

  if (tags.some(t => ['classic', 'refined', 'contemporary', 'modern', 'elegant'].includes(t)))
    occ.add('Everyday')
  if (tags.some(t => ['bestseller', 'premium'].includes(t)))
    occ.add('Gift')
  if (tags.some(t => ['luxury', 'signature', 'statement', 'sophisticated', 'designer'].includes(t)))
    occ.add('Special Occasion')
  if (tags.some(t => ['eternity'].includes(t)))
    occ.add('Bridal')

  if (occ.size === 0) {
    occ.add('Everyday')
    occ.add('Gift')
  }

  return Array.from(occ)
}

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
  } else if (sortBy === 'best-selling') {
    params.set('sortBy', 'popular')
    params.set('sortOrder', 'desc')
  } else {
    params.set('sortBy', 'name')
  }

  if (priceRange === 'under-50') {
    params.set('maxPrice', '50')
  } else if (priceRange === '50-100') {
    params.set('minPrice', '50')
    params.set('maxPrice', '100')
  } else if (priceRange === '100-plus') {
    params.set('minPrice', '100')
  }

  if (category) params.set('category', category)
  if (availability === 'inStock') params.set('inStock', 'true')
  params.set('limit', '100')
  return params.toString()
}

// ─── Search page content ──────────────────────────────────────────────────────

function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams?.get('q') ?? ''
  const sortBy = searchParams?.get('sort') ?? 'best-selling'
  const category = searchParams?.get('category') ?? ''
  const priceRange = searchParams?.get('price') ?? ''
  const availability = searchParams?.get('availability') ?? 'all'
  const selectedMetals = (searchParams?.getAll('metal') ?? []) as MetalOption[]
  const selectedOccasions = (searchParams?.getAll('occasion') ?? []) as OccasionOption[]

  const [allApiResults, setAllApiResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // ─── URL helpers ────────────────────────────────────────────────────────────

  const updateParam = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(searchParams?.toString() ?? '')
    if (value) p.set(key, value)
    else p.delete(key)
    router.push(`/search?${p.toString()}`)
  }, [searchParams, router])

  const toggleArrayParam = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(searchParams?.toString() ?? '')
    const existing = p.getAll(key)
    p.delete(key)
    if (existing.includes(value)) {
      existing.filter(v => v !== value).forEach(v => p.append(key, v))
    } else {
      [...existing, value].forEach(v => p.append(key, v))
    }
    router.push(`/search?${p.toString()}`)
  }, [searchParams, router])

  const removeFilterValue = useCallback((key: string, value?: string) => {
    const p = new URLSearchParams(searchParams?.toString() ?? '')
    if (value) {
      const existing = p.getAll(key).filter(v => v !== value)
      p.delete(key)
      existing.forEach(v => p.append(key, v))
    } else {
      p.delete(key)
    }
    router.push(`/search?${p.toString()}`)
  }, [searchParams, router])

  const clearFilters = useCallback(() => {
    const p = new URLSearchParams()
    if (query) p.set('q', query)
    router.push(`/search?${p.toString()}`)
  }, [query, router])

  // ─── Fetch products ──────────────────────────────────────────────────────────

  const performSearch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const apiParams = buildApiParams(query, sortBy, category, priceRange, availability)
      const response = await fetch(`/api/inventory/search?${apiParams}`)
      if (!response.ok) throw new Error('Search failed')
      const data: SearchResponse = await response.json()
      setAllApiResults(data.products || [])
    } catch {
      setError('Failed to load search results. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [query, sortBy, category, priceRange, availability])

  useEffect(() => {
    performSearch()
  }, [performSearch])

  // ─── Client-side metal + occasion filtering ──────────────────────────────────

  const filteredProducts = useMemo(() => {
    let filtered = [...allApiResults]

    if (selectedMetals.length > 0) {
      filtered = filtered.filter(p =>
        selectedMetals.some(m => getProductMetals(p).includes(m))
      )
    }

    if (selectedOccasions.length > 0) {
      filtered = filtered.filter(p =>
        selectedOccasions.some(o => getProductOccasions(p).includes(o))
      )
    }

    return filtered
  }, [allApiResults, selectedMetals, selectedOccasions])

  // Per-filter counts (from the API result set)
  const filterCounts = useMemo(() => ({
    metals: Object.fromEntries(
      METAL_OPTIONS.map(m => [m, allApiResults.filter(p => getProductMetals(p).includes(m)).length])
    ),
    occasions: Object.fromEntries(
      OCCASION_OPTIONS.map(o => [o, allApiResults.filter(p => getProductOccasions(p).includes(o)).length])
    ),
  }), [allApiResults])

  // Active filter chips
  const activeChips = useMemo(() => {
    const chips: Array<{ label: string; onRemove: () => void }> = []
    if (category) {
      const cat = CATEGORIES.find(c => c.value === category)
      chips.push({ label: cat?.label || category, onRemove: () => updateParam('category', '') })
    }
    if (priceRange) {
      const pr = PRICE_RANGES.find(r => r.value === priceRange)
      chips.push({ label: pr?.label || priceRange, onRemove: () => updateParam('price', '') })
    }
    if (availability === 'inStock') {
      chips.push({ label: 'In Stock', onRemove: () => updateParam('availability', '') })
    }
    selectedMetals.forEach(m => chips.push({ label: m, onRemove: () => removeFilterValue('metal', m) }))
    selectedOccasions.forEach(o => chips.push({ label: o, onRemove: () => removeFilterValue('occasion', o) }))
    return chips
  }, [category, priceRange, availability, selectedMetals, selectedOccasions, updateParam, removeFilterValue])

  const hasActiveFilters = activeChips.length > 0

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

  return (
    <div className="bg-white min-h-screen">
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
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-gray-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-1.5 mb-5 pb-5 border-b border-gray-100">
                  {activeChips.map((chip, i) => (
                    <button
                      key={i}
                      onClick={chip.onRemove}
                      className="flex items-center gap-1 px-2.5 py-1 bg-gray-900 text-white text-[11px] font-medium rounded-full hover:bg-gray-700 transition-colors"
                    >
                      {chip.label}
                      <X size={9} />
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Category
                  </label>
                  <div className="space-y-1.5">
                    {CATEGORIES.map(cat => (
                      <label key={cat.value} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={category === cat.value}
                          onChange={() => updateParam('category', cat.value)}
                          className="w-3.5 h-3.5 text-gray-900 border-gray-300 focus:ring-gray-900"
                        />
                        <span className={`text-sm transition-colors ${category === cat.value ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {cat.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-1.5">
                    {PRICE_RANGES.map(range => (
                      <label key={range.value} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={priceRange === range.value}
                          onChange={() => updateParam('price', range.value)}
                          className="w-3.5 h-3.5 text-gray-900 border-gray-300 focus:ring-gray-900"
                        />
                        <span className={`text-sm transition-colors ${priceRange === range.value ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Metal Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Metal Type
                  </label>
                  <div className="space-y-1.5">
                    {METAL_OPTIONS.map(metal => (
                      <label key={metal} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedMetals.includes(metal)}
                            onChange={() => toggleArrayParam('metal', metal)}
                            className="w-3.5 h-3.5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                          />
                          <span className={`text-sm transition-colors ${selectedMetals.includes(metal) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                            {metal}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400">({filterCounts.metals[metal] ?? 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Occasion
                  </label>
                  <div className="space-y-1.5">
                    {OCCASION_OPTIONS.map(occ => (
                      <label key={occ} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedOccasions.includes(occ)}
                            onChange={() => toggleArrayParam('occasion', occ)}
                            className="w-3.5 h-3.5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                          />
                          <span className={`text-sm transition-colors ${selectedOccasions.includes(occ) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                            {occ}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400">({filterCounts.occasions[occ] ?? 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={e => updateParam('availability', e.target.value)}
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
                  : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found${allApiResults.length !== filteredProducts.length ? ` (filtered from ${allApiResults.length})` : ''}`}
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={sortBy}
                  onChange={e => updateParam('sort', e.target.value === 'best-selling' ? '' : e.target.value)}
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
            {filteredProducts.length > 0 && !loading && !error && (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex space-x-4 p-4' : 'p-4'}`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square mb-4'}`}>
                      <Image
                        src={product.images?.[0] || '/images/products/placeholder-product.svg'}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-contain p-4"
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
                          onClick={e => e.preventDefault()}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {(product as any).is_bestseller && (
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
            {!loading && !error && filteredProducts.length === 0 && (
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
      <div className="min-h-screen bg-white flex items-center justify-center">
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
