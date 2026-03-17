'use client'

import { useState, useEffect } from 'react'
import { Search, Heart, MapPin, User, ShoppingBag, ChevronDown, SlidersHorizontal, Grid3X3, List, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import CartSidebar from '@/components/CartSidebar'

// Mock product data structure matching Pandora's exact products
const mockProducts = [
  {
    id: 1,
    name: "Entwined Heart & Butterfly Charm",
    price: 40.00,
    badges: ["NEW", "BEST SELLER"],
    category: "charms",
    material: "sterling-silver",
    theme: "love",
    images: ["charm-heart-butterfly-1.jpg", "charm-heart-butterfly-2.jpg"],
    inStock: true
  },
  {
    id: 2,
    name: "Butterfly Openwork Charm",
    price: 50.00,
    badges: ["NEW", "BEST SELLER"],
    category: "dangle-charms",
    material: "sterling-silver",
    theme: "nature",
    images: ["butterfly-openwork-1.jpg", "butterfly-openwork-2.jpg"],
    inStock: true
  },
  {
    id: 3,
    name: "Tulip Openwork Charm",
    price: 28.00,
    badges: ["NEW"],
    category: "charms",
    material: "sterling-silver",
    theme: "nature",
    images: ["tulip-openwork-1.jpg", "tulip-openwork-2.jpg"],
    inStock: true
  },
  {
    id: 4,
    name: "Sparkling Blue 2026 Graduation Cap Charm",
    price: 58.00,
    badges: ["NEW"],
    category: "charms",
    material: "sterling-silver",
    theme: "occasions",
    images: ["graduation-cap-1.jpg", "graduation-cap-2.jpg"],
    inStock: true
  },
  {
    id: 5,
    name: "Disney Stitch Easter Bunny Charm",
    price: 95.00,
    badges: ["NEW", "BEST SELLER"],
    category: "charms",
    material: "sterling-silver",
    theme: "disney",
    collection: "Disney x Pandora",
    images: ["stitch-easter-1.jpg", "stitch-easter-2.jpg"],
    inStock: true
  },
  {
    id: 6,
    name: "Family Tree Openwork Charm",
    price: 55.00,
    badges: ["NEW"],
    category: "charms",
    material: "sterling-silver",
    theme: "family",
    images: ["family-tree-1.jpg", "family-tree-2.jpg"],
    inStock: true
  }
]

export default function CharmsPage() {
  const [activeTab, setActiveTab] = useState('SHOP')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    material: [],
    theme: [],
    priceRange: '',
    collection: []
  })
  const [sortBy, setSortBy] = useState('featured')
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})
  
  const { addToCart, totalItems, toggleCart } = useCart()

  const filteredProducts = mockProducts // In real implementation, would filter based on state

  const handleAddToWishlist = (productId: number) => {
    // Wishlist functionality
    console.log('Added to wishlist:', productId)
  }

  const handleImageChange = (productId: number, imageIndex: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: imageIndex
    }))
  }

  const quickFilters = [
    { label: "Gold-plated", active: false },
    { label: "Sterling silver", active: false },
    { label: "Bestsellers", active: false },
    { label: "Mom Charms", active: false },
    { label: "Heart Charms", active: false },
    { label: "Letter Charms", active: false }
  ]

  const promotionalBanners = [
    {
      text: "LIMITED TIME ONLY! 15% off select bracelets when you buy 2 charms",
      buttonText: "TERMS & CONDITIONS APPLY"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - Same as homepage */}
      <header className="bg-white sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-100">
        {/* Promotional Banners */}
        <div className="bg-black text-white text-center py-2 text-sm font-medium">
          Free shipping on all orders $75+
        </div>
        
        <div className="bg-gray-50 text-center py-3 px-4 border-b border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <Link href="/charms" className="text-sm font-medium text-gray-900 hover:text-gray-600">
              15% off select bracelets when you buy 2 charms
            </Link>
            <button className="text-sm text-gray-600 hover:text-gray-900">Learn More</button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header Content */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex-shrink-0">
              <div className="text-xl font-black text-black tracking-[0.2em] uppercase">
                PANDORA
              </div>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-3 hover:bg-gray-50 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 hover:bg-gray-50 rounded-full transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
              <button className="p-3 hover:bg-gray-50 rounded-full transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleCart}
                className="p-3 relative hover:bg-gray-50 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-6 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-8 py-4">
              <Link href="/new-featured" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">New & featured</Link>
              <Link href="/shop-by" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Shop by</Link>
              <Link href="/charms" className="text-sm font-medium text-black border-b-2 border-black pb-4 -mb-4">Charms</Link>
              <Link href="/bracelets" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Bracelets</Link>
              <Link href="/necklaces" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Necklaces</Link>
              <Link href="/rings" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Rings</Link>
              <Link href="/earrings" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Earrings</Link>
              <Link href="/lab-grown-diamonds" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Lab-grown diamonds</Link>
              <Link href="/engraving" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Engraving</Link>
              <Link href="/gifts" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Gifts</Link>
              <Link href="/collections" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Collections</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* BREADCRUMB - Exact Pandora Style */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/charms" className="text-black font-medium">Charms</Link>
        </nav>
      </div>

      <main>
        {/* HERO SECTION - Exact Pandora Charms Page Layout */}
        <section className="relative py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-black mb-6 tracking-tight">CHARMS</h1>
              
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-gray-700 leading-relaxed">
                  Every hand-finished charm is like a chapter in the book of your life. Explore our wide selection of charms for women to decorate your bracelets your way. Discover{' '}
                  <Link href="/charms/rose-gold-plated" className="text-black underline hover:no-underline">
                    14k rose gold-plated
                  </Link>
                  {' '}and{' '}
                  <Link href="/charms/sterling-silver" className="text-black underline hover:no-underline">
                    sterling silver charms
                  </Link>
                  {' '}to find your dream designs. From milestone celebrations to movie characters, our charms collection has it all.
                </p>
                <button className="text-black underline text-sm hover:no-underline mt-2">More</button>
              </div>

              {/* Quick Navigation Pills - Exact Pandora Layout */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link href="/charms/sale" className="bg-red-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
                  SALE CHARMS UP TO 30% OFF
                </Link>
                <Link href="/charms/new" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  NEW CHARMS
                </Link>
                <Link href="/collections/bridgerton" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  PANDORA AND BRIDGERTON
                </Link>
                <Link href="/charms/disney" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  DISNEY CHARMS
                </Link>
                <Link href="/charms/spring" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  SPRING COLLECTION
                </Link>
                <Link href="/charms/birthday" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  BIRTHDAY CHARMS
                </Link>
                <Link href="/charms/engravable" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  ENGRAVABLE CHARMS
                </Link>
                <Link href="/charms/graduation" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  GRADUATION CHARMS
                </Link>
                <Link href="/charms/sets" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  CHARM SETS
                </Link>
                <Link href="/charms/minis" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  MINI CHARMS
                </Link>
                <Link href="/charms/katseye" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  STYLED BY KATSEYE
                </Link>
                <Link href="/gift-cards" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                  GIFT CARDS
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TAB NAVIGATION - Exact Pandora Style */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('DISCOVER')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'DISCOVER' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                DISCOVER
              </button>
              <button 
                onClick={() => setActiveTab('SHOP')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'SHOP' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                SHOP [ 1265 ]
              </button>
            </div>
          </div>
        </section>

        {/* SHOP TAB CONTENT */}
        {activeTab === 'SHOP' && (
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-6">
              {/* Filter Bar - Exact Pandora Layout */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-gray-400 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filter & Sort</span>
                  </button>

                  {/* Quick Filter Pills */}
                  <div className="flex space-x-2">
                    {quickFilters.map((filter, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          filter.active 
                            ? 'bg-black text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Grid - Exact Pandora Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
                      {/* Product Image Area */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                        <div className="text-center text-gray-600">
                          <div className="text-4xl mb-2">
                            {product.theme === 'disney' ? '🏰' : 
                             product.theme === 'love' ? '💕' : 
                             product.theme === 'nature' ? '🦋' : 
                             product.theme === 'family' ? '👨‍👩‍👧‍👦' : 
                             '🔗'}
                          </div>
                          <p className="text-xs text-gray-500">{product.name}</p>
                        </div>
                      </div>

                      {/* Wishlist Button */}
                      <button 
                        onClick={() => handleAddToWishlist(product.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      {/* Disney Logo for Disney products */}
                      {product.collection === 'Disney x Pandora' && (
                        <div className="absolute bottom-3 left-3 w-6 h-4 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">D</span>
                        </div>
                      )}

                      {/* Color Options if available */}
                      {product.material && (
                        <div className="absolute bottom-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-4 h-4 bg-gray-300 rounded-full border border-white"></div>
                          <div className="w-4 h-4 bg-yellow-300 rounded-full border border-white"></div>
                        </div>
                      )}
                    </div>

                    {/* Product Badges */}
                    {product.badges.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-pink-600">
                          {product.badges.join(' | ')}
                        </p>
                      </div>
                    )}

                    {/* Product Info */}
                    <div>
                      <h3 className="text-sm font-medium text-black mb-1 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-lg font-semibold text-black">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quick Add to Cart */}
                    <button 
                      onClick={() => addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: ''
                      })}
                      className="w-full mt-3 bg-black text-white py-2 text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}

                {/* Promotional Banner in Grid - Exact Pandora Placement */}
                <div className="md:col-span-3 lg:col-span-4 my-8">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-8 text-center border border-pink-200">
                    <p className="text-xs font-bold text-pink-600 mb-2 tracking-wider">LIMITED TIME ONLY!</p>
                    <p className="text-xl font-semibold text-black mb-3">15% off select bracelets when you buy 2 charms</p>
                    <Link href="#" className="text-sm text-gray-600 underline hover:no-underline">
                      TERMS & CONDITIONS APPLY
                    </Link>
                    <div className="flex justify-center mt-4">
                      <button className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                        <span className="text-black text-lg">⏸</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* More products would continue here... */}
                {/* Adding some additional product placeholders to show the grid continues */}
                {[...Array(8)].map((_, index) => (
                  <div key={`placeholder-${index}`} className="group">
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="text-center text-gray-400">
                          <div className="text-3xl mb-2">💎</div>
                          <p className="text-xs">More Charms</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-black mb-1">Additional Charm Design</h3>
                      <p className="text-lg font-semibold text-black">${(Math.random() * 100 + 20).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Section - Exact Pandora Style */}
              <div className="text-center py-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Showing 28 of 1265 products</p>
                <div className="w-64 h-1 bg-gray-200 rounded-full mx-auto mb-6">
                  <div className="w-6 h-1 bg-black rounded-full"></div>
                </div>
                <button className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors">
                  Load More
                </button>
              </div>

              {/* Explore Section - Exact Pandora Bottom Links */}
              <div className="py-12 border-t border-gray-200">
                <h2 className="text-xl font-bold text-black mb-6 text-center">Explore charm & pendants by Pandora</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <Link href="/new-in/charms" className="bg-gray-50 hover:bg-gray-100 p-4 text-center rounded-lg transition-colors">
                    <p className="text-sm font-medium text-black">NEW-IN: CHARMS</p>
                  </Link>
                  <Link href="/spring-jewelry" className="bg-gray-50 hover:bg-gray-100 p-4 text-center rounded-lg transition-colors">
                    <p className="text-sm font-medium text-black">SHOP ALL SPRING JEWELRY</p>
                  </Link>
                  <Link href="/charm-sets" className="bg-gray-50 hover:bg-gray-100 p-4 text-center rounded-lg transition-colors">
                    <p className="text-sm font-medium text-black">CHARM JEWELRY SETS TO LOVE</p>
                  </Link>
                  <Link href="/create-bracelet" className="bg-gray-50 hover:bg-gray-100 p-4 text-center rounded-lg transition-colors">
                    <p className="text-sm font-medium text-black">CREATE A CHARM BRACELET</p>
                  </Link>
                  <Link href="/care-guide" className="bg-gray-50 hover:bg-gray-100 p-4 text-center rounded-lg transition-colors">
                    <p className="text-sm font-medium text-black">HOW TO CLEAN YOUR CHARMS</p>
                  </Link>
                  <Link href="/gift-cards" className="bg-gray-50 hover:bg-gray-100 p-4 text-center rounded-lg transition-colors">
                    <p className="text-sm font-medium text-black">GIFT CARDS</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* DISCOVER TAB CONTENT */}
        {activeTab === 'DISCOVER' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-black mb-4">Discover Our Charm Collections</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Explore the stories behind our most popular charm designs and find the perfect pieces to express your unique style.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Discovery content would go here */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-black mb-4">Love & Romance</h3>
                    <p className="text-gray-600 mb-4">Express your feelings with our romantic charm collection</p>
                    <Link href="/charms/love" className="text-black underline hover:no-underline">Explore Collection</Link>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-black mb-4">Disney Magic</h3>
                    <p className="text-gray-600 mb-4">Bring Disney stories to life with magical charm designs</p>
                    <Link href="/charms/disney" className="text-black underline hover:no-underline">Explore Collection</Link>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-black mb-4">Nature & Animals</h3>
                    <p className="text-gray-600 mb-4">Celebrate the natural world with beautiful nature charms</p>
                    <Link href="/charms/nature" className="text-black underline hover:no-underline">Explore Collection</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER - Same as homepage */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider uppercase">SHOP</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/charms" className="text-gray-600 hover:text-black transition-colors">Charms</Link></li>
                <li><Link href="/bracelets" className="text-gray-600 hover:text-black transition-colors">Bracelets</Link></li>
                <li><Link href="/rings" className="text-gray-600 hover:text-black transition-colors">Rings</Link></li>
                <li><Link href="/necklaces" className="text-gray-600 hover:text-black transition-colors">Necklaces & Pendants</Link></li>
                <li><Link href="/earrings" className="text-gray-600 hover:text-black transition-colors">Earrings</Link></li>
                <li><Link href="/lab-grown-diamonds" className="text-gray-600 hover:text-black transition-colors">Lab-Grown Diamonds</Link></li>
                <li><Link href="/collections" className="text-gray-600 hover:text-black transition-colors">Pandora Collections</Link></li>
                <li><Link href="/gifts" className="text-gray-600 hover:text-black transition-colors">Gifts</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider uppercase">RESOURCES</h3>
              <ul className="space-y-3 text-sm">
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Check Order Status</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Shipping</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Returns & Exchanges</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">FAQ</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Contact Us</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Product Care</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Warranty</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Size Guide</span></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-black transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider uppercase">SERVICES</h3>
              <ul className="space-y-3 text-sm">
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">My Pandora</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Buy Now, Pay Later</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Student & Military Discount Program</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Pick Up In Store</span></li>
                <li><Link href="/engraving" className="text-gray-600 hover:text-black transition-colors">Engraving</Link></li>
                <li><Link href="/gift-cards" className="text-gray-600 hover:text-black transition-colors">Gift Cards</Link></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Pandora Credit Card</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Pandora Cares</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider uppercase">LEGAL</h3>
              <ul className="space-y-3 text-sm">
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Terms & Conditions</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">My Pandora Terms & Conditions</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Cookie Policy</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Privacy Policy</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Privacy Rights Request Form</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Do Not Sell or Share My Personal Information</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Transparency in Supply Chains Statement</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">California Transparency in Supply Chains Statement</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Dealer's Hallmark Notice</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Accessibility</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-4 text-sm tracking-wider uppercase">ABOUT US</h3>
              <ul className="space-y-3 text-sm">
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">About Pandora</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">News & Investor Relations</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Sustainability</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Craftsmanship</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Careers</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Store Finder</span></li>
                <li><span className="text-gray-600 cursor-pointer hover:text-black transition-colors">Site Map</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-xl font-black text-black tracking-[0.2em] uppercase">
                  PANDORA
                </Link>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-gray-600 hover:text-black transition-colors font-medium">
                    United States
                  </button>
                  <span className="text-sm text-gray-600">English</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium">© ALL RIGHTS RESERVED. 2026 Pandora</p>
              </div>

              <div className="flex space-x-3">
                {[...Array(6)].map((_, i) => (
                  <button key={i} className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full transition-colors">
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