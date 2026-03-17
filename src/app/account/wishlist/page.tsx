'use client'

import { Heart, ShoppingBag, Plus } from 'lucide-react'

export default function WishlistPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">My Wishlist</h1>
        <p className="text-stone-600">
          Save your favorite bonjoojoo pieces for later.
        </p>
      </div>

      <div className="text-center py-12">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-stone-400" />
        </div>
        <h3 className="text-lg font-medium text-stone-900 mb-2">Your wishlist is empty</h3>
        <p className="text-stone-600 mb-4">
          Start adding pieces you love to keep track of them.
        </p>
        <a 
          href="/#featured-collections"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Browse Lab-Grown Diamonds
        </a>
      </div>
    </div>
  )
}