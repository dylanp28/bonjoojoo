'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MegaMenuProps {
  title: string
  children: React.ReactNode
  href?: string
}

// PANDORA MENU ANIMATIONS - EXACT BEHAVIOR
const megaMenuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export function EnhancedMegaMenuDropdown({ title, children, href }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="relative"
      onMouseEnter={() => {
        setIsOpen(true)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsOpen(false)
        setIsHovered(false)
      }}
    >
      {/* Navigation Link with Pandora-style animations */}
      <Link 
        href={href || '#'} 
        className="flex items-center text-sm font-medium text-black relative group"
      >
        <motion.span
          animate={{
            color: isHovered ? '#666' : '#000'
          }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.span>
        
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ChevronDown className="w-3 h-3 ml-1" />
        </motion.div>
        
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-black"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </Link>

      {/* Mega Menu Dropdown with Pandora animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 w-screen max-w-4xl bg-white border border-gray-200 shadow-2xl z-50"
            style={{
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            variants={megaMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Content */}
            <motion.div
              className="relative p-8"
              variants={megaMenuVariants}
            >
              {children}
            </motion.div>
            
            {/* Bottom border accent */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Enhanced Menu Column Component
const MenuColumn: React.FC<{
  title: string
  items: Array<{ name: string; href: string; isNew?: boolean }>
}> = ({ title, items }) => {
  return (
    <motion.div variants={menuItemVariants}>
      <motion.h3
        className="text-sm font-bold text-black mb-4 tracking-wider relative"
        whileHover={{ color: '#666' }}
        transition={{ duration: 0.2 }}
      >
        {title}
        <motion.div
          className="absolute -bottom-1 left-0 h-px bg-black"
          initial={{ width: 0 }}
          animate={{ width: '30px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.h3>
      
      <motion.ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={item.href}
            variants={menuItemVariants}
            custom={index}
          >
            <Link
              href={item.href}
              className="text-sm text-gray-600 hover:text-black transition-colors duration-200 relative group flex items-center"
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.span>
              
              {item.isNew && (
                <motion.span
                  className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.1 }}
                >
                  NEW
                </motion.span>
              )}
              
              {/* Hover effect */}
              <motion.div
                className="absolute -bottom-1 left-0 h-px bg-black"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

// Enhanced Mega Menus with Pandora data structure
export function EnhancedNewFeaturedMegaMenu() {
  return (
    <EnhancedMegaMenuDropdown title="New & featured" href="/new-featured">
      <motion.div
        className="grid grid-cols-4 gap-8"
        variants={megaMenuVariants}
      >
        <MenuColumn
          title="FEATURED"
          items={[
            { name: 'New in', href: '/new-in', isNew: true },
            { name: 'Bestsellers', href: '/bestsellers' },
            { name: 'KATSEYE Minis', href: '/katseye', isNew: true },
            { name: 'Disney Collection', href: '/disney' },
            { name: 'Lab-Grown Diamonds', href: '/lab-grown-diamonds', isNew: true }
          ]}
        />
        <MenuColumn
          title="NEW ARRIVALS"
          items={[
            { name: 'New charms', href: '/new-charms', isNew: true },
            { name: 'New rings', href: '/new-rings', isNew: true },
            { name: 'New necklaces', href: '/new-necklaces' },
            { name: 'New earrings', href: '/new-earrings' }
          ]}
        />
        <MenuColumn
          title="COLLECTIONS"
          items={[
            { name: 'Bonjoojoo Minis', href: '/mini-charms' },
            { name: 'Tennis Collection', href: '/tennis-bracelets' },
            { name: 'Hearts & Promise', href: '/promise-rings' },
            { name: 'Bonjoojoo Talisman', href: '/talisman' }
          ]}
        />
        <MenuColumn
          title="SEASONAL"
          items={[
            { name: 'Spring Collection', href: '/spring', isNew: true },
            { name: 'Mother\'s Day Gifts', href: '/mothers-day' },
            { name: 'Graduation Gifts', href: '/graduation' },
            { name: 'Wedding Collection', href: '/wedding' }
          ]}
        />
      </motion.div>
    </EnhancedMegaMenuDropdown>
  )
}

export function EnhancedShopByMegaMenu() {
  return (
    <EnhancedMegaMenuDropdown title="Shop by" href="/shop-by">
      <motion.div
        className="grid grid-cols-4 gap-8"
        variants={megaMenuVariants}
      >
        <MenuColumn
          title="CATEGORY"
          items={[
            { name: 'All jewelry', href: '/jewelry' },
            { name: 'Personalized jewelry', href: '/personalized' },
            { name: 'Create your bracelet', href: '/custom-bracelet' },
            { name: 'Gift sets', href: '/gift-sets' }
          ]}
        />
        <MenuColumn
          title="PRICE RANGE"
          items={[
            { name: 'Under $50', href: '/under-50' },
            { name: '$50 - $100', href: '/50-100' },
            { name: '$100 - $250', href: '/100-250' },
            { name: 'Over $250', href: '/over-250' }
          ]}
        />
        <MenuColumn
          title="MATERIAL"
          items={[
            { name: 'Sterling Silver', href: '/sterling-silver' },
            { name: '14k Gold', href: '/14k-gold' },
            { name: 'Rose Gold Plated', href: '/rose-gold' },
            { name: 'Lab-Grown Diamonds', href: '/lab-diamonds', isNew: true },
            { name: 'Pearls', href: '/pearls' }
          ]}
        />
        <MenuColumn
          title="THEMES"
          items={[
            { name: 'Love & Hearts', href: '/love' },
            { name: 'Symbols & Meanings', href: '/symbols' },
            { name: 'Family & Friends', href: '/family' },
            { name: 'Travel & Adventure', href: '/travel' }
          ]}
        />
      </motion.div>
    </EnhancedMegaMenuDropdown>
  )
}

export function EnhancedCharmsMegaMenu() {
  return (
    <EnhancedMegaMenuDropdown title="Charms" href="/charms">
      <motion.div
        className="grid grid-cols-4 gap-8"
        variants={megaMenuVariants}
      >
        <MenuColumn
          title="CHARM TYPES"
          items={[
            { name: 'All charms', href: '/charms' },
            { name: 'Dangle charms', href: '/dangle-charms' },
            { name: 'Clip charms', href: '/clip-charms' },
            { name: 'Mini charms', href: '/mini-charms', isNew: true },
            { name: 'Safety chains', href: '/safety-chains' }
          ]}
        />
        <MenuColumn
          title="COLLECTIONS"
          items={[
            { name: 'Disney charms', href: '/disney-charms' },
            { name: 'Harry Potter', href: '/harry-potter' },
            { name: 'Star Wars', href: '/star-wars' },
            { name: 'Marvel charms', href: '/marvel-charms' }
          ]}
        />
        <MenuColumn
          title="THEMES"
          items={[
            { name: 'Love charms', href: '/love-charms' },
            { name: 'Animal charms', href: '/animal-charms' },
            { name: 'Flower charms', href: '/flower-charms' },
            { name: 'Birthstone charms', href: '/birthstone-charms' }
          ]}
        />
        <MenuColumn
          title="PERSONALIZATION"
          items={[
            { name: 'Engravable charms', href: '/engravable-charms' },
            { name: 'Initial charms', href: '/initial-charms' },
            { name: 'Photo charms', href: '/photo-charms', isNew: true },
            { name: 'Custom charms', href: '/custom-charms' }
          ]}
        />
      </motion.div>
    </EnhancedMegaMenuDropdown>
  )
}

export default {
  EnhancedMegaMenuDropdown,
  EnhancedNewFeaturedMegaMenu,
  EnhancedShopByMegaMenu,
  EnhancedCharmsMegaMenu
}