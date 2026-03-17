'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuCategories = {
    jewelry: {
      title: 'Jewelry',
      sections: [
        {
          title: 'Rings',
          items: [
            'Engagement Rings',
            'Wedding Rings', 
            'Statement Rings',
            'Stackable Rings',
            'Promise Rings'
          ]
        },
        {
          title: 'Necklaces',
          items: [
            'Pendant Necklaces',
            'Chain Necklaces',
            'Statement Necklaces',
            'Layering Necklaces',
            'Chokers'
          ]
        },
        {
          title: 'Earrings',
          items: [
            'Stud Earrings',
            'Hoop Earrings',
            'Drop Earrings',
            'Huggie Earrings',
            'Climber Earrings'
          ]
        },
        {
          title: 'Bracelets',
          items: [
            'Chain Bracelets',
            'Cuff Bracelets', 
            'Charm Bracelets',
            'Tennis Bracelets',
            'Bangles'
          ]
        }
      ]
    },
    charms: {
      title: 'Charms',
      sections: [
        {
          title: 'New Arrivals',
          items: [
            'Latest Designs',
            'Limited Edition',
            'Seasonal Collections',
            'Holiday Specials'
          ]
        },
        {
          title: 'Popular Collections', 
          items: [
            'Disney Collection',
            'Family & Friends',
            'Travel Collection',
            'Symbol Charms'
          ]
        },
        {
          title: 'By Theme',
          items: [
            'Love & Hearts',
            'Animals & Nature',
            'Birthstone Charms',
            'Religious & Spiritual'
          ]
        }
      ]
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Main Categories */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.values(menuCategories).map(category => 
                category.sections.map((section, index) => (
                  <div key={`${category.title}-${index}`}>
                    <h3 className="font-semibold text-[#224099] text-sm uppercase tracking-wider mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i}>
                          <a 
                            href="#" 
                            className="text-gray-700 hover:text-[#00A0EE] text-sm transition-colors flex items-center justify-between group"
                          >
                            {item}
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Featured Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 h-full p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Featured Collection</h3>
              <div className="aspect-square bg-gray-200 mb-4 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Featured Image</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Lab-Grown Diamond Collection</h4>
              <p className="text-gray-600 text-sm mb-4">
                Discover our sustainable luxury collection featuring ethically sourced lab-grown diamonds.
              </p>
              <button className="btn-outline w-full">
                Shop Collection
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Special Offers */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-[#00A0EE] rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-lg">🚚</span>
              </div>
              <h4 className="font-medium text-gray-900">Free Shipping</h4>
              <p className="text-gray-600 text-sm">On orders over $99</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-[#00A0EE] rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-lg">💎</span>
              </div>
              <h4 className="font-medium text-gray-900">Lifetime Warranty</h4>
              <p className="text-gray-600 text-sm">Two-year international warranty</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-[#00A0EE] rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-lg">↩️</span>
              </div>
              <h4 className="font-medium text-gray-900">Easy Returns</h4>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}