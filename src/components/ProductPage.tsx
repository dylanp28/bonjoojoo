'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Heart, Share2, Shield, Leaf, Award, Info, Play, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { ProductTrustSignals } from './ProductTrustSignals'
import { LabGrownCheckout } from './LabGrownCheckout'
import { useWishlist } from '@/store/useWishlist'

interface ProductPageProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    description: string
    images: string[]
    rating: number
    reviewCount: number
    specifications: Record<string, string>
    isLabGrown: boolean
    certification?: 'IGI' | 'GIA'
    environmentalSavings?: {
      carbonReduction: string
      waterSavings: string
      energySavings: string
    }
    miningComparison?: {
      priceDifference: string
      qualityComparison: string
    }
  }
}

export function ProductPage({ product }: ProductPageProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const { isWishlisted: checkWishlisted, toggleItem } = useWishlist()
  const isWishlisted = checkWishlisted(product.id)
  const [showCheckout, setShowCheckout] = useState(false)
  const [activeEducationTab, setActiveEducationTab] = useState<'overview' | 'certification' | 'sustainability'>('overview')
  const [timeOnPage, setTimeOnPage] = useState(0)

  // Track page view and time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [product.id])

  const handleAddToCart = () => {
    setShowCheckout(true)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const educationContent = {
    overview: {
      title: "Sustainable Luxury Excellence",
      content: [
        {
          icon: <Leaf className="text-[var(--luxury-sage)]" size={20} />,
          title: "Environmentally Conscious",
          description: "95% less environmental impact than mining, with no ecosystem disruption or large-scale excavation."
        },
        {
          icon: <Shield className="text-[var(--luxury-navy)]" size={20} />,
          title: "Ethically Created",
          description: "100% conflict-free with complete traceability from creation to your jewelry collection."
        },
        {
          icon: <Award className="text-[var(--luxury-gold)]" size={20} />,
          title: "Superior Value",
          description: "30-40% better value than mined diamonds of equivalent quality, certified by renowned institutions."
        }
      ]
    },
    certification: {
      title: "Professional Certification",
      content: [
        {
          icon: <Award className="text-[var(--luxury-navy)]" size={20} />,
          title: `${product.certification || 'IGI'} Certified`,
          description: "Graded using identical standards to natural diamonds by world-renowned gemological institutes."
        },
        {
          icon: <Info className="text-[var(--luxury-soft-gray)]" size={20} />,
          title: "Detailed Report",
          description: "Complete grading report including the 4 Cs: Cut, Color, Clarity, and Carat weight."
        },
        {
          icon: <Shield className="text-[var(--luxury-sage)]" size={20} />,
          title: "Authenticity Guarantee",
          description: "Each diamond includes laser inscription and digital certificate verification."
        }
      ]
    },
    sustainability: {
      title: "Environmental Impact",
      content: [
        {
          icon: <Leaf className="text-[var(--luxury-sage)]" size={20} />,
          title: "Carbon Footprint",
          description: `Saves ${product.environmentalSavings?.carbonReduction || '56.97 tons'} of CO₂ compared to mining.`
        },
        {
          icon: <Leaf className="text-[var(--luxury-navy)]" size={20} />,
          title: "Water Conservation", 
          description: `Saves ${product.environmentalSavings?.waterSavings || '108 gallons'} of freshwater per carat.`
        },
        {
          icon: <Leaf className="text-[var(--luxury-gold)]" size={20} />,
          title: "Energy Efficiency",
          description: `${product.environmentalSavings?.energySavings || '75% less'} energy consumption than mining operations.`
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-[var(--luxury-off-white)]">
      {/* LUXURY PRODUCT SECTION */}
      <div className="container-luxury section-luxury">
        <div className="grid-luxury-2 items-start">
          
          {/* LUXURY IMAGE GALLERY */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-[var(--luxury-cream)] to-[var(--luxury-light-gray)] overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--luxury-gold)]/30 to-[var(--luxury-rose-gold)]/30 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--luxury-gold)] to-[var(--luxury-rose-gold)] rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-luxury-small text-[var(--luxury-soft-gray)]">
                    {product.name}
                  </p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-luxury"
              >
                <ChevronLeft size={18} className="text-[var(--luxury-charcoal)]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-luxury"
              >
                <ChevronRight size={18} className="text-[var(--luxury-charcoal)]" />
              </button>

              {/* Luxury Lab-Grown Badge */}
              {product.isLabGrown && (
                <div className="absolute top-6 left-6 badge-luxury-new flex items-center space-x-2">
                  <Leaf size={12} />
                  <span>Lab-Grown Diamond</span>
                </div>
              )}

              {/* 360° View Button */}
              <button className="absolute top-6 right-6 bg-white/90 hover:bg-white backdrop-blur-sm text-[var(--luxury-charcoal)] px-4 py-2 text-luxury-caption flex items-center hover:text-[var(--luxury-gold)] transition-all duration-300 shadow-luxury">
                <Play size={12} className="mr-2" />
                360° View
              </button>
            </div>

            {/* Thumbnail Gallery - Luxury Style */}
            <div className="flex space-x-3 overflow-x-auto luxury-scrollbar">
              {Array.from({ length: 4 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[var(--luxury-champagne)] to-[var(--luxury-light-gray)] overflow-hidden transition-all duration-300 ${
                    currentImage === index 
                      ? 'ring-2 ring-[var(--luxury-gold)] shadow-luxury-glow' 
                      : 'hover:ring-1 hover:ring-[var(--luxury-soft-gray)]'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-[var(--luxury-gold)]/40 to-[var(--luxury-rose-gold)]/40 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gradient-to-br from-[var(--luxury-gold)] to-[var(--luxury-rose-gold)] rounded-full"></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* LUXURY PRODUCT INFORMATION */}
          <div className="space-y-10">
            
            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) 
                        ? 'text-[var(--luxury-gold)] fill-current' 
                        : 'text-[var(--luxury-light-gray)]'
                      }
                    />
                  ))}
                  <span className="text-luxury-caption text-[var(--luxury-soft-gray)]">
                    ({product.reviewCount} Reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleItem({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.images?.[0] || '' })}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isWishlisted 
                        ? 'bg-[var(--luxury-rose-gold)]/20 text-[var(--luxury-rose-gold)]' 
                        : 'bg-[var(--luxury-blush)] text-[var(--luxury-soft-gray)] hover:text-[var(--luxury-rose-gold)]'
                    }`}
                  >
                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button className="w-11 h-11 bg-[var(--luxury-blush)] text-[var(--luxury-soft-gray)] hover:text-[var(--luxury-charcoal)] rounded-full flex items-center justify-center transition-all duration-300">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="heading-luxury-primary">
                  {product.name}
                </h1>
                
                <div className="flex items-baseline space-x-4">
                  <span className="text-3xl font-normal text-[var(--luxury-charcoal)] tracking-wide">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-[var(--luxury-soft-gray)] line-through font-light">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="badge-luxury-sale">
                      Save ${(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-luxury-body max-w-lg leading-relaxed">
                  {product.description}
                </p>


              </div>
            </div>

            {/* Size Selection - Luxury Style */}
            <div className="space-y-4">
              <label className="text-luxury-caption text-[var(--luxury-charcoal)]">
                RING SIZE
              </label>
              <div className="grid grid-cols-5 gap-3">
                {['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-sm border transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-[var(--luxury-charcoal)] bg-[var(--luxury-charcoal)] text-white'
                        : 'border-[var(--luxury-light-gray)] hover:border-[var(--luxury-gold)] text-[var(--luxury-charcoal)]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-luxury-caption text-[var(--luxury-soft-gray)]">
                Complimentary sizing guide available. 
                <button className="text-[var(--luxury-gold)] hover:underline ml-2">
                  Find Your Size
                </button>
              </p>
            </div>

            {/* Purchase Actions - Luxury Style */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="btn-luxury-primary w-full"
              >
                {selectedSize ? 'Add to Collection' : 'Select Size First'}
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="btn-luxury-secondary">
                  Virtual Try-On
                </button>
                <button className="btn-luxury-secondary">
                  Book Consultation
                </button>
              </div>
            </div>

            {/* Luxury Features Grid */}
            <div className="grid grid-cols-2 gap-6 p-8 bg-[var(--luxury-blush)] rounded-none">
              <div className="flex items-center text-luxury-small text-[var(--luxury-charcoal)]">
                <Shield size={16} className="text-[var(--luxury-sage)] mr-3" />
                <span className="font-light">30-Day Returns</span>
              </div>
              <div className="flex items-center text-luxury-small text-[var(--luxury-charcoal)]">
                <Award size={16} className="text-[var(--luxury-gold)] mr-3" />
                <span className="font-light">Lifetime Warranty</span>
              </div>
              <div className="flex items-center text-luxury-small text-[var(--luxury-charcoal)]">
                <Leaf size={16} className="text-[var(--luxury-sage)] mr-3" />
                <span className="font-light">Complimentary Shipping</span>
              </div>
              <div className="flex items-center text-luxury-small text-[var(--luxury-charcoal)]">
                <Info size={16} className="text-[var(--luxury-navy)] mr-3" />
                <span className="font-light">Expert Consultation</span>
              </div>
            </div>
          </div>
        </div>

        {/* LUXURY LAB-GROWN EDUCATION SECTION */}
        {product.isLabGrown && (
          <div className="mt-28 bg-gradient-to-br from-[var(--luxury-sage)]/5 via-[var(--luxury-champagne)]/5 to-[var(--luxury-blush)] p-16 rounded-none">
            <div className="text-center space-y-8 mb-16">
              <div className="space-y-4">
                <p className="text-luxury-caption text-[var(--luxury-gold)]">
                  SUSTAINABLE LUXURY
                </p>
                <h2 className="heading-luxury-primary">
                  Understanding Lab-Grown Diamonds
                </h2>
                <p className="text-luxury-body max-w-3xl mx-auto">
                  Discover why lab-grown diamonds represent the pinnacle of sustainable luxury—
                  offering identical beauty, superior ethics, and exceptional value.
                </p>
              </div>
            </div>

            {/* Luxury Education Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-white shadow-luxury p-1 rounded-none">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'certification', label: 'Certification' },
                  { id: 'sustainability', label: 'Sustainability' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEducationTab(tab.id as any)}
                    className={`px-8 py-4 text-luxury-caption transition-all duration-300 ${
                      activeEducationTab === tab.id
                        ? 'bg-[var(--luxury-charcoal)] text-white'
                        : 'text-[var(--luxury-soft-gray)] hover:text-[var(--luxury-charcoal)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Education Content */}
            <div className="max-w-5xl mx-auto">
              <h3 className="heading-luxury-secondary text-center mb-12">
                {educationContent[activeEducationTab].title}
              </h3>
              <div className="grid-luxury-3">
                {educationContent[activeEducationTab].content.map((item, index) => (
                  <div key={index} className="card-luxury-elevated p-8 text-center space-y-6">
                    <div className="feature-icon-luxury mx-auto">
                      {item.icon}
                    </div>
                    <div className="space-y-4">
                      <h4 className="heading-luxury-tertiary">
                        {item.title}
                      </h4>
                      <p className="text-luxury-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education CTA */}
            <div className="text-center mt-16">
              <button className="btn-luxury-ghost">
                Learn More About Lab-Grown Excellence
                <ArrowRight size={16} className="ml-2 inline" />
              </button>
            </div>
          </div>
        )}

        {/* LUXURY SPECIFICATIONS */}
        <div className="section-luxury bg-[var(--luxury-warm-gray)]">
          <div className="text-center space-y-6 mb-16">
            <p className="text-luxury-caption text-[var(--luxury-gold)]">
              CRAFTSMANSHIP DETAILS
            </p>
            <h2 className="heading-luxury-primary">
              Technical Specifications
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid-luxury-2">
              <div className="space-y-6">
                {Object.entries(product.specifications || {}).slice(0, Math.ceil(Object.entries(product.specifications || {}).length / 2)).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-4 border-b border-[var(--luxury-light-gray)]">
                    <span className="text-luxury-small font-normal text-[var(--luxury-charcoal)]">{key}</span>
                    <span className="text-luxury-small font-light text-[var(--luxury-soft-gray)]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {Object.entries(product.specifications || {}).slice(Math.ceil(Object.entries(product.specifications || {}).length / 2)).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-4 border-b border-[var(--luxury-light-gray)]">
                    <span className="text-luxury-small font-normal text-[var(--luxury-charcoal)]">{key}</span>
                    <span className="text-luxury-small font-light text-[var(--luxury-soft-gray)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-16">
          <ProductTrustSignals product={product} />
        </div>
      </div>

      {/* Checkout Modal */}
      <LabGrownCheckout
        items={showCheckout ? [{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
          isLabGrown: product.isLabGrown,
          certification: product.certification || 'IGI',
          environmentalImpact: {
            carbonSaved: product.environmentalSavings?.carbonReduction || '56.97',
            waterSaved: product.environmentalSavings?.waterSavings || '108'
          }
        }] : []}
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </div>
  )
}