'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { ChevronRight, Check, Minus, Plus, Trash2, Package, Truck, Zap, ShoppingBag, Gift, Tag, X as XIcon } from 'lucide-react'
import { validatePromoCode, calculateDiscount, type AppliedPromo } from '@/constants/promo-codes'

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = 'cart' | 'contact' | 'shipping' | 'review' | 'confirmation'

interface GiftOptions {
  isGift: boolean
  giftMessage: string
  giftWrapping: boolean
  giftReceipt: boolean
}

const GIFT_WRAPPING_PRICE = 8.99

interface ContactInfo {
  email: string
  firstName: string
  lastName: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  country: string
}

interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimate: string
  icon: React.ReactNode
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Free on all orders',
    price: 0,
    estimate: '5–7 business days',
    icon: <Package size={20} strokeWidth={1.5} />,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Priority handling',
    price: 15,
    estimate: '2–3 business days',
    icon: <Truck size={20} strokeWidth={1.5} />,
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    description: 'Next business day',
    price: 35,
    estimate: '1 business day',
    icon: <Zap size={20} strokeWidth={1.5} />,
  },
]

const STEPS: { id: Step; label: string }[] = [
  { id: 'cart', label: 'Bag' },
  { id: 'contact', label: 'Shipping' },
  { id: 'shipping', label: 'Delivery' },
  { id: 'review', label: 'Review' },
  { id: 'confirmation', label: 'Confirmation' },
]

const STEP_ORDER: Step[] = ['cart', 'contact', 'shipping', 'review', 'confirmation']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateOrderNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = 'BJ-'
  for (let i = 0; i < 8; i++) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function fmt(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)
}

function saveOrderToLocalStorage(order: object) {
  try {
    const existing = JSON.parse(localStorage.getItem('bonjoojoo-orders') || '[]')
    existing.unshift(order)
    localStorage.setItem('bonjoojoo-orders', JSON.stringify(existing))
  } catch {}
}

// ─── Progress indicator ───────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEP_ORDER.indexOf(current)
  if (current === 'confirmation') return null

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.filter(s => s.id !== 'confirmation').map((step, i) => {
        const stepIndex = STEP_ORDER.indexOf(step.id)
        const done = stepIndex < currentIndex
        const active = stepIndex === currentIndex
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  done
                    ? 'bg-stone-900 text-white'
                    : active
                    ? 'bg-stone-900 text-white ring-4 ring-stone-900/10'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {done ? <Check size={14} strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className={`mt-1.5 text-[11px] font-medium tracking-wide uppercase ${
                  active ? 'text-stone-900' : done ? 'text-stone-600' : 'text-stone-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.filter(s => s.id !== 'confirmation').length - 1 && (
              <div
                className={`h-px w-6 sm:w-14 mx-0.5 mb-5 transition-all duration-300 ${
                  stepIndex < currentIndex ? 'bg-stone-900' : 'bg-stone-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Order Summary sidebar ────────────────────────────────────────────────────

function OrderSummary({
  items,
  selectedShipping,
  giftOptions,
  appliedPromo,
}: {
  items: ReturnType<typeof useCart>['items']
  selectedShipping: ShippingMethod | null
  giftOptions?: GiftOptions
  appliedPromo?: AppliedPromo | null
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const shippingCost = selectedShipping?.price ?? 0
  const giftWrappingCost = giftOptions?.isGift && giftOptions?.giftWrapping ? GIFT_WRAPPING_PRICE : 0
  const discount = appliedPromo?.discount ?? 0
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + giftWrappingCost + tax - discount

  return (
    <aside className="bg-stone-50 border border-stone-200 rounded-lg p-6">
      <h3 className="font-serif text-[17px] text-stone-900 mb-5">Order Summary</h3>
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-14 h-14 rounded bg-white border border-stone-200 overflow-hidden flex-shrink-0">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-100">
                  <ShoppingBag size={16} className="text-stone-400" />
                </div>
              )}
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-stone-900 font-medium leading-snug line-clamp-2">{item.name}</p>
              {item.size && <p className="text-[12px] text-stone-500">Size: {item.size}</p>}
              {item.engraving && <p className="text-[12px] text-stone-500">Engraving: &ldquo;{item.engraving}&rdquo;{item.engravingFont ? ` — ${item.engravingFont}` : ''}</p>}
            </div>
            <p className="text-[13px] text-stone-900 font-medium flex-shrink-0">{fmt(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-stone-200 pt-4 space-y-2">
        <div className="flex justify-between text-[13px] text-stone-600">
          <span>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-[13px] text-green-700">
            <span className="flex items-center gap-1.5">
              <Tag size={11} />
              {appliedPromo.code}
            </span>
            <span>−{fmt(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-[13px] text-stone-600">
          <span>Shipping</span>
          <span>{selectedShipping ? (shippingCost === 0 ? 'Free' : fmt(shippingCost)) : '—'}</span>
        </div>
        {giftWrappingCost > 0 && (
          <div className="flex justify-between text-[13px] text-stone-600">
            <span className="flex items-center gap-1.5"><Gift size={12} className="text-stone-400" />Gift wrapping</span>
            <span>+{fmt(giftWrappingCost)}</span>
          </div>
        )}
        <div className="flex justify-between text-[13px] text-stone-600">
          <span>Estimated tax</span>
          <span>{fmt(tax)}</span>
        </div>
      </div>
      <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between">
        <span className="font-serif text-[15px] text-stone-900">Total</span>
        <span className="font-serif text-[18px] text-stone-900">{fmt(total)}</span>
      </div>
    </aside>
  )
}

// ─── Gift Options Section ─────────────────────────────────────────────────────

function GiftOptionsSection({
  giftOptions,
  onChange,
}: {
  giftOptions: GiftOptions
  onChange: (opts: GiftOptions) => void
}) {
  const toggle = (key: keyof GiftOptions) => {
    onChange({ ...giftOptions, [key]: !giftOptions[key as 'isGift' | 'giftWrapping' | 'giftReceipt'] })
  }

  return (
    <div className="mt-6 border border-stone-200 rounded-lg overflow-hidden">
      {/* Toggle header */}
      <label className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-stone-50 transition-colors select-none">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            giftOptions.isGift ? 'bg-stone-900 border-stone-900' : 'border-stone-300'
          }`}
          onClick={() => toggle('isGift')}
        >
          {giftOptions.isGift && <Check size={12} strokeWidth={3} className="text-white" />}
        </div>
        <input type="checkbox" className="sr-only" checked={giftOptions.isGift} onChange={() => toggle('isGift')} />
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-stone-600" strokeWidth={1.5} />
          <span className="text-[14px] font-medium text-stone-900">This is a gift</span>
        </div>
      </label>

      {/* Expanded options */}
      {giftOptions.isGift && (
        <div className="border-t border-stone-200 px-5 py-5 bg-stone-50 space-y-5">
          {/* Gift message */}
          <div>
            <label className="block text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-2">
              Gift Message <span className="normal-case tracking-normal font-normal text-stone-400">(optional)</span>
            </label>
            <textarea
              value={giftOptions.giftMessage}
              onChange={e => onChange({ ...giftOptions, giftMessage: e.target.value.slice(0, 150) })}
              placeholder="Write a personal message for the recipient…"
              rows={3}
              className="w-full border border-stone-200 bg-white px-4 py-2.5 text-[13px] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-colors resize-none"
            />
            <p className="text-[11px] text-stone-400 mt-1 text-right">{giftOptions.giftMessage.length}/150</p>
          </div>

          {/* Gift wrapping */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <div
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                giftOptions.giftWrapping ? 'bg-stone-900 border-stone-900' : 'border-stone-300 bg-white'
              }`}
              onClick={() => toggle('giftWrapping')}
            >
              {giftOptions.giftWrapping && <Check size={12} strokeWidth={3} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={giftOptions.giftWrapping} onChange={() => toggle('giftWrapping')} />
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="text-[14px] font-medium text-stone-900">Gift wrapping</p>
                <p className="text-[13px] font-medium text-stone-900">+{fmt(GIFT_WRAPPING_PRICE)}</p>
              </div>
              <p className="text-[12px] text-stone-500 mt-0.5">Signature bonjoojoo box with satin ribbon</p>
            </div>
          </label>

          {/* Gift receipt */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <div
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                giftOptions.giftReceipt ? 'bg-stone-900 border-stone-900' : 'border-stone-300 bg-white'
              }`}
              onClick={() => toggle('giftReceipt')}
            >
              {giftOptions.giftReceipt && <Check size={12} strokeWidth={3} className="text-white" />}
            </div>
            <input type="checkbox" className="sr-only" checked={giftOptions.giftReceipt} onChange={() => toggle('giftReceipt')} />
            <div>
              <p className="text-[14px] font-medium text-stone-900">Include gift receipt</p>
              <p className="text-[12px] text-stone-500 mt-0.5">No prices shown — recipient can exchange easily</p>
            </div>
          </label>
        </div>
      )}
    </div>
  )
}

// ─── Step: Cart Review ────────────────────────────────────────────────────────

function CartStep({
  items,
  updateQuantity,
  removeItem,
  onNext,
  giftOptions,
  onGiftOptionsChange,
  promoInput,
  onPromoInputChange,
  promoStatus,
  promoError,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}: {
  items: ReturnType<typeof useCart>['items']
  updateQuantity: (id: string, qty: number) => void
  removeItem: (id: string) => void
  onNext: () => void
  giftOptions: GiftOptions
  onGiftOptionsChange: (opts: GiftOptions) => void
  promoInput: string
  onPromoInputChange: (v: string) => void
  promoStatus: 'idle' | 'valid' | 'invalid'
  promoError: string
  appliedPromo: AppliedPromo | null
  onApplyPromo: () => void
  onRemovePromo: () => void
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag size={48} strokeWidth={1} className="text-stone-300 mx-auto mb-4" />
        <p className="font-serif text-xl text-stone-800 mb-2">Your bag is empty</p>
        <p className="text-stone-500 text-sm mb-8">Add some pieces you love</p>
        <Link href="/" className="inline-block bg-stone-900 text-white text-sm px-8 py-3 hover:bg-stone-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-stone-900 mb-6">Review Your Bag</h2>
      <div className="divide-y divide-stone-100">
        {items.map(item => (
          <div key={item.id} className="py-5 flex gap-4">
            <div className="relative w-20 h-20 rounded bg-stone-100 overflow-hidden flex-shrink-0">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag size={20} className="text-stone-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-stone-900 text-[15px] leading-snug mb-1">{item.name}</p>
              {item.size && <p className="text-[13px] text-stone-500 mb-0.5">Size: {item.size}</p>}
              {item.engraving && <p className="text-[13px] text-stone-500 mb-2">Engraving: &ldquo;{item.engraving}&rdquo;{item.engravingFont ? ` — ${item.engravingFont}` : ''}</p>}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-200 rounded">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-11 h-11 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-[13px] font-medium text-stone-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-stone-400 hover:text-red-500 transition-colors p-2 -m-2"
                  aria-label="Remove item"
                >
                  <Trash2 size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-medium text-stone-900">{fmt(item.price * item.quantity)}</p>
              {item.quantity > 1 && (
                <p className="text-[12px] text-stone-400">{fmt(item.price)} each</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gift options */}
      <GiftOptionsSection giftOptions={giftOptions} onChange={onGiftOptionsChange} />

      {/* Promo code */}
      <div className="mt-6">
        {appliedPromo ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded px-4 py-3">
            <div className="flex items-center gap-2">
              <Check size={14} strokeWidth={2.5} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-[13px] font-medium text-green-800">{appliedPromo.code} applied</p>
                <p className="text-[12px] text-green-600">{appliedPromo.description} — saving {fmt(appliedPromo.discount)}</p>
              </div>
            </div>
            <button
              onClick={onRemovePromo}
              className="text-green-600 hover:text-green-900 transition-colors ml-3 flex-shrink-0"
              aria-label="Remove promo code"
            >
              <XIcon size={14} />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={e => onPromoInputChange(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && onApplyPromo()}
                placeholder="Promo code"
                className={`flex-1 border text-[14px] px-3 py-2.5 outline-none transition-colors ${
                  promoStatus === 'invalid'
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-stone-200 focus:border-stone-400'
                }`}
              />
              <button
                onClick={onApplyPromo}
                disabled={!promoInput.trim()}
                className="bg-stone-900 text-white text-[13px] font-medium px-4 py-2.5 hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            {promoStatus === 'invalid' && (
              <p className="text-[12px] text-red-600 mt-1.5">{promoError}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-stone-200 flex items-center justify-between">
        <div>
          <p className="text-[13px] text-stone-500">Subtotal</p>
          <p className="font-serif text-xl text-stone-900">{fmt(subtotal)}</p>
          {appliedPromo && (
            <p className="text-[13px] text-green-700 font-medium">−{fmt(appliedPromo.discount)} promo</p>
          )}
        </div>
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-stone-900 text-white px-8 py-3 text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── Step: Contact + Shipping ─────────────────────────────────────────────────

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC'
]

function ContactStep({
  info,
  onChange,
  onNext,
  onBack,
}: {
  info: ContactInfo
  onChange: (field: keyof ContactInfo, value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({})

  const validate = () => {
    const e: Partial<Record<keyof ContactInfo, string>> = {}
    const required: Array<keyof ContactInfo> = ['email', 'firstName', 'lastName', 'addressLine1', 'city', 'state', 'zip', 'country']
    required.forEach(field => {
      if (!info[field]?.trim()) e[field] = 'Required'
    })
    if (info.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      e.email = 'Enter a valid email address'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  const field = (
    id: keyof ContactInfo,
    label: string,
    placeholder: string,
    type = 'text',
    optional = false
  ) => (
    <div>
      <label htmlFor={id} className="block text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-1.5">
        {label}{optional && <span className="text-stone-400 normal-case tracking-normal font-normal ml-1">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={info[id]}
        onChange={e => onChange(id, e.target.value)}
        placeholder={placeholder}
        className={`w-full border px-4 py-2.5 text-[14px] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-colors ${
          errors[id] ? 'border-red-400 bg-red-50' : 'border-stone-200 bg-white'
        }`}
      />
      {errors[id] && <p className="text-red-500 text-[12px] mt-1">{errors[id]}</p>}
    </div>
  )

  return (
    <div>
      <h2 className="font-serif text-2xl text-stone-900 mb-6">Contact & Shipping</h2>
      <div className="space-y-4">
        {field('email', 'Email', 'you@example.com', 'email')}
        <div className="grid grid-cols-2 gap-4">
          {field('firstName', 'First Name', 'Jane')}
          {field('lastName', 'Last Name', 'Smith')}
        </div>
        {field('phone', 'Phone', '+1 (555) 000-0000', 'tel', true)}
        {field('addressLine1', 'Address', '123 Maple Street')}
        {field('addressLine2', 'Apt, Suite, etc.', 'Apt 4B', 'text', true)}
        <div className="grid grid-cols-2 gap-4">
          {field('city', 'City', 'New York')}
          <div>
            <label htmlFor="state" className="block text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-1.5">
              State
            </label>
            <select
              id="state"
              value={info.state}
              onChange={e => onChange('state', e.target.value)}
              className={`w-full border px-4 py-2.5 text-[14px] text-stone-900 focus:outline-none focus:border-stone-900 transition-colors ${
                errors.state ? 'border-red-400 bg-red-50' : 'border-stone-200 bg-white'
              }`}
            >
              <option value="">Select state</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <p className="text-red-500 text-[12px] mt-1">{errors.state}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {field('zip', 'ZIP Code', '10001')}
          <div>
            <label htmlFor="country" className="block text-[12px] font-medium text-stone-600 uppercase tracking-wider mb-1.5">
              Country
            </label>
            <select
              id="country"
              value={info.country}
              onChange={e => onChange('country', e.target.value)}
              className="w-full border border-stone-200 px-4 py-2.5 text-[14px] text-stone-900 focus:outline-none focus:border-stone-900 transition-colors bg-white"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1">
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-stone-900 text-white px-8 py-3 text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── Step: Shipping Method ────────────────────────────────────────────────────

function ShippingMethodStep({
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  selected: string
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-stone-900 mb-6">Shipping Method</h2>
      <div className="space-y-3">
        {SHIPPING_METHODS.map(method => (
          <label
            key={method.id}
            className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-all duration-200 ${
              selected === method.id
                ? 'border-stone-900 bg-stone-50'
                : 'border-stone-200 hover:border-stone-400'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onSelect(method.id)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selected === method.id ? 'border-stone-900' : 'border-stone-300'
            }`}>
              {selected === method.id && <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />}
            </div>
            <div className={`${selected === method.id ? 'text-stone-800' : 'text-stone-500'}`}>
              {method.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-medium text-stone-900 text-[14px]">{method.name}</p>
                <p className="font-medium text-stone-900 text-[14px]">
                  {method.price === 0 ? 'Free' : fmt(method.price)}
                </p>
              </div>
              <p className="text-[13px] text-stone-500">{method.description} · {method.estimate}</p>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="flex items-center gap-2 bg-stone-900 text-white px-8 py-3 text-sm font-medium hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── Step: Order Review ───────────────────────────────────────────────────────

function ReviewStep({
  items,
  contact,
  shippingMethod,
  giftOptions,
  appliedPromo,
  onPlaceOrder,
  onBack,
  placing,
}: {
  items: ReturnType<typeof useCart>['items']
  contact: ContactInfo
  shippingMethod: ShippingMethod
  giftOptions: GiftOptions
  appliedPromo: AppliedPromo | null
  onPlaceOrder: () => void
  onBack: () => void
  placing: boolean
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const giftWrappingCost = giftOptions.isGift && giftOptions.giftWrapping ? GIFT_WRAPPING_PRICE : 0
  const discount = appliedPromo?.discount ?? 0
  const tax = subtotal * 0.08
  const total = subtotal + shippingMethod.price + giftWrappingCost + tax - discount
  const [paymentMethod, setPaymentMethod] = useState<'full' | 'afterpay'>('full')

  return (
    <div>
      <h2 className="font-serif text-2xl text-stone-900 mb-6">Review Your Order</h2>

      {/* Items */}
      <section className="mb-6">
        <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-3">Items ({items.reduce((s, i) => s + i.quantity, 0)})</h3>
        <div className="divide-y divide-stone-100 border border-stone-200 rounded">
          {items.map(item => (
            <div key={item.id} className="flex gap-3 p-3">
              <div className="relative w-12 h-12 rounded bg-stone-100 overflow-hidden flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={14} className="text-stone-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-stone-900 line-clamp-1">{item.name}</p>
                <p className="text-[12px] text-stone-500">Qty: {item.quantity}</p>
                {item.size && <p className="text-[12px] text-stone-400">Size: {item.size}</p>}
                {item.engraving && <p className="text-[12px] text-stone-400">Engraving: &ldquo;{item.engraving}&rdquo;{item.engravingFont ? ` — ${item.engravingFont}` : ''}</p>}
              </div>
              <p className="text-[13px] font-medium text-stone-900 flex-shrink-0">{fmt(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping */}
      <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-stone-200 rounded p-4">
          <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-2">Ship To</h3>
          <p className="text-[13px] text-stone-900 font-medium">{contact.firstName} {contact.lastName}</p>
          <p className="text-[13px] text-stone-600">{contact.addressLine1}{contact.addressLine2 ? `, ${contact.addressLine2}` : ''}</p>
          <p className="text-[13px] text-stone-600">{contact.city}, {contact.state} {contact.zip}</p>
          <p className="text-[13px] text-stone-500 mt-1">{contact.email}</p>
        </div>
        <div className="border border-stone-200 rounded p-4">
          <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-2">Delivery</h3>
          <p className="text-[13px] text-stone-900 font-medium">{shippingMethod.name}</p>
          <p className="text-[13px] text-stone-600">{shippingMethod.estimate}</p>
          <p className="text-[13px] text-stone-600">{shippingMethod.price === 0 ? 'Free' : fmt(shippingMethod.price)}</p>
        </div>
      </section>

      {/* Gift options summary */}
      {giftOptions.isGift && (
        <section className="mb-6 border border-stone-200 rounded p-4">
          <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Gift size={12} />Gift Options
          </h3>
          <div className="space-y-1.5">
            {giftOptions.giftMessage && (
              <div>
                <p className="text-[12px] text-stone-500 mb-0.5">Message</p>
                <p className="text-[13px] text-stone-700 italic">&ldquo;{giftOptions.giftMessage}&rdquo;</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {giftOptions.giftWrapping && (
                <span className="inline-flex items-center gap-1 text-[12px] text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                  <Check size={10} strokeWidth={2.5} />Gift wrapping (+{fmt(GIFT_WRAPPING_PRICE)})
                </span>
              )}
              {giftOptions.giftReceipt && (
                <span className="inline-flex items-center gap-1 text-[12px] text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                  <Check size={10} strokeWidth={2.5} />Gift receipt included
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Totals */}
      <section className="mb-8 border border-stone-200 rounded p-4 space-y-2">
        <div className="flex justify-between text-[13px] text-stone-600">
          <span>Subtotal</span><span>{fmt(subtotal)}</span>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-[13px] text-green-700">
            <span className="flex items-center gap-1.5"><Tag size={11} />{appliedPromo.code}</span>
            <span>−{fmt(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-[13px] text-stone-600">
          <span>Shipping</span><span>{shippingMethod.price === 0 ? 'Free' : fmt(shippingMethod.price)}</span>
        </div>
        {giftWrappingCost > 0 && (
          <div className="flex justify-between text-[13px] text-stone-600">
            <span>Gift wrapping</span><span>+{fmt(giftWrappingCost)}</span>
          </div>
        )}
        <div className="flex justify-between text-[13px] text-stone-600">
          <span>Tax (est.)</span><span>{fmt(tax)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-stone-200">
          <span className="font-serif text-[15px] text-stone-900">Total</span>
          <span className="font-serif text-[18px] text-stone-900">{fmt(total)}</span>
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-8">
        <h3 className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-3">Payment Method</h3>
        <div className="space-y-2">
          <label className={`flex items-start gap-3 p-4 border rounded cursor-pointer transition-colors ${paymentMethod === 'full' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="full"
              checked={paymentMethod === 'full'}
              onChange={() => setPaymentMethod('full')}
              className="mt-0.5"
            />
            <div>
              <p className="text-[14px] font-medium text-stone-900">Pay in full</p>
              <p className="text-[12px] text-stone-500 mt-0.5">Credit / debit card · {fmt(total)}</p>
            </div>
          </label>
          <label className={`flex items-start gap-3 p-4 border rounded cursor-pointer transition-colors ${paymentMethod === 'afterpay' ? 'border-[#00B14F] bg-[#F0FFF6]' : 'border-stone-200 hover:border-stone-300'}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="afterpay"
              checked={paymentMethod === 'afterpay'}
              onChange={() => setPaymentMethod('afterpay')}
              className="mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B2FCE4] text-[#00B14F] font-bold text-[10px]">AP</span>
                <p className="text-[14px] font-medium text-stone-900">Pay in 4 installments (Afterpay)</p>
              </div>
              <p className="text-[12px] text-stone-500 mt-0.5">4 × {fmt(total / 4)} · interest-free</p>
            </div>
          </label>
        </div>

        {paymentMethod === 'afterpay' && (
          <div className="mt-3 border border-[#B2FCE4] bg-[#F0FFF6] rounded p-4 space-y-2">
            <p className="text-[12px] font-medium text-stone-700 mb-3">Your payment schedule:</p>
            {[
              { label: 'Today', note: 'at checkout' },
              { label: '2 weeks', note: 'after purchase' },
              { label: '4 weeks', note: 'after purchase' },
              { label: '6 weeks', note: 'after purchase' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-[12px]">
                <span className="text-stone-600">{row.label} <span className="text-stone-400">({row.note})</span></span>
                <span className="font-medium text-stone-900">{fmt(total / 4)}</span>
              </div>
            ))}
            <p className="text-[11px] text-stone-500 mt-3 pt-3 border-t border-[#B2FCE4]">
              You will be redirected to Afterpay to complete your purchase.
            </p>
          </div>
        )}
      </section>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1">
          ← Back
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={placing}
          className="flex items-center gap-2 bg-stone-900 text-white px-10 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          {placing ? 'Placing Order…' : paymentMethod === 'afterpay' ? 'Continue to Afterpay' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

// ─── Step: Confirmation ───────────────────────────────────────────────────────

function ConfirmationStep({
  orderNumber,
  items,
  contact,
  shippingMethod,
  giftOptions,
  appliedPromo,
}: {
  orderNumber: string
  items: ReturnType<typeof useCart>['items']
  contact: ContactInfo
  shippingMethod: ShippingMethod
  giftOptions: GiftOptions
  appliedPromo: AppliedPromo | null
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const giftWrappingCost = giftOptions.isGift && giftOptions.giftWrapping ? GIFT_WRAPPING_PRICE : 0
  const discount = appliedPromo?.discount ?? 0
  const tax = subtotal * 0.08
  const total = subtotal + shippingMethod.price + giftWrappingCost + tax - discount

  return (
    <div className="text-center">
      {/* Success icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center">
          <Check size={30} strokeWidth={2} className="text-white" />
        </div>
      </div>

      <h2 className="font-serif text-3xl text-stone-900 mb-2">Thank You</h2>
      <p className="text-stone-600 mb-1">
        Your order has been placed successfully.
      </p>
      <p className="text-stone-500 text-sm mb-6">
        A confirmation will be sent to <span className="font-medium text-stone-700">{contact.email}</span>
      </p>

      {/* Order number */}
      <div className="inline-block bg-stone-50 border border-stone-200 rounded px-6 py-4 mb-8">
        <p className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-1">Order Number</p>
        <p className="font-mono text-lg font-bold text-stone-900 tracking-widest">{orderNumber}</p>
      </div>

      {/* Summary */}
      <div className="text-left border border-stone-200 rounded mb-8 overflow-hidden">
        <div className="bg-stone-50 px-5 py-3 border-b border-stone-200">
          <p className="text-[12px] font-medium text-stone-600 uppercase tracking-widest">Order Summary</p>
        </div>
        <div className="divide-y divide-stone-100">
          {items.map(item => (
            <div key={item.id} className="flex gap-3 p-4">
              <div className="relative w-12 h-12 rounded bg-stone-100 overflow-hidden flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={14} className="text-stone-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-stone-900">{item.name}</p>
                <p className="text-[12px] text-stone-500">Qty: {item.quantity}</p>
                {item.size && <p className="text-[12px] text-stone-400">Size: {item.size}</p>}
                {item.engraving && <p className="text-[12px] text-stone-400">Engraving: &ldquo;{item.engraving}&rdquo;{item.engravingFont ? ` — ${item.engravingFont}` : ''}</p>}
              </div>
              <p className="text-[13px] font-medium text-stone-900">{fmt(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="px-4 py-4 bg-stone-50 border-t border-stone-200 space-y-1.5">
          <div className="flex justify-between text-[13px] text-stone-600">
            <span>Subtotal</span><span>{fmt(subtotal)}</span>
          </div>
          {appliedPromo && (
            <div className="flex justify-between text-[13px] text-green-700">
              <span className="flex items-center gap-1.5"><Tag size={11} />{appliedPromo.code}</span>
              <span>−{fmt(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[13px] text-stone-600">
            <span>Shipping ({shippingMethod.name})</span>
            <span>{shippingMethod.price === 0 ? 'Free' : fmt(shippingMethod.price)}</span>
          </div>
          {giftWrappingCost > 0 && (
            <div className="flex justify-between text-[13px] text-stone-600">
              <span>Gift wrapping</span><span>+{fmt(giftWrappingCost)}</span>
            </div>
          )}
          <div className="flex justify-between text-[13px] text-stone-600">
            <span>Tax</span><span>{fmt(tax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-stone-200">
            <span className="font-serif text-[15px] text-stone-900">Total</span>
            <span className="font-serif text-[17px] text-stone-900">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Gift options summary */}
      {giftOptions.isGift && (
        <div className="text-left border border-stone-200 rounded p-4 mb-6">
          <p className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Gift size={12} />Gift Details
          </p>
          {giftOptions.giftMessage && (
            <p className="text-[13px] text-stone-700 italic mb-2">&ldquo;{giftOptions.giftMessage}&rdquo;</p>
          )}
          <div className="flex flex-wrap gap-2">
            {giftOptions.giftWrapping && (
              <span className="inline-flex items-center gap-1 text-[12px] text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                <Check size={10} strokeWidth={2.5} />Gift wrapping included
              </span>
            )}
            {giftOptions.giftReceipt && (
              <span className="inline-flex items-center gap-1 text-[12px] text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                <Check size={10} strokeWidth={2.5} />Gift receipt included
              </span>
            )}
          </div>
        </div>
      )}

      {/* Shipping address */}
      <div className="text-left border border-stone-200 rounded p-4 mb-8">
        <p className="text-[11px] font-medium text-stone-500 uppercase tracking-widest mb-2">Shipping To</p>
        <p className="text-[13px] text-stone-900 font-medium">{contact.firstName} {contact.lastName}</p>
        <p className="text-[13px] text-stone-600">{contact.addressLine1}{contact.addressLine2 ? `, ${contact.addressLine2}` : ''}</p>
        <p className="text-[13px] text-stone-600">{contact.city}, {contact.state} {contact.zip}</p>
        <p className="text-[13px] text-stone-500 mt-1">Estimated delivery: {shippingMethod.estimate}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-block bg-stone-900 text-white px-8 py-3 text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="inline-block border border-stone-300 text-stone-700 px-8 py-3 text-sm font-medium hover:bg-stone-50 transition-colors"
        >
          View Orders
        </Link>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart } = useCart()

  const [step, setStep] = useState<Step>('cart')
  const [contact, setContact] = useState<ContactInfo>({
    email: '', firstName: '', lastName: '', phone: '',
    addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'US',
  })
  const [selectedShippingId, setSelectedShippingId] = useState('standard')
  const [giftOptions, setGiftOptions] = useState<GiftOptions>({
    isGift: false,
    giftMessage: '',
    giftWrapping: false,
    giftReceipt: false,
  })
  const [confirmedGiftOptions, setConfirmedGiftOptions] = useState<GiftOptions>({
    isGift: false, giftMessage: '', giftWrapping: false, giftReceipt: false,
  })
  const [orderNumber, setOrderNumber] = useState('')
  const [confirmedItems, setConfirmedItems] = useState<typeof items>([])
  const [placing, setPlacing] = useState(false)

  // Promo code state
  const [promoInput, setPromoInput] = useState('')
  const [promoStatus, setPromoStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [promoError, setPromoError] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null)
  const [confirmedPromo, setConfirmedPromo] = useState<AppliedPromo | null>(null)

  const selectedShipping = SHIPPING_METHODS.find(m => m.id === selectedShippingId) ?? SHIPPING_METHODS[0]

  // Redirect if cart is empty and not on confirmation
  useEffect(() => {
    if (items.length === 0 && step !== 'confirmation') {
      router.push('/')
    }
  }, [items.length, step, router])

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }))
  }

  const goTo = (s: Step) => {
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleApplyPromo = () => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const result = validatePromoCode(promoInput, subtotal)
    if (result.valid) {
      const discount = calculateDiscount(result.promo, subtotal)
      setAppliedPromo({ code: result.promo.code, description: result.promo.description, discount })
      setPromoStatus('valid')
      setPromoInput('')
      setPromoError('')
    } else {
      setPromoStatus('invalid')
      setPromoError(result.error)
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoStatus('idle')
    setPromoInput('')
    setPromoError('')
  }

  const handlePlaceOrder = () => {
    setPlacing(true)
    const num = generateOrderNumber()
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const giftWrappingCost = giftOptions.isGift && giftOptions.giftWrapping ? GIFT_WRAPPING_PRICE : 0
    const discount = appliedPromo?.discount ?? 0
    const tax = subtotal * 0.08
    const total = subtotal + selectedShipping.price + giftWrappingCost + tax - discount

    const order = {
      orderId: num,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      total,
      subtotal,
      tax,
      discount,
      promoCode: appliedPromo?.code ?? null,
      shippingCost: selectedShipping.price,
      shippingMethod: selectedShipping.name,
      giftOptions: giftOptions.isGift ? giftOptions : null,
      items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
      shippingInfo: contact,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      environmentalImpact: { carbonSaved: `${(items.length * 2.5).toFixed(1)}kg`, waterSaved: `${items.length * 890}L` },
    }

    saveOrderToLocalStorage(order)
    setOrderNumber(num)
    setConfirmedItems([...items])
    setConfirmedGiftOptions({ ...giftOptions })
    setConfirmedPromo(appliedPromo)

    setTimeout(() => {
      setPlacing(false)
      goTo('confirmation')  // step becomes 'confirmation' before cart clears
      clearCart()
    }, 600)
  }

  if (items.length === 0 && step !== 'confirmation') {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-[22px] tracking-[0.15em] text-stone-900 uppercase">
            bonjoojoo
          </Link>
          {step !== 'confirmation' && (
            <p className="text-[12px] text-stone-500 uppercase tracking-wider">Secure Checkout</p>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {step !== 'confirmation' && <StepIndicator current={step} />}

        <div className={`flex gap-12 ${step === 'confirmation' ? 'justify-center' : ''}`}>
          {/* Left: Step content */}
          <div className={step === 'confirmation' ? 'w-full max-w-xl' : 'flex-1 min-w-0'}>
            {step === 'cart' && (
              <CartStep
                items={items}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                onNext={() => goTo('contact')}
                giftOptions={giftOptions}
                onGiftOptionsChange={setGiftOptions}
                promoInput={promoInput}
                onPromoInputChange={setPromoInput}
                promoStatus={promoStatus}
                promoError={promoError}
                appliedPromo={appliedPromo}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
              />
            )}
            {step === 'contact' && (
              <ContactStep
                info={contact}
                onChange={handleContactChange}
                onNext={() => goTo('shipping')}
                onBack={() => goTo('cart')}
              />
            )}
            {step === 'shipping' && (
              <ShippingMethodStep
                selected={selectedShippingId}
                onSelect={setSelectedShippingId}
                onNext={() => goTo('review')}
                onBack={() => goTo('contact')}
              />
            )}
            {step === 'review' && (
              <ReviewStep
                items={items}
                contact={contact}
                shippingMethod={selectedShipping}
                giftOptions={giftOptions}
                appliedPromo={appliedPromo}
                onPlaceOrder={handlePlaceOrder}
                onBack={() => goTo('shipping')}
                placing={placing}
              />
            )}
            {step === 'confirmation' && (
              <ConfirmationStep
                orderNumber={orderNumber}
                items={confirmedItems}
                contact={contact}
                shippingMethod={selectedShipping}
                giftOptions={confirmedGiftOptions}
                appliedPromo={confirmedPromo}
              />
            )}
          </div>

          {/* Right: Order summary (hidden on confirmation) */}
          {step !== 'confirmation' && (
            <div className="hidden lg:block w-80 flex-shrink-0">
              <OrderSummary
                items={items}
                selectedShipping={step === 'cart' ? null : selectedShipping}
                giftOptions={giftOptions}
                appliedPromo={appliedPromo}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
