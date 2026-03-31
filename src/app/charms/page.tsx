'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, SlidersHorizontal } from 'lucide-react'
import { LuxuryReveal } from '@/components/animations/LuxuryAnimationSystem'

const PLACEHOLDER = '/images/products/placeholder-product.svg'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

const METAL_COLORS: Record<string, string> = {
  white: '#D8D8D8',
  yellow: '#D4A843',
  rose: '#B76E79',
}

const charms = [
  {
    id: 'CHARM-001',
    name: 'Eternal Heart Charm',
    price: 189,
    originalPrice: 249,
    images: ['/images/products/charms/charm-001-main.svg'],
    tags: ['heart', 'love', 'pavé', 'romantic'],
    isFeatured: true,
    isBestseller: true,
    metals: ['white', 'yellow', 'rose'],
  },
  {
    id: 'CHARM-002',
    name: 'Celestial Star Charm',
    price: 149,
    originalPrice: 199,
    images: ['/images/products/charms/charm-002-main.svg'],
    tags: ['star', 'celestial', 'minimalist'],
    isFeatured: false,
    isBestseller: false,
    metals: ['white', 'yellow', 'rose'],
  },
  {
    id: 'CHARM-003',
    name: 'Garden Butterfly Charm',
    price: 229,
    originalPrice: 299,
    images: ['/images/products/charms/charm-003-main.svg'],
    tags: ['butterfly', 'nature', 'gradient'],
    isFeatured: true,
    isBestseller: false,
    metals: ['white', 'yellow', 'rose'],
  },
  {
    id: 'CHARM-004',
    name: 'Vintage Lock Charm',
    price: 169,
    originalPrice: 219,
    images: ['/images/products/charms/charm-004-main.svg'],
    tags: ['vintage', 'lock', 'engraved'],
    isFeatured: false,
    isBestseller: true,
    metals: ['yellow', 'rose'],
  },
  {
    id: 'CHARM-005',
    name: 'Infinity Symbol Charm',
    price: 209,
    originalPrice: 279,
    images: ['/images/products/charms/charm-005-main.svg'],
    tags: ['infinity', 'eternal', 'pavé'],
    isFeatured: true,
    isBestseller: true,
    metals: ['white', 'yellow', 'rose'],
  },
  {
    id: 'CHARM-006',
    name: 'Lucky Horseshoe Charm',
    price: 179,
    originalPrice: null,
    images: ['/images/products/charms/charm-006-main.svg'],
    tags: ['horseshoe', 'lucky', 'traditional'],
    isFeatured: false,
    isBestseller: false,
    metals: ['yellow', 'white'],
  },
  {
    id: 'CHARM-007',
    name: 'Blooming Flower Charm',
    price: 199,
    originalPrice: 259,
    images: ['/images/products/charms/charm-007-main.svg'],
    tags: ['flower', 'nature', 'bloom'],
    isFeatured: false,
    isBestseller: true,
    metals: ['white', 'yellow', 'rose'],
  },
  {
    id: 'CHARM-008',
    name: 'Faith Cross Charm',
    price: 159,
    originalPrice: 209,
    images: ['/images/products/charms/charm-008-main.svg'],
    tags: ['cross', 'faith', 'spiritual'],
    isFeatured: false,
    isBestseller: false,
    metals: ['white', 'yellow', 'rose'],
  },
]

const FILTERS = ['All', 'Bestsellers', 'Featured', 'On Sale']

export default function CharmsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set())

  const handleImgError = (id: string) =>
    setImgErrors(prev => new Set(prev).add(id))

  const filtered = charms.filter(c => {
    if (activeFilter === 'Bestsellers') return c.isBestseller
    if (activeFilter === 'Featured') return c.isFeatured
    if (activeFilter === 'On Sale') return !!c.originalPrice
    return true
  })

  const toggleWishlist = (id: string) =>
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F5F0EB] to-[#EDE6DE] py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <LuxuryReveal direction="up" delay={0.1}>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-bj-pink mb-4">
              Lab-Grown Diamond Charms
            </p>
          </LuxuryReveal>
          <LuxuryReveal direction="up" delay={0.25}>
            <h1 className="font-display text-[52px] lg:text-[72px] font-light text-bj-black leading-tight mb-6">
              Charms
            </h1>
          </LuxuryReveal>
          <LuxuryReveal direction="up" delay={0.4}>
            <p className="text-[16px] text-bj-gray-500 max-w-2xl mx-auto leading-relaxed">
              Every Bonjoojoo charm is crafted with lab-grown diamonds and 14k gold — a moment in time, made to last forever. Layer them to tell your story.
            </p>
          </LuxuryReveal>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-b border-gray-100 sticky top-[var(--header-height,0)] bg-white z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-bj-gray-400 mr-1" />
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-bj-black text-white'
                  : 'bg-bj-gray-100 text-bj-gray-500 hover:bg-bj-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[12px] text-bj-gray-400">{filtered.length} pieces</span>
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((charm, i) => (
            <LuxuryReveal key={charm.id} direction="up" delay={i * 0.05}>
              <div className="group">
                <Link href={`/product/${charm.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-bj-gray-50 mb-4">
                    <Image
                      src={imgErrors.has(charm.id) ? PLACEHOLDER : charm.images[0]}
                      alt={charm.name}
                      fill
                      unoptimized={charm.images[0].endsWith('.svg')}
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      onError={() => handleImgError(charm.id)}
                    />

                    {/* Badges */}
                    {charm.originalPrice && (
                      <span className="absolute top-3 left-3 bg-bj-pink text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 z-10">
                        Sale
                      </span>
                    )}
                    {charm.isBestseller && !charm.originalPrice && (
                      <span className="absolute top-3 left-3 bg-bj-black text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 z-10">
                        Best Seller
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={e => { e.preventDefault(); toggleWishlist(charm.id) }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all z-10"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={14}
                        className={wishlist.has(charm.id) ? 'fill-bj-pink text-bj-pink' : 'text-bj-gray-400'}
                      />
                    </button>

                    {/* Quick add */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                      <button className="w-full py-3 bg-bj-black/90 backdrop-blur-sm text-white text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-bj-black transition-colors">
                        Quick Add
                      </button>
                    </div>
                  </div>
                </Link>

                <div className="px-0.5">
                  <Link href={`/product/${charm.id}`}>
                    <h3 className="text-[13px] font-medium text-bj-black hover:text-bj-gray-500 transition-colors mb-1 line-clamp-1">
                      {charm.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[14px] font-medium text-bj-black">{formatPrice(charm.price)}</span>
                    {charm.originalPrice && (
                      <span className="text-[12px] text-bj-gray-400 line-through">{formatPrice(charm.originalPrice)}</span>
                    )}
                  </div>
                  {/* Metal swatches */}
                  <div className="flex items-center gap-1.5">
                    {charm.metals.map(m => (
                      <div
                        key={m}
                        className="w-3 h-3 rounded-full border border-bj-gray-200"
                        style={{ backgroundColor: METAL_COLORS[m] }}
                        title={`${m} gold`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </LuxuryReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-bj-gray-400 text-[15px]">No charms match this filter.</p>
            <button onClick={() => setActiveFilter('All')} className="mt-4 btn-ghost text-sm">
              Show All
            </button>
          </div>
        )}
      </section>

      {/* Editorial banner */}
      <section className="bg-bj-black py-20 px-8 text-center">
        <LuxuryReveal direction="up">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/60 mb-4">
            Personalise Your Collection
          </p>
          <h2 className="font-display text-[36px] lg:text-[48px] font-light text-white mb-6">
            Stack &amp; Layer<br />
            <span className="italic font-extralight">Your Story</span>
          </h2>
          <p className="text-[15px] text-white/70 max-w-xl mx-auto mb-8">
            Mix metals, themes, and occasions. Add free engraving to make every charm uniquely yours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/search?category=bracelets" className="btn-white">
              Shop Bracelets
            </Link>
            <Link href="/search?category=charms" className="btn-ghost text-white border-white/40 hover:bg-white/10">
              All Jewelry
            </Link>
          </div>
        </LuxuryReveal>
      </section>

      {/* Category links */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <LuxuryReveal direction="up">
          <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-bj-gray-400 mb-8 text-center">
            Explore by Theme
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Heart', 'Star', 'Nature', 'Infinity', 'Vintage', 'Spiritual'].map(theme => (
              <Link
                key={theme}
                href={`/search?q=${theme.toLowerCase()}`}
                className="px-5 py-2 border border-bj-gray-200 text-[13px] text-bj-black hover:border-bj-black transition-colors"
              >
                {theme}
              </Link>
            ))}
          </div>
        </LuxuryReveal>
      </section>
    </div>
  )
}
