'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, User, Heart, LogOut, Settings, ShoppingBag, Menu, X, MapPin, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AuthModal } from '@/components/AuthModal'
import { useAuth, useAuthModal } from '@/hooks/useAuth'
import { useCart } from '@/store/useCart'
import CartSidebar from '@/components/CartSidebar'
import ChatWidget from '@/components/ChatWidget'

interface ClientLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { label: 'New & Featured', href: '/new-featured' },
  { label: 'Shop by', href: '/shop-by', mega: true },
  { label: 'Rings', href: '/rings', mega: true },
  { label: 'Necklaces', href: '/necklaces', mega: true },
  { label: 'Earrings', href: '/earrings', mega: true },
  { label: 'Bracelets', href: '/bracelets', mega: true },
  { label: 'Lab-Grown Diamonds', href: '/lab-grown-diamonds' },
  { label: 'Engraving', href: '/engraving' },
  { label: 'Gifts', href: '/gifts' },
]

const megaMenus: Record<string, { categories: { title: string; items: { label: string; href: string }[] }[]; featured?: { title: string; subtitle: string } }> = {
  'Shop by': {
    categories: [
      { title: 'Category', items: [{ label: 'Rings', href: '/rings' }, { label: 'Necklaces & Pendants', href: '/necklaces' }, { label: 'Earrings', href: '/earrings' }, { label: 'Bracelets', href: '/bracelets' }] },
      { title: 'Metal', items: [{ label: 'Rose Gold', href: '#' }, { label: 'Yellow Gold', href: '#' }, { label: 'White Gold', href: '#' }, { label: 'Sterling Silver', href: '#' }] },
      { title: 'Occasion', items: [{ label: 'Engagement', href: '#' }, { label: 'Wedding', href: '#' }, { label: 'Anniversary', href: '#' }, { label: 'Gift', href: '#' }] },
    ],
    featured: { title: 'Trending Now', subtitle: 'Crown Collection — Romantic stacking rings' },
  },
  Rings: {
    categories: [
      { title: 'By Style', items: [{ label: 'Engagement Rings', href: '#' }, { label: 'Wedding Bands', href: '#' }, { label: 'Stacking Rings', href: '#' }, { label: 'Statement Rings', href: '#' }, { label: 'Eternity Bands', href: '#' }] },
      { title: 'By Collection', items: [{ label: 'Crown Collection', href: '#' }, { label: 'Cuff Collection', href: '#' }, { label: 'Pavé Collection', href: '#' }, { label: 'Constellation', href: '#' }] },
      { title: 'By Metal', items: [{ label: 'Rose Gold', href: '#' }, { label: 'Yellow Gold', href: '#' }, { label: 'White Gold', href: '#' }, { label: 'Platinum', href: '#' }] },
    ],
    featured: { title: 'Best Seller', subtitle: 'Crown Stacking Ring — Rose Gold' },
  },
  Necklaces: {
    categories: [
      { title: 'By Style', items: [{ label: 'Diamond Pendants', href: '#' }, { label: 'Chain Necklaces', href: '#' }, { label: 'Layering Sets', href: '#' }, { label: 'Statement Pieces', href: '#' }, { label: 'Tennis Necklaces', href: '#' }] },
      { title: 'By Collection', items: [{ label: 'Crown Scattered', href: '#' }, { label: 'Station Collection', href: '#' }, { label: 'All Necklaces', href: '/necklaces' }] },
      { title: 'By Metal', items: [{ label: 'Rose Gold', href: '#' }, { label: 'Yellow Gold', href: '#' }, { label: 'White Gold', href: '#' }] },
    ],
  },
  Earrings: {
    categories: [
      { title: 'By Style', items: [{ label: 'Diamond Studs', href: '#' }, { label: 'Hoop Earrings', href: '#' }, { label: 'Drop Earrings', href: '#' }, { label: 'Huggie Hoops', href: '#' }, { label: 'Ear Climbers', href: '#' }] },
      { title: 'By Collection', items: [{ label: 'Asymmetric Studs', href: '#' }, { label: 'Pavé Huggies', href: '#' }, { label: 'All Earrings', href: '/earrings' }] },
      { title: 'By Metal', items: [{ label: 'Rose Gold', href: '#' }, { label: 'Yellow Gold', href: '#' }, { label: 'White Gold', href: '#' }] },
    ],
  },
  Bracelets: {
    categories: [
      { title: 'By Style', items: [{ label: 'Tennis Bracelets', href: '#' }, { label: 'Chain Bracelets', href: '#' }, { label: 'Cuff Bracelets', href: '#' }, { label: 'Charm Bracelets', href: '#' }, { label: 'Bangles', href: '#' }] },
      { title: 'By Collection', items: [{ label: 'Station Collection', href: '#' }, { label: 'All Bracelets', href: '/bracelets' }] },
      { title: 'By Metal', items: [{ label: 'Rose Gold', href: '#' }, { label: 'Yellow Gold', href: '#' }, { label: 'White Gold', href: '#' }] },
    ],
  },
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
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

  // stickyHeader = false → absolute, transparent, part of page flow
  // stickyHeader = true → fixed, solid white, slides in from top

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const headerH = headerRef.current?.offsetHeight || 120
      const scrollingDown = currentY > lastScrollY.current

      if (currentY <= headerH) {
        // Still in the natural header zone — stay absolute/transparent
        setStickyHeader(false)
      } else if (scrollingDown) {
        // Scrolling down past header — hide sticky
        setStickyHeader(false)
      } else {
        // Scrolling up past the header zone — show fixed white bar
        setStickyHeader(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuEnter = (label: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(label)
  }
  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(''), 150)
  }

  return (
    <>
      {/* ═══ MAIN HEADER ═══ */}
      <header ref={headerRef} className={`header-bj left-0 right-0 z-50 transition-all duration-300 ${stickyHeader ? 'fixed top-0 bg-white shadow-sm translate-y-0' : 'absolute top-0 bg-transparent'}`}>
        <div className="container-bj-wide">
          <div className="flex items-center justify-between h-[76px]">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <span className={`font-display text-[24px] font-medium tracking-[0.2em] uppercase select-none transition-colors ${stickyHeader ? 'text-bj-black group-hover:text-bj-gray-500' : 'text-white group-hover:text-white/70'}`}>
                Bonjoojoo
              </span>
            </Link>

            {/* Center: Search bar (Pandora pill shape) */}
            <div className="hidden lg:block flex-1 max-w-[380px] mx-12">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${stickyHeader ? 'text-bj-gray-400' : 'text-white/60'}`} size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  className={`w-full pl-11 pr-4 py-2.5 rounded-none text-[13px] outline-none transition-colors border-b ${stickyHeader ? 'bg-transparent border-gray-300 text-bj-black placeholder:text-bj-gray-400 focus:border-bj-black' : 'bg-transparent border-white/40 text-white placeholder:text-white/50 focus:border-white'}`}
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
                className={`lg:hidden p-2.5 transition-colors ${stickyHeader ? 'text-bj-black hover:text-bj-gray-500' : 'text-white hover:text-white/70'}`}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <Link href="/wishlist" className={`p-2.5 transition-colors hidden sm:flex ${stickyHeader ? 'text-bj-black hover:text-bj-gray-500' : 'text-white hover:text-white/70'}`} aria-label="Wishlist">
                <Heart size={20} strokeWidth={1.5} />
              </Link>

              <Link href="/stores" className={`p-2.5 transition-colors hidden md:flex ${stickyHeader ? 'text-bj-black hover:text-bj-gray-500' : 'text-white hover:text-white/70'}`} aria-label="Store locator">
                <MapPin size={20} strokeWidth={1.5} />
              </Link>

              <button
                onClick={() => isAuthenticated ? setShowUserMenu(!showUserMenu) : openLogin()}
                className={`p-2.5 transition-colors hidden sm:flex ${stickyHeader ? 'text-bj-black hover:text-bj-gray-500' : 'text-white hover:text-white/70'}`}
                disabled={isLoading}
                aria-label="Account"
              >
                <User size={20} strokeWidth={1.5} />
              </button>

              <button
                onClick={toggleCart}
                className={`p-2.5 transition-colors relative ${stickyHeader ? 'text-bj-black hover:text-bj-gray-500' : 'text-white hover:text-white/70'}`}
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
                className={`lg:hidden p-2.5 transition-colors ml-1 ${stickyHeader ? 'text-bj-black hover:text-bj-gray-500' : 'text-white hover:text-white/70'}`}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ═══ NAVIGATION BAR ═══ */}
          <nav className={`hidden lg:block ${stickyHeader ? 'border-t border-gray-100' : ''}`}>
            <div className="flex items-center justify-center gap-7 h-[48px]">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.mega ? handleMenuEnter(item.label) : setActiveMenu('')}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link href={item.href} className={`nav-link text-[12px] ${stickyHeader ? '' : '!text-white hover:!text-white/70'}`}>
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
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-overlay z-50 mega-menu-enter"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-medium z-40 mega-menu-enter">
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
            <div className="fixed inset-0 z-30" onClick={() => setShowUserMenu(false)} />
            <div className="absolute right-6 top-[68px] w-64 bg-white shadow-overlay border border-gray-100 z-40 mega-menu-enter">
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
          <div className="lg:hidden fixed inset-0 top-[68px] bg-white z-40 overflow-y-auto">
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
              <div className="flex gap-0 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="input-bj flex-1 border-r-0 text-[13px]" />
                <button className="btn-primary whitespace-nowrap text-[11px] px-6">Sign Up</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="bg-white">
          <div className="container-bj-wide py-14">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
              {[
                { title: 'Shop', items: ['Rings', 'Necklaces & Pendants', 'Earrings', 'Bracelets', 'Lab-Grown Diamonds', 'Gifts', 'Sale'] },
                { title: 'Resources', items: ['Order Status', 'Shipping', 'Returns & Exchanges', 'FAQ', 'Contact Us', 'Product Care', 'Warranty', 'Size Guide'] },
                { title: 'Services', items: ['My Bonjoojoo', 'Buy Now Pay Later', 'Pick Up In Store', 'Engraving', 'Gift Cards', 'Custom Design'] },
                { title: 'Legal', items: ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Accessibility'] },
                { title: 'About Us', items: ['Our Story', 'Sustainability', 'Lab-Grown Diamonds', 'Craftsmanship', 'Careers', 'Press'] },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="text-[12px] font-semibold text-bj-black tracking-[0.12em] uppercase mb-5">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-[13px] text-bj-gray-500 hover:text-bj-black transition-colors">{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                {['IG', 'FB', 'TK', 'YT', 'PI', 'X'].map((icon) => (
                  <Link
                    key={icon}
                    href="#"
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

      <AuthModal
        isOpen={isOpen}
        onClose={close}
        initialMode={mode}
        mode={mode}
        onSwitchMode={switchMode}
      />
    </>
  )
}
