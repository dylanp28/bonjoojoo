'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface MegaMenuProps {
  title: string
  children: React.ReactNode
  href?: string
}

export function MegaMenuDropdown({ title, children, href }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link 
        href={href || '#'} 
        className="flex items-center text-pandora-base font-medium text-pandora-black hover:text-pandora-gray-600 transition-colors"
      >
        {title}
        <ChevronDown className="w-3 h-3 ml-1" />
      </Link>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-screen max-w-4xl bg-white border border-pandora-gray-200 shadow-pandora-lg z-50">
          <div className="p-8">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

// Specific Mega Menus for Pandora Categories
export function NewFeaturedMegaMenu() {
  return (
    <MegaMenuDropdown title="New & featured" href="/new-in">
      <div className="grid grid-cols-4 gap-8">
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">FEATURED</h3>
          <ul className="space-y-3">
            <li><Link href="/new-in" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">New in</Link></li>
            <li><Link href="/bestsellers" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Bestsellers</Link></li>
            <li><Link href="/disney" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Disney Charms</Link></li>
            <li><Link href="/bridgerton" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Bridgerton charms & jewelry</Link></li>
            <li><Link href="/graduation" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Graduation</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">NEW ARRIVALS</h3>
          <ul className="space-y-3">
            <li><Link href="/new-charms" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">New charms and bracelets</Link></li>
            <li><Link href="/new-rings" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">New rings</Link></li>
            <li><Link href="/new-necklaces" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">New necklaces & earrings</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">COLLECTIONS</h3>
          <ul className="space-y-3">
            <li><Link href="/mini-charms" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Mini Charms</Link></li>
            <li><Link href="/tennis-bracelets" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Tennis bracelets</Link></li>
            <li><Link href="/promise-rings" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Hearts & Promise rings</Link></li>
            <li><Link href="/talisman" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">BONJOOJOO TALISMAN</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">SPECIAL</h3>
          <ul className="space-y-3">
            <li><Link href="/spring" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Spring collection</Link></li>
            <li><Link href="/gifts-mom" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Gifts for mom</Link></li>
            <li><Link href="/heart-jewelry" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Heart charms & love jewelry</Link></li>
            <li><Link href="/katseye" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Styled by KATSEYE</Link></li>
          </ul>
        </div>
      </div>
    </MegaMenuDropdown>
  )
}

export function ShopByMegaMenu() {
  return (
    <MegaMenuDropdown title="Shop by" href="/jewelry">
      <div className="grid grid-cols-4 gap-8">
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">CATEGORY</h3>
          <ul className="space-y-3">
            <li><Link href="/jewelry" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">All jewelry</Link></li>
            <li><Link href="/disney-princesses" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Disney Princesses</Link></li>
            <li><Link href="/personalized" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Personalized Jewelry</Link></li>
            <li><Link href="/custom-bracelet" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Create your own charm bracelet</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">PRICE</h3>
          <ul className="space-y-3">
            <li><Link href="/under-50" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Under $50</Link></li>
            <li><Link href="/under-100" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Under $100</Link></li>
            <li><Link href="/under-250" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Under $250</Link></li>
            <li><Link href="/over-250" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Over $250</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">MATERIAL</h3>
          <ul className="space-y-3">
            <li><Link href="/sterling-silver" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Sterling silver</Link></li>
            <li><Link href="/gold" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Gold</Link></li>
            <li><Link href="/rose-gold" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Rose gold-plated</Link></li>
            <li><Link href="/white-gold" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">White gold</Link></li>
            <li><Link href="/pearls" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Pearls</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-pandora-sm font-bold text-pandora-black mb-4 tracking-wider">THEME</h3>
          <ul className="space-y-3">
            <li><Link href="/love" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Love</Link></li>
            <li><Link href="/symbols" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Symbols</Link></li>
            <li><Link href="/family" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Family and Friends</Link></li>
            <li><Link href="/travel" className="text-pandora-sm text-pandora-gray-600 hover:text-pandora-black">Travel and hobbies</Link></li>
          </ul>
        </div>
      </div>
    </MegaMenuDropdown>
  )
}