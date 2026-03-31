'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, Share2, Minus, Plus, ShoppingBag, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { ProductWithVariants, ProductVariant } from '@/types/product'
import { LuxuryReveal, LuxuryParallax } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'

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
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const addItem = useCart(state => state.addItem)

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

              </div>
            </LuxuryReveal>

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
                    <button className="text-caption text-bj-pink hover:text-bj-pink-hover transition-colors underline underline-offset-2">Size Guide</button>
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
                </div>
              </LuxuryReveal>
            )}

            {/* Quantity & Add to Cart */}
            <LuxuryReveal direction="right" delay={0.3}>
              <div className="space-y-6">
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

                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.category === 'rings' && !selectedSize}
                    className="w-full btn-primary py-5 disabled:bg-bj-gray-300 disabled:border-bj-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                  >
                    <ShoppingBag size={20} />
                    <span>Add to Bag</span>
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`btn-secondary py-3 flex items-center justify-center space-x-2 ${
                        isWishlisted
                          ? 'border-bj-pink text-bj-pink bg-bj-pink-soft'
                          : ''
                      }`}
                    >
                      <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                      <span className="text-[11px]">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                    </button>
                    
                    <button className="btn-secondary py-3 flex items-center justify-center space-x-2">
                      <Share2 size={18} />
                      <span className="text-[11px]">Share</span>
                    </button>
                  </div>
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
                      <button className="wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
                        <Heart size={14} className="text-bj-gray-500 hover:text-bj-pink" strokeWidth={1.5} />
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
    </div>
  )
}