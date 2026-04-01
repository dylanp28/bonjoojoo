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

// ─── Payment method logos ──────────────────────────────────────────────────────

function PaymentLogos() {
  return (
    <div className="mt-4 pt-4 border-t border-stone-200">
      <p className="text-[10px] font-medium text-stone-500 uppercase tracking-wider mb-2">Accepted Payments</p>
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Visa */}
        <span className="inline-flex items-center justify-center h-6 px-2 rounded border border-stone-200 bg-white">
          <svg width="32" height="10" viewBox="0 0 780 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
            <path d="M293 170L316 80H352L329 170H293Z" fill="#1A1F71"/>
            <path d="M464 83C457 80 446 77 432 77C397 77 372 95 372 121C371 140 389 150 402 156C416 163 421 167 421 173C421 182 410 186 400 186C385 186 377 184 363 178L358 176L352 209C361 213 376 217 393 217C430 217 454 199 455 172C455 156 445 144 424 134C411 127 403 122 403 115C403 109 410 102 424 102C436 102 445 105 452 108L455 109L464 83Z" fill="#1A1F71"/>
            <path d="M556 80H528C519 80 513 83 509 92L452 170H491L499 149H545L549 170H583L556 80ZM510 122C510 122 524 85 525 80C527 83 534 122 534 122H510Z" fill="#1A1F71"/>
            <path d="M250 80L216 141L212 122C205 101 185 78 163 67L195 170H234L298 80H250Z" fill="#1A1F71"/>
            <path d="M182 80H122L121 83C168 94 199 122 212 122L182 80Z" fill="#F9A533"/>
          </svg>
        </span>
        {/* Mastercard */}
        <span className="inline-flex items-center justify-center h-6 w-10 rounded border border-stone-200 bg-white" aria-label="Mastercard">
          <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="9" r="8" fill="#EB001B"/>
            <circle cx="18" cy="9" r="8" fill="#F79E1B"/>
            <path d="M14 3.18a8 8 0 0 1 0 11.64A8 8 0 0 1 14 3.18z" fill="#FF5F00"/>
          </svg>
        </span>
        {/* Amex */}
        <span className="inline-flex items-center justify-center h-6 px-1.5 rounded border border-stone-200 bg-[#2557D6]" aria-label="American Express">
          <span className="text-white text-[8px] font-bold tracking-wider leading-none">AMEX</span>
        </span>
        {/* PayPal */}
        <span className="inline-flex items-center justify-center h-6 px-1.5 rounded border border-stone-200 bg-white" aria-label="PayPal">
          <svg width="40" height="10" viewBox="0 0 124 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.2 6.5H37.4C36.8 6.5 36.3 6.9 36.2 7.5L32.8 28.8C32.7 29.2 33 29.6 33.4 29.6H37.6C38.2 29.6 38.7 29.2 38.8 28.6L39.7 23C39.8 22.4 40.3 22 40.9 22H43.5C48.9 22 52 19.5 52.8 14.6C53.1 12.5 52.8 10.8 51.8 9.6C50.7 8.3 48.7 6.5 46.2 6.5ZM47.1 15.2C46.7 17.8 44.7 17.8 42.8 17.8H41.7L42.4 13.3C42.5 13 42.8 12.8 43.1 12.8H43.5C44.8 12.8 46 12.8 46.6 13.6C47 14 47.2 14.5 47.1 15.2Z" fill="#003087"/>
            <path d="M68.5 15.1H64.3C64 15.1 63.7 15.3 63.6 15.6L63.4 16.7L63.1 16.3C62.2 15 60.4 14.6 58.6 14.6C54.5 14.6 51 17.7 50.3 22C49.9 24.3 50.5 26.5 51.9 28C53.2 29.4 55 30 57 30C60.4 30 62.3 27.9 62.3 27.9L62.1 29C62 29.4 62.3 29.8 62.7 29.8H66.5C67.1 29.8 67.6 29.4 67.7 28.8L70 16.3C70.1 15.9 69.8 15.1 68.5 15.1ZM63.6 22.2C63.2 24.4 61.5 25.9 59.3 25.9C58.2 25.9 57.3 25.5 56.7 24.9C56.1 24.2 55.9 23.2 56.1 22.1C56.5 19.9 58.2 18.4 60.4 18.4C61.5 18.4 62.4 18.8 63 19.5C63.6 20.1 63.8 21.1 63.6 22.2Z" fill="#003087"/>
            <path d="M89.1 15.1H84.8C84.4 15.1 84 15.3 83.8 15.7L78.1 24L75.7 16C75.6 15.5 75.1 15.1 74.6 15.1H70.4C69.9 15.1 69.6 15.6 69.8 16.1L74.4 29.1L70.1 35.1C69.8 35.6 70.1 36.2 70.7 36.2H75C75.4 36.2 75.8 36 76 35.6L89.7 16.1C90 15.6 89.7 15.1 89.1 15.1Z" fill="#003087"/>
            <path d="M103.9 6.5H95.1C94.5 6.5 94 6.9 93.9 7.5L90.5 28.8C90.4 29.2 90.7 29.6 91.1 29.6H95.6C96 29.6 96.4 29.3 96.4 28.9L97.4 23C97.5 22.4 98 22 98.6 22H101.2C106.6 22 109.7 19.5 110.5 14.6C110.8 12.5 110.5 10.8 109.5 9.6C108.4 8.3 106.4 6.5 103.9 6.5ZM104.8 15.2C104.4 17.8 102.4 17.8 100.5 17.8H99.4L100.1 13.3C100.2 13 100.5 12.8 100.8 12.8H101.2C102.5 12.8 103.7 12.8 104.3 13.6C104.7 14 104.9 14.5 104.8 15.2Z" fill="#009CDE"/>
            <path d="M126.2 15.1H122C121.7 15.1 121.4 15.3 121.3 15.6L121.1 16.7L120.8 16.3C119.9 15 118.1 14.6 116.3 14.6C112.2 14.6 108.7 17.7 108 22C107.6 24.3 108.2 26.5 109.6 28C110.9 29.4 112.7 30 114.7 30C118.1 30 120 27.9 120 27.9L119.8 29C119.7 29.4 120 29.8 120.4 29.8H124.2C124.8 29.8 125.3 29.4 125.4 28.8L127.7 16.3C127.8 15.9 127.5 15.1 126.2 15.1ZM121.3 22.2C120.9 24.4 119.2 25.9 117 25.9C115.9 25.9 115 25.5 114.4 24.9C113.8 24.2 113.6 23.2 113.8 22.1C114.2 19.9 115.9 18.4 118.1 18.4C119.2 18.4 120.1 18.8 120.7 19.5C121.3 20.1 121.5 21.1 121.3 22.2Z" fill="#009CDE"/>
          </svg>
        </span>
      </div>
    </div>
  )
}

// ─── Checkout / Cart variant ───────────────────────────────────────────────────

export function CheckoutTrustStrip() {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-3">
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
      <PaymentLogos />
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
