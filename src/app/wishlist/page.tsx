'use client'

import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'

export default function WishlistPage() {
  return (
    <div className="min-h-[70vh] bg-white">
      <div className="container-bj py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-bj-gray-400 mb-10">
          <Link href="/" className="hover:text-bj-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-bj-black">Wishlist</span>
        </nav>

        <h1 className="font-display text-[2rem] tracking-[0.05em] text-bj-black uppercase mb-12">
          My Wishlist
        </h1>

        {/* Empty state */}
        <div className="text-center py-20 border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bj-blush flex items-center justify-center">
            <Heart size={28} className="text-bj-pink" />
          </div>
          <h2 className="text-[1.25rem] font-light text-bj-black mb-3">Your wishlist is empty</h2>
          <p className="text-body text-bj-gray-500 max-w-sm mx-auto mb-8">
            Save your favorite pieces and come back to them whenever you&apos;re ready.
          </p>
          <Link href="/search" className="btn-primary inline-flex items-center gap-2">
            <ShoppingBag size={16} />
            Explore Collection
          </Link>
        </div>

        {/* Category shortcuts */}
        <div className="mt-16">
          <p className="text-[11px] uppercase tracking-[0.15em] text-bj-gray-400 text-center mb-6">
            Browse by Category
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Rings', href: '/category/rings' },
              { label: 'Necklaces', href: '/category/necklaces' },
              { label: 'Earrings', href: '/category/earrings' },
              { label: 'Bracelets', href: '/category/bracelets' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="border border-gray-200 py-5 text-center text-[13px] text-bj-gray-500 hover:text-bj-black hover:border-bj-black transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
