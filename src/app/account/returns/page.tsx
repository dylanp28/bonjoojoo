'use client'

import { useState, useEffect } from 'react'
import { Package, RefreshCcw, CheckCircle, Clock, Truck, Plus } from 'lucide-react'
import Link from 'next/link'

interface ReturnItem {
  returnId: string
  orderNumber: string
  items: string[]
  reason: string
  resolution: string
  status: 'Requested' | 'Label Sent' | 'Received' | 'Refunded'
  submittedAt: string
  updatedAt: string
}

const STATUS_CONFIG: Record<ReturnItem['status'], { color: string; icon: React.ReactNode }> = {
  Requested: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: <Clock className="w-4 h-4" />,
  },
  'Label Sent': {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: <Package className="w-4 h-4" />,
  },
  Received: {
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: <Truck className="w-4 h-4" />,
  },
  Refunded: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: <CheckCircle className="w-4 h-4" />,
  },
}

const MOCK_RETURNS: ReturnItem[] = [
  {
    returnId: 'RTN-28471',
    orderNumber: 'BJO-10039',
    items: ['Pearl Drop Earrings (Sterling Silver)'],
    reason: 'Changed my mind',
    resolution: 'Refund to original payment',
    status: 'Refunded',
    submittedAt: '2026-03-10T14:22:00Z',
    updatedAt: '2026-03-17T09:15:00Z',
  },
  {
    returnId: 'RTN-29105',
    orderNumber: 'BJO-10042',
    items: ['Solitaire Diamond Ring (Size 6, 14k White Gold)'],
    reason: 'Too small',
    resolution: 'Exchange for different size/variant',
    status: 'Label Sent',
    submittedAt: '2026-03-28T11:05:00Z',
    updatedAt: '2026-03-28T11:30:00Z',
  },
]

const RESOLUTION_ICON: Record<string, React.ReactNode> = {
  refund: <span className="text-xs">💳</span>,
  exchange: <RefreshCcw className="w-3 h-3" />,
  store_credit: <span className="text-xs">🏷️</span>,
}

export default function AccountReturnsPage() {
  const [returns, setReturns] = useState<ReturnItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load any returns from localStorage (submitted in this session)
    const localReturns: ReturnItem[] = JSON.parse(localStorage.getItem('bonjoojoo-returns') || '[]')
    // Merge mock + local, local first so recent shows at top
    setReturns([...localReturns, ...MOCK_RETURNS])
    setLoading(false)
  }, [])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 mb-1">My Returns</h1>
          <p className="text-stone-600 text-sm">Track and manage your return requests.</p>
        </div>
        <Link
          href="/returns/start"
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Start a New Return
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 mx-auto mb-4" />
          <p className="text-stone-500">Loading your returns...</p>
        </div>
      ) : returns.length > 0 ? (
        <div className="space-y-4">
          {returns.map((ret) => {
            const config = STATUS_CONFIG[ret.status]
            return (
              <div key={ret.returnId} className="border border-stone-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
                {/* Card Header */}
                <div className="bg-stone-50 px-5 py-4 border-b border-stone-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-stone-900">{ret.returnId}</p>
                      <p className="text-sm text-stone-500">Order {ret.orderNumber} &mdash; Submitted {formatDate(ret.submittedAt)}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                      {config.icon}
                      {ret.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-5 py-4">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">Items</p>
                      <ul className="space-y-0.5">
                        {ret.items.map((item, i) => (
                          <li key={i} className="text-sm text-stone-800 flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-0.5">Reason</p>
                        <p className="text-sm text-stone-800">{ret.reason}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-0.5">Resolution</p>
                        <p className="text-sm text-stone-800">{ret.resolution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="border-t border-stone-100 pt-3">
                    <p className="text-xs text-stone-400">Last updated {formatDate(ret.updatedAt)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCcw className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-2">No returns yet</h3>
          <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">
            Need to return or exchange an item? We make it easy with free prepaid labels and flexible options.
          </p>
          <Link
            href="/returns/start"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Start a Return
          </Link>
        </div>
      )}
    </div>
  )
}
