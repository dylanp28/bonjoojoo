'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, Rows3 } from 'lucide-react'
import { ProductGridLuxury } from '@/components/ProductGrid-luxury'
import { Product } from '@/data/products'
import { LuxuryReveal } from '@/components/animations/LuxuryAnimationSystem'

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'newest' | 'rating'
type ViewMode = 'grid' | 'list'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMetals, setSelectedMetals] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const categories = ['rings', 'necklaces', 'earrings', 'bracelets', 'charms']
  const metals = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Sterling Silver', 'Platinum']
  const sizes = ['4', '5', '6', '7', '8', '9', '10', '11']

  const fetchProducts = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setProducts([])
      setFilteredProducts([])
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`/api/inventory/search?q=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()
      setProducts(data.products || [])
      setFilteredProducts(data.products || [])
    } catch (error) {
      console.error('Search failed:', error)
      setProducts([])
      setFilteredProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Search on query change
  useEffect(() => {
    setSearchQuery(query)
    if (query) {
      fetchProducts(query)
    }
  }, [query, fetchProducts])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Apply filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category))
    }

    if (selectedMetals.length > 0) {
      filtered = filtered.filter(p => 
        selectedMetals.some(metal => 
          p.tags.some(tag => tag.toLowerCase().includes(metal.toLowerCase()))
        )
      )
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock)
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
        // Keep relevance order
        break
    }

    setFilteredProducts(filtered)
  }, [products, sortBy, priceRange, selectedCategories, selectedMetals, inStockOnly])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const clearAllFilters = () => {
    setPriceRange([0, 5000])
    setSelectedCategories([])
    setSelectedMetals([])
    setSelectedSizes([])
    setInStockOnly(false)
  }

  const hasActiveFilters = 
    priceRange[0] > 0 || priceRange[1] < 5000 ||
    selectedCategories.length > 0 || 
    selectedMetals.length > 0 || 
    selectedSizes.length > 0 || 
    inStockOnly

  return (
    <div className="search-page-content bg-bj-offwhite">
      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Search Hero */}
      <div className="bg-gradient-to-b from-white to-bj-offwhite py-16 lg:py-24">
        <div className="container-bj text-center">
          <LuxuryReveal direction="up">
            <p className="text-overline text-bj-pink mb-4 tracking-[0.3em]">Discover</p>
            <h1 className="text-display-xl text-bj-black mb-8">Find Your Perfect Piece</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-6">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-bj-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for rings, necklaces, diamonds..."
                  className="w-full pl-16 pr-6 py-4 border-2 border-bj-gray-200 focus:border-bj-black outline-none text-body bg-white transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-bj-gray-400 hover:text-bj-black transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>

            {query && (
              <p className="text-body text-bj-gray-500">
                {loading ? 'Searching...' : `Showing results for "${query}"`}
              </p>
            )}
          </LuxuryReveal>
        </div>
      </div>

      {/* Results Controls */}
      {(query || products.length > 0) && (
        <div className="bg-white border-b border-bj-gray-100">
          <div className="container-bj-wide py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <LuxuryReveal direction="left">
                  <p className="text-caption text-bj-gray-500">
                    {loading ? (
                      'Searching...'
                    ) : (
                      <>
                        Showing <span className="font-medium text-bj-black">{filteredProducts.length}</span> of <span className="font-medium text-bj-black">{products.length}</span> pieces
                        {hasActiveFilters && (
                          <button 
                            onClick={clearAllFilters}
                            className="ml-4 text-bj-pink hover:text-bj-pink-hover transition-colors text-[11px] underline"
                          >
                            Clear filters
                          </button>
                        )}
                      </>
                    )}
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
                        <Rows3 size={16} />
                      </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="appearance-none bg-white border border-bj-gray-200 px-4 py-2 pr-8 text-caption font-medium text-bj-black focus:outline-none focus:border-bj-black"
                      >
                        <option value="relevance">Most Relevant</option>
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
                      className={`flex items-center gap-2 px-4 py-2 border transition-colors text-caption font-medium ${
                        hasActiveFilters
                          ? 'border-bj-black bg-bj-black text-white'
                          : 'border-bj-gray-200 hover:border-bj-black text-bj-black'
                      }`}
                    >
                      <SlidersHorizontal size={14} />
                      <span>Filter</span>
                      {hasActiveFilters && (
                        <span className="bg-white text-bj-black rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold">
                          {[
                            priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0,
                            selectedCategories.length,
                            selectedMetals.length,
                            selectedSizes.length,
                            inStockOnly ? 1 : 0
                          ].reduce((a, b) => a + b, 0)}
                        </span>
                      )}
                    </button>
                  </div>
                </LuxuryReveal>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <LuxuryReveal direction="up" delay={0.1}>
                <div className="mt-8 pt-8 border-t border-bj-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Category Filter */}
                    <div>
                      <h4 className="text-overline text-bj-black mb-4">Category</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center gap-2 text-caption text-bj-gray-500 cursor-pointer hover:text-bj-black transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCategories([...selectedCategories, category])
                                } else {
                                  setSelectedCategories(selectedCategories.filter(c => c !== category))
                                }
                              }}
                              className="w-4 h-4 text-bj-black border-bj-gray-300 rounded focus:ring-bj-black"
                            />
                            <span className="capitalize">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <h4 className="text-overline text-bj-black mb-4">Price Range</h4>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full accent-bj-black"
                        />
                        <div className="flex items-center justify-between text-caption text-bj-gray-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}+</span>
                        </div>
                      </div>
                    </div>

                    {/* Metal Filter */}
                    <div>
                      <h4 className="text-overline text-bj-black mb-4">Metal</h4>
                      <div className="space-y-2">
                        {metals.map((metal) => (
                          <label key={metal} className="flex items-center gap-2 text-caption text-bj-gray-500 cursor-pointer hover:text-bj-black transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedMetals.includes(metal)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedMetals([...selectedMetals, metal])
                                } else {
                                  setSelectedMetals(selectedMetals.filter(m => m !== metal))
                                }
                              }}
                              className="w-4 h-4 text-bj-black border-bj-gray-300 rounded focus:ring-bj-black"
                            />
                            <span>{metal}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Other Filters */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-overline text-bj-black mb-4">Availability</h4>
                        <label className="flex items-center gap-2 text-caption text-bj-gray-500 cursor-pointer hover:text-bj-black transition-colors">
                          <input
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                            className="w-4 h-4 text-bj-black border-bj-gray-300 rounded focus:ring-bj-black"
                          />
                          <span>In Stock Only</span>
                        </label>
                      </div>

                      {/* Ring Size Filter */}
                      <div>
                        <h4 className="text-overline text-bj-black mb-4">Ring Size</h4>
                        <div className="grid grid-cols-4 gap-1">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                if (selectedSizes.includes(size)) {
                                  setSelectedSizes(selectedSizes.filter(s => s !== size))
                                } else {
                                  setSelectedSizes([...selectedSizes, size])
                                }
                              }}
                              className={`aspect-square text-[10px] font-medium transition-all ${
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
                    </div>
                  </div>
                </div>
              </LuxuryReveal>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="py-12">
        {loading ? (
          <div className="container-bj-wide">
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
        ) : query && filteredProducts.length === 0 && products.length === 0 ? (
          // No results for search query
          <LuxuryReveal direction="up">
            <div className="container-bj text-center py-20">
              <h2 className="text-display-sm text-bj-black mb-4">No matches found</h2>
              <p className="text-body text-bj-gray-500 mb-8 max-w-md mx-auto">
                We couldn't find any pieces matching "{query}". Try adjusting your search or browse by category.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={clearAllFilters}
                  className="btn-secondary"
                >
                  Clear All Filters
                </button>
                <Link href="/search" className="btn-primary">
                  Browse All Jewelry
                </Link>
              </div>
            </div>
          </LuxuryReveal>
        ) : query && filteredProducts.length === 0 && products.length > 0 ? (
          // No results after filtering
          <LuxuryReveal direction="up">
            <div className="container-bj text-center py-20">
              <h2 className="text-display-sm text-bj-black mb-4">No pieces match your filters</h2>
              <p className="text-body text-bj-gray-500 mb-8">
                Try adjusting your filters to see more results from your search.
              </p>
              <button 
                onClick={clearAllFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          </LuxuryReveal>
        ) : filteredProducts.length > 0 ? (
          // Show results
          <ProductGridLuxury 
            products={filteredProducts}
            viewMode={viewMode}
          />
        ) : !query ? (
          // No search query - show categories or suggestions
          <LuxuryReveal direction="up">
            <div className="container-bj text-center py-20">
              <h2 className="text-display-sm text-bj-black mb-8">Popular Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category}`}
                    className="group bg-white p-8 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <h3 className="text-body font-medium text-bj-black group-hover:text-bj-gray-500 capitalize transition-colors">
                      {category}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </LuxuryReveal>
        ) : null}
      </div>
    </div>
  )
}