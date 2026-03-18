'use client'

import { useRef } from 'react'
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Truck, RotateCcw, Star, Gift } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
import { LuxuryReveal, LuxuryParallax } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'

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
    [0.35, 0.08, 0, 0, 0.08, 0.35]
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
  const allProducts = products.slice(0, 8)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
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
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/model-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
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
                  <Link href="/lab-grown-diamonds" className="btn-ghost text-white border-white/50 hover:bg-white/10">Our Diamonds</Link>
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
              <Link href="/engraving" className="text-[14px] font-medium text-bj-black underline underline-offset-4 decoration-1 hover:text-bj-pink transition-colors">Shop Grad Gifts</Link>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            HERO 3 — CROWN COLLECTION (video)
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection style={{ height: '100vh', clipPath: 'inset(0)' }}>
          <div className="fixed inset-0" style={{ height: '100vh' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/crowns-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
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
                  <Link href="/collections/crown" className="btn-white">Shop Now</Link>
                  <Link href="/lab-grown-diamonds" className="btn-ghost text-white border-white/50 hover:bg-white/10">Discover More</Link>
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
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/bestsellers-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
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
              <Link href="/engraving" className="text-[14px] font-medium text-bj-black underline underline-offset-4 decoration-1 hover:text-bj-pink transition-colors">Start Creating</Link>
            </LuxuryReveal>
          </div>
        </FocusSection>

        {/* ═══════════════════════════════════════════════════════════
            HERO 4 — LAB-GROWN DIAMONDS (video)
            ═══════════════════════════════════════════════════════════ */}
        <FocusSection style={{ height: '100vh', clipPath: 'inset(0)' }}>
          <div className="fixed inset-0" style={{ height: '100vh' }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/diamonds-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
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
                  <Link href="/lab-grown-diamonds" className="btn-white">Shop Diamonds</Link>
                  <Link href="/about" className="btn-ghost text-white border-white/50 hover:bg-white/10">Learn More</Link>
                </div>
              </LuxuryReveal>
            </div>
          </div>
        </FocusSection>


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
                      <div className="aspect-[3/4] bg-gradient-to-b from-bj-offwhite to-[#F0EBE5] relative overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-6 product-card-img img-warm"
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
                      <div className="flex items-center gap-1 mb-1.5">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'text-bj-black fill-bj-black' : 'text-bj-gray-200 fill-bj-gray-200'} />
                          ))}
                        </div>
                        <span className="text-[11px] text-bj-gray-400">({product.reviewCount})</span>
                      </div>
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
                  className="object-cover img-duotone-rose"
                />
                {/* Warm gradient overlay for editorial feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B76E79]/15 via-transparent to-[#F5F0EB]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
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
