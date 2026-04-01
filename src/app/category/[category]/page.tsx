'use client'

import { Suspense, useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, SlidersHorizontal, ChevronDown, Grid3X3, List, Star, X } from 'lucide-react'
import { Product } from '@/types/product'
import { LuxuryReveal } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'
import { getProductReviews } from '@/data/reviews'

// ─── Filter constants ─────────────────────────────────────────────────────────

const METAL_OPTIONS = ['Gold', 'Silver', 'Rose Gold', 'Mixed'] as const
type MetalOption = typeof METAL_OPTIONS[number]

const PRICE_BUCKETS = [
  { label: '$0–$50', min: 0, max: 50 },
  { label: '$50–$100', min: 50, max: 100 },
  { label: '$100+', min: 100, max: Infinity },
] as const

const OCCASION_OPTIONS = ['Everyday', 'Gift', 'Special Occasion', 'Bridal'] as const
type OccasionOption = typeof OCCASION_OPTIONS[number]

const SORT_OPTIONS = [
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

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

  // Mixed = multiple metals available
  if (metals.size >= 2) metals.add('Mixed')

  // Default: Gold
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

function matchesPriceBucket(price: number, bucketLabel: string): boolean {
  const bucket = PRICE_BUCKETS.find(b => b.label === bucketLabel)
  if (!bucket) return true
  return price >= bucket.min && (bucket.max === Infinity || price <= bucket.max)
}

// ─── Main content ─────────────────────────────────────────────────────────────

function CategoryPageContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()

  const category = ((params?.category ?? '') as string)

  // Read filter state from URL
  const sortBy = searchParams?.get('sort') ?? 'best-selling'
  const selectedMetals = (searchParams?.getAll('metal') ?? []) as MetalOption[]
  const priceBucket = searchParams?.get('price') ?? ''
  const selectedOccasions = (searchParams?.getAll('occasion') ?? []) as OccasionOption[]

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  // Fetch all products for this category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/inventory/search?category=${category}&limit=100`)
        const data = await response.json()
        setAllProducts(data.products || [])
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    if (category) fetchProducts()
  }, [category])

  // ─── URL update helpers ───────────────────────────────────────────────────

  const updateParam = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(searchParams?.toString() ?? '')
    if (value) p.set(key, value)
    else p.delete(key)
    router.push(`/category/${category}?${p.toString()}`, { scroll: false })
  }, [searchParams, router, category])

  const toggleArrayParam = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(searchParams?.toString() ?? '')
    const existing = p.getAll(key)
    p.delete(key)
    if (existing.includes(value)) {
      existing.filter(v => v !== value).forEach(v => p.append(key, v))
    } else {
      [...existing, value].forEach(v => p.append(key, v))
    }
    router.push(`/category/${category}?${p.toString()}`, { scroll: false })
  }, [searchParams, router, category])

  const removeFilterValue = useCallback((key: string, value?: string) => {
    const p = new URLSearchParams(searchParams?.toString() ?? '')
    if (value) {
      const existing = p.getAll(key).filter(v => v !== value)
      p.delete(key)
      existing.forEach(v => p.append(key, v))
    } else {
      p.delete(key)
    }
    router.push(`/category/${category}?${p.toString()}`, { scroll: false })
  }, [searchParams, router, category])

  const clearFilters = useCallback(() => {
    router.push(`/category/${category}`, { scroll: false })
  }, [router, category])

  // ─── Derived state ────────────────────────────────────────────────────────

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    if (selectedMetals.length > 0) {
      filtered = filtered.filter(p =>
        selectedMetals.some(m => getProductMetals(p).includes(m))
      )
    }

    if (priceBucket) {
      filtered = filtered.filter(p => matchesPriceBucket(p.price, priceBucket))
    }

    if (selectedOccasions.length > 0) {
      filtered = filtered.filter(p =>
        selectedOccasions.some(o => getProductOccasions(p).includes(o))
      )
    }

    switch (sortBy) {
      case 'best-selling':
        filtered.sort((a, b) => {
          const aScore = ((a as any).is_bestseller ? 2 : 0) + ((a as any).is_featured ? 1 : 0)
          const bScore = ((b as any).is_bestseller ? 2 : 0) + ((b as any).is_featured ? 1 : 0)
          return bScore - aScore
        })
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        // Preserve DB order (newest first by insertion)
        break
    }

    return filtered
  }, [allProducts, selectedMetals, priceBucket, selectedOccasions, sortBy])

  // Per-filter counts (based on unfiltered product set)
  const filterCounts = useMemo(() => ({
    metals: Object.fromEntries(
      METAL_OPTIONS.map(m => [m, allProducts.filter(p => getProductMetals(p).includes(m)).length])
    ),
    prices: Object.fromEntries(
      PRICE_BUCKETS.map(b => [b.label, allProducts.filter(p => matchesPriceBucket(p.price, b.label)).length])
    ),
    occasions: Object.fromEntries(
      OCCASION_OPTIONS.map(o => [o, allProducts.filter(p => getProductOccasions(p).includes(o)).length])
    ),
  }), [allProducts])

  const activeChips = useMemo(() => [
    ...selectedMetals.map(m => ({ label: m, onRemove: () => removeFilterValue('metal', m) })),
    ...(priceBucket ? [{ label: priceBucket, onRemove: () => removeFilterValue('price') }] : []),
    ...selectedOccasions.map(o => ({ label: o, onRemove: () => removeFilterValue('occasion', o) })),
  ], [selectedMetals, priceBucket, selectedOccasions, removeFilterValue])

  const hasActiveFilters = activeChips.length > 0

  // ─── Event handlers ───────────────────────────────────────────────────────

  const toggleWishlist = (productId: string) => {
    const next = new Set(wishlist)
    if (next.has(productId)) next.delete(productId)
    else next.add(productId)
    setWishlist(next)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''

  // ─── Loading skeleton ─────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-bj-offwhite">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="bg-white border-b border-bj-gray-100">
          <div className="container-bj-wide py-16">
            <div className="loading-shimmer h-12 w-64 mx-auto mb-4"></div>
            <div className="loading-shimmer h-6 w-32 mx-auto"></div>
          </div>
        </div>
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

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="category-page-content bg-bj-offwhite">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Breadcrumb */}
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
            {category === 'rings' && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <Link href="/help/sizing" className="text-[12px] text-bj-gray-500 hover:text-bj-black underline underline-offset-2 transition-colors">
                  Ring Size Guide
                </Link>
                <span className="text-bj-gray-300">·</span>
                <span className="text-[12px] text-bj-gray-500">Free resize within 30 days</span>
              </div>
            )}
          </LuxuryReveal>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white border-b border-bj-gray-100">
        <div className="container-bj-wide py-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Count */}
            <LuxuryReveal direction="left">
              <p className="text-caption text-bj-gray-500">
                Showing{' '}
                <span className="font-medium text-bj-black">{filteredProducts.length}</span>
                {' '}of{' '}
                <span className="font-medium text-bj-black">{allProducts.length}</span> pieces
              </p>
            </LuxuryReveal>

            {/* Controls */}
            <LuxuryReveal direction="right">
              <div className="flex items-center gap-3">
                {/* View mode */}
                <div className="flex border border-bj-gray-200 rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-bj-black text-white' : 'bg-white text-bj-gray-400 hover:text-bj-black'}`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-bj-black text-white' : 'bg-white text-bj-gray-400 hover:text-bj-black'}`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => updateParam('sort', e.target.value === 'best-selling' ? '' : e.target.value)}
                    className="appearance-none bg-white border border-bj-gray-200 px-4 py-2 pr-8 text-caption font-medium text-bj-black focus:outline-none focus:border-bj-black cursor-pointer"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-bj-gray-400 pointer-events-none" />
                </div>

                {/* Filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 border transition-colors text-caption font-medium ${showFilters ? 'bg-bj-black text-white border-bj-black' : 'bg-white text-bj-black border-bj-gray-200 hover:border-bj-black'}`}
                >
                  <SlidersHorizontal size={14} />
                  <span>Filter</span>
                  {hasActiveFilters && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-bj-pink text-white text-[10px] font-bold flex items-center justify-center">
                      {activeChips.length}
                    </span>
                  )}
                </button>
              </div>
            </LuxuryReveal>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-bj-gray-100">
              <span className="text-[11px] text-bj-gray-400 uppercase tracking-wider">Active:</span>
              {activeChips.map((chip, i) => (
                <button
                  key={i}
                  onClick={chip.onRemove}
                  className="flex items-center gap-1.5 px-3 py-1 bg-bj-black text-white text-[11px] font-medium tracking-wide hover:bg-bj-gray-700 transition-colors"
                >
                  {chip.label}
                  <X size={10} />
                </button>
              ))}
              <button
                onClick={clearFilters}
                className="text-[11px] text-bj-pink hover:text-bj-black underline underline-offset-2 transition-colors ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Filter panel */}
          {showFilters && (
            <LuxuryReveal direction="up" delay={0.05}>
              <div className="mt-5 pt-5 border-t border-bj-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Metal type */}
                <div>
                  <h4 className="text-overline text-bj-black mb-3">Metal Type</h4>
                  <div className="space-y-2">
                    {METAL_OPTIONS.map(metal => (
                      <label key={metal} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedMetals.includes(metal) ? 'bg-bj-black border-bj-black' : 'bg-white border-bj-gray-300 group-hover:border-bj-black'}`}
                            onClick={() => toggleArrayParam('metal', metal)}
                          >
                            {selectedMetals.includes(metal) && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span
                            className="text-caption text-bj-gray-600 group-hover:text-bj-black transition-colors"
                            onClick={() => toggleArrayParam('metal', metal)}
                          >
                            {metal}
                          </span>
                        </div>
                        <span className="text-[11px] text-bj-gray-400">({filterCounts.metals[metal] ?? 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <h4 className="text-overline text-bj-black mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${!priceBucket ? 'bg-bj-black border-bj-black' : 'bg-white border-bj-gray-300 group-hover:border-bj-black'}`}
                          onClick={() => updateParam('price', '')}
                        >
                          {!priceBucket && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-caption text-bj-gray-600 group-hover:text-bj-black transition-colors" onClick={() => updateParam('price', '')}>
                          Any price
                        </span>
                      </div>
                      <span className="text-[11px] text-bj-gray-400">({allProducts.length})</span>
                    </label>
                    {PRICE_BUCKETS.map(bucket => (
                      <label key={bucket.label} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${priceBucket === bucket.label ? 'bg-bj-black border-bj-black' : 'bg-white border-bj-gray-300 group-hover:border-bj-black'}`}
                            onClick={() => updateParam('price', priceBucket === bucket.label ? '' : bucket.label)}
                          >
                            {priceBucket === bucket.label && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span
                            className="text-caption text-bj-gray-600 group-hover:text-bj-black transition-colors"
                            onClick={() => updateParam('price', priceBucket === bucket.label ? '' : bucket.label)}
                          >
                            {bucket.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-bj-gray-400">({filterCounts.prices[bucket.label] ?? 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <h4 className="text-overline text-bj-black mb-3">Occasion</h4>
                  <div className="space-y-2">
                    {OCCASION_OPTIONS.map(occ => (
                      <label key={occ} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedOccasions.includes(occ) ? 'bg-bj-black border-bj-black' : 'bg-white border-bj-gray-300 group-hover:border-bj-black'}`}
                            onClick={() => toggleArrayParam('occasion', occ)}
                          >
                            {selectedOccasions.includes(occ) && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span
                            className="text-caption text-bj-gray-600 group-hover:text-bj-black transition-colors"
                            onClick={() => toggleArrayParam('occasion', occ)}
                          >
                            {occ}
                          </span>
                        </div>
                        <span className="text-[11px] text-bj-gray-400">({filterCounts.occasions[occ] ?? 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h4 className="text-overline text-bj-black mb-3">Category</h4>
                  <div className="space-y-2">
                    {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Charms', 'Bundles'].map(cat => (
                      <Link
                        key={cat}
                        href={`/category/${cat.toLowerCase()}`}
                        className={`flex items-center gap-2 text-caption transition-colors ${cat.toLowerCase() === category ? 'text-bj-black font-semibold' : 'text-bj-gray-500 hover:text-bj-black'}`}
                      >
                        <span className={`w-1 h-1 rounded-full ${cat.toLowerCase() === category ? 'bg-bj-pink' : 'bg-bj-gray-300'}`} />
                        {cat}
                      </Link>
                    ))}
                  </div>
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
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'space-y-8'
            }
          >
            {filteredProducts.map(product => (
              <PandoraStaggerItem key={product.id}>
                {viewMode === 'grid' ? (
                  // Grid view
                  <Link href={`/product/${product.id}`} className="group product-card block">
                    <div className={`product-image-container relative aspect-[4/5] mb-4 overflow-hidden ${(product as any).availability_status === 'sold_out' ? 'bg-bj-gray-100' : 'bg-white'}`}>
                      <Image
                        src={product.images?.[0] || '/images/products/placeholder-product.svg'}
                        alt={product.name}
                        fill
                        className={`object-contain p-4 product-card-img img-editorial transition-all ${(product as any).availability_status === 'sold_out' ? 'opacity-40 grayscale' : ''}`}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {(product as any).availability_status === 'sold_out' ? (
                          <span className="bg-bj-gray-500 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">Sold Out</span>
                        ) : (product as any).availability_status === 'low_stock' ? (
                          <span className="bg-amber-500 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">
                            Only {(product as any).stockCount || 'few'} left
                          </span>
                        ) : (
                          <>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="bg-bj-pink text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">Sale</span>
                            )}
                            {(product as any).is_bestseller && !product.originalPrice && (
                              <span className="bg-bj-black text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">Best Seller</span>
                            )}
                            {category === 'rings' && (
                              <span className="bg-white/90 text-bj-black text-[9px] font-medium tracking-wider uppercase px-2 py-1 border border-bj-gray-200">Free Resize</span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Wishlist */}
                      <button
                        onClick={e => { e.preventDefault(); toggleWishlist(product.id) }}
                        className="wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                      >
                        <Heart
                          size={14}
                          className={`transition-colors ${wishlist.has(product.id) ? 'text-bj-pink fill-current' : 'text-bj-gray-500 hover:text-bj-pink'}`}
                          strokeWidth={1.5}
                        />
                      </button>

                      {/* Quick Add */}
                      {(product as any).availability_status !== 'sold_out' && (
                        <div className="quick-add absolute bottom-0 left-0 right-0">
                          <button
                            onClick={e => { e.preventDefault() }}
                            className="w-full py-3 bg-bj-black/90 backdrop-blur-sm text-white text-[10px] font-medium tracking-[0.15em] uppercase hover:bg-bj-black transition-colors"
                          >
                            Quick Add
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="space-y-2">
                      <h3 className="text-caption font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {(() => {
                        const r = getProductReviews(product.id)
                        return (
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={11} className={s <= Math.round(r.averageRating) ? 'text-[#C9A84C] fill-current' : 'text-bj-gray-300'} />
                              ))}
                            </div>
                            <span className="text-[11px] text-bj-gray-400">({r.totalReviews})</span>
                          </div>
                        )
                      })()}

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
                      {category === 'rings' && (
                        <p className="text-[10px] text-bj-gray-400">US 4–12 available · Free resize</p>
                      )}
                    </div>
                  </Link>
                ) : (
                  // List view
                  <Link href={`/product/${product.id}`} className="group flex gap-6 bg-white p-6 hover:shadow-lg transition-all duration-300">
                    <div className="relative w-32 h-32 bg-bj-gray-50 flex-shrink-0 overflow-hidden">
                      <Image
                        src={product.images?.[0] || '/images/products/placeholder-product.svg'}
                        alt={product.name}
                        fill
                        className="object-contain p-2 img-editorial"
                        onError={e => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-body font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors">
                          {product.name}
                        </h3>
                        {(() => {
                          const r = getProductReviews(product.id)
                          return (
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map(s => (
                                  <Star key={s} size={12} className={s <= Math.round(r.averageRating) ? 'text-[#C9A84C] fill-current' : 'text-bj-gray-300'} />
                                ))}
                              </div>
                              <span className="text-[11px] text-bj-gray-400">{r.averageRating} ({r.totalReviews})</span>
                            </div>
                          )
                        })()}
                      </div>
                      <p className="text-caption text-bj-gray-500 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-body font-medium text-bj-black">{formatPrice(product.price)}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-caption text-bj-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        <button
                          onClick={e => { e.preventDefault(); toggleWishlist(product.id) }}
                          className="p-2 rounded-full border border-bj-gray-200 hover:border-bj-black transition-colors"
                        >
                          <Heart size={16} className={wishlist.has(product.id) ? 'text-bj-pink fill-current' : 'text-bj-gray-500'} />
                        </button>
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
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-primary mb-4">
                  Clear Filters
                </button>
              )}
              <Link href="/search" className="btn-secondary">
                Explore All Jewelry
              </Link>
            </div>
          </LuxuryReveal>
        )}
      </div>

      {/* Category education */}
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

// ─── Page export (Suspense wrapper required for useSearchParams) ──────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-bj-offwhite">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="bg-white border-b border-bj-gray-100">
        <div className="container-bj-wide py-16">
          <div className="loading-shimmer h-12 w-64 mx-auto mb-4"></div>
          <div className="loading-shimmer h-6 w-32 mx-auto"></div>
        </div>
      </div>
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

export default function CategoryPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CategoryPageContent />
    </Suspense>
  )
}
