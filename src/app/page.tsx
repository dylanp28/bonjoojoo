'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Truck, RotateCcw, Shield, Star, Gift } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { products, collections } from '@/data/products'

// ─── Intersection Observer Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Format price ───
const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price)

export default function HomePage() {
  const allProducts = products.slice(0, 8)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Intersection observers
  const hero1 = useInView(0.1)
  const hero2 = useInView(0.1)
  const hero3 = useInView(0.1)
  const hero4 = useInView(0.1)
  const promoSection = useInView()
  const categorySection = useInView()
  const productSection = useInView()
  const storySection = useInView()
  const collectionSection = useInView()
  const trustSection = useInView()

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Film grain — subtle texture across entire page */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════════
          HERO 1 — CROWN COLLECTION
          Full-bleed hero image, cinematic gradient, no floating cutouts.
          ═══════════════════════════════════════════════════════════ */}
      <section ref={hero1.ref} className="hero-section">
        <div className="hero-bg">
          <Image src="/images/lab-grown-hero.webp" alt="" fill className="object-cover img-warm" priority />
          {/* Cinematic warm gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB]/90 via-[#F5F0EB]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
          {/* Decorative concentric rings */}
          <div className="deco-ring deco-ring-lg deco-spin right-[8%] top-[15%]" />
          <div className="deco-ring deco-ring-md deco-spin-reverse right-[15%] top-[30%]" />
          <div className="deco-ring deco-ring-sm deco-spin right-[25%] bottom-[20%]" />
        </div>

        <div className="hero-content">
          <div className="container-bj-wide">
            <div className={`max-w-xl transition-all duration-1000 ${hero1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-overline text-bj-rose-gold mb-5 tracking-[0.25em]">New Collection</p>
              <h1 className="text-display-hero text-bj-black mb-6">
                Crown<br />
                <span className="italic font-light">Collection</span>
              </h1>
              <p className="text-body-lg max-w-md mb-10">
                Romantic crown-inspired stacking rings with scattered lab-grown diamonds. Elegance meets whimsy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/collections/crown" className="btn-primary">Shop Now</Link>
                <Link href="/lab-grown-diamonds" className="btn-ghost">Discover More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROMO BANNER — Split layout with product pedestal
          ═══════════════════════════════════════════════════════════ */}
      <section ref={promoSection.ref} className="relative overflow-hidden">
        <div className="bg-bj-cream">
          <div className="container-bj-wide">
            <div className={`grid lg:grid-cols-2 items-center py-14 lg:py-20 gap-10 transition-all duration-700 ${promoSection.visible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Left: Text */}
              <div className="lg:pr-12">
                <p className="text-[11px] font-bold text-bj-pink tracking-[0.2em] uppercase mb-3">Limited Time Only</p>
                <p className="font-display text-[28px] lg:text-[34px] font-light text-bj-black leading-tight mb-2">
                  15% Off Select Bracelets
                </p>
                <p className="font-display text-[28px] lg:text-[34px] font-light text-bj-black leading-tight mb-4">
                  When You Buy 2 Pieces
                </p>
                <p className="text-caption mb-6">
                  <Link href="#" className="underline underline-offset-2 hover:text-bj-black transition-colors">Terms & Conditions</Link> apply.
                </p>
                <Link href="/bracelets" className="btn-primary">Shop Bracelets</Link>
              </div>
              {/* Right: Product on pedestal */}
              <div className="flex justify-center">
                <div className="relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]">
                  {/* Soft radial glow behind product */}
                  <div className="absolute inset-[15%] bg-white/60 rounded-full blur-[40px]" />
                  {/* Subtle circle pedestal */}
                  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[6px] bg-bj-rose-gold/10 rounded-full blur-[8px]" />
                  <Image
                    src="/images/bonjoojoo-4.png"
                    alt="Diamond Station Bracelet"
                    fill
                    className="object-contain drop-shadow-lg relative z-10 img-warm p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HERO 2 — BEST SELLERS
          ═══════════════════════════════════════════════════════════ */}
      <section ref={hero2.ref} className="hero-section">
        <div className="hero-bg">
          <Image src="/images/lab-grown-hero-1.webp" alt="" fill className="object-cover img-editorial" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/15" />
          {/* Thin decorative line */}
          <div className="absolute right-[12%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bj-rose-gold/8 to-transparent" />
        </div>

        <div className="hero-content">
          <div className="container-bj-wide">
            <div className={`max-w-xl transition-all duration-1000 ${hero2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-overline text-bj-gray-400 mb-5 tracking-[0.25em]">Best sellers await</p>
              <h2 className="text-display-hero text-bj-black mb-6">
                Our Most-Loved<br />
                <span className="italic font-light">Jewelry</span>
              </h2>
              <p className="text-body-lg max-w-md mb-10">
                Discover the pieces our community can&apos;t stop wearing.
              </p>
              <Link href="/collections" className="btn-primary">Shop Best Sellers</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HERO 3 — ENGRAVING
          ═══════════════════════════════════════════════════════════ */}
      <section ref={hero3.ref} className="hero-section">
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

        <div className="hero-content">
          <div className="container-bj-wide">
            <div className={`max-w-xl transition-all duration-1000 ${hero3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-overline text-bj-pink mb-5 tracking-[0.25em]">A New Way to Personalize</p>
              <h2 className="text-display-hero text-bj-black mb-6">
                Dream It.<br />
                Draw It.<br />
                <span className="italic font-light">Engrave It.</span>
              </h2>
              <p className="text-body-lg max-w-md mb-10">
                Make it uniquely yours with complimentary engraving on all lab-grown diamond pieces.
              </p>
              <Link href="/engraving" className="btn-pink">Try It Out</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HERO 4 — LAB-GROWN DIAMONDS (dark, cinematic)
          ═══════════════════════════════════════════════════════════ */}
      <section ref={hero4.ref} className="hero-section">
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

        <div className="hero-content">
          <div className="container-bj-wide">
            <div className={`max-w-xl transition-all duration-1000 ${hero4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-overline text-bj-pink-light mb-5 tracking-[0.25em]">Lab-Grown Diamonds</p>
              <h2 className="text-display-hero text-white mb-6">
                Brilliance<br />
                Without<br />
                <span className="italic font-light text-bj-pink-light">Compromise</span>
              </h2>
              <p className="text-[17px] leading-relaxed text-white/60 max-w-md mb-10">
                IGI & GIA certified. 95% less environmental impact. The same fire, clarity, and beauty &mdash; the future of fine jewelry.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/lab-grown-diamonds" className="btn-white">Shop Diamonds</Link>
                <Link href="/about" className="btn-ghost text-white border-white/40 hover:text-bj-pink-light hover:border-bj-pink-light">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CATEGORY GRID — "Find what speaks to you"
          Product images shown editorially on warm tinted backgrounds
          ═══════════════════════════════════════════════════════════ */}
      <section ref={categorySection.ref} className="py-16 lg:py-24 bg-white">
        <div className="container-bj-wide">
          {/* Section ornament */}
          <div className={`section-ornament mb-4 transition-all duration-700 ${categorySection.visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="ornament-diamond" />
          </div>
          <div className={`text-center mb-14 transition-all duration-700 ${categorySection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-[17px] text-bj-gray-500 font-display italic">Find what speaks to you</p>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 transition-all duration-700 delay-200 ${categorySection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {/* Sale — spans 2 cols */}
            <Link href="/sale" className="lg:col-span-2 category-tile group block">
              <div className="aspect-square lg:aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-bj-pink via-[#E85A8A] to-[#D4145A]">
                {/* Overlay product image at low opacity for texture */}
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

            {/* Rings — warm cream bg, product centered with breathing room */}
            <Link href="/rings" className="category-tile group block">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#F5F0EB] to-[#EDE6DE]">
                <Image src="/images/bonjoojoo-1.png" alt="Rings" fill className="object-contain p-5 category-img img-warm" />
                <div className="category-overlay absolute inset-0" />
              </div>
              <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Rings</h3>
            </Link>

            {/* Necklaces */}
            <Link href="/necklaces" className="category-tile group block">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#FAF8F6] to-[#F0EBE5]">
                <Image src="/images/bonjoojoo-6.png" alt="Necklaces" fill className="object-cover scale-110 object-[center_30%] category-img img-editorial" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F0EBE5]/40 to-transparent" />
                <div className="category-overlay absolute inset-0" />
              </div>
              <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Necklaces</h3>
            </Link>

            {/* Earrings */}
            <Link href="/earrings" className="category-tile group block">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#FDF2F4] to-[#F5E8EC]">
                <Image src="/images/bonjoojoo-3.png" alt="Earrings" fill className="object-cover scale-125 object-[center_40%] category-img img-warm" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F5E8EC]/30 to-transparent" />
                <div className="category-overlay absolute inset-0" />
              </div>
              <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Earrings</h3>
            </Link>

            {/* Bracelets */}
            <Link href="/bracelets" className="category-tile group block">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-[#F5F0EB] to-[#EDE6DE]">
                <Image src="/images/bonjoojoo-5.png" alt="Bracelets" fill className="object-contain p-4 category-img img-warm" />
                <div className="category-overlay absolute inset-0" />
              </div>
              <h3 className="text-[15px] font-semibold text-bj-black mt-3 group-hover:text-bj-gray-500 transition-colors">Bracelets</h3>
            </Link>

            {/* Gifts — full width banner */}
            <Link href="/gifts" className="col-span-2 lg:col-span-6 category-tile group block">
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
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRODUCT CAROUSEL — Horizontal Scrolling Best Sellers
          Clean product shots on offwhite, proper breathing room
          ═══════════════════════════════════════════════════════════ */}
      <section ref={productSection.ref} className="py-16 lg:py-24 bg-bj-gray-50">
        <div className={`transition-all duration-700 ${productSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="container-bj-wide">
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
          </div>

          {/* Scrolling product cards */}
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-container pb-4 pl-[max(24px,calc((100vw-1440px)/2+24px))] pr-6">
            {allProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group flex-none w-[260px] lg:w-[300px]">
                <div className="product-card">
                  <div className="aspect-[3/4] bg-gradient-to-b from-bj-offwhite to-[#F0EBE5] relative overflow-hidden">
                    {/* Product image — contained with padding for clean presentation */}
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
            ))}
          </div>

          <div className="container-bj-wide mt-10 text-center">
            <Link href="/collections" className="btn-secondary">View All Jewelry</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EDITORIAL STORY SPLIT — Brand narrative
          Lifestyle image with warm editorial filter + content
          ═══════════════════════════════════════════════════════════ */}
      <section ref={storySection.ref} className="bg-white">
        <div className="grid lg:grid-cols-2 min-h-[75vh]">
          {/* Left — Lifestyle visual with warm editorial treatment */}
          <div className={`relative overflow-hidden bg-bj-cream transition-all duration-1000 ${storySection.visible ? 'opacity-100' : 'opacity-0'}`}>
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
          </div>

          {/* Right — Content */}
          <div className={`flex items-center px-8 lg:px-20 py-20 transition-all duration-1000 delay-300 ${storySection.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
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
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          COLLECTIONS GRID
          Product images with warm tint overlays per collection
          ═══════════════════════════════════════════════════════════ */}
      <section ref={collectionSection.ref} className="py-16 lg:py-24 bg-bj-offwhite">
        <div className="container-bj">
          <div className={`section-ornament mb-4 transition-all duration-700 ${collectionSection.visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="ornament-diamond" />
          </div>
          <div className={`text-center mb-14 transition-all duration-700 ${collectionSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-overline text-bj-gray-400 mb-3">Curated</p>
            <h2 className="text-display-lg text-bj-black">Our Collections</h2>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-200 ${collectionSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {collections.map((col) => {
              const collectionImages: Record<string, string> = {
                crown: '/images/bonjoojoo-1.png',
                cuff: '/images/bonjoojoo-2.png',
                pave: '/images/bonjoojoo-3.png',
                station: '/images/bonjoojoo-4.png',
                constellation: '/images/bonjoojoo-6.png',
              }
              // Warm-tinted gradient backgrounds per collection
              const collectionGradients: Record<string, string> = {
                crown: 'from-[#F5F0EB] to-[#EDE6DE]',
                cuff: 'from-[#FAF8F6] to-[#F0EBE5]',
                pave: 'from-[#FDF2F4] to-[#F5E8EC]',
                station: 'from-[#F5F0EB] to-[#EDE6DE]',
                constellation: 'from-[#F0EBF5] to-[#E8E2EE]',
              }
              const isLifestyle = col.id === 'cuff' || col.id === 'constellation'
              return (
                <Link key={col.id} href={`/collections/${col.id}`} className="group block category-tile">
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
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST BADGES — Pandora "Benefits" style
          ═══════════════════════════════════════════════════════════ */}
      <section ref={trustSection.ref} className="py-14 bg-white border-t border-gray-100">
        <div className={`container-bj transition-all duration-700 ${trustSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On every order, always' },
              { icon: RotateCcw, title: 'Free 30-Day Returns', desc: 'No questions asked' },
              { icon: Gift, title: 'Gift Packaging', desc: 'Complimentary on all orders' },
              { icon: Shield, title: '2-Year Warranty', desc: 'On all jewelry pieces' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="trust-badge flex items-start gap-4">
                <div className="w-12 h-12 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0 trust-icon transition-transform">
                  <Icon size={18} className="text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-bj-black">{title}</h4>
                  <p className="text-[13px] text-bj-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
