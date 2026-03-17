'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Heart, Share2, Star, Minus, Plus, ShoppingBag, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '@/store/useCart'

interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price?: number
  images: string[]
  category: string
  subcategory?: string
  tags?: string[]
  stock?: number
  availability_status?: string
  is_featured?: boolean
  is_bestseller?: boolean
  rating?: number
  reviews?: number
  specifications?: {
    center_stone?: {
      type: string
      carat: number
      cut: string
      color: string
      clarity: string
      certification: string
    }
    metal?: {
      type: string
      options?: string[]
    }
  }
  metal?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedImage, setSelectedImage] = useState(0)
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <a href="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Continue Shopping</a>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
      size: selectedSize
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-[#00A0EE]">Home</a>
            <span className="text-gray-400">/</span>
            <a href="#" className="text-gray-600 hover:text-[#00A0EE]">{product.category}</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images - Pandora Style */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">Product Image {selectedImage + 1}</span>
              </div>
              
              {/* Image Navigation */}
              <button 
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setSelectedImage(Math.min(3, selectedImage + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 border-2 transition-colors ${
                    index === selectedImage ? 'border-[#00A0EE]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Image {index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - EXACT Pandora Layout */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating || 0) 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
                <button className="text-sm text-[#00A0EE] hover:underline">Write a review</button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-light text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">Or 4 interest-free payments of ${(product.price / 4).toFixed(0)} with Klarna</p>
            </div>

            {/* Product Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-[#00A0EE] bg-[#00A0EE] text-white'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="text-sm text-[#00A0EE] hover:underline mt-2">Size Guide</button>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center border border-gray-300 w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="w-full bg-[#224099] hover:bg-[#1a3077] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Bag</span>
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex-1 border-2 py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2 ${
                      isWishlisted
                        ? 'border-red-500 text-red-500 bg-red-50'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                  
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Features - Pandora Style */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Truck size={20} className="text-[#00A0EE] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">Complimentary shipping on orders over $99</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield size={20} className="text-[#00A0EE] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Two-Year Warranty</h4>
                    <p className="text-sm text-gray-600">International warranty on all jewelry</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RotateCcw size={20} className="text-[#00A0EE] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Materials */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-3">Materials & Care</h3>
              <div className="space-y-2">
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded mr-2 mb-2">
                  {product.metal || '14k Gold'}
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded mr-2 mb-2">
                  Lab-Grown Diamonds
                </span>
                {product.specifications?.center_stone && (
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded mr-2 mb-2">
                    {product.specifications.center_stone.carat}ct {product.specifications.center_stone.cut} {product.specifications.center_stone.color} {product.specifications.center_stone.clarity}
                  </span>
                )}
              </div>
              <button className="text-sm text-[#00A0EE] hover:underline mt-3">Care Instructions</button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-light text-gray-900 text-center mb-12">You might also like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <div key={relatedProduct.id} className="group cursor-pointer">
                <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{relatedProduct.name}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all"></div>
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-2">{relatedProduct.name}</h3>
                <p className="text-gray-900 font-medium">{formatPrice(relatedProduct.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}