'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, Share2, Minus, Plus, ShoppingBag, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, Check, Star, CheckCircle2, RefreshCw, Gift, Phone, Bell, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { useWishlist } from '@/store/useWishlist'
import { ProductWithVariants, ProductVariant } from '@/types/product'
import { LuxuryReveal, LuxuryParallax } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'
import { getProductReviews, type ProductReviews } from '@/data/reviews'
import RingSizeGuideModal from '@/components/RingSizeGuideModal'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import RecentlyViewedRow from '@/components/RecentlyViewedRow'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const [product, setProduct] = useState<ProductWithVariants | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductWithVariants[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [wishlistToast, setWishlistToast] = useState<'added' | 'removed' | null>(null)
  const [shareToast, setShareToast] = useState(false)
  const [reviews, setReviews] = useState<ProductReviews | null>(null)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [crossSellProducts, setCrossSellProducts] = useState<ProductWithVariants[]>([])
  const [alsoViewedProducts, setAlsoViewedProducts] = useState<ProductWithVariants[]>([])
  const [viewerCount, setViewerCount] = useState(0)
  const [shippingCountdown, setShippingCountdown] = useState('')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySubmitted, setNotifySubmitted] = useState(false)
  const [notifyError, setNotifyError] = useState('')

  const addItem = useCart(state => state.addItem)
  const { isWishlisted: checkWishlisted, toggleItem: toggleWishlistItem } = useWishlist()
  const addRecentlyViewed = useRecentlyViewed((s) => s.addProduct)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return
      
      try {
        setLoading(true)
        const response = await fetch(`/api/inventory/product/${productId}`)
        
        if (!response.ok) {
          throw new Error('Product not found')
        }
        
        const data = await response.json()
        setProduct(data.product)
        setRelatedProducts(data.relatedProducts || [])
        
        // Set default variant if product has variants
        if (data.product.variants && data.product.variants.length > 0) {
          const defaultVariant = data.product.variants.find(v => 
            v.id === data.product.id + '-y' || v.id.includes('yellow')
          ) || data.product.variants[0]
          setSelectedVariant(defaultVariant)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  // Load reviews when productId is available
  useEffect(() => {
    if (productId) {
      setReviews(getProductReviews(productId))
    }
  }, [productId])

  // Track recently viewed + fetch cross-sell/also-bought products
  useEffect(() => {
    if (!product) return

    // Track this view
    addRecentlyViewed({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      category: product.category,
    })

    // Determine pairing categories for "Complete the Look"
    const pairingCategoryMap: Record<string, string[]> = {
      rings: ['necklaces', 'earrings'],
      necklaces: ['earrings', 'bracelets'],
      bracelets: ['necklaces', 'earrings'],
      earrings: ['necklaces', 'bracelets'],
    }
    const pairingCategories = pairingCategoryMap[product.category] || []

    const fetchCrossSell = async () => {
      if (pairingCategories.length === 0) return
      try {
        const responses = await Promise.all(
          pairingCategories.map((cat) =>
            fetch(`/api/inventory/search?category=${cat}&limit=2`).then((r) => r.json())
          )
        )
        const combined: ProductWithVariants[] = responses
          .flatMap((r) => r.products || [])
          .slice(0, 3)
        setCrossSellProducts(combined)
      } catch {
        // silently ignore
      }
    }

    // Fetch "Customers Also Bought" — same category, skip first 4 (already in related)
    const fetchAlsoBought = async () => {
      try {
        const r = await fetch(`/api/inventory/search?category=${product.category}&limit=8`)
        const data = await r.json()
        const all: ProductWithVariants[] = data.products || []
        // Skip products already shown in related products section
        const relatedIds = new Set(relatedProducts.map((p) => p.id))
        relatedIds.add(product.id)
        const candidates = all.filter((p) => !relatedIds.has(p.id)).slice(0, 4)
        setAlsoViewedProducts(candidates)
      } catch {
        // silently ignore
      }
    }

    fetchCrossSell()
    fetchAlsoBought()
  }, [product, addRecentlyViewed]) // eslint-disable-line react-hooks/exhaustive-deps

  // Viewer count — random 3-12, refreshes every 30s
  useEffect(() => {
    const randomCount = () => Math.floor(Math.random() * 10) + 3
    setViewerCount(randomCount())
    const interval = setInterval(() => setViewerCount(randomCount()), 30000)
    return () => clearInterval(interval)
  }, [])

  // Shipping countdown to 5pm ET (22:00 UTC)
  const getCountdown = useCallback(() => {
    const now = new Date()
    const cutoff = new Date()
    cutoff.setUTCHours(22, 0, 0, 0) // 5pm ET = 22:00 UTC (EST; 21:00 during EDT)
    if (now >= cutoff) cutoff.setUTCDate(cutoff.getUTCDate() + 1)
    const diff = cutoff.getTime() - now.getTime()
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [])

  useEffect(() => {
    setShippingCountdown(getCountdown())
    const interval = setInterval(() => setShippingCountdown(getCountdown()), 1000)
    return () => clearInterval(interval)
  }, [getCountdown])

  // Notify Me handler
  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const email = notifyEmail.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotifyError('Please enter a valid email address.')
      return
    }
    try {
      const key = `bonjoojoo_notify_${productId}`
      const list = JSON.parse(localStorage.getItem(key) || '[]') as string[]
      if (!list.includes(email)) localStorage.setItem(key, JSON.stringify([...list, email]))
    } catch { /* localStorage unavailable */ }
    setNotifySubmitted(true)
    setNotifyError('')
  }

  // Handle variant selection
  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant)
    setSelectedImage(0) // Reset to first image of new variant
  }

  // Get current images based on variant selection
  const getCurrentImages = () => {
    if (selectedVariant && selectedVariant.images.length > 0) {
      return selectedVariant.images
    }
    return product?.images || []
  }

  // Get current price based on variant selection
  const getCurrentPrice = () => {
    if (selectedVariant && selectedVariant.price) {
      return selectedVariant.price
    }
    return product?.price || 0
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-bj-offwhite flex items-center justify-center">
        <div className="text-center">
          <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-6"></div>
          <p className="text-body text-bj-gray-500">Loading luxury experience...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-bj-offwhite flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <LuxuryReveal direction="up">
            <h1 className="text-display-md text-bj-black mb-4">Piece Not Found</h1>
            <p className="text-body mb-8">This exquisite piece seems to have found another home. Explore our jewelry categories to discover something equally beautiful.</p>
            <button 
              onClick={() => router.push('/search')}
              className="btn-primary"
            >
              Browse Categories
            </button>
          </LuxuryReveal>
        </div>
      </div>
    )
  }

  const isWishlisted = product ? checkWishlisted(product.id) : false

  const handleAddToCart = () => {
    const productForCart = {
      ...product,
      // Use variant ID so different metals are separate cart items
      id: selectedVariant?.id || product.id,
      name: selectedVariant ? `${product.name} — ${selectedVariant.name}` : product.name,
      price: getCurrentPrice(),
      images: selectedVariant?.images?.length ? selectedVariant.images : product.images,
    }
    const options: { size?: string } = {}
    if (selectedSize) options.size = selectedSize
    for (let i = 0; i < quantity; i++) {
      addItem(productForCart, options)
    }
  }

  const handleWishlistToggle = () => {
    if (!product) return
    const wasWishlisted = checkWishlisted(product.id)
    toggleWishlistItem({
      id: product.id,
      name: product.name,
      price: getCurrentPrice(),
      originalPrice: product.compare_at_price,
      image: product.images?.[0] || '/images/products/placeholder-product.svg',
      category: product.category,
    })
    setWishlistToast(wasWishlisted ? 'removed' : 'added')
    setTimeout(() => setWishlistToast(null), 2500)
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: product?.name, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShareToast(true)
        setTimeout(() => setShareToast(false), 2500)
      }
    } catch {
      await navigator.clipboard.writeText(url)
      setShareToast(true)
      setTimeout(() => setShareToast(false), 2500)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const sizes = ['4', '5', '6', '7', '8', '9', '10', '11'] // Ring sizes
  const currentImages = getCurrentImages()
  const currentPrice = getCurrentPrice()

  return (
    <div className="product-page-content bg-bj-offwhite">
      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Ring Size Guide Modal */}
      <RingSizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        highlightSize={selectedSize}
        onSizeSelect={(size) => {
          setSelectedSize(size)
          setSizeGuideOpen(false)
        }}
      />

      {/* Wishlist toast */}
      {wishlistToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-bj-black text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium animate-fade-in-up">
          <Heart size={15} className={wishlistToast === 'added' ? 'fill-bj-pink text-bj-pink' : 'text-white'} />
          {wishlistToast === 'added' ? 'Added to wishlist' : 'Removed from wishlist'}
        </div>
      )}

      {/* Share toast */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-bj-black text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium animate-fade-in-up">
          <Check size={15} className="text-green-400" />
          Link copied to clipboard
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-bj-gray-100 py-4">
        <div className="container-bj-wide">
          <nav className="flex items-center space-x-3 text-[13px] overflow-hidden">
            <button onClick={() => router.push('/')} className="text-bj-gray-400 hover:text-bj-black transition-colors flex-shrink-0">Home</button>
            <span className="text-bj-gray-300 flex-shrink-0">/</span>
            <button onClick={() => router.push(`/category/${product.category}`)} className="text-bj-gray-400 hover:text-bj-black transition-colors capitalize flex-shrink-0">
              {product.category}
            </button>
            <span className="text-bj-gray-300 flex-shrink-0">/</span>
            <span className="text-bj-black font-medium truncate min-w-0">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-bj-wide py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <LuxuryReveal direction="left" className="relative aspect-square bg-white overflow-hidden">
              <Image
                src={currentImages?.[selectedImage] || '/images/products/placeholder-product.svg'}
                alt={`${product.name} - ${selectedVariant?.name || 'Main'}`}
                fill
                className="object-contain p-6 img-editorial"
                priority={selectedImage === 0}
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
              />
              
              {/* Image Navigation */}
              {currentImages && currentImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300"
                    disabled={selectedImage === 0}
                  >
                    <ChevronLeft size={20} className="text-bj-black" />
                  </button>
                  <button 
                    onClick={() => setSelectedImage(Math.min(currentImages.length - 1, selectedImage + 1))}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300"
                    disabled={selectedImage === currentImages.length - 1}
                  >
                    <ChevronRight size={20} className="text-bj-black" />
                  </button>
                </>
              )}
              
              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {currentImages?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === selectedImage ? 'bg-bj-black' : 'bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </LuxuryReveal>
            
            {/* Thumbnail Images */}
            {currentImages && currentImages.length > 1 && (
              <LuxuryReveal direction="left" delay={0.2}>
                <div className="grid grid-cols-4 gap-3">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden transition-all duration-300 ${
                        index === selectedImage ? 'ring-2 ring-bj-black' : 'ring-1 ring-bj-gray-200 hover:ring-bj-gray-300'
                      }`}
                    >
                      <Image
                        src={image || '/images/products/placeholder-product.svg'}
                        alt={`${product.name} - View ${index + 1}`}
                        width={120}
                        height={120}
                        className="w-full h-full object-contain p-2 img-editorial"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                      />
                    </button>
                  ))}
                </div>
              </LuxuryReveal>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Product Title & Rating */}
            <LuxuryReveal direction="right">
              <div className="space-y-4">
                <h1 className="text-display-lg text-bj-black font-light">
                  {product.name}
                </h1>
                {reviews && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          className={star <= Math.round(reviews.averageRating) ? 'text-[#C9A84C] fill-current' : 'text-bj-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-caption font-medium text-bj-black">{reviews.averageRating}</span>
                    <span className="text-caption text-bj-gray-400">({reviews.totalReviews} reviews)</span>
                  </div>
                )}
              </div>
            </LuxuryReveal>

            {/* Perfect for gifting badge — shown on necklaces and bracelets */}
            {(product.category === 'necklaces' || product.category === 'bracelets') && (
              <LuxuryReveal direction="right" delay={0.08}>
                <div className="inline-flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-full px-4 py-1.5">
                  <Gift size={13} className="text-stone-500" strokeWidth={1.5} />
                  <span className="text-[12px] font-medium text-stone-700 tracking-wide">Perfect for gifting</span>
                </div>
              </LuxuryReveal>
            )}

            {/* Price */}
            <LuxuryReveal direction="right" delay={0.1}>
              <div className="space-y-3">
                <div className="flex items-baseline space-x-4">
                  <span className="text-display-sm text-bj-black font-light">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.compare_at_price && product.compare_at_price > currentPrice && (
                    <span className="text-body text-bj-gray-400 line-through">
                      {formatPrice(product.compare_at_price)}
                    </span>
                  )}
                </div>
                <p className="text-caption text-bj-gray-500">Or 4 interest-free payments of <span className="font-medium">${(currentPrice / 4).toFixed(0)}</span> with Klarna</p>
              </div>
            </LuxuryReveal>

            {/* Product Description */}
            <LuxuryReveal direction="right" delay={0.15}>
              <div className="prose prose-sm max-w-none">
                <p className="text-body text-bj-gray-500 leading-relaxed">{product.description}</p>
              </div>
            </LuxuryReveal>

            {/* Metal/Variant Selection */}
            {product.variants && product.variants.length > 1 && (
              <LuxuryReveal direction="right" delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-overline text-bj-black">Metal</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantChange(variant)}
                        className={`px-6 py-3 border-2 text-caption font-medium transition-all duration-300 uppercase tracking-wider ${
                          selectedVariant?.id === variant.id
                            ? 'border-bj-black bg-bj-black text-white'
                            : 'border-bj-gray-300 hover:border-bj-gray-500 text-bj-gray-700'
                        }`}
                        disabled={!variant.inStock}
                      >
                        {variant.name}
                        {!variant.inStock && ' (Sold Out)'}
                      </button>
                    ))}
                  </div>
                </div>
              </LuxuryReveal>
            )}

            {/* Size Selection */}
            {product.category === 'rings' && (
              <LuxuryReveal direction="right" delay={0.25}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-overline text-bj-black">Ring Size</h3>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-caption text-bj-pink hover:text-bj-pink-hover transition-colors underline underline-offset-2"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 max-w-xs">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`aspect-square border-2 flex items-center justify-center text-caption font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? 'border-bj-black bg-bj-black text-white'
                            : 'border-bj-gray-300 hover:border-bj-gray-500 text-bj-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {/* Free resize badge */}
                  <div className="flex items-center gap-2 text-[11px] text-bj-gray-500 mt-1">
                    <RefreshCw size={12} className="text-bj-pink flex-shrink-0" />
                    <span><span className="font-semibold text-bj-black">Free resize</span> within 30 days — order with confidence</span>
                  </div>
                  {/* Find my size CTA */}
                  {!selectedSize && (
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-[11px] font-medium text-bj-pink hover:text-bj-pink-hover transition-colors flex items-center gap-1.5"
                    >
                      Not sure of your size? Find it in 2 minutes →
                    </button>
                  )}
                </div>
              </LuxuryReveal>
            )}

            {/* Urgency signals */}
            <LuxuryReveal direction="right" delay={0.28}>
              <div className="space-y-2">
                {/* Low stock badge */}
                {product.availability_status === 'low_stock' && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                    <span className="text-[12px] font-semibold text-amber-700">
                      Only {product.stockCount || 'a few'} left in stock
                    </span>
                  </div>
                )}
                {/* Viewers */}
                {viewerCount > 0 && product.availability_status !== 'sold_out' && (
                  <div className="flex items-center gap-2 text-[12px] text-bj-gray-500">
                    <Users size={13} className="text-bj-pink flex-shrink-0" />
                    <span><span className="font-semibold text-bj-black">{viewerCount} people</span> are viewing this right now</span>
                  </div>
                )}
                {/* Shipping countdown */}
                {shippingCountdown && product.availability_status !== 'sold_out' && (
                  <div className="flex items-center gap-2 text-[12px] text-bj-gray-500">
                    <Clock size={13} className="text-bj-pink flex-shrink-0" />
                    <span>Ships today if ordered within <span className="font-semibold text-bj-black tabular-nums">{shippingCountdown}</span></span>
                  </div>
                )}
              </div>
            </LuxuryReveal>

            {/* Quantity & Add to Cart */}
            <LuxuryReveal direction="right" delay={0.3}>
              <div className="space-y-6">
                {product.availability_status !== 'sold_out' && (
                  <div className="space-y-3">
                    <h3 className="text-overline text-bj-black">Quantity</h3>
                    <div className="flex items-center border border-bj-gray-300 w-32">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center hover:bg-bj-gray-50 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="flex-1 text-center font-medium text-bj-black">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-bj-gray-50 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {product.availability_status === 'sold_out' ? (
                    /* Notify Me form for sold-out products */
                    <div className="space-y-4 border border-bj-gray-200 p-5 bg-bj-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-bj-gray-200 flex items-center justify-center flex-shrink-0">
                          <Bell size={15} className="text-bj-gray-500" />
                        </div>
                        <div>
                          <p className="text-caption font-semibold text-bj-black">Out of Stock</p>
                          <p className="text-[11px] text-bj-gray-500">This piece is currently unavailable</p>
                        </div>
                      </div>
                      {notifySubmitted ? (
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-3">
                          <Check size={15} className="text-emerald-600 flex-shrink-0" />
                          <p className="text-[12px] text-emerald-700 font-medium">
                            You are on the list! We will email you when this is back.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleNotifySubmit} className="space-y-3">
                          <label className="text-overline text-bj-black block">Notify Me When Available</label>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              value={notifyEmail}
                              onChange={(e) => { setNotifyEmail(e.target.value); setNotifyError('') }}
                              placeholder="your@email.com"
                              className="flex-1 border border-bj-gray-300 px-4 py-3 text-caption text-bj-black placeholder-bj-gray-400 focus:outline-none focus:border-bj-black transition-colors bg-white"
                            />
                            <button
                              type="submit"
                              className="btn-primary px-5 py-3 flex items-center gap-2 whitespace-nowrap"
                            >
                              <Bell size={14} />
                              <span className="text-[11px] uppercase tracking-wider">Notify Me</span>
                            </button>
                          </div>
                          {notifyError && <p className="text-[11px] text-red-500">{notifyError}</p>}
                        </form>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={product.category === 'rings' && !selectedSize}
                      className="w-full btn-primary py-5 disabled:bg-bj-gray-300 disabled:border-bj-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                      <ShoppingBag size={20} />
                      <span>Add to Bag</span>
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleWishlistToggle}
                      className={`btn-secondary py-3 flex items-center justify-center space-x-2 transition-colors ${
                        isWishlisted
                          ? 'border-bj-pink text-bj-pink bg-bj-pink-soft'
                          : ''
                      }`}
                    >
                      <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                      <span className="text-[11px]">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                    </button>

                    <button onClick={handleShare} className="btn-secondary py-3 flex items-center justify-center space-x-2">
                      <Share2 size={18} />
                      <span className="text-[11px]">Share</span>
                    </button>
                  </div>

                  {/* Consultation CTA for engagement rings and high-value items */}
                  {(product.category === 'rings' || currentPrice >= 2000) && (
                    <div className="mt-2 p-5 bg-bj-blush border border-bj-rose-gold/20">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Phone size={16} className="text-bj-pink" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-bj-black mb-0.5">Speak with a Diamond Specialist</p>
                          <p className="text-[12px] text-bj-gray-500 mb-3">Get expert guidance on this piece — free, no pressure.</p>
                          <Link href="/consultation" className="inline-block btn-secondary py-2 px-5 text-[11px] bg-white hover:bg-white">
                            Book a Free Consultation
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </LuxuryReveal>

            {/* Product Features */}
            <LuxuryReveal direction="right" delay={0.35}>
              <div className="border-t border-bj-gray-200 pt-8">
                <PandoraStaggerGrid staggerDelay={0.1} className="space-y-6">
                  <PandoraStaggerItem>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Truck size={18} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-caption font-semibold text-bj-black mb-1 uppercase tracking-wider">Free Shipping</h4>
                        <p className="text-caption text-bj-gray-500">Complimentary shipping on all orders</p>
                      </div>
                    </div>
                  </PandoraStaggerItem>
                  
                  <PandoraStaggerItem>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield size={18} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-caption font-semibold text-bj-black mb-1 uppercase tracking-wider">Lifetime Warranty</h4>
                        <p className="text-caption text-bj-gray-500">Complimentary care and repair</p>
                      </div>
                    </div>
                  </PandoraStaggerItem>
                  
                  <PandoraStaggerItem>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                        <RotateCcw size={18} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-caption font-semibold text-bj-black mb-1 uppercase tracking-wider">30-Day Returns</h4>
                        <p className="text-caption text-bj-gray-500">Easy returns and exchanges</p>
                      </div>
                    </div>
                  </PandoraStaggerItem>
                </PandoraStaggerGrid>
              </div>
            </LuxuryReveal>

            {/* Product Materials & Specifications */}
            <LuxuryReveal direction="right" delay={0.4}>
              <div className="border-t border-bj-gray-200 pt-8">
                <h3 className="text-overline text-bj-black mb-6">Craftsmanship Details</h3>
                <div className="space-y-4">
                  {selectedVariant && (
                    <div className="flex justify-between py-2 border-b border-bj-gray-100">
                      <span className="text-caption text-bj-gray-500 uppercase tracking-wider">Metal</span>
                      <span className="text-caption font-medium text-bj-black">{selectedVariant.metal}</span>
                    </div>
                  )}
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-bj-gray-100">
                      <span className="text-caption text-bj-gray-500 uppercase tracking-wider">{key}</span>
                      <span className="text-caption font-medium text-bj-black">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 border-b border-bj-gray-100">
                    <span className="text-caption text-bj-gray-500 uppercase tracking-wider">Certification</span>
                    <span className="text-caption font-medium text-bj-black">IGI Certified</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-caption text-bj-gray-500 uppercase tracking-wider">Origin</span>
                    <span className="text-caption font-medium text-bj-black">Handcrafted in LA</span>
                  </div>
                </div>
              </div>
            </LuxuryReveal>
          </div>
        </div>
      </div>

      {/* Complete the Look */}
      {crossSellProducts.length > 0 && (
        <div className="bg-bj-offwhite py-20 border-t border-bj-gray-100">
          <div className="container-bj-wide">
            <LuxuryReveal direction="up">
              <div className="mb-12">
                <p className="text-overline text-bj-pink mb-3">Style It Together</p>
                <h2 className="text-display-lg text-bj-black">Complete the Look</h2>
              </div>
            </LuxuryReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {crossSellProducts.map((item, index) => (
                <LuxuryReveal key={item.id} direction="up" delay={index * 0.1}>
                  <div
                    className="group cursor-pointer"
                    onClick={() => router.push(`/product/${item.id}`)}
                  >
                    <div className="relative aspect-square bg-white overflow-hidden mb-4">
                      <Image
                        src={item.images?.[0] || '/images/products/placeholder-product.svg'}
                        alt={item.name}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-300 img-editorial"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-white text-bj-gray-500 px-2 py-1">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-caption font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-body font-medium text-bj-black">{formatPrice(item.price)}</span>
                      {item.compare_at_price && item.compare_at_price > item.price && (
                        <span className="text-caption text-bj-gray-400 line-through">{formatPrice(item.compare_at_price)}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addItem(item)
                      }}
                      className="w-full btn-secondary py-2.5 text-[11px] uppercase tracking-wider"
                    >
                      Add to Bag
                    </button>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white py-20">
          <div className="container-bj-wide">
            <LuxuryReveal direction="up">
              <div className="text-center mb-16">
                <p className="text-overline text-bj-pink mb-3">Complete Your Style</p>
                <h2 className="text-display-lg text-bj-black">You Might Also Love</h2>
              </div>
            </LuxuryReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
                <LuxuryReveal key={relatedProduct.id} direction="up" delay={index * 0.1}>
                  <div 
                    className="group cursor-pointer product-card"
                    onClick={() => router.push(`/product/${relatedProduct.id}`)}
                  >
                    <div className="product-image-container relative aspect-[4/5] bg-bj-gray-50 mb-4 overflow-hidden">
                      <Image
                        src={relatedProduct.images?.[0] || '/images/products/placeholder-product.svg'}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4 product-card-img img-editorial"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                      />

                      {/* Wishlist */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlistItem({
                            id: relatedProduct.id,
                            name: relatedProduct.name,
                            price: relatedProduct.price,
                            originalPrice: relatedProduct.compare_at_price,
                            image: relatedProduct.images?.[0] || '/images/products/placeholder-product.svg',
                            category: relatedProduct.category,
                          })
                        }}
                        className="wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                      >
                        <Heart
                          size={14}
                          strokeWidth={1.5}
                          className={checkWishlisted(relatedProduct.id) ? 'fill-bj-pink text-bj-pink' : 'text-bj-gray-500 hover:text-bj-pink'}
                        />
                      </button>

                      {/* Quick Add */}
                      <div className="quick-add absolute bottom-0 left-0 right-0">
                        <button className="w-full py-3 bg-bj-black/90 backdrop-blur-sm text-white text-[10px] font-medium tracking-[0.15em] uppercase hover:bg-bj-black transition-colors">
                          Quick Add
                        </button>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="space-y-2">
                      <h3 className="text-caption font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="text-body font-medium text-bj-black">{formatPrice(relatedProduct.price)}</span>
                        {relatedProduct.compare_at_price && relatedProduct.compare_at_price > relatedProduct.price && (
                          <span className="text-caption text-bj-gray-400 line-through">{formatPrice(relatedProduct.compare_at_price)}</span>
                        )}
                      </div>
                      {/* Color swatches - Gold Options */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-bj-gray-200" title="Yellow Gold" />
                        <div className="w-3 h-3 rounded-full bg-rose-400 border border-bj-gray-200" title="Rose Gold" />
                        <div className="w-3 h-3 rounded-full bg-gray-200 border border-bj-gray-200" title="White Gold" />
                      </div>
                    </div>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Customers Also Bought */}
      {alsoViewedProducts.length > 0 && (
        <div className="bg-bj-offwhite py-20 border-t border-bj-gray-100">
          <div className="container-bj-wide">
            <LuxuryReveal direction="up">
              <div className="mb-12">
                <p className="text-overline text-bj-pink mb-3">Social Proof</p>
                <h2 className="text-display-lg text-bj-black">Customers Also Bought</h2>
              </div>
            </LuxuryReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {alsoViewedProducts.map((item, index) => (
                <LuxuryReveal key={item.id} direction="up" delay={index * 0.08}>
                  <div
                    className="group cursor-pointer product-card"
                    onClick={() => router.push(`/product/${item.id}`)}
                  >
                    <div className="product-image-container relative aspect-square bg-white mb-3 overflow-hidden">
                      <Image
                        src={item.images?.[0] || '/images/products/placeholder-product.svg'}
                        alt={item.name}
                        fill
                        className="object-contain p-4 product-card-img img-editorial"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                      />
                    </div>
                    <h3 className="text-caption font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <span className="text-body font-medium text-bj-black">{formatPrice(item.price)}</span>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {reviews && (
        <div className="bg-bj-offwhite py-20 border-t border-bj-gray-100">
          <div className="container-bj-wide">
            <LuxuryReveal direction="up">
              <div className="mb-12">
                <p className="text-overline text-bj-pink mb-3">Customer Reviews</p>
                <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                  <div>
                    <h2 className="text-display-lg text-bj-black mb-3">What Our Customers Say</h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={22}
                            className={star <= Math.round(reviews.averageRating) ? 'text-[#C9A84C] fill-current' : 'text-bj-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-display-sm text-bj-black font-light">{reviews.averageRating}</span>
                      <span className="text-body text-bj-gray-500">({reviews.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </LuxuryReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.reviews.map((review, index) => (
                <LuxuryReveal key={review.id} direction="up" delay={index * 0.05}>
                  <div className="bg-white p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= review.rating ? 'text-[#C9A84C] fill-current' : 'text-bj-gray-300'}
                        />
                      ))}
                    </div>
                    <h4 className="text-caption font-semibold text-bj-black mb-3">{review.title}</h4>
                    <p className="text-caption text-bj-gray-500 leading-relaxed mb-6">{review.body}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-bj-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bj-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-[11px] font-semibold text-bj-gray-500">{review.author[0]}</span>
                        </div>
                        <div>
                          <p className="text-caption font-medium text-bj-black">{review.author}</p>
                          <p className="text-[11px] text-bj-gray-400">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                      {review.verified && (
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                          <CheckCircle2 size={13} className="text-emerald-500" />
                          <span>Verified Buyer</span>
                        </div>
                      )}
                    </div>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      <RecentlyViewedRow currentProductId={productId} />
    </div>
  )
}