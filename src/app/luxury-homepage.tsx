'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Heart, MapPin, User, ShoppingBag, Play, Pause, VolumeX, Volume2, Star, Shield, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import CartSidebar from '@/components/CartSidebar'
import SearchBar from '@/components/SearchBar'

export default function LuxuryHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const { totalItems, toggleCart } = useCart()

  return (
    <div className="min-h-screen bg-white">
      {/* LUXURY HEADER */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-6 max-w-8xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-light text-charcoal-900 tracking-[0.2em]">
              bonjoojoo
              <div className="text-xs text-gray-500 tracking-wide font-normal mt-1">
                WHERE LIGHT BECOMES LEGEND
              </div>
            </div>
          </Link>

          {/* Luxury Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 text-sm font-medium">
            <Link href="/category/rings" className="text-charcoal-900 hover:text-champagne-600 transition-colors">
              Signature Rings
            </Link>
            
            <Link href="/engagement" className="text-charcoal-900 hover:text-champagne-600 transition-colors">
              Engagement Treasures
            </Link>
            <Link href="/necklaces" className="text-charcoal-900 hover:text-champagne-600 transition-colors">
              Luminous Necklaces
            </Link>
            <Link href="/earrings" className="text-charcoal-900 hover:text-champagne-600 transition-colors">
              Radiant Earrings
            </Link>
            <Link href="/rings" className="text-charcoal-900 hover:text-champagne-600 transition-colors">
              Signature Rings
            </Link>
            <Link href="/bracelets" className="text-charcoal-900 hover:text-champagne-600 transition-colors">
              Elegant Bracelets
            </Link>
            <Link href="/about" className="text-charcoal-900 hover:text-champagne-600 transition-colors">
              Our Atelier
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <SearchBar 
                className="w-80 border-gray-200 focus:border-champagne-400 bg-gray-50 focus:bg-white" 
                placeholder="Discover treasures, jewelry..." 
              />
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-charcoal-700" />
            </button>
            <Link href="/consultation" className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <User className="w-5 h-5 text-charcoal-700" />
            </Link>
            <button onClick={toggleCart} className="p-2 relative hover:bg-gray-50 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5 text-charcoal-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-champagne-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* LUXURY HERO SECTION */}
        <section className="relative min-h-screen bg-gradient-to-br from-diamond-white via-platinum-silver/20 to-champagne-gold/10 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Subtle geometric patterns */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-gray-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border-2 border-champagne-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
            
            {/* Light refraction effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50"></div>
          </div>

          <div className="relative flex items-center min-h-screen">
            <div className="max-w-8xl mx-auto px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="inline-block">
                      <span className="text-sm font-medium text-champagne-700 tracking-wider uppercase bg-champagne-50 px-4 py-2 rounded-full">
                        Introducing
                      </span>
                    </div>
                    
                    <h1 className="text-6xl lg:text-7xl font-light text-charcoal-900 leading-tight tracking-tight">
                      Where Light
                      <br />
                      Becomes
                      <br />
                      <em className="font-light italic text-champagne-700">Legend</em>
                    </h1>
                    
                    <p className="text-xl text-gray-700 leading-relaxed max-w-lg font-light">
                      Discover our exquisite selection of ethically cultivated diamonds—
                      where conscious choice meets conscious design.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link 
                        href="/category/rings" 
                        className="inline-flex items-center justify-center bg-charcoal-900 hover:bg-charcoal-800 text-white px-8 py-4 font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                        Begin Your Journey
                      </Link>
                      <Link 
                        href="/about" 
                        className="inline-flex items-center justify-center border-2 border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white px-8 py-4 font-medium tracking-wide transition-all duration-300"
                      >
                        Our Story
                      </Link>
                    </div>
                  </div>
                  
                  <div className="pt-12">
                    <p className="text-sm text-gray-600 font-medium tracking-wide">
                      Every diamond born from light, not earth
                    </p>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="relative">
                  <div className="relative w-full h-96 flex items-center justify-center">
                    {/* Main diamond visualization */}
                    <div className="relative w-80 h-80">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-platinum-silver/50 to-champagne-gold/30 shadow-2xl">
                        {/* Inner diamond facets */}
                        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-diamond-white to-platinum-silver/20 flex items-center justify-center">
                          <div className="w-32 h-32 transform rotate-45 border-4 border-champagne-400 bg-gradient-to-br from-champagne-100 to-champagne-200 shadow-lg flex items-center justify-center">
                            <div className="w-16 h-16 transform -rotate-45 bg-white rounded-full shadow-inner flex items-center justify-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-champagne-300 to-champagne-400 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating light elements */}
                      <div className="absolute top-8 right-8 w-4 h-4 bg-champagne-400 rounded-full shadow-lg animate-bounce"></div>
                      <div className="absolute bottom-12 left-12 w-3 h-3 bg-platinum-silver rounded-full shadow-lg animate-bounce delay-500"></div>
                      <div className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <span className="text-xs text-gray-500 tracking-wider uppercase">Discover More</span>
              <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* BRAND MANIFESTO SECTION */}
        <section className="py-24 bg-sage-green/5">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-sm font-medium text-champagne-700 tracking-wider uppercase">Our Philosophy</h2>
              
              <blockquote className="text-3xl lg:text-4xl font-light text-charcoal-900 leading-relaxed max-w-4xl mx-auto">
                "We believe true luxury lies not just in what we create, 
                but how we create it. Each bonjoojoo piece begins with light—
                cultivated diamonds born from innovation, not excavation."
              </blockquote>
              
              <cite className="text-lg text-gray-600 font-light">— The bonjoojoo Atelier</cite>
              
              <div className="pt-8">
                <Link 
                  href="/philosophy" 
                  className="inline-flex items-center text-champagne-700 hover:text-champagne-800 font-medium group"
                >
                  Learn Our Story
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* JEWELRY CATEGORIES */}
        <section className="py-24">
          <div className="max-w-8xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-medium text-champagne-700 tracking-wider uppercase mb-4">Jewelry Categories</h2>
              <h3 className="text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">Curated for Conscious Luxury</h3>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                Each category showcases our commitment to innovation, artistry, and ethical creation—
                where modern values meet timeless beauty.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Category 1: Rings */}
              <div className="group cursor-pointer">
                <Link href="/engagement">
                  <div className="relative aspect-square bg-gradient-to-br from-blush-rose/20 to-champagne-gold/10 rounded-lg overflow-hidden mb-6 group-hover:shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="text-6xl mb-4">💍</div>
                        <p className="text-lg font-medium">Rings Category</p>
                        <p className="text-sm text-gray-500">Forever Begins With Choice</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-light text-charcoal-900">Engagement Treasures</h4>
                    <p className="text-gray-600 font-light">Forever begins with choice</p>
                    <p className="text-sm text-champagne-700 font-medium group-hover:underline">Explore Category →</p>
                  </div>
                </Link>
              </div>

              {/* Category 2: Necklaces */}
              <div className="group cursor-pointer">
                <Link href="/necklaces">
                  <div className="relative aspect-square bg-gradient-to-br from-platinum-silver/20 to-diamond-white rounded-lg overflow-hidden mb-6 group-hover:shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="text-6xl mb-4">✨</div>
                        <p className="text-lg font-medium">Necklaces Category</p>
                        <p className="text-sm text-gray-500">Illuminate Your Essence</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-light text-charcoal-900">Luminous Necklaces</h4>
                    <p className="text-gray-600 font-light">Illuminate your essence</p>
                    <p className="text-sm text-champagne-700 font-medium group-hover:underline">Explore Category →</p>
                  </div>
                </Link>
              </div>

              {/* Collection 3: Earrings */}
              <div className="group cursor-pointer">
                <Link href="/earrings">
                  <div className="relative aspect-square bg-gradient-to-br from-sage-green/10 to-platinum-silver/20 rounded-lg overflow-hidden mb-6 group-hover:shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="text-6xl mb-4">✦</div>
                        <p className="text-lg font-medium">Earring Collection</p>
                        <p className="text-sm text-gray-500">Whispers of Brilliance</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-light text-charcoal-900">Radiant Earrings</h4>
                    <p className="text-gray-600 font-light">Whispers of brilliance</p>
                    <p className="text-sm text-champagne-700 font-medium group-hover:underline">Explore Category →</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LUXURY PROMISES SECTION */}
        <section className="py-24 bg-diamond-white">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-medium text-champagne-700 tracking-wider uppercase mb-4">The bonjoojoo Promise</h2>
              <h3 className="text-4xl lg:text-5xl font-light text-charcoal-900">Luxury Without Compromise</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-champagne-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-champagne-600" />
                </div>
                <h4 className="text-lg font-medium text-charcoal-900">Lifetime Devotion Promise</h4>
                <p className="text-gray-600 font-light">Your bonjoojoo treasure is protected by our comprehensive lifetime warranty</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-sage-green" />
                </div>
                <h4 className="text-lg font-medium text-charcoal-900">White-Glove Experience</h4>
                <p className="text-gray-600 font-light">Complimentary concierge service with every purchase</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blush-rose/30 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-blush-rose" />
                </div>
                <h4 className="text-lg font-medium text-charcoal-900">Perfect Confidence Guarantee</h4>
                <p className="text-gray-600 font-light">60-day return privilege if your treasure doesn't exceed expectations</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-warm-taupe/20 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-warm-taupe" />
                </div>
                <h4 className="text-lg font-medium text-charcoal-900">Conscious Creation Promise</h4>
                <p className="text-gray-600 font-light">Every diamond ethically cultivated with complete transparency</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONSULTATION CTA SECTION */}
        <section className="py-24 bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-white">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-light">Begin Your Story</h2>
              <p className="text-xl font-light text-gray-300 max-w-2xl mx-auto">
                Schedule a private consultation with our certified gemologists to discover 
                the perfect piece for your unique journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link 
                  href="/consultation" 
                  className="inline-flex items-center justify-center bg-champagne-600 hover:bg-champagne-700 text-charcoal-900 px-8 py-4 font-medium tracking-wide transition-all duration-300 hover:scale-105"
                >
                  Schedule Consultation
                </Link>
                <Link 
                  href="/category/rings" 
                  className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-charcoal-900 px-8 py-4 font-medium tracking-wide transition-all duration-300"
                >
                  Explore Categories
                </Link>
              </div>
              
              <p className="text-sm text-gray-400">
                Complimentary consultation • No obligation • Expert guidance
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* LUXURY FOOTER */}
      <footer className="bg-diamond-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-8xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="font-medium text-charcoal-900 mb-6 text-sm tracking-wider uppercase">The Atelier</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/category/rings" className="text-gray-600 hover:text-champagne-600 font-light">Signature Rings</Link></li>
                <li><Link href="/engagement" className="text-gray-600 hover:text-champagne-600 font-light">Engagement Treasures</Link></li>
                <li><Link href="/bespoke" className="text-gray-600 hover:text-champagne-600 font-light">Bespoke Creations</Link></li>
                <li><Link href="/limited-editions" className="text-gray-600 hover:text-champagne-600 font-light">Limited Editions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-charcoal-900 mb-6 text-sm tracking-wider uppercase">Conscious Creation</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/cultivation" className="text-gray-600 hover:text-champagne-600 font-light">Diamond Cultivation</Link></li>
                <li><Link href="/sustainability" className="text-gray-600 hover:text-champagne-600 font-light">Our Impact</Link></li>
                <li><Link href="/certifications" className="text-gray-600 hover:text-champagne-600 font-light">Quality Standards</Link></li>
                <li><Link href="/transparency" className="text-gray-600 hover:text-champagne-600 font-light">Full Transparency</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-charcoal-900 mb-6 text-sm tracking-wider uppercase">Concierge Services</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/consultation" className="text-gray-600 hover:text-champagne-600 font-light">Personal Consultation</Link></li>
                <li><Link href="/sizing" className="text-gray-600 hover:text-champagne-600 font-light">Expert Sizing</Link></li>
                <li><Link href="/care" className="text-gray-600 hover:text-champagne-600 font-light">Lifetime Care</Link></li>
                <li><Link href="/customization" className="text-gray-600 hover:text-champagne-600 font-light">Custom Design</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-charcoal-900 mb-6 text-sm tracking-wider uppercase">Our Promise</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/warranty" className="text-gray-600 hover:text-champagne-600 font-light">Lifetime Warranty</Link></li>
                <li><Link href="/returns" className="text-gray-600 hover:text-champagne-600 font-light">Confidence Guarantee</Link></li>
                <li><Link href="/shipping" className="text-gray-600 hover:text-champagne-600 font-light">White-Glove Delivery</Link></li>
                <li><Link href="/authentication" className="text-gray-600 hover:text-champagne-600 font-light">Certificate of Authenticity</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-charcoal-900 mb-6 text-sm tracking-wider uppercase">Connect</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-600 hover:text-champagne-600 font-light">Our Story</Link></li>
                <li><Link href="/journal" className="text-gray-600 hover:text-champagne-600 font-light">The Journal</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-champagne-600 font-light">Contact</Link></li>
                <li><Link href="/locations" className="text-gray-600 hover:text-champagne-600 font-light">Showroom</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex items-center space-x-8 mb-6 lg:mb-0">
                <Link href="/" className="text-2xl font-light text-charcoal-900 tracking-[0.2em]">
                  bonjoojoo
                </Link>
                <div className="text-xs text-gray-500 tracking-wide">
                  WHERE LIGHT BECOMES LEGEND
                </div>
              </div>

              <div className="mb-6 lg:mb-0">
                <p className="text-sm text-gray-600 font-light">© 2026 bonjoojoo. All rights reserved.</p>
              </div>

              <div className="flex space-x-4">
                {[...Array(4)].map((_, i) => (
                  <button key={i} className="w-10 h-10 bg-gray-100 hover:bg-champagne-100 rounded-full transition-colors flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-400"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar />
    </div>
  )
}