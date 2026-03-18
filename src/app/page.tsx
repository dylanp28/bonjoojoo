'use client'

import { useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Truck, RotateCcw, Shield, Star, Gift } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { products, collections } from '@/data/products'
import { LuxuryReveal, LuxuryParallax, LuxuryStagger, LuxuryHover } from '@/components/animations/LuxuryAnimationSystem'
import { PandoraStaggerGrid, PandoraStaggerItem } from '@/components/PandoraAnimations'

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
            HERO 1 — CROWN COLLECTION (video)
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative" style={{ height: '100vh', clipPath: 'inset(0)' }}>
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
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
        </section>

        {/* ═══════════════════════════════════════════════════════════
            HERO 2 — LIMITED TIME PROMO
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-bj-cream py-24 lg:py-36">
          <div className="flex items-center">
            <div className="container-bj-wide">
              <div className="grid lg:grid-cols-2 items-center gap-10">
                <LuxuryReveal direction="left" delay={0.1}>
                  <div className="lg:pr-12">
                    <p className="text-[11px] font-bold text-bj-pink tracking-[0.2em] uppercase mb-4">Class of 2026</p>
                    <p className="font-display text-[36px] lg:text-[48px] font-light text-bj-black leading-tight mb-2">
                      Celebrate the Grad
                    </p>
                    <p className="font-display text-[36px] lg:text-[48px] font-light text-bj-black leading-tight mb-5">
                      Complimentary Engraving
                    </p>
                    <p className="text-[15px] text-bj-gray-500 mb-6">
                      Make it personal &mdash; free engraving on all graduation gifts for a limited time.
                    </p>
                    <Link href="/engraving" className="text-[14px] font-medium text-bj-black underline underline-offset-4 decoration-1 hover:text-bj-pink transition-colors">Shop Grad Gifts</Link>
                  </div>
                </LuxuryReveal>
                <LuxuryReveal direction="right" delay={0.2}>
                  <div className="flex justify-center">
                    <div className="relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]">
                      <div className="absolute inset-[15%] bg-white/60 rounded-full blur-[40px]" />
                      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[6px] bg-bj-rose-gold/10 rounded-full blur-[8px]" />
                      <Image
                        src="/images/bonjoojoo-4.png"
                        alt="Diamond Station Bracelet"
                        fill
                        className="object-contain drop-shadow-lg relative z-10 img-warm p-4"
                      />
                    </div>
                  </div>
                </LuxuryReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            HERO 3 — BEST SELLERS (video)
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative" style={{ height: '100vh', clipPath: 'inset(0)' }}>
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
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
                  <Link href="/collections" className="btn-white">Shop Favorites</Link>
                </div>
              </LuxuryReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            HERO 4 — ENGRAVING
            ═══════════════════════════════════════════════════════════ */}
        <section className="hero-section">
          <LuxuryParallax speed={0.3} className="absolute inset-0">
            <div className="hero-bg">
              <Image src="/images/lab-grown-hero-2.webp" alt="" fill className="object-cover" />
              {/* Rose-tinted cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDF2F4]/90 via-[#FDF2F4]/50 to-[#F5F0EB]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              {/* Decorative dots */}
              <div className="absolute right-[18%] top-[22%] w-1.5 h-1.5 rounded-full bg-bj-pink/20" />
              <div className="absolute right-[22%] top-[32%] w-1 h-1 rounded-full bg-bj-rose-gold/15" />
              <div className="absolute right-[15%] top-[42%] w-2 h-2 rounded-full bg-bj-pink/10" />
            </div>
          </LuxuryParallax>

          <div className="hero-content">
            <div className="container-bj-wide">
              <div className="max-w-xl">
                <LuxuryReveal direction="up" delay={0.1}>
                  <p className="text-overline text-bj-pink mb-5 tracking-[0.25em]">Make It Yours</p>
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
                  <Link href="/engraving" className="btn-pink">Start Creating</Link>
                </LuxuryReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            HERO 4 — LAB-GROWN DIAMONDS (dark, cinematic)
            ═══════════════════════════════════════════════════════════ */}
        <section className="hero-section">
          <LuxuryParallax speed={0.4} className="absolute inset-0">
            <div className="hero-bg">
              <Image src="/images/lab-grown-hero-3.webp" alt="" fill className="object-cover img-duotone-dark" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/75 via-[#1A1A1A]/35 to-transparent" />
              {/* Subtle geometric accents */}
              <div className="absolute right-[10%] top-[20%] w-24 h-24 rotate-45 border border-white/[0.04]" />
              <div className="absolute right-[20%] top-[38%] w-14 h-14 rotate-45 border border-bj-pink/[0.08]" />
              <div className="absolute right-[7%] bottom-[28%] w-10 h-10 rotate-45 border border-white/[0.03]" />
              {/* Radial pink glow */}
              <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[600px] h-[600px] bg-bj-pink/[0.04] rounded-full blur-[120px]" />
            </div>
          </LuxuryParallax>

          <div className="hero-content">
            <div className="container-bj-wide">
              <div className="max-w-xl">
                <LuxuryReveal direction="up" delay={0.1}>
                  <p className="text-overline text-bj-pink-light mb-5 tracking-[0.25em]">Lab-Grown Diamonds</p>
                </LuxuryReveal>
                <LuxuryReveal direction="up" delay={0.25}>
                  <h2 className="text-display-hero text-white mb-6">
                    Brilliance<br />
                    Without<br />
                    <span className="italic font-light text-bj-pink-light">Compromise</span>
                  </h2>
                </LuxuryReveal>
                <LuxuryReveal direction="up" delay={0.4}>
                  <p className="text-[17px] leading-relaxed text-white/60 max-w-md mb-10">
                    IGI & GIA certified. 95% less environmental impact. The same fire, clarity, and beauty &mdash; the future of fine jewelry.
                  </p>
                </LuxuryReveal>
                <LuxuryReveal direction="up" delay={0.55}>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/lab-grown-diamonds" className="btn-white">Shop Diamonds</Link>
                    <Link href="/about" className="btn-ghost text-white border-white/40 hover:text-bj-pink-light hover:border-bj-pink-light">
                      Learn More
                    </Link>
                  </div>
                </LuxuryReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CATEGORY GRID — "Find what speaks to you"
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-bj-wide">
            <LuxuryReveal direction="up">
              {/* Section ornament */}
              <div className="section-ornament mb-4">
                <div className="ornament-diamond" />
              </div>
              <div className="text-center mb-14">
                <p className="text-[17px] text-bj-gray-500 font-display italic">Find what speaks to you</p>
              </div>
            </LuxuryReveal>

            <PandoraStaggerGrid staggerDelay={0.08} className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
              {/* Sale — spans 2 cols */}
              <PandoraStaggerItem className="lg:col-span-2">
                <Link href="/sale" className="category-tile group block">
                  <div className="aspect-square lg:aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-bj-pink via-[#E85A8A] to-[#D4145A]">
                    <Image src="/images/bonjoojoo-1.png" alt="" fill className="object-cover opacity-[0.12] mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-[42px] lg:text-[56px] font-display font-light leading-none">30%</p>
                        <p className="text-[14px] font-medium tracking-[0.2em] uppercase mt-2">Off Sale</p>
                      </div>
                    </div>
                    <div className="category-overlay absolute inset-0" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Sale 30% Off</h3>
                </Link>
              </PandoraStaggerItem>

              {/* Rings */}
              <PandoraStaggerItem>
                <Link href="/rings" className="category-tile group block">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#F5F0EB] to-[#EDE6DE]">
                    <Image src="/images/bonjoojoo-1.png" alt="Rings" fill className="object-contain p-5 category-img img-warm" />
                    <div className="category-overlay absolute inset-0" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Rings</h3>
                </Link>
              </PandoraStaggerItem>

              {/* Necklaces */}
              <PandoraStaggerItem>
                <Link href="/necklaces" className="category-tile group block">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#FAF8F6] to-[#F0EBE5]">
                    <Image src="/images/bonjoojoo-6.png" alt="Necklaces" fill className="object-cover scale-110 object-[center_30%] category-img img-editorial" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F0EBE5]/40 to-transparent" />
                    <div className="category-overlay absolute inset-0" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Necklaces</h3>
                </Link>
              </PandoraStaggerItem>

              {/* Earrings */}
              <PandoraStaggerItem>
                <Link href="/earrings" className="category-tile group block">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#FDF2F4] to-[#F5E8EC]">
                    <Image src="/images/bonjoojoo-3.png" alt="Earrings" fill className="object-cover scale-125 object-[center_40%] category-img img-warm" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F5E8EC]/30 to-transparent" />
                    <div className="category-overlay absolute inset-0" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Earrings</h3>
                </Link>
              </PandoraStaggerItem>

              {/* Bracelets */}
              <PandoraStaggerItem>
                <Link href="/bracelets" className="category-tile group block">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#F5F0EB] to-[#EDE6DE]">
                    <Image src="/images/bonjoojoo-5.png" alt="Bracelets" fill className="object-contain p-4 category-img img-warm" />
                    <div className="category-overlay absolute inset-0" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Bracelets</h3>
                </Link>
              </PandoraStaggerItem>

              {/* Gifts — full width banner */}
              <PandoraStaggerItem className="col-span-2 lg:col-span-6">
                <Link href="/gifts" className="category-tile group block">
                  <div className="relative overflow-hidden bg-gradient-to-r from-bj-offwhite via-bj-cream to-bj-offwhite py-8 lg:py-10">
                    <div className="flex items-center justify-center gap-6">
                      <Gift size={24} className="text-bj-gray-400 group-hover:text-bj-pink transition-colors" />
                      <div>
                        <h3 className="text-[18px] font-display text-bj-black group-hover:text-bj-gray-500 transition-colors">Gifts</h3>
                        <p className="text-[13px] text-bj-gray-400">Perfect presents for every occasion</p>
                      </div>
                      <ArrowRight size={18} className="text-bj-gray-300 group-hover:text-bj-pink group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </PandoraStaggerItem>
            </PandoraStaggerGrid>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            PRODUCT CAROUSEL — Horizontal Scrolling Best Sellers
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-bj-gray-50">
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
                <Link href="/collections" className="btn-secondary">View All Jewelry</Link>
              </LuxuryReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            EDITORIAL STORY SPLIT — Brand narrative
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-white">
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
        </section>

        {/* ═══════════════════════════════════════════════════════════
            COLLECTIONS GRID
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-bj-offwhite">
          <div className="container-bj">
            <LuxuryReveal direction="up">
              <div className="section-ornament mb-4">
                <div className="ornament-diamond" />
              </div>
              <div className="text-center mb-14">
                <p className="text-overline text-bj-gray-400 mb-3">Curated</p>
                <h2 className="text-display-lg text-bj-black">Our Collections</h2>
              </div>
            </LuxuryReveal>

            <LuxuryStagger delay={0.12} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((col) => {
                const collectionImages: Record<string, string> = {
                  crown: '/images/bonjoojoo-1.png',
                  cuff: '/images/bonjoojoo-2.png',
                  pave: '/images/bonjoojoo-3.png',
                  station: '/images/bonjoojoo-4.png',
                  constellation: '/images/bonjoojoo-6.png',
                }
                const collectionGradients: Record<string, string> = {
                  crown: 'from-[#F5F0EB] to-[#EDE6DE]',
                  cuff: 'from-[#FAF8F6] to-[#F0EBE5]',
                  pave: 'from-[#FDF2F4] to-[#F5E8EC]',
                  station: 'from-[#F5F0EB] to-[#EDE6DE]',
                  constellation: 'from-[#F0EBF5] to-[#E8E2EE]',
                }
                const isLifestyle = col.id === 'cuff' || col.id === 'constellation'
                return (
                  <LuxuryHover key={col.id} scale={1.02} elevation>
                    <Link href={`/collections/${col.id}`} className="group block category-tile">
                      <div className={`aspect-[4/3] relative overflow-hidden bg-gradient-to-br ${collectionGradients[col.id] || 'from-bj-offwhite to-bj-cream'}`}>
                        <Image
                          src={collectionImages[col.id] || '/images/bonjoojoo-1.png'}
                          alt={col.name}
                          fill
                          className={`category-img img-warm ${isLifestyle ? 'object-cover' : 'object-contain p-8'}`}
                        />
                        {/* Warm overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/35 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-[18px] font-display text-white drop-shadow-md">{col.name}</h3>
                          <p className="text-[12px] text-white/75 drop-shadow-sm">{col.description}</p>
                        </div>
                      </div>
                    </Link>
                  </LuxuryHover>
                )
              })}
            </LuxuryStagger>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            TRUST BADGES — Pandora "Benefits" style
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="container-bj">
            <PandoraStaggerGrid staggerDelay={0.15} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On every order, always' },
                { icon: RotateCcw, title: 'Free 30-Day Returns', desc: 'No questions asked' },
                { icon: Gift, title: 'Gift Packaging', desc: 'Complimentary on all orders' },
                { icon: Shield, title: '2-Year Warranty', desc: 'On all jewelry pieces' },
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
        </section>
      </div>
    </MotionConfig>
  )
}
