'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'

interface RecentlyViewedRowProps {
  currentProductId?: string
  compact?: boolean
}

export default function RecentlyViewedRow({ currentProductId, compact }: RecentlyViewedRowProps) {
  const products = useRecentlyViewed((s) => s.products)
  const visible = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4)

  if (visible.length === 0) return null

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

  if (compact) {
    // Compact version shown in cart sidebar
    return (
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-3">Recently Viewed</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {visible.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="flex-shrink-0 group"
            >
              <div className="w-14 h-14 bg-bj-offwhite overflow-hidden">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border border-gray-200" />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-1 truncate w-14">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Full version shown below product description
  return (
    <section className="py-12 border-t border-bj-gray-100">
      <div className="container-luxury">
        <h2 className="text-overline text-bj-black mb-6">Recently Viewed</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {visible.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="flex-shrink-0 group w-40"
            >
              <div className="aspect-square bg-bj-offwhite overflow-hidden mb-3">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-gray-200" />
                  </div>
                )}
              </div>
              <p className="text-[12px] font-medium text-bj-black truncate group-hover:underline underline-offset-2 transition-all">
                {p.name}
              </p>
              <p className="text-[12px] text-bj-gray-500 mt-0.5">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
