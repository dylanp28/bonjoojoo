'use client'

import { Award, Shield, Leaf, DollarSign, CheckCircle, Star } from 'lucide-react'

interface ProductTrustSignalsProps {
  product: {
    id: string
    name: string
    price: number
    isLabGrown?: boolean
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

export function ProductTrustSignals({ product }: ProductTrustSignalsProps) {
  if (!product.isLabGrown) return null

  return (
    <div className="space-y-6">
      {/* Lab-Grown Diamond Badge */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
            <Leaf size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-green-800">Lab-Grown Diamond</h3>
            <p className="text-sm text-green-600">Sustainable • Ethical • Identical Quality</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-600 mr-2" />
            <span className="text-green-700">100% Conflict-Free</span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-600 mr-2" />
            <span className="text-green-700">IGI/GIA Certified</span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-600 mr-2" />
            <span className="text-green-700">95% Less Environmental Impact</span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-600 mr-2" />
            <span className="text-green-700">Same Chemical Properties</span>
          </div>
        </div>
      </div>

      {/* Certification Badge */}
      {product.certification && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-stone-600 rounded-full flex items-center justify-center mr-3">
                <Award size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-stone-800">{product.certification} Certified</h3>
                <p className="text-sm text-stone-600">Professional Grade & Quality</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View Certificate
            </button>
          </div>
          
          <p className="text-sm text-stone-700">
            This lab-grown diamond has been professionally graded by {product.certification} using the same 
            rigorous standards applied to natural diamonds.
          </p>
        </div>
      )}

      {/* Environmental Impact */}
      {product.environmentalSavings && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Leaf size={20} className="text-green-600 mr-3" />
            <h3 className="font-medium text-green-800">Environmental Impact Savings</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {product.environmentalSavings.carbonReduction}
              </div>
              <div className="text-xs text-green-700">Less Carbon</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {product.environmentalSavings.waterSavings}
              </div>
              <div className="text-xs text-green-700">Less Water</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {product.environmentalSavings.energySavings}
              </div>
              <div className="text-xs text-green-700">Less Energy</div>
            </div>
          </div>
        </div>
      )}

      {/* Value Proposition */}
      {product.miningComparison && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <DollarSign size={20} className="text-blue-600 mr-3" />
            <h3 className="font-medium text-blue-800">Superior Value</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-700">vs. Equivalent Mined Diamond:</span>
              <span className="font-medium text-blue-600">{product.miningComparison.priceDifference} savings</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-700">Quality Comparison:</span>
              <span className="font-medium text-green-600">{product.miningComparison.qualityComparison}</span>
            </div>
          </div>
        </div>
      )}

      {/* Guarantee */}
      <div className="bg-stone-900 text-white rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Shield size={20} className="text-white mr-3" />
          <h3 className="font-medium">bonjoojoo Guarantee</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-400 mr-2" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-400 mr-2" />
            <span>Lifetime quality warranty</span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-400 mr-2" />
            <span>Free resizing within 60 days</span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-400 mr-2" />
            <span>Complimentary cleaning & inspection</span>
          </div>
        </div>
      </div>

      {/* Customer Reviews Highlight */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Star size={20} className="text-yellow-500 mr-3" />
          <h3 className="font-medium text-stone-800">Customer Reviews</h3>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm">
            <div className="flex items-center mb-1">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <span className="font-medium text-stone-800">Sarah M.</span>
            </div>
            <p className="text-stone-700 italic">
              "Absolutely stunning! I love knowing my diamond was created sustainably. 
              The quality is identical to my friend's mined diamond but at a much better price."
            </p>
          </div>
          
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            Read All Reviews →
          </button>
        </div>
      </div>

      {/* Education CTA */}
      <div className="bg-green-600 text-white rounded-xl p-6 text-center">
        <h3 className="font-medium mb-2">Learn More About Lab-Grown Diamonds</h3>
        <p className="text-sm text-green-100 mb-4">
          Discover why conscious consumers choose lab-grown diamonds for their jewelry
        </p>
        <button className="bg-white text-green-600 px-6 py-2 rounded font-medium text-sm hover:bg-green-50 transition-colors">
          Education Center
        </button>
      </div>
    </div>
  )
}