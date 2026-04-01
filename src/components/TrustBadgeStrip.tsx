import { Lock, Shield, Truck, Award, RotateCcw, Leaf, CheckCircle } from 'lucide-react'

// ─── Variant definitions ───────────────────────────────────────────────────────

const CHECKOUT_BADGES = [
  { icon: Lock,        label: 'SSL Secured',            sub: 'Encrypted & safe' },
  { icon: Shield,      label: '30-Day Money-Back',       sub: 'Hassle-free guarantee' },
  { icon: Truck,       label: 'Free Shipping',           sub: 'On orders $150+' },
  { icon: Award,       label: 'IGI Certified',           sub: 'Authentic lab diamonds' },
]

const PRODUCT_BADGES = [
  { icon: Truck,       label: 'Free Shipping' },
  { icon: RotateCcw,   label: 'Free Returns' },
  { icon: Award,       label: 'IGI Certified' },
  { icon: Shield,      label: 'Lifetime Warranty' },
]

const HOMEPAGE_BADGES = [
  { icon: Leaf,         label: 'Lab-Grown Certified' },
  { icon: CheckCircle,  label: 'Ethically Sourced' },
  { icon: Truck,        label: 'Free Shipping' },
  { icon: RotateCcw,    label: '30-Day Returns' },
  { icon: Shield,       label: 'Lifetime Warranty' },
]

// ─── Checkout / Cart variant ───────────────────────────────────────────────────

export function CheckoutTrustStrip() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {CHECKOUT_BADGES.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex items-center gap-2.5 bg-stone-100/60 rounded px-3 py-2.5">
          <Icon size={15} strokeWidth={1.5} className="text-stone-500 flex-shrink-0" />
          <div>
            <p className="text-[11px] font-semibold text-stone-800 leading-none">{label}</p>
            <p className="text-[10px] text-stone-500 mt-0.5">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Cart sidebar variant ──────────────────────────────────────────────────────

export function CartTrustStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {CHECKOUT_BADGES.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Icon size={12} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-500">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Product page compact inline strip ────────────────────────────────────────

export function ProductTrustStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 border-t border-b border-bj-gray-100">
      {PRODUCT_BADGES.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Icon size={13} strokeWidth={1.5} className="text-bj-gray-400 flex-shrink-0" />
          <span className="text-[12px] text-bj-gray-500">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Homepage 5-pillar strip ───────────────────────────────────────────────────

export function HomepageTrustStrip() {
  return (
    <div className="bg-bj-offwhite border-y border-bj-gray-100 py-5">
      <div className="container-bj-wide">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4 lg:gap-0">
          {HOMEPAGE_BADGES.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && (
                <div className="hidden lg:block w-px h-4 bg-bj-gray-200 mr-4" />
              )}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white border border-bj-gray-200 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} strokeWidth={1.5} className="text-bj-black" />
                </div>
                <span className="text-[12px] font-medium text-bj-black tracking-wide">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Footer trust strip ────────────────────────────────────────────────────────

const FOOTER_BADGES = [
  { icon: Lock,        label: 'Secure Checkout' },
  { icon: Truck,       label: 'Free Shipping' },
  { icon: RotateCcw,   label: '30-Day Returns' },
  { icon: Award,       label: 'IGI Certified' },
  { icon: Shield,      label: 'Lifetime Warranty' },
]

export function FooterTrustStrip() {
  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="container-bj-wide py-5">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {FOOTER_BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={14} strokeWidth={1.5} className="text-bj-gray-400 flex-shrink-0" />
              <span className="text-[12px] text-bj-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
