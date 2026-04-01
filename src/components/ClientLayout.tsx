'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, User, Heart, LogOut, Settings, ShoppingBag, Menu, X, MapPin, ChevronDown, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AuthModal } from '@/components/AuthModal'
import { useAuth, useAuthModal } from '@/hooks/useAuth'
import { useCart } from '@/store/useCart'
import CartSidebar from '@/components/CartSidebar'
import ChatWidget from '@/components/ChatWidget'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import { FooterTrustStrip } from '@/components/TrustBadgeStrip'

const EMAIL_LIST_KEY = 'bonjoojoo_newsletter_emails'

function storeNewsletterEmail(email: string) {
  try {
    const list = JSON.parse(localStorage.getItem(EMAIL_LIST_KEY) || '[]') as string[]
    if (!list.includes(email)) {
      localStorage.setItem(EMAIL_LIST_KEY, JSON.stringify([...list, email]))
    }
  } catch {}
}

interface ClientLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { label: 'New & Featured', href: '/search' },
  { label: 'Rings', href: '/category/rings', mega: true },
  { label: 'Necklaces', href: '/category/necklaces', mega: true },
  { label: 'Earrings', href: '/category/earrings', mega: true },
  { label: 'Bracelets', href: '/category/bracelets', mega: true },
  { label: 'Sets & Bundles', href: '/bundles' },
  { label: 'Lab-Grown Diamonds', href: '/education/lab-grown-diamonds' },
  { label: 'Gifts', href: '/search?tag=gift' },
  { label: 'Journal', href: '/blog' },
  { label: 'Book a Consultation', href: '/consultation' },
]

const megaMenus: Record<string, { categories: { title: string; items: { label: string; href: string }[] }[]; featured?: { title: string; subtitle: string } }> = {
  Rings: {
    categories: [
      { title: 'By Style', items: [{ label: 'Statement Rings', href: '/category/rings?subcategory=statement' }, { label: 'Eternity Bands', href: '/category/rings?subcategory=eternity' }, { label: 'Stacking Rings', href: '/category/rings?subcategory=stacking' }, { label: 'Delicate Rings', href: '/category/rings?subcategory=delicate' }, { label: 'Wedding Bands', href: '/category/rings?subcategory=bands' }] },
      { title: 'Featured', items: [{ label: 'Diamond Rings', href: '/category/rings?tag=diamond' }, { label: 'Vintage-Inspired', href: '/category/rings?tag=vintage' }, { label: 'All Rings', href: '/category/rings' }] },
      { title: 'By Price', items: [{ label: 'Under $1,000', href: '/category/rings?price=0-1000' }, { label: '$1,000 - $2,000', href: '/category/rings?price=1000-2000' }, { label: 'Over $2,000', href: '/category/rings?price=2000-99999' }] },
    ],
    featured: { title: 'Best Seller', subtitle: 'Diamond Filigree Wide Band Ring' },
  },
  Necklaces: {
    categories: [
      { title: 'By Style', items: [{ label: 'Diamond Pendants', href: '/category/necklaces?subcategory=pendants' }, { label: 'Chain Necklaces', href: '/category/necklaces?subcategory=chain' }, { label: 'Tennis Necklaces', href: '/category/necklaces?subcategory=tennis' }, { label: 'Station Necklaces', href: '/category/necklaces?subcategory=station' }] },
      { title: 'Featured', items: [{ label: 'Diamond Pendants', href: '/category/necklaces?tag=pendant' }, { label: 'Colored Stones', href: '/category/necklaces?tag=coloredstone' }, { label: 'All Necklaces', href: '/category/necklaces' }] },
      { title: 'By Price', items: [{ label: 'Under $1,000', href: '/category/necklaces?price=0-1000' }, { label: '$1,000 - $2,000', href: '/category/necklaces?price=1000-2000' }, { label: 'Over $2,000', href: '/category/necklaces?price=2000-99999' }] },
    ],
    featured: { title: 'Featured', subtitle: 'Diamond Quatrefoil Key Pendant' },
  },
  Earrings: {
    categories: [
      { title: 'By Style', items: [{ label: 'Ear Jackets', href: '/category/earrings?subcategory=jackets' }, { label: 'Drop Earrings', href: '/category/earrings?subcategory=drops' }, { label: 'Stud Earrings', href: '/category/earrings?subcategory=studs' }, { label: 'Hoop Earrings', href: '/category/earrings?subcategory=hoops' }] },
      { title: 'Featured', items: [{ label: 'Diamond Earrings', href: '/category/earrings?tag=diamond' }, { label: 'All Earrings', href: '/category/earrings' }] },
      { title: 'By Price', items: [{ label: 'Under $1,000', href: '/category/earrings?price=0-1000' }, { label: '$1,000 - $2,000', href: '/category/earrings?price=1000-2000' }, { label: 'Over $2,000', href: '/category/earrings?price=2000-99999' }] },
    ],
    featured: { title: 'Versatile Design', subtitle: 'Diamond Floral Ear Jackets' },
  },
  Bracelets: {
    categories: [
      { title: 'By Style', items: [{ label: 'Tennis Bracelets', href: '/category/bracelets?subcategory=tennis' }, { label: 'Chain Bracelets', href: '/category/bracelets?subcategory=chain' }, { label: 'Statement Bracelets', href: '/category/bracelets?subcategory=statement' }, { label: 'Vintage-Inspired', href: '/category/bracelets?subcategory=vintage' }] },
      { title: 'Featured', items: [{ label: 'Diamond Bracelets', href: '/category/bracelets?tag=diamond' }, { label: 'Vintage-Inspired', href: '/category/bracelets?tag=vintage' }, { label: 'All Bracelets', href: '/category/bracelets' }] },
      { title: 'By Price', items: [{ label: 'Under $1,000', href: '/category/bracelets?price=0-1000' }, { label: '$1,000 - $2,500', href: '/category/bracelets?price=1000-2500' }, { label: 'Over $2,500', href: '/category/bracelets?price=2500-99999' }] },
    ],
    featured: { title: 'Luxury Piece', subtitle: 'Emerald Cut Diamond Eternity Bracelet' },
  },
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const { user, isAuthenticated, logout, isLoading, refreshUser } = useAuth()
  const { isOpen, mode, openLogin, close, switchMode } = useAuthModal()
  const { totalItems, toggleCart } = useCart()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [activeMenu, setActiveMenu] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [stickyHeader, setStickyHeader] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const menuTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  // Footer newsletter state
  const [footerEmail, setFooterEmail] = useState('')
  const [footerSubmitted, setFooterSubmitted] = useState(false)
  const [footerError, setFooterError] = useState('')

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = footerEmail.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setFooterError('Please enter a valid email address.')
      return
    }
    storeNewsletterEmail(trimmed)
    setFooterSubmitted(true)
  }

  // Determine if current page should have solid header (all pages except homepage)
  const isHomepage = pathname === '/'
  const shouldHaveSolidHeader = !isHomepage

  // Add/remove body class for sticky header spacing
  useEffect(() => {
    if (shouldHaveSolidHeader || stickyHeader) {
      document.body.classList.add('sticky-header-active')
    } else {
      document.body.classList.remove('sticky-header-active')
    }
    return () => {
      document.body.classList.remove('sticky-header-active')
    }
  }, [shouldHaveSolidHeader, stickyHeader])

  // Close mobile menu on escape key or outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        setShowSearch(false)
        setActiveMenu('')
        setShowUserMenu(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen && !e.target) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Scroll behavior - only applies to homepage
  useEffect(() => {
    if (!isHomepage) {
      // Non-homepage: always show solid header, no scroll effects
      setStickyHeader(false) // Use normal header position for non-homepage
      return
    }

    // Homepage: scroll-based header behavior
    const handleScroll = () => {
      const currentY = window.scrollY
      const headerH = headerRef.current?.offsetHeight || 124
      const scrollingDown = currentY > lastScrollY.current

      if (currentY <= headerH) {
        // Still in the natural header zone — stay absolute/transparent
        setStickyHeader(false)
      } else if (scrollingDown && currentY > headerH + 100) {
        // Scrolling down past header with some buffer — hide sticky
        setStickyHeader(false)
      } else if (!scrollingDown && currentY > headerH + 50) {
        // Scrolling up past the header zone — show fixed white bar
        setStickyHeader(true)
      }
      lastScrollY.current = currentY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomepage])

  const handleMenuEnter = (label: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(label)
  }
  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(''), 200)
  }

  return (
    <>
      {/* ═══ MAIN HEADER ═══ */}
      <header ref={headerRef} className={`header-bj left-0 right-0 z-[100] transition-all duration-300 ${
        shouldHaveSolidHeader 
          ? 'fixed top-0 bg-white shadow-sm translate-y-0' 
          : stickyHeader 
            ? 'fixed top-0 bg-white shadow-sm translate-y-0' 
            : 'absolute top-0 bg-transparent'
      }`}>
        <div className="container-bj-wide">
          <div className="flex items-center justify-between h-[76px] relative">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <span className={`font-display text-[24px] font-medium tracking-[0.2em] uppercase select-none transition-colors ${
                shouldHaveSolidHeader || stickyHeader 
                  ? 'text-bj-black group-hover:text-bj-gray-500' 
                  : 'text-white group-hover:text-white/70'
              }`}>
                Bonjoojoo
              </span>
            </Link>

            {/* Center: Search bar (Pandora pill shape) */}
            <div className="hidden lg:block flex-1 max-w-[380px] mx-12">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  shouldHaveSolidHeader || stickyHeader ? 'text-bj-gray-400' : 'text-white/60'
                }`} size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  className={`w-full pl-11 pr-4 py-2.5 rounded-none text-[13px] outline-none transition-colors border-b ${
                    shouldHaveSolidHeader || stickyHeader 
                      ? 'bg-transparent border-gray-300 text-bj-black placeholder:text-bj-gray-400 focus:border-bj-black' 
                      : 'bg-transparent border-white/40 text-white placeholder:text-white/50 focus:border-white'
                  }`}
                  onFocus={() => setShowSearch(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`
                    }
                  }}
                />
              </div>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-0.5">
              {/* Mobile search */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`lg:hidden p-2.5 transition-colors ${
                  shouldHaveSolidHeader || stickyHeader 
                    ? 'text-bj-black hover:text-bj-gray-500' 
                    : 'text-white hover:text-white/70'
                }`}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <Link href="/wishlist" className={`p-2.5 transition-colors hidden sm:flex ${
                shouldHaveSolidHeader || stickyHeader 
                  ? 'text-bj-black hover:text-bj-gray-500' 
                  : 'text-white hover:text-white/70'
              }`} aria-label="Wishlist">
                <Heart size={20} strokeWidth={1.5} />
              </Link>

              <Link href="/stores" className={`p-2.5 transition-colors hidden md:flex ${
                shouldHaveSolidHeader || stickyHeader 
                  ? 'text-bj-black hover:text-bj-gray-500' 
                  : 'text-white hover:text-white/70'
              }`} aria-label="Store locator">
                <MapPin size={20} strokeWidth={1.5} />
              </Link>

              <button
                onClick={() => isAuthenticated ? setShowUserMenu(!showUserMenu) : openLogin()}
                className={`p-2.5 transition-colors hidden sm:flex ${
                  shouldHaveSolidHeader || stickyHeader 
                    ? 'text-bj-black hover:text-bj-gray-500' 
                    : 'text-white hover:text-white/70'
                }`}
                disabled={isLoading}
                aria-label="Account"
              >
                <User size={20} strokeWidth={1.5} />
              </button>

              <button
                onClick={toggleCart}
                className={`p-2.5 transition-colors relative ${
                  shouldHaveSolidHeader || stickyHeader 
                    ? 'text-bj-black hover:text-bj-gray-500' 
                    : 'text-white hover:text-white/70'
                }`}
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0 min-w-[18px] h-[18px] bg-bj-pink text-white text-[10px] font-semibold rounded-full flex items-center justify-center leading-none px-1">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 transition-colors ml-1 ${
                  shouldHaveSolidHeader || stickyHeader 
                    ? 'text-bj-black hover:text-bj-gray-500' 
                    : 'text-white hover:text-white/70'
                }`}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ═══ NAVIGATION BAR ═══ */}
          <nav className={`hidden lg:block relative ${
            shouldHaveSolidHeader || stickyHeader ? 'border-t border-gray-100' : ''
          }`}>
            <div className="flex items-center justify-center gap-7 h-[48px]">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.mega ? handleMenuEnter(item.label) : setActiveMenu('')}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link href={item.href} className={`nav-link text-[12px] ${
                    shouldHaveSolidHeader || stickyHeader ? '' : '!text-white hover:!text-white/70'
                  }`}>
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* ═══ MEGA MENU DROPDOWN ═══ */}
        {activeMenu && megaMenus[activeMenu] && (
          <div
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-overlay z-[90] mega-menu-enter"
            onMouseEnter={() => { if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current) }}
            onMouseLeave={handleMenuLeave}
          >
            <div className="container-bj-wide py-10">
              <div className="grid grid-cols-4 gap-12">
                {megaMenus[activeMenu].categories.map((cat, i) => (
                  <div key={i}>
                    <h4 className="text-overline text-bj-black mb-4 pb-2 border-b border-gray-100">{cat.title}</h4>
                    <ul className="space-y-2.5">
                      {cat.items.map((item, j) => (
                        <li key={j}>
                          <Link href={item.href} className="text-[14px] text-bj-gray-500 hover:text-bj-black transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured area */}
                {megaMenus[activeMenu].featured && (
                  <div>
                    <div className="aspect-[4/5] bg-gradient-to-b from-bj-offwhite to-[#F0EBE5] relative overflow-hidden mb-4">
                      <Image
                        src="/images/bonjoojoo-1.png"
                        alt="Featured product"
                        fill
                        className="object-contain p-6 img-warm"
                      />
                    </div>
                    <p className="text-overline text-bj-pink mb-1">{megaMenus[activeMenu].featured!.title}</p>
                    <p className="text-[14px] text-bj-gray-500">{megaMenus[activeMenu].featured!.subtitle}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100">
                <Link href={navItems.find(n => n.label === activeMenu)?.href || '#'} className="text-[12px] font-medium text-bj-pink hover:text-bj-pink-hover transition-colors tracking-[0.1em] uppercase">
                  View All {activeMenu} →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ═══ MOBILE SEARCH OVERLAY ═══ */}
        {showSearch && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-medium z-[90] mega-menu-enter">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bj-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search for rings, necklaces, diamonds..."
                  className="w-full pl-11 pr-10 py-3 bg-bj-gray-50 rounded-full text-[14px] outline-none placeholder:text-bj-gray-400"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`
                    }
                    if (e.key === 'Escape') setShowSearch(false)
                  }}
                />
                <button onClick={() => setShowSearch(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-bj-gray-400">
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ USER DROPDOWN ═══ */}
        {isAuthenticated && showUserMenu && (
          <>
            <div className="fixed inset-0 z-[80]" onClick={() => setShowUserMenu(false)} />
            <div className="absolute right-6 top-[68px] w-64 bg-white shadow-overlay border border-gray-100 z-[85] mega-menu-enter">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-[14px] font-medium text-bj-black">{user?.firstName} {user?.lastName}</p>
                <p className="text-[12px] text-bj-gray-400 mt-0.5">{user?.email}</p>
              </div>
              <div className="py-2">
                <Link href="/account/orders" className="flex items-center gap-3 px-5 py-2.5 text-[14px] text-bj-gray-500 hover:text-bj-black hover:bg-bj-gray-50 transition-colors">
                  <ShoppingBag size={15} /> My Orders
                </Link>
                <Link href="/account/profile" className="flex items-center gap-3 px-5 py-2.5 text-[14px] text-bj-gray-500 hover:text-bj-black hover:bg-bj-gray-50 transition-colors">
                  <Settings size={15} /> Settings
                </Link>
                <button onClick={() => { logout(); setShowUserMenu(false) }} className="flex items-center gap-3 w-full px-5 py-2.5 text-[14px] text-bj-gray-500 hover:text-bj-black hover:bg-bj-gray-50 transition-colors">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </div>
          </>
        )}

        {/* ═══ MOBILE MENU ═══ */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[76px] bg-white z-[95] overflow-y-auto">
            <div className="p-6">
              <nav className="space-y-0">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-4 text-[16px] font-medium text-bj-black border-b border-gray-100"
                  >
                    {item.label}
                    {item.mega && <ChevronDown size={16} className="text-bj-gray-400" />}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 space-y-4">
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[14px] text-bj-gray-500">
                  <User size={18} /> Account
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[14px] text-bj-gray-500">
                  <Heart size={18} /> Wishlist
                </Link>
                <Link href="/stores" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[14px] text-bj-gray-500">
                  <MapPin size={18} /> Find a Store
                </Link>
                <Link href="/consultation" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center gap-2 btn-primary py-3 px-6 text-[12px] mt-2">
                  Book a Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      {/* ═══════════════════════════════════════════════
          FOOTER — Pandora 5-Column Structure
          ═══════════════════════════════════════════════ */}
      <footer className="border-t border-gray-200">
        {/* Newsletter section */}
        <div className="bg-bj-blush">
          <div className="container-bj py-16 text-center">
            <div className="max-w-lg mx-auto">
              <p className="text-overline text-bj-pink mb-3">Exclusive Access</p>
              <h3 className="text-display-sm text-bj-black mb-3">Join the Bonjoojoo Club</h3>
              <p className="text-body mb-8">Be the first to discover new collections, receive exclusive offers, and get 10% off your first order.</p>
              {footerSubmitted ? (
                <div className="flex items-center justify-center gap-2 text-green-700 py-2">
                  <CheckCircle size={18} />
                  <span className="text-[14px] font-medium">You&apos;re on the list! Welcome to the club.</span>
                </div>
              ) : (
                <form onSubmit={handleFooterSubmit}>
                  <div className="flex gap-0 max-w-md mx-auto">
                    <input
                      type="email"
                      value={footerEmail}
                      onChange={(e) => { setFooterEmail(e.target.value); setFooterError('') }}
                      placeholder="Enter your email"
                      className="input-bj flex-1 border-r-0 text-[13px]"
                    />
                    <button type="submit" className="btn-primary whitespace-nowrap text-[11px] px-6">Sign Up</button>
                  </div>
                  {footerError && <p className="mt-2 text-[12px] text-red-500">{footerError}</p>}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="bg-white">
          <div className="container-bj-wide py-14">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
              {[
                { 
                  title: 'Shop', 
                  items: [
                    { label: 'Rings', href: '/category/rings' },
                    { label: 'Necklaces & Pendants', href: '/category/necklaces' },
                    { label: 'Earrings', href: '/category/earrings' },
                    { label: 'Bracelets', href: '/category/bracelets' },
                    { label: 'Sets & Bundles', href: '/bundles' },
                    { label: 'Lab-Grown Diamonds', href: '/education/lab-grown-diamonds' },
                    { label: 'Gifts', href: '/search?tag=gift' },
                    { label: 'Sale', href: '/search?tag=sale' }
                  ] 
                },
                { 
                  title: 'Resources', 
                  items: [
                    { label: 'Order Status', href: '/account/orders' },
                    { label: 'Shipping', href: '/shipping' },
                    { label: 'Returns & Exchanges', href: '/returns' },
                    { label: 'FAQ', href: '/faq' },
                    { label: 'Contact Us', href: '/contact' },
                    { label: 'Product Care', href: '/help/care' },
                    { label: 'Warranty', href: '/help/warranty' },
                    { label: 'Size Guide', href: '/help/sizing' }
                  ] 
                },
                {
                  title: 'Services',
                  items: [
                    { label: 'My Bonjoojoo', href: '/account' },
                    { label: 'Refer a Friend', href: '/refer' },
                    { label: 'Buy Now Pay Later', href: '/help/financing' },
                    { label: 'Pick Up In Store', href: '/stores' },
                    { label: 'Engraving', href: '/services/engraving' },
                    { label: 'Gift Cards', href: '/gift-cards' },
                    { label: 'Custom Design', href: '/services/custom-design' }
                  ]
                },
                { 
                  title: 'Legal', 
                  items: [
                    { label: 'Terms & Conditions', href: '/legal/terms' },
                    { label: 'Privacy Policy', href: '/legal/privacy' },
                    { label: 'Cookie Policy', href: '/legal/cookies' },
                    { label: 'Accessibility', href: '/legal/accessibility' }
                  ] 
                },
                { 
                  title: 'About Us', 
                  items: [
                    { label: 'Our Story', href: '/about' },
                    { label: 'Sustainability', href: '/about/sustainability' },
                    { label: 'Lab-Grown Diamonds', href: '/education/lab-grown-diamonds' },
                    { label: 'Craftsmanship', href: '/about/craftsmanship' },
                    { label: 'Journal', href: '/blog' },
                    { label: 'Careers', href: '/careers' },
                    { label: 'Press', href: '/press' }
                  ] 
                },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="text-[12px] font-semibold text-bj-black tracking-[0.12em] uppercase mb-5">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-[13px] text-bj-gray-500 hover:text-bj-black transition-colors">{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer trust strip */}
        <FooterTrustStrip />

        {/* Footer bottom bar */}
        <div className="bg-white border-t border-gray-200">
          <div className="container-bj-wide py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left: Logo + country */}
              <div className="flex items-center gap-6">
                <Link href="/" className="font-display text-[18px] tracking-[0.15em] text-bj-black uppercase">Bonjoojoo</Link>
                <span className="text-[12px] text-bj-gray-400">United States · English</span>
              </div>

              {/* Center: Copyright */}
              <p className="text-[12px] text-bj-gray-400">&copy; {new Date().getFullYear()} Bonjoojoo. All Rights Reserved.</p>

              {/* Right: Social icons */}
              <div className="flex gap-3">
                {[
                  { icon: 'IG', href: 'https://instagram.com/bonjoojoo' },
                  { icon: 'FB', href: 'https://facebook.com/bonjoojoo' },
                  { icon: 'TK', href: 'https://tiktok.com/@bonjoojoo' },
                  { icon: 'YT', href: 'https://youtube.com/@bonjoojoo' },
                  { icon: 'PI', href: 'https://pinterest.com/bonjoojoo' },
                  { icon: 'X', href: 'https://x.com/bonjoojoo' }
                ].map(({ icon, href }) => (
                  <Link
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-bj-black hover:bg-bj-charcoal rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-[10px] font-medium">{icon}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar />
      <ChatWidget />
      <ExitIntentPopup />

      <AuthModal
        isOpen={isOpen}
        onClose={close}
        initialMode={mode}
        mode={mode}
        onSwitchMode={switchMode}
        onSuccess={() => refreshUser()}
      />
    </>
  )
}
