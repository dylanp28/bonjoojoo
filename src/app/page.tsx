'use client'

import { useRef, useState } from 'react'
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Truck, RotateCcw, Gift, CheckCircle, Star, Phone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { searchProducts } from '@/lib/products'
import { LuxuryReveal, LuxuryParallax } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'
import { LazyVideo } from '@/components/LazyVideo'
import { homepageTestimonials } from '@/data/reviews'
import { UGCGridSection } from '@/components/UGCGallery'
import { HomepageTrustStrip } from '@/components/TrustBadgeStrip'
import { getFeaturedBundles } from '@/data/bundles'

const EMAIL_LIST_KEY = 'bonjoojoo_newsletter_emails'

function storeNewsletterEmail(email: string) {
  try {
    const list = JSON.parse(localStorage.getItem(EMAIL_LIST_KEY) || '[]') as string[]
    if (!list.includes(email)) {
      localStorage.setItem(EMAIL_LIST_KEY, JSON.stringify([...list, email]))
    }
  } catch {}
}

// ─── Scroll-focus section: darkens when not in viewport center ───
function FocusSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.65, 0.8, 1],
    [0.15, 0.05, 0, 0, 0.05, 0.15]
  )

  return (
    <section ref={ref} className={`relative ${className || ''}`} style={style}>
      {children}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity, zIndex: 25 }}
      />
    </section>
  )
}

// ─── Format price ───
const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

export default function HomePage() {
  const allProducts = searchProducts({ limit: 8, bestseller: true }).products
  const scrollRef = useRef<HTMLDivElement>(null)
  const [nlEmail, setNlEmail] = useState('')
  const [nlSubmitted, setNlSubmitted] = useState(false)
  const [nlError, setNlError] = useState('')

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  const handleNlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = nlEmail.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNlError('Please enter a valid email address.')
      return
    }
    storeNewsletterEmail(trimmed)
    setNlSubmitted(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white relative">
        {/* Film grain — subtle texture across entire page */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* ═══════════════════════════════════════════════════════════
            HERO 1 — MAIN LANDING (model video)
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection style={{ height: '100vh', clipPath: 'inset(0)' }}>
          <div className="fixed inset-0" style={{ height: '100vh' }}>
            <LazyVideo
              src="/videos/model-hero-optimized.mp4"
              eager
              poster="/images/lab-grown-hero-1.webp"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end px-8 lg:px-16 pb-24 lg:pb-28">
            <div className="max-w-xl text-left">
              <LuxuryReveal direction="up" delay={0.1}>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Lab-Grown Diamonds</p>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.25}>
                <h1 className="text-display-hero text-white mb-5 drop-shadow-md font-medium">
                  Brilliance<br />
                  <span className="italic font-normal">Redefined</span>
                </h1>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.4}>
                <p className="text-[16px] leading-relaxed text-white/75 max-w-md mb-6">
                  Fine jewelry crafted with lab-grown diamonds. Same fire. Same beauty. A better future.
                </p>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.55}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/search" className="btn-white">Shop Now</Link>
                  <Link href="/education/lab-grown-diamonds" className="btn-ghost text-white border-white/50 hover:bg-white/10">Our Diamonds</Link>
                </div>
              </LuxuryReveal>
            </div>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            HERO 2 — LIMITED TIME PROMO (GRAD)
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="overflow-hidden bg-gradient-to-b from-[#F5F0EB] to-[#EDE6DE] py-28 lg:py-40">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bj-rose-gold/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bj-rose-gold/20 to-transparent" />
          <div className="relative z-10 text-center px-8">
            <LuxuryReveal direction="up" delay={0.1}>
              <p className="text-[11px] font-bold text-bj-pink tracking-[0.3em] uppercase mb-6">Class of 2026</p>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.25}>
              <p className="font-display text-[36px] lg:text-[56px] font-light text-bj-black leading-tight mb-2">
                Celebrate the Grad
              </p>
              <p className="font-display text-[36px] lg:text-[56px] font-light text-bj-black leading-tight mb-8">
                <span className="italic">Complimentary Engraving</span>
              </p>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.4}>
              <p className="text-[15px] text-bj-gray-500 max-w-md mx-auto mb-8">
                Make it personal &mdash; free engraving on all graduation gifts for a limited time.
              </p>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.55}>
              <Link href="/search?tag=graduation" className="text-[14px] font-medium text-bj-black underline underline-offset-4 decoration-1 hover:text-bj-pink transition-colors">Shop Grad Gifts</Link>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            HERO 3 — CROWN COLLECTION (video)
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection style={{ height: '100vh', clipPath: 'inset(0)' }}>
          <div className="fixed inset-0" style={{ height: '100vh' }}>
            <LazyVideo
              src="/videos/crowns-hero-optimized.mp4"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
          <div className="absolute inset-0 z-10 flex items-end pb-12 lg:pb-16 px-8 lg:px-16">
            <div className="max-w-xl text-left">
              <LuxuryReveal direction="up" delay={0.1}>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">New Collection</p>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.25}>
                <h1 className="text-display-hero text-white mb-5 drop-shadow-md font-medium">
                  Crown<br />
                  <span className="italic font-normal">Collection</span>
                </h1>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.4}>
                <p className="text-[16px] leading-relaxed text-white/75 max-w-md mb-8">
                  Romantic crown-inspired stacking rings with scattered lab-grown diamonds.
                </p>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.55}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/category/rings" className="btn-white">Shop Now</Link>
                  <Link href="/education/lab-grown-diamonds" className="btn-ghost text-white border-white/50 hover:bg-white/10">Discover More</Link>
                </div>
              </LuxuryReveal>
            </div>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            HERO 3 — BEST SELLERS (video)
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection style={{ height: '100vh', clipPath: 'inset(0)' }}>
          <div className="fixed inset-0" style={{ height: '100vh' }}>
            <LazyVideo
              src="/videos/bestsellers-hero-optimized.mp4"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
          <div className="absolute inset-0 z-10 flex items-end pb-12 lg:pb-16 px-8 lg:px-16">
            <div className="max-w-xl text-left">
              <LuxuryReveal direction="up" delay={0.1}>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Fan Favorites</p>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.25}>
                <h1 className="text-display-hero text-white mb-5 drop-shadow-md font-medium">
                  The Pieces<br />
                  <span className="italic font-normal">You Love</span>
                </h1>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/search" className="btn-white">Shop Favorites</Link>
                </div>
              </LuxuryReveal>
            </div>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            HERO 4 — ENGRAVING
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="min-h-[45vh] flex items-center overflow-hidden">
          {/* Full background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/engraving-bracelet.png"
              alt="Rose gold bracelet with custom engraving"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-contain object-right scale-[0.85] translate-x-[10%]"
            />
            {/* Gradient wash from left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#EDE5DA] via-[#EDE5DA]/85 to-transparent w-[65%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#EDE5DA] to-transparent w-[40%]" />
          </div>

          {/* Background color for entire section */}
          <div className="absolute inset-0 -z-10 bg-[#EDE5DA]" />

          {/* Text content */}
          <div className="relative z-10 px-8 lg:px-20 py-24 max-w-xl">
            <LuxuryReveal direction="up" delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-bj-rose-gold/40" />
                <p className="text-overline text-bj-pink tracking-[0.25em]">Make It Yours</p>
              </div>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.25}>
              <h2 className="text-display-hero text-bj-black mb-6">
                Imagine It.<br />
                Design It.<br />
                <span className="italic font-light">Wear It.</span>
              </h2>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.4}>
              <p className="text-body-lg max-w-md mb-10">
                Add your personal touch with custom engraving.
              </p>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.55}>
              <Link href="/search" className="text-[14px] font-medium text-bj-black underline underline-offset-4 decoration-1 hover:text-bj-pink transition-colors">Start Creating</Link>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            HERO 4 — LAB-GROWN DIAMONDS (video)
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection style={{ height: '100vh', clipPath: 'inset(0)' }}>
          <div className="fixed inset-0" style={{ height: '100vh' }}>
            <LazyVideo
              src="/videos/diamonds-hero-optimized.mp4"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end px-8 lg:px-16 pb-24 lg:pb-28">
            <div className="max-w-xl text-left">
              <LuxuryReveal direction="up" delay={0.1}>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Lab-Grown Diamonds</p>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.25}>
                <h1 className="text-display-hero text-white mb-5 drop-shadow-md font-medium">
                  Brilliance<br />
                  Without<br />
                  <span className="italic font-normal">Compromise</span>
                </h1>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.4}>
                <p className="text-[16px] leading-relaxed text-white/75 max-w-md mb-6">
                  IGI &amp; GIA certified. 95% less environmental impact. The same fire, clarity, and beauty &mdash; the future of fine jewelry.
                </p>
              </LuxuryReveal>
              <LuxuryReveal direction="up" delay={0.55}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/education/lab-grown-diamonds" className="btn-white">Shop Diamonds</Link>
                  <Link href="/about" className="btn-ghost text-white border-white/50 hover:bg-white/10">Learn More</Link>
                </div>
              </LuxuryReveal>
            </div>
          </div>
        </FocusSection>


        {/* ═══════════════════════════════════════════════════════════
            TRUST STRIP — 5 pillars
            ═══════════════════════════════════════════════════════════ */}
        <HomepageTrustStrip />

        {/* ═══════════════════════════════════════════════════════════
            PRODUCT CAROUSEL — Horizontal Scrolling Best Sellers
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="py-16 lg:py-24 bg-bj-gray-50">
          <div>
            <div className="container-bj-wide">
              <LuxuryReveal direction="up">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <p className="text-overline text-bj-pink mb-2">Trending Now</p>
                    <h2 className="text-display-lg text-bj-black">Best Sellers</h2>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <button onClick={() => scroll('left')} className="w-10 h-10 border border-bj-gray-200 flex items-center justify-center hover:border-bj-black hover:bg-bj-black hover:text-white transition-all" aria-label="Scroll left">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => scroll('right')} className="w-10 h-10 border border-bj-gray-200 flex items-center justify-center hover:border-bj-black hover:bg-bj-black hover:text-white transition-all" aria-label="Scroll right">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </LuxuryReveal>
            </div>

            {/* Scrolling product cards */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-container pb-4 pl-[max(24px,calc((100vw-1440px)/2+24px))] pr-6"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {allProducts.map((product) => (
                <div key={product.id} style={{ scrollSnapAlign: 'start' }} className="flex-none">
                  <Link href={`/product/${product.id}`} className="group flex-none w-[260px] lg:w-[300px] block">
                    <div className="product-card">
                      <div className="aspect-[3/4] bg-white relative overflow-hidden product-image-container">
                        <Image
                          src={product.images?.[0] || '/images/products/placeholder-product.svg'}
                          alt={product.name}
                          fill
                          className="object-contain p-4 product-grid-image"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/placeholder-product.svg' }}
                        />

                        {/* Badges */}
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="absolute top-3 left-3 bg-bj-pink text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 z-10">Sale</span>
                        )}
                        {product.tags.includes('bestseller') && !product.originalPrice && (
                          <span className="absolute top-3 left-3 bg-bj-black text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 z-10">Best Seller</span>
                        )}

                        {/* Wishlist */}
                        <button className="wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all z-10">
                          <svg viewBox="0 0 20 20" className="w-4 h-4 text-bj-gray-500 hover:text-bj-pink transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10 17.5s-7-4.5-7-9.5a4 4 0 0 1 7-2.7A4 4 0 0 1 17 8c0 5-7 9.5-7 9.5z" />
                          </svg>
                        </button>

                        {/* Quick Add */}
                        <div className="quick-add absolute bottom-0 left-0 right-0 z-10">
                          <button className="w-full py-3.5 bg-bj-black/90 backdrop-blur-sm text-white text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-bj-black transition-colors">
                            Quick Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="pt-4 px-1">
                      <h3 className="text-[14px] font-medium text-bj-black group-hover:text-bj-gray-500 transition-colors line-clamp-1 mb-1">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-medium text-bj-black">{formatPrice(product.price)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[13px] text-bj-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      {/* Color swatches */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#B76E79] border border-bj-gray-200" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#D4A843] border border-bj-gray-200" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#C0C0C0] border border-bj-gray-200" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="container-bj-wide mt-10 text-center">
              <LuxuryReveal direction="up">
                <Link href="/search" className="btn-secondary">View All Jewelry</Link>
              </LuxuryReveal>
            </div>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            EDITORIAL STORY SPLIT — Brand narrative
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="bg-white">
          <div className="grid lg:grid-cols-2 min-h-[75vh]">
            {/* Left — Lifestyle visual with warm editorial treatment */}
            <LuxuryReveal direction="left" className="relative overflow-hidden bg-bj-cream">
              <LuxuryParallax speed={0.2} className="relative w-full h-full min-h-[50vh]">
                <Image
                  src="/images/bonjoojoo-2.png"
                  alt="Bonjoojoo ring on hand"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Caption */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[11px] text-white/80 tracking-[0.25em] uppercase drop-shadow-md">Handcrafted in Los Angeles</p>
                </div>
              </LuxuryParallax>
            </LuxuryReveal>

            {/* Right — Content */}
            <LuxuryReveal direction="right" delay={0.2} className="flex items-center px-8 lg:px-20 py-20">
              <div className="max-w-lg">
                {/* Ornamental detail */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-bj-rose-gold/30" />
                  <p className="text-overline text-bj-pink">Our Promise</p>
                </div>
                <h2 className="text-display-md text-bj-black mb-6 leading-snug">
                  Same brilliance.<br />
                  Better conscience.
                </h2>
                <p className="text-body-lg mb-4">
                  Every Bonjoojoo diamond is grown with intention &mdash; identical in every way to mined diamonds, but with 95% less environmental impact.
                </p>
                <p className="text-body mb-8">
                  IGI & GIA certified. Conflict-free. Designed and handcrafted by our artisans in Los Angeles. Because luxury should never cost the earth.
                </p>
                <Link href="/about" className="btn-ghost">Our Story</Link>
              </div>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            TESTIMONIALS — Social proof from real customers
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="py-20 lg:py-28 bg-white border-t border-bj-gray-100">
          <div className="container-bj-wide">
            <LuxuryReveal direction="up">
              <div className="text-center mb-14">
                <p className="text-overline text-bj-pink mb-3">Real Stories</p>
                <h2 className="text-display-lg text-bj-black">Loved by Thousands</h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={18} className="text-[#C9A84C] fill-current" />
                  ))}
                  <span className="text-caption text-bj-gray-500 ml-2">4.9 average across 2,400+ reviews</span>
                </div>
              </div>
            </LuxuryReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {homepageTestimonials.map((t, index) => (
                <LuxuryReveal key={t.id} direction="up" delay={index * 0.1}>
                  <div className="bg-bj-offwhite p-8 lg:p-10 relative">
                    {/* Quote mark */}
                    <div className="text-[72px] leading-none text-bj-rose-gold/20 font-serif absolute top-4 left-8 select-none">&ldquo;</div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-6">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={13} className="text-[#C9A84C] fill-current" />
                        ))}
                      </div>
                      <p className="text-body-lg text-bj-black leading-relaxed mb-8 font-light italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-bj-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-caption font-semibold text-bj-gray-500">{t.author[0]}</span>
                        </div>
                        <div>
                          <p className="text-caption font-semibold text-bj-black">{t.author}</p>
                          <p className="text-[11px] text-bj-gray-400">{t.location} &middot; {t.product}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </LuxuryReveal>
              ))}
            </div>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            UGC / INSTAGRAM GRID — #bonjoojoo community
            ═══════════════════════════════════════════════════════════ */}
        <UGCGridSection />

        {/* ═══════════════════════════════════════════════════════════
            SHOP THE SETS — Curated bundles
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="py-20 lg:py-28 bg-bj-offwhite border-t border-bj-gray-100">
          <div className="container-bj-wide">
            <LuxuryReveal direction="up">
              <div className="text-center mb-14">
                <p className="text-overline text-bj-pink mb-3">Curated Collections</p>
                <h2 className="text-display-lg text-bj-black">Shop the Sets</h2>
                <p className="text-body text-bj-gray-500 mt-3 max-w-md mx-auto">
                  Perfectly matched pieces, thoughtfully bundled. Save up to 15% on every set.
                </p>
              </div>
            </LuxuryReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getFeaturedBundles().map((bundle, index) => (
                <LuxuryReveal key={bundle.id} direction="up" delay={index * 0.1}>
                  <Link
                    href="/bundles"
                    className="group block bg-white border border-bj-gray-100 overflow-hidden hover:border-bj-pink transition-colors duration-300"
                  >
                    {/* Decorative tile */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-bj-offwhite to-bj-blush flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center gap-3 p-6">
                        <div className="w-2 h-2 rounded-full bg-bj-rose-gold/40" />
                        <div className="w-12 h-px bg-bj-rose-gold/30" />
                        <span className="font-display text-[3rem] text-bj-rose-gold/25 group-hover:text-bj-rose-gold/40 transition-colors">◇</span>
                        <div className="w-12 h-px bg-bj-rose-gold/30" />
                        <div className="w-2 h-2 rounded-full bg-bj-rose-gold/40" />
                      </div>
                      <span className="absolute top-3 left-3 bg-bj-pink text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                        Save {bundle.discountPercent}%
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-bj-pink mb-1">
                        {bundle.tag.charAt(0).toUpperCase() + bundle.tag.slice(1)} Set
                      </p>
                      <h3 className="font-display text-[0.95rem] tracking-[0.04em] text-bj-black uppercase mb-2 group-hover:text-bj-pink transition-colors">
                        {bundle.name}
                      </h3>
                      <p className="text-[12px] text-bj-gray-500 leading-relaxed line-clamp-2">
                        {bundle.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 text-bj-pink">
                        <span className="text-[11px] font-semibold uppercase tracking-wider">Shop Set</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </LuxuryReveal>
              ))}
            </div>

            <LuxuryReveal direction="up" delay={0.3}>
              <div className="text-center mt-10">
                <Link
                  href="/bundles"
                  className="btn-secondary inline-block px-10 py-3 text-[11px] uppercase tracking-[0.12em]"
                >
                  View All Sets &amp; Bundles
                </Link>
              </div>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            GIFTING — "Give the gift of forever" CTA
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="py-20 lg:py-28 bg-bj-offwhite border-t border-bj-gray-100">
          <div className="container-bj">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left: copy */}
              <div className="flex-1 text-center lg:text-left">
                <LuxuryReveal direction="up" delay={0.1}>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <div className="w-8 h-px bg-bj-rose-gold/40" />
                    <p className="text-overline text-bj-pink">The Perfect Gift</p>
                    <div className="w-8 h-px bg-bj-rose-gold/40" />
                  </div>
                </LuxuryReveal>
                <LuxuryReveal direction="up" delay={0.2}>
                  <h2 className="text-display-lg text-bj-black mb-6 leading-tight">
                    Give the gift<br />
                    <span className="italic font-light text-bj-gray-500">of forever.</span>
                  </h2>
                </LuxuryReveal>
                <LuxuryReveal direction="up" delay={0.3}>
                  <p className="text-body text-bj-gray-500 mb-10 max-w-md mx-auto lg:mx-0">
                    Lab-grown diamonds that last a lifetime — for birthdays, anniversaries, and every moment worth celebrating. Complimentary gift packaging on every order.
                  </p>
                </LuxuryReveal>
                <LuxuryReveal direction="up" delay={0.4}>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Link href="/category/necklaces" className="btn-primary">
                      Shop Necklaces
                    </Link>
                    <Link href="/category/bracelets" className="btn-ghost">
                      Shop Bracelets
                    </Link>
                  </div>
                </LuxuryReveal>
              </div>
              {/* Right: gift category tiles */}
              <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-sm lg:max-w-none">
                {[
                  { label: 'Necklaces', href: '/category/necklaces', emoji: '✨' },
                  { label: 'Bracelets', href: '/category/bracelets', emoji: '💎' },
                  { label: 'Earrings', href: '/category/earrings', emoji: '🌟' },
                  { label: 'Rings', href: '/category/rings', emoji: '💍' },
                ].map(({ label, href, emoji }, i) => (
                  <LuxuryReveal key={label} direction="up" delay={0.15 + i * 0.07}>
                    <Link
                      href={href}
                      className="group flex flex-col items-center justify-center gap-3 bg-white border border-bj-gray-100 rounded-lg p-6 hover:border-bj-gray-300 hover:shadow-sm transition-all duration-300 aspect-square"
                    >
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-caption font-medium text-bj-black uppercase tracking-wider">{label}</span>
                    </Link>
                  </LuxuryReveal>
                ))}
              </div>
            </div>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            NEWSLETTER — Homepage email capture
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="py-24 lg:py-32 bg-[#1A1A1A] relative overflow-hidden">
          {/* Subtle diamond pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
          <div className="relative z-10 container-bj text-center">
            <LuxuryReveal direction="up" delay={0.1}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-bj-rose-gold/40" />
                <p className="text-overline text-bj-pink">Members Only</p>
                <div className="w-12 h-px bg-bj-rose-gold/40" />
              </div>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.2}>
              <h2 className="font-display text-[clamp(32px,5vw,60px)] font-light text-white leading-tight mb-4">
                Be the First to Know.
                <br />
                <span className="italic text-bj-pink-light">Get 10% Off.</span>
              </h2>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.35}>
              <p className="text-[15px] text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
                New collections, exclusive drops, and members-only offers — delivered straight to your inbox.
              </p>
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.5}>
              {nlSubmitted ? (
                <div className="flex flex-col items-center gap-3">
                  <CheckCircle size={32} className="text-green-400" />
                  <p className="text-[16px] font-medium text-white">
                    You&apos;re in! Your 10% off is on its way.
                  </p>
                  <p className="text-[13px] text-white/50">Check your inbox — welcome to the club.</p>
                </div>
              ) : (
                <form onSubmit={handleNlSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
                  <input
                    type="email"
                    value={nlEmail}
                    onChange={(e) => { setNlEmail(e.target.value); setNlError('') }}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-[13px] outline-none focus:border-white/50 transition-colors sm:border-r-0"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-bj-pink hover:bg-[#b8104d] text-white text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors whitespace-nowrap"
                  >
                    Join Now
                  </button>
                </form>
              )}
              {nlError && <p className="mt-3 text-[12px] text-red-400">{nlError}</p>}
            </LuxuryReveal>
            <LuxuryReveal direction="up" delay={0.65}>
              <p className="mt-5 text-[11px] text-white/30 tracking-[0.08em]">
                No spam, ever. Unsubscribe anytime.
              </p>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            CONSULTATION CTA — tasteful bottom section
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="py-16 bg-bj-blush border-t border-bj-rose-gold/10">
          <div className="container-bj">
            <LuxuryReveal direction="up">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-overline text-bj-pink mb-3">Free Consultation</p>
                  <h2 className="text-display-sm text-bj-black mb-4">Need help choosing?<br className="hidden lg:block" /> Talk to a Specialist.</h2>
                  <p className="text-body text-bj-gray-500 max-w-md mx-auto lg:mx-0 mb-8">
                    Our diamond specialists are here to guide you through the 4Cs, help you find the perfect setting, and answer every question — free, with no pressure.
                  </p>
                  <Link href="/consultation" className="btn-primary inline-flex items-center gap-3 py-4 px-8">
                    <Phone size={16} strokeWidth={1.5} />
                    Book a Free Consultation
                  </Link>
                </div>
                <div className="flex-shrink-0 grid grid-cols-1 gap-5 w-full lg:w-auto lg:min-w-[280px]">
                  {[
                    { label: 'Free 30-minute call', sub: 'One-on-one with a certified specialist' },
                    { label: 'No pressure, ever', sub: 'We guide — the decision is yours' },
                    { label: 'Expert 4Cs guidance', sub: 'Cut, clarity, color & carat explained' },
                  ].map(({ label, sub }) => (
                    <div key={label} className="flex items-center gap-4 bg-white/70 px-5 py-4">
                      <div className="w-2 h-2 rounded-full bg-bj-pink flex-shrink-0" />
                      <div>
                        <p className="text-[13px] font-semibold text-bj-black">{label}</p>
                        <p className="text-[12px] text-bj-gray-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            TRUST BADGES — Pandora "Benefits" style
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection className="py-14 bg-white border-t border-gray-100">
          <div className="container-bj">
            <PandoraStaggerGrid staggerDelay={0.15} className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On every order, always' },
                { icon: RotateCcw, title: 'Free 30-Day Returns', desc: 'No questions asked' },
                { icon: Gift, title: 'Gift Packaging', desc: 'Complimentary on all orders' },
              ].map(({ icon: Icon, title, desc }) => (
                <PandoraStaggerItem key={title}>
                  <div className="trust-badge flex items-start gap-4">
                    <div className="w-12 h-12 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0 trust-icon transition-transform">
                      <Icon size={18} className="text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-bj-black">{title}</h4>
                      <p className="text-[13px] text-bj-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                </PandoraStaggerItem>
              ))}
            </PandoraStaggerGrid>
          </div>
        </FocusSection>
      </div>
    </MotionConfig>
  )
}
