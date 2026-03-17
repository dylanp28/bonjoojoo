'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Heart, MapPin, User, ShoppingBag, Play, Pause, VolumeX, Volume2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import CartSidebar from '@/components/CartSidebar'
import SearchBar from '@/components/SearchBar'

export default function PandoraHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [videoStates, setVideoStates] = useState({
    katseye: { playing: true, muted: true },
    bestsellers: { playing: false, muted: true },
    engraving: { playing: false, muted: true },
    disney: { playing: false, muted: true }
  })
  
  const { totalItems, toggleCart } = useCart()
  
  const toggleVideo = (section: keyof typeof videoStates) => {
    setVideoStates(prev => ({
      ...prev,
      [section]: { ...prev[section], playing: !prev[section].playing }
    }))
  }

  const toggleMute = (section: keyof typeof videoStates) => {
    setVideoStates(prev => ({
      ...prev,
      [section]: { ...prev[section], muted: !prev[section].muted }
    }))
  }

  const promoSlides = [
    { image: "slide-1", active: true },
    { image: "slide-2", active: false },
    { image: "slide-3", active: false }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - EXACT PANDORA STRUCTURE */}
      <header className="bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-black tracking-wide">BONJOOJOO</div>
          </Link>

          {/* Navigation - EXACT PANDORA MENU */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link href="/new-featured" className="text-black hover:text-gray-600">New & featured</Link>
            <Link href="/shop-by" className="text-black hover:text-gray-600">Shop by</Link>
            <Link href="/charms" className="text-black hover:text-gray-600">Charms</Link>
            <Link href="/bracelets" className="text-black hover:text-gray-600">Bracelets</Link>
            <Link href="/necklaces" className="text-black hover:text-gray-600">Necklaces</Link>
            <Link href="/rings" className="text-black hover:text-gray-600">Rings</Link>
            <Link href="/earrings" className="text-black hover:text-gray-600">Earrings</Link>
            <Link href="/lab-grown-diamonds" className="text-black hover:text-gray-600">Lab-grown diamonds</Link>
            <Link href="/engraving" className="text-black hover:text-gray-600">Engraving</Link>
            <Link href="/gifts" className="text-black hover:text-gray-600">Gifts</Link>
            <Link href="/collections" className="text-black hover:text-gray-600">Collections</Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <SearchBar className="w-80" placeholder="Search jewelry, diamonds, collections..." />
            </div>

            {/* Icons */}
            <button className="p-2"><Heart className="w-5 h-5" /></button>
            <button className="p-2"><MapPin className="w-5 h-5" /></button>
            <Link href="/login" className="p-2"><User className="w-5 h-5" /></Link>
            <button onClick={toggleCart} className="p-2 relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION 1: PANDORA MINIS STYLED BY KATSEYE */}
        <section className="relative h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-gold-100 overflow-hidden">
          {/* Professional Image Background - Enhanced */}
          <div className="absolute inset-0">
            {/* Background with jewelry-inspired gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 opacity-80"></div>
            
            {/* Artistic jewelry representation */}
            <div className="absolute inset-0 flex items-center justify-end pr-32">
              <div className="relative">
                {/* Main jewelry piece visualization */}
                <div className="w-96 h-96 relative">
                  {/* Charm bracelet visualization */}
                  <div className="absolute inset-0 rounded-full border-8 border-gold-400 bg-gradient-to-br from-gold-100 to-gold-200 shadow-2xl">
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white to-pink-50">
                      {/* Mini charms around the circle */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-300 rounded-full shadow-lg"></div>
                      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-8 h-8 bg-pink-300 rounded-full shadow-lg"></div>
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full shadow-lg"></div>
                      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-8 h-8 bg-blue-300 rounded-full shadow-lg"></div>
                      
                      {/* Center text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-700">
                          <div className="text-2xl font-bold mb-2">KATSEYE</div>
                          <div className="text-sm">MINIS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-400 rounded-full shadow-xl opacity-70 animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-400 rounded-full shadow-xl opacity-70 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          </div>

          {/* Video Controls - Exact Pandora Position */}
          <div className="absolute top-8 right-8 flex space-x-4">
            <button 
              onClick={() => toggleVideo('katseye')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.katseye.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => toggleMute('katseye')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.katseye.muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          {/* Content - Exact Pandora Layout */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-md text-gray-900">
                <p className="text-lg font-light mb-4 text-gray-600">Tiny charms, max volume</p>
                <h1 className="text-6xl font-bold mb-8 leading-tight text-black">
                  PANDORA MINIS<br />
                  STYLED BY KATSEYE
                </h1>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-sm font-medium rounded transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>

          {/* Promotional Banner - Exact Pandora Style */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 px-8 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-bold text-pink-600 mb-2">LIMITED TIME ONLY!</p>
                <p className="text-lg font-semibold text-black">15% off select bracelets when you buy 2 charms</p>
                <p className="text-sm text-gray-600">
                  <Link href="#" className="underline">Terms & Conditions</Link> apply.
                </p>
              </div>
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 text-sm font-medium rounded">
                SHOP CHARMS
              </button>
            </div>
          </div>
        </section>

        {/* HERO SECTION 2: BEST SELLERS */}
        <section className="relative h-screen bg-gradient-to-br from-stone-50 to-neutral-100 overflow-hidden">
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="bg-white border-2 border-dashed border-gray-400 w-80 h-48 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-3xl mb-2">💍</div>
                <p className="text-sm font-medium">Best Sellers Image</p>
                <p className="text-xs text-gray-500">Featured Jewelry Collection</p>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute top-8 right-8 flex space-x-4">
            <button 
              onClick={() => toggleVideo('bestsellers')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.bestsellers.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => toggleMute('bestsellers')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.bestsellers.muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-md text-gray-900">
                <p className="text-lg font-light mb-4 text-gray-600">Best sellers await</p>
                <h2 className="text-6xl font-bold mb-8 leading-tight text-black">Our most-loved jewelry</h2>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-sm font-medium rounded transition-colors">
                  SHOP BEST SELLERS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HERO SECTION 3: ENGRAVING */}
        <section className="relative h-screen bg-gradient-to-br from-neutral-50 to-stone-100 overflow-hidden">
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
            <div className="bg-white border-2 border-dashed border-gray-400 w-80 h-48 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-3xl mb-2">✍️</div>
                <p className="text-sm font-medium">Engraving Process Image</p>
                <p className="text-xs text-gray-500">Personalization Service</p>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute top-8 right-8 flex space-x-4">
            <button 
              onClick={() => toggleVideo('engraving')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.engraving.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => toggleMute('engraving')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.engraving.muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-md text-gray-900">
                <p className="text-lg font-light mb-4 text-gray-600">A NEW WAY TO PERSONALIZE</p>
                <h2 className="text-6xl font-bold mb-8 leading-tight text-black">DREAM IT. DRAW IT. ENGRAVE IT.</h2>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-sm font-medium rounded transition-colors">
                  TRY IT OUT
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HERO SECTION 4: DISNEY */}
        <section className="relative h-screen bg-gradient-to-br from-neutral-50 to-stone-100 overflow-hidden">
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="bg-white border-2 border-dashed border-gray-400 w-80 h-48 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-3xl mb-2">🏰</div>
                <p className="text-sm font-medium">Disney Collection Image</p>
                <p className="text-xs text-gray-500">Stitch Collaboration</p>
              </div>
            </div>
          </div>

          {/* Copyright Notice - Exact Pandora Position */}
          <div className="absolute top-8 left-8">
            <p className="text-gray-900 text-sm">©Disney</p>
          </div>

          {/* Video Controls */}
          <div className="absolute top-8 right-8 flex space-x-4">
            <button 
              onClick={() => toggleVideo('disney')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.disney.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => toggleMute('disney')}
              className="w-12 h-12 bg-gray-900 bg-opacity-80 hover:bg-opacity-90 rounded-full flex items-center justify-center text-white transition-all"
            >
              {videoStates.disney.muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-md text-gray-900">
                {/* Disney Logo Placeholder */}
                <div className="w-20 h-12 bg-gray-300 rounded mb-6 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">DISNEY</span>
                </div>
                <h2 className="text-6xl font-bold mb-8 leading-tight text-black">ONE OF A KIND, LIKE DISNEY'S STITCH</h2>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-sm font-medium rounded transition-colors">
                  SHOP DISNEY X PANDORA
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SALE SECTION - EXACT PANDORA LAYOUT */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 mb-4">Find what speaks to you</p>
              <h2 className="text-5xl font-bold text-black">
                <span className="bg-red-500 text-white px-4 py-2 rounded">Sale 30% Off</span>
              </h2>
            </div>

            {/* Category Grid - 4 Columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Charms */}
              <Link href="/charms" className="group">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center hover:shadow-xl transition-shadow border-2 border-dashed border-gray-400">
                  <div className="text-center text-gray-600">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm font-medium">Charm Image</p>
                    <p className="text-xs text-gray-500">Product Photo</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black group-hover:underline">Charms</h3>
              </Link>

              {/* Bracelets */}
              <Link href="/bracelets" className="group">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center hover:shadow-xl transition-shadow border-2 border-dashed border-gray-400">
                  <div className="text-center text-gray-600">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm font-medium">Bracelet Image</p>
                    <p className="text-xs text-gray-500">Product Photo</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black group-hover:underline">Bracelets</h3>
              </Link>

              {/* Rings */}
              <Link href="/rings" className="group">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center hover:shadow-xl transition-shadow border-2 border-dashed border-gray-400">
                  <div className="text-center text-gray-600">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm font-medium">Ring Image</p>
                    <p className="text-xs text-gray-500">Product Photo</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black group-hover:underline">Rings</h3>
              </Link>

              {/* Necklaces */}
              <Link href="/necklaces" className="group">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center hover:shadow-xl transition-shadow border-2 border-dashed border-gray-400">
                  <div className="text-center text-gray-600">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm font-medium">Necklace Image</p>
                    <p className="text-xs text-gray-500">Product Photo</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black group-hover:underline">Necklaces</h3>
              </Link>
            </div>

            {/* Large Gifts Banner */}
            <div className="bg-stone-50 rounded-lg p-12 text-center border border-gray-200">
              <h3 className="text-3xl font-bold text-black mb-4">Gifts</h3>
              <p className="text-lg text-gray-600 mb-6">Perfect presents for every occasion</p>
              <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-medium rounded transition-colors">
                SHOP GIFTS
              </button>
            </div>
          </div>
        </section>

        {/* TRUST BADGES - EXACT PANDORA STYLE */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Free 30-day returns</h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Free shipping on orders $75+</h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Gift packaging available</h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Complimentary 1-year warranty</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER - EXACT PANDORA 5-COLUMN STRUCTURE */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* 5 Column Footer */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* SHOP */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider">SHOP</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/charms" className="text-gray-600 hover:text-black">Charms</Link></li>
                <li><Link href="/bracelets" className="text-gray-600 hover:text-black">Bracelets</Link></li>
                <li><Link href="/rings" className="text-gray-600 hover:text-black">Rings</Link></li>
                <li><Link href="/necklaces" className="text-gray-600 hover:text-black">Necklaces & Pendants</Link></li>
                <li><Link href="/earrings" className="text-gray-600 hover:text-black">Earrings</Link></li>
                <li><Link href="/lab-grown-diamonds" className="text-gray-600 hover:text-black">Lab-Grown Diamonds</Link></li>
                <li><Link href="/collections" className="text-gray-600 hover:text-black">Collections</Link></li>
                <li><Link href="/gifts" className="text-gray-600 hover:text-black">Gifts</Link></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider">RESOURCES</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog" className="text-gray-600 hover:text-black">Blog</Link></li>
                <li><Link href="/size-guide" className="text-gray-600 hover:text-black">Size Guide</Link></li>
                <li><Link href="/care-guide" className="text-gray-600 hover:text-black">Care Guide</Link></li>
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider">SERVICES</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/engraving" className="text-gray-600 hover:text-black">Engraving</Link></li>
                <li><Link href="/gift-cards" className="text-gray-600 hover:text-black">Gift Cards</Link></li>
                <li><Link href="/warranty" className="text-gray-600 hover:text-black">Warranty</Link></li>
                <li><Link href="/repairs" className="text-gray-600 hover:text-black">Repairs</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider">LEGAL</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="text-gray-600 hover:text-black">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-black">Terms of Service</Link></li>
                <li><Link href="/returns" className="text-gray-600 hover:text-black">Returns</Link></li>
              </ul>
            </div>

            {/* ABOUT US */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider">ABOUT US</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-600 hover:text-black">Our Story</Link></li>
                <li><Link href="/sustainability" className="text-gray-600 hover:text-black">Sustainability</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-black">Careers</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer - Exact Pandora Layout */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              {/* Left: Logo and Country */}
              <div className="flex items-center space-x-8 mb-6 lg:mb-0">
                <Link href="/" className="text-2xl font-bold text-black">BONJOOJOO</Link>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-gray-600 hover:text-black">United States</button>
                  <span className="text-sm text-gray-600">English</span>
                </div>
              </div>

              {/* Center: Copyright */}
              <div className="mb-6 lg:mb-0">
                <p className="text-sm text-gray-600">© ALL RIGHTS RESERVED. 2026 Bonjoojoo</p>
              </div>

              {/* Right: Social Icons */}
              <div className="flex space-x-3">
                {/* 6 social media circles like Pandora */}
                {[...Array(6)].map((_, i) => (
                  <button key={i} className="w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full transition-colors">
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  )
}