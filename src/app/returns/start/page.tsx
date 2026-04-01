'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Package, RefreshCcw, CreditCard, Tag, CheckCircle, Download, Search } from 'lucide-react'
import Link from 'next/link'

type Step = 'lookup' | 'items' | 'reason' | 'resolution' | 'confirmation'

interface OrderItem {
  id: string
  name: string
  variant: string
  price: number
  image?: string
  selected: boolean
}

interface ReturnRequest {
  orderNumber: string
  email: string
  items: OrderItem[]
  reason: string
  resolution: string
}

const RETURN_REASONS = [
  { id: 'too_small', label: 'Too small' },
  { id: 'too_large', label: 'Too large' },
  { id: 'changed_mind', label: 'Changed my mind' },
  { id: 'defective', label: 'Defective / damaged' },
  { id: 'wrong_item', label: 'Wrong item received' },
  { id: 'gift_return', label: 'Gift return' },
]

const RESOLUTIONS = [
  {
    id: 'refund',
    label: 'Refund to original payment',
    description: 'Refunded within 3–5 business days',
    icon: <CreditCard className="w-5 h-5" />,
    badge: null,
  },
  {
    id: 'exchange',
    label: 'Exchange for different size/variant',
    description: 'Ships in 3–5 business days',
    icon: <RefreshCcw className="w-5 h-5" />,
    badge: null,
  },
  {
    id: 'store_credit',
    label: 'Store credit',
    description: 'Receive 10% bonus on credit value',
    icon: <Tag className="w-5 h-5" />,
    badge: '+10% bonus',
  },
]

// Mock order data for demo
const MOCK_ORDERS: Record<string, { items: OrderItem[]; email: string }> = {
  'BJO-10042': {
    email: 'demo@example.com',
    items: [
      { id: '1', name: 'Solitaire Diamond Ring', variant: 'Size 6, 14k White Gold', price: 1890, selected: false },
      { id: '2', name: 'Diamond Tennis Bracelet', variant: '14k Yellow Gold', price: 2340, selected: false },
    ],
  },
  'BJO-10039': {
    email: 'demo@example.com',
    items: [
      { id: '3', name: 'Pearl Drop Earrings', variant: 'Sterling Silver', price: 480, selected: false },
    ],
  },
}

const STEPS: { id: Step; label: string }[] = [
  { id: 'lookup', label: 'Order Lookup' },
  { id: 'items', label: 'Select Items' },
  { id: 'reason', label: 'Reason' },
  { id: 'resolution', label: 'Resolution' },
  { id: 'confirmation', label: 'Confirmation' },
]

export default function ReturnsStartPage() {
  const [step, setStep] = useState<Step>('lookup')
  const [returnRequest, setReturnRequest] = useState<ReturnRequest>({
    orderNumber: '',
    email: '',
    items: [],
    reason: '',
    resolution: '',
  })
  const [lookupError, setLookupError] = useState('')
  const [isLooking, setIsLooking] = useState(false)

  const currentStepIndex = STEPS.findIndex((s) => s.id === step)

  const handleLookup = async () => {
    setLookupError('')
    setIsLooking(true)
    // Simulate async lookup
    await new Promise((r) => setTimeout(r, 600))
    const order = MOCK_ORDERS[returnRequest.orderNumber.trim().toUpperCase()]
    if (!order) {
      setLookupError('Order not found. Please check your order number and try again.')
      setIsLooking(false)
      return
    }
    if (order.email !== returnRequest.email.trim().toLowerCase() && returnRequest.email.trim() !== '') {
      // For demo, accept any email
    }
    setReturnRequest((prev) => ({ ...prev, items: order.items }))
    setIsLooking(false)
    setStep('items')
  }

  const toggleItem = (id: string) => {
    setReturnRequest((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    }))
  }

  const selectedItems = returnRequest.items.filter((i) => i.selected)
  const totalValue = selectedItems.reduce((sum, i) => sum + i.price, 0)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <Link href="/returns" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Returns Policy
          </Link>
          <h1 className="text-3xl font-light text-gray-900 mb-2">Start a Return</h1>
          <p className="text-gray-500">Free returns within 30 days of delivery.</p>
        </div>

        {/* Step Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      i < currentStepIndex
                        ? 'bg-gray-900 text-white'
                        : i === currentStepIndex
                        ? 'bg-gray-900 text-white ring-4 ring-gray-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {i < currentStepIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`mt-1 text-xs hidden sm:block ${
                      i === currentStepIndex ? 'text-gray-900 font-medium' : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i < currentStepIndex ? 'bg-gray-900' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">

          {/* Step 1: Order Lookup */}
          {step === 'lookup' && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-6">Find Your Order</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                  <input
                    type="text"
                    placeholder="e.g. BJO-10042"
                    value={returnRequest.orderNumber}
                    onChange={(e) => setReturnRequest((p) => ({ ...p, orderNumber: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email used for order"
                    value={returnRequest.email}
                    onChange={(e) => setReturnRequest((p) => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-400 mt-1">Try order <strong>BJO-10042</strong> with any email for a demo.</p>
                </div>
                {lookupError && (
                  <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-3">{lookupError}</p>
                )}
                <button
                  onClick={handleLookup}
                  disabled={!returnRequest.orderNumber || isLooking}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLooking ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Look Up Order
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Items */}
          {step === 'items' && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Select Items to Return</h2>
              <p className="text-gray-500 text-sm mb-6">Order {returnRequest.orderNumber} — select the item(s) you&apos;d like to return or exchange.</p>
              <div className="space-y-3 mb-6">
                {returnRequest.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full text-left border rounded-xl p-4 transition-all ${
                      item.selected
                        ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          item.selected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
                        }`}
                      >
                        {item.selected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.variant}</p>
                      </div>
                      <p className="font-medium text-gray-900 flex-shrink-0">${item.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
              {selectedItems.length > 0 && (
                <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600 mb-6">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected &mdash; total value ${totalValue.toLocaleString()}
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep('lookup')} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep('reason')}
                  disabled={selectedItems.length === 0}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Reason */}
          {step === 'reason' && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Why are you returning?</h2>
              <p className="text-gray-500 text-sm mb-6">Select the reason that best describes your return.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {RETURN_REASONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setReturnRequest((p) => ({ ...p, reason: r.id }))}
                    className={`border rounded-xl px-4 py-3 text-sm text-left transition-all ${
                      returnRequest.reason === r.id
                        ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 font-medium text-gray-900'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('items')} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep('resolution')}
                  disabled={!returnRequest.reason}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Resolution */}
          {step === 'resolution' && (
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">How would you like to resolve this?</h2>
              <p className="text-gray-500 text-sm mb-6">Choose how you&apos;d like us to handle your return.</p>
              <div className="space-y-3 mb-6">
                {RESOLUTIONS.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => setReturnRequest((p) => ({ ...p, resolution: res.id }))}
                    className={`w-full text-left border rounded-xl p-4 transition-all ${
                      returnRequest.resolution === res.id
                        ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        returnRequest.resolution === res.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {res.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{res.label}</p>
                          {res.badge && (
                            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">{res.badge}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{res.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                        returnRequest.resolution === res.id ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                      }`}>
                        {returnRequest.resolution === res.id && (
                          <div className="w-full h-full rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('reason')} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep('confirmation')}
                  disabled={!returnRequest.resolution}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Submit Return <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">Return Submitted!</h2>
              <p className="text-gray-500 mb-8">
                Your return request for order <strong>{returnRequest.orderNumber}</strong> has been received.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 text-left mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Next Steps</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Print your prepaid return label</p>
                      <p className="text-xs text-gray-500">Download below and print at home or any UPS store.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Package your items securely</p>
                      <p className="text-xs text-gray-500">Use original packaging if possible. Include all certificates.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Drop off at any UPS location</p>
                      <p className="text-xs text-gray-500">Within 14 days. Your items are insured during transit.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Return window:</strong> Drop off your package within <strong>14 days</strong> to complete this return.
                </p>
              </div>

              <button
                onClick={() => {
                  // Mock PDF download — opens blank
                  const blob = new Blob(['BONJOOJOO PREPAID RETURN LABEL\n\nOrder: ' + returnRequest.orderNumber + '\nReturn ID: RTN-' + Math.floor(Math.random() * 90000 + 10000) + '\n\nDrop off at any UPS location within 14 days.'], { type: 'application/pdf' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `bonjoojoo-return-label-${returnRequest.orderNumber}.pdf`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <Download className="w-4 h-4" />
                Download Return Label
              </button>

              <div className="flex gap-3">
                <Link href="/account/returns" className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium">
                  View My Returns
                </Link>
                <Link href="/" className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
