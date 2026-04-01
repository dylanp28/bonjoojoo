'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Tag } from 'lucide-react'
import { bundles, Bundle } from '@/data/bundles'
import { useCart } from '@/store/useCart'
import { LuxuryReveal } from '@/components/animations/LuxuryAnimationSystem'

interface BundleProduct {
  id: string
  name: string
  price: number
  compare_at_price?: number
  images: string[]
  category: string
}

function formatPrice(cents: number) {
  return `$${cents.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  const { addItem } = useCart()
  const [products, setProducts] = useState<BundleProduct[]>([])
  const [addState, setAddState] = useState<'idle' | 'loading' | 'added'>('idle')

  useEffect(() => {
    Promise.all(
      bundle.productIds.map((id) =>
        fetch(`/api/inventory/product/${id}`)
          .then((r) => r.json())
          .then((d) => d.product as BundleProduct)
          .catch(() => null)
      )
    ).then((results) => {
      setProducts(results.filter(Boolean) as BundleProduct[])
    })
  }, [bundle.productIds])

  const individualTotal = products.reduce((sum, p) => sum + p.price, 0)
  const bundlePrice = Math.round(individualTotal * (1 - bundle.discountPercent / 100))
  const savings = individualTotal - bundlePrice

  const handleAddBundle = async () => {
    if (addState !== 'idle' || products.length === 0) return
    setAddState('loading')
    await new Promise((r) => setTimeout(r, 600))
    products.forEach((p) => {
      addItem({
        id: p.id,
        name: p.name,
        price: Math.round(p.price * (1 - bundle.discountPercent / 100)),
        images: p.images,
        category: p.category,
        availability_status: 'in_stock',
      })
    })
    setAddState('added')
    setTimeout(() => setAddState('idle'), 2000)
  }

  return (
    <div className="bg-white border border-bj-gray-100 overflow-hidden group">
      {/* Product image collage */}
      <div className="relative bg-bj-offwhite">
        <div
          className={`grid gap-1 p-4 ${
            products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}
        >
          {products.slice(0, 3).map((p, i) => (
            <div key={p.id} className="relative aspect-square bg-white overflow-hidden">
              <Image
                src={p.images?.[0] || '/images/products/placeholder-product.svg'}
                alt={p.name}
                fill
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-500 img-editorial"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    '/images/products/placeholder-product.svg'
                }}
              />
            </div>
          ))}
        </div>

        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-bj-pink text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
          Save {bundle.discountPercent}%
        </div>
      </div>

      {/* Bundle info */}
      <div className="p-6">
        <p className="text-[10px] uppercase tracking-[0.15em] text-bj-pink font-medium mb-1.5">
          {bundle.tag.charAt(0).toUpperCase() + bundle.tag.slice(1)} Set
        </p>
        <h3 className="font-display text-[1.1rem] tracking-[0.04em] text-bj-black uppercase mb-3">
          {bundle.name}
        </h3>
        <p className="text-body text-bj-gray-500 leading-relaxed mb-4 text-[13px]">
          {bundle.description}
        </p>

        {/* Products list */}
        {products.length > 0 && (
          <ul className="mb-5 space-y-1">
            {products.map((p) => (
              <li key={p.id} className="flex items-center justify-between text-[12px]">
                <Link
                  href={`/product/${p.id}`}
                  className="text-bj-gray-600 hover:text-bj-pink transition-colors truncate max-w-[180px]"
                >
                  {p.name}
                </Link>
                <span className="text-bj-gray-400 ml-2 flex-shrink-0">{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Pricing */}
        {products.length > 0 && (
          <div className="border-t border-bj-gray-100 pt-4 mb-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-bj-gray-400">Individual total</span>
              <span className="text-[12px] text-bj-gray-400 line-through">
                {formatPrice(individualTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-bj-black">Bundle price</span>
              <span className="text-[1rem] font-bold text-bj-black">{formatPrice(bundlePrice)}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Tag size={11} className="text-bj-pink" />
              <span className="text-[11px] text-bj-pink font-medium">
                You save {formatPrice(savings)}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleAddBundle}
          disabled={products.length === 0 || addState === 'loading'}
          className={`w-full flex items-center justify-center gap-2 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
            addState === 'added'
              ? 'bg-green-600 text-white'
              : 'btn-primary'
          }`}
        >
          {addState === 'loading' ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Adding…
            </span>
          ) : addState === 'added' ? (
            '✓ Added to Bag'
          ) : (
            <>
              <ShoppingBag size={14} />
              Add Bundle to Bag
            </>
          )}
        </button>

        {/* Individual links */}
        {products.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 justify-center">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="text-[10px] text-bj-gray-400 hover:text-bj-pink underline underline-offset-2 transition-colors capitalize"
              >
                View {p.category.replace(/s$/, '')}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-bj-offwhite">
      {/* Hero */}
      <div className="bg-white border-b border-bj-gray-100 py-16 lg:py-24 text-center">
        <div className="container-bj">
          <LuxuryReveal direction="up">
            <p className="text-overline text-bj-pink mb-4">Curated Collections</p>
            <h1 className="font-display text-[2.25rem] lg:text-[3rem] tracking-[0.06em] text-bj-black uppercase mb-4">
              Sets &amp; Bundles
            </h1>
            <p className="text-body text-bj-gray-500 max-w-lg mx-auto leading-relaxed">
              Thoughtfully curated jewelry sets designed to be worn together. Save up to 15% when
              you bundle — and discover combinations you&apos;ll wear forever.
            </p>
          </LuxuryReveal>

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-[11px] text-bj-gray-400 mt-8">
            <Link href="/" className="hover:text-bj-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-bj-black">Sets &amp; Bundles</span>
          </nav>
        </div>
      </div>

      {/* Bundles grid */}
      <div className="container-bj-wide py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle, index) => (
            <LuxuryReveal key={bundle.id} direction="up" delay={index * 0.08}>
              <BundleCard bundle={bundle} />
            </LuxuryReveal>
          ))}
        </div>

        {/* Value prop strip */}
        <div className="mt-20 border-t border-bj-gray-200 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: '✦',
              title: 'Curated to Match',
              body: 'Every set is designed by our stylists to look effortlessly perfect together.',
            },
            {
              icon: '◇',
              title: 'Instant Bundle Savings',
              body: 'Save 10–15% automatically when you add a complete set to your bag.',
            },
            {
              icon: '◈',
              title: 'Gift-Ready Packaging',
              body: 'All sets arrive in a premium Bonjoojoo gift box — no wrapping needed.',
            },
          ].map((item) => (
            <div key={item.title}>
              <div className="text-2xl text-bj-pink mb-3">{item.icon}</div>
              <h3 className="font-display text-[0.85rem] tracking-[0.08em] uppercase text-bj-black mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] text-bj-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
