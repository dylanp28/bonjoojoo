'use client'

/**
 * JEWELRY ASSET GENERATION SYSTEM
 * ================================
 * SVG-based product placeholders that simulate professional jewelry photography.
 * Each generates a unique, beautiful placeholder that can be swapped for real product photos.
 *
 * Usage: <JewelryPlaceholder type="ring" variant={0} />
 *
 * To replace with real images:
 *   Simply swap <JewelryPlaceholder /> for <img src="/images/your-product.jpg" />
 */

import React from 'react'

interface PlaceholderProps {
  className?: string
  variant?: number
  metal?: 'rose-gold' | 'yellow-gold' | 'white-gold' | 'silver'
}

const metalColors = {
  'rose-gold': { primary: '#B76E79', secondary: '#D4A5A5', highlight: '#F0D0D0', shadow: '#8B4F5A' },
  'yellow-gold': { primary: '#D4A843', secondary: '#E8C868', highlight: '#F5E6B8', shadow: '#A07828' },
  'white-gold': { primary: '#C0C0C0', secondary: '#D8D8D8', highlight: '#F0F0F0', shadow: '#909090' },
  'silver': { primary: '#A8A8A8', secondary: '#C8C8C8', highlight: '#E8E8E8', shadow: '#787878' },
}

export function RingPlaceholder({ className = '', variant = 0, metal = 'rose-gold' }: PlaceholderProps) {
  const m = metalColors[metal]
  const variants = [
    // Variant 0: Solitaire diamond ring
    <svg key="0" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ring-bg-0" x1="0" y1="0" x2="400" y2="500">
          <stop offset="0%" stopColor="#FAF8F6" />
          <stop offset="100%" stopColor="#F0EDE8" />
        </linearGradient>
        <linearGradient id="ring-metal-0" x1="150" y1="200" x2="250" y2="400">
          <stop offset="0%" stopColor={m.highlight} />
          <stop offset="40%" stopColor={m.primary} />
          <stop offset="100%" stopColor={m.shadow} />
        </linearGradient>
        <linearGradient id="diamond-0" x1="180" y1="140" x2="220" y2="200">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#F0F8FF" />
          <stop offset="60%" stopColor="#E8F0FF" />
          <stop offset="100%" stopColor="#D0E0F0" />
        </linearGradient>
        <filter id="ring-shadow-0">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.08" />
        </filter>
        <filter id="diamond-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="400" height="500" fill="url(#ring-bg-0)" />
      {/* Ring band */}
      <g filter="url(#ring-shadow-0)">
        <ellipse cx="200" cy="310" rx="72" ry="90" fill="none" stroke="url(#ring-metal-0)" strokeWidth="8" />
        <ellipse cx="200" cy="310" rx="72" ry="90" fill="none" stroke={m.highlight} strokeWidth="1" opacity="0.4" />
      </g>
      {/* Prong setting */}
      <path d={`M185 225 L178 195 L200 170 L222 195 L215 225`} fill="url(#ring-metal-0)" />
      <path d={`M185 225 L178 195 L200 170 L222 195 L215 225`} fill="none" stroke={m.highlight} strokeWidth="0.5" opacity="0.6" />
      {/* Diamond */}
      <g filter="url(#diamond-glow)">
        <polygon points="200,155 225,185 215,210 185,210 175,185" fill="url(#diamond-0)" stroke="#C8D8E8" strokeWidth="0.5" />
        {/* Facets */}
        <line x1="200" y1="155" x2="200" y2="210" stroke="#D0E0F0" strokeWidth="0.3" opacity="0.5" />
        <line x1="175" y1="185" x2="225" y2="185" stroke="#D0E0F0" strokeWidth="0.3" opacity="0.5" />
        <line x1="200" y1="155" x2="185" y2="210" stroke="#E0EEFF" strokeWidth="0.2" opacity="0.3" />
        <line x1="200" y1="155" x2="215" y2="210" stroke="#E0EEFF" strokeWidth="0.2" opacity="0.3" />
        {/* Sparkle */}
        <circle cx="195" cy="175" r="2" fill="white" opacity="0.9" />
        <circle cx="208" cy="190" r="1.5" fill="white" opacity="0.6" />
      </g>
      {/* Reflection on surface */}
      <ellipse cx="200" cy="420" rx="60" ry="6" fill={m.primary} opacity="0.06" />
    </svg>,
    // Variant 1: Crown stacking ring
    <svg key="1" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ring-bg-1" x1="0" y1="0" x2="400" y2="500">
          <stop offset="0%" stopColor="#FAF8F6" />
          <stop offset="100%" stopColor="#F0EDE8" />
        </linearGradient>
        <linearGradient id="ring-metal-1" x1="140" y1="200" x2="260" y2="380">
          <stop offset="0%" stopColor={m.highlight} />
          <stop offset="50%" stopColor={m.primary} />
          <stop offset="100%" stopColor={m.shadow} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#ring-bg-1)" />
      <g transform="translate(200, 280)">
        {/* Band */}
        <ellipse cx="0" cy="20" rx="65" ry="80" fill="none" stroke="url(#ring-metal-1)" strokeWidth="6" />
        {/* Crown points */}
        {[-25, -12, 0, 12, 25].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={-55 - Math.abs(x) * 0.3} x2={x} y2={-65 - Math.abs(x) * 0.2} stroke={m.primary} strokeWidth="2" strokeLinecap="round" />
            <circle cx={x} cy={-67 - Math.abs(x) * 0.2} r="2.5" fill={m.highlight} stroke={m.primary} strokeWidth="0.5" />
          </g>
        ))}
        {/* Small diamonds scattered */}
        {[[-18, -58], [18, -58], [-8, -62], [8, -62], [0, -60]].map(([x, y], i) => (
          <g key={`d${i}`}>
            <circle cx={x} cy={y} r="1.5" fill="white" stroke="#D0E0F0" strokeWidth="0.3" />
            <circle cx={x! + 0.5} cy={y! - 0.5} r="0.5" fill="white" opacity="0.8" />
          </g>
        ))}
      </g>
      <ellipse cx="200" cy="410" rx="50" ry="5" fill={m.primary} opacity="0.05" />
    </svg>,
    // Variant 2: Pavé band ring
    <svg key="2" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ring-bg-2" x1="0" y1="0" x2="400" y2="500">
          <stop offset="0%" stopColor="#FAF8F6" />
          <stop offset="100%" stopColor="#F0EDE8" />
        </linearGradient>
        <linearGradient id="ring-metal-2" x1="140" y1="200" x2="260" y2="400">
          <stop offset="0%" stopColor={m.highlight} />
          <stop offset="45%" stopColor={m.primary} />
          <stop offset="100%" stopColor={m.shadow} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#ring-bg-2)" />
      <g transform="translate(200, 270)">
        <ellipse cx="0" cy="20" rx="68" ry="85" fill="none" stroke="url(#ring-metal-2)" strokeWidth="10" />
        <ellipse cx="0" cy="20" rx="68" ry="85" fill="none" stroke={m.highlight} strokeWidth="1" opacity="0.3" />
        {/* Pavé diamonds along the top of the band */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (Math.PI * 0.15) + (i * Math.PI * 0.7 / 15) - Math.PI * 0.35
          const x = Math.cos(angle) * 68
          const y = Math.sin(angle) * 85 + 20
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="2" fill="white" stroke="#C8D8E8" strokeWidth="0.3" />
              <circle cx={x + 0.3} cy={y - 0.3} r="0.7" fill="white" opacity="0.9" />
            </g>
          )
        })}
      </g>
      <ellipse cx="200" cy="415" rx="52" ry="5" fill={m.primary} opacity="0.05" />
    </svg>,
  ]

  return variants[variant % variants.length]
}

export function NecklacePlaceholder({ className = '', variant = 0, metal = 'yellow-gold' }: PlaceholderProps) {
  const m = metalColors[metal]
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="neck-bg" x1="0" y1="0" x2="400" y2="500">
          <stop offset="0%" stopColor="#FAF8F6" />
          <stop offset="100%" stopColor="#F0EDE8" />
        </linearGradient>
        <linearGradient id="chain-grad" x1="100" y1="100" x2="300" y2="350">
          <stop offset="0%" stopColor={m.highlight} />
          <stop offset="50%" stopColor={m.primary} />
          <stop offset="100%" stopColor={m.shadow} />
        </linearGradient>
        <filter id="chain-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.06" />
        </filter>
      </defs>
      <rect width="400" height="500" fill="url(#neck-bg)" />
      {/* Chain */}
      <g filter="url(#chain-shadow)">
        <path
          d="M120 60 Q120 140 140 200 Q160 260 180 290 Q190 310 200 320 Q210 310 220 290 Q240 260 260 200 Q280 140 280 60"
          fill="none"
          stroke="url(#chain-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Chain links suggestion */}
        {Array.from({ length: 8 }, (_, i) => {
          const t = i / 7
          const x = 120 + t * 80 + (t < 0.5 ? t * 40 : (1 - t) * 40)
          const y = 60 + t * 200 + Math.sin(t * Math.PI) * 60
          return <circle key={i} cx={x} cy={y} r="1" fill={m.highlight} opacity="0.5" />
        })}
      </g>
      {/* Pendant */}
      <g transform="translate(200, 330)">
        {/* Diamond pendant */}
        <polygon points="0,-20 15,0 10,18 -10,18 -15,0" fill="white" stroke="#C8D8E8" strokeWidth="0.5" />
        <line x1="0" y1="-20" x2="0" y2="18" stroke="#E0EEFF" strokeWidth="0.3" opacity="0.4" />
        <line x1="-15" y1="0" x2="15" y2="0" stroke="#E0EEFF" strokeWidth="0.3" opacity="0.4" />
        <circle cx="-3" cy="-8" r="2" fill="white" opacity="0.8" />
        {/* Bail */}
        <ellipse cx="0" cy="-24" rx="4" ry="5" fill="none" stroke={m.primary} strokeWidth="1.5" />
      </g>
      <ellipse cx="200" cy="430" rx="40" ry="4" fill={m.primary} opacity="0.04" />
    </svg>
  )
}

export function EarringPlaceholder({ className = '', variant = 0, metal = 'white-gold' }: PlaceholderProps) {
  const m = metalColors[metal]
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ear-bg" x1="0" y1="0" x2="400" y2="500">
          <stop offset="0%" stopColor="#FAF8F6" />
          <stop offset="100%" stopColor="#F0EDE8" />
        </linearGradient>
        <linearGradient id="ear-metal" x1="120" y1="120" x2="280" y2="400">
          <stop offset="0%" stopColor={m.highlight} />
          <stop offset="50%" stopColor={m.primary} />
          <stop offset="100%" stopColor={m.shadow} />
        </linearGradient>
        <filter id="ear-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.06" />
        </filter>
      </defs>
      <rect width="400" height="500" fill="url(#ear-bg)" />
      {/* Left earring */}
      <g transform="translate(150, 180)" filter="url(#ear-shadow)">
        <circle cx="0" cy="0" r="3" fill={m.primary} />
        <line x1="0" y1="3" x2="0" y2="40" stroke={m.primary} strokeWidth="1.5" />
        {/* Drop diamond */}
        <polygon points="0,42 10,60 6,78 -6,78 -10,60" fill="white" stroke="#C8D8E8" strokeWidth="0.4" />
        <circle cx="-2" cy="55" r="1.5" fill="white" opacity="0.8" />
        <line x1="0" y1="42" x2="0" y2="78" stroke="#E0EEFF" strokeWidth="0.2" opacity="0.4" />
      </g>
      {/* Right earring */}
      <g transform="translate(250, 190)" filter="url(#ear-shadow)">
        <circle cx="0" cy="0" r="3" fill={m.primary} />
        <line x1="0" y1="3" x2="0" y2="40" stroke={m.primary} strokeWidth="1.5" />
        <polygon points="0,42 10,60 6,78 -6,78 -10,60" fill="white" stroke="#C8D8E8" strokeWidth="0.4" />
        <circle cx="-2" cy="55" r="1.5" fill="white" opacity="0.8" />
        <line x1="0" y1="42" x2="0" y2="78" stroke="#E0EEFF" strokeWidth="0.2" opacity="0.4" />
      </g>
      <ellipse cx="200" cy="400" rx="60" ry="5" fill={m.primary} opacity="0.04" />
    </svg>
  )
}

export function BraceletPlaceholder({ className = '', variant = 0, metal = 'rose-gold' }: PlaceholderProps) {
  const m = metalColors[metal]
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brac-bg" x1="0" y1="0" x2="400" y2="500">
          <stop offset="0%" stopColor="#FAF8F6" />
          <stop offset="100%" stopColor="#F0EDE8" />
        </linearGradient>
        <linearGradient id="brac-metal" x1="100" y1="150" x2="300" y2="380">
          <stop offset="0%" stopColor={m.highlight} />
          <stop offset="50%" stopColor={m.primary} />
          <stop offset="100%" stopColor={m.shadow} />
        </linearGradient>
        <filter id="brac-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.07" />
        </filter>
      </defs>
      <rect width="400" height="500" fill="url(#brac-bg)" />
      {/* Bracelet chain - curved oval shape */}
      <g filter="url(#brac-shadow)" transform="translate(200, 260) rotate(-15)">
        <ellipse cx="0" cy="0" rx="90" ry="55" fill="none" stroke="url(#brac-metal)" strokeWidth="4" />
        <ellipse cx="0" cy="0" rx="90" ry="55" fill="none" stroke={m.highlight} strokeWidth="0.5" opacity="0.4" />
        {/* Station diamonds */}
        {[-60, -30, 0, 30, 60].map((offset, i) => {
          const angle = (offset / 90) * Math.PI * 0.7
          const x = Math.cos(angle) * 90
          const y = Math.sin(angle) * 55
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="white" stroke={m.primary} strokeWidth="0.8" />
              <circle cx={x - 0.5} cy={y - 0.5} r="1.2" fill="white" opacity="0.9" />
            </g>
          )
        })}
        {/* Clasp */}
        <rect x="85" y="-5" width="12" height="10" rx="2" fill={m.primary} stroke={m.highlight} strokeWidth="0.5" />
      </g>
      <ellipse cx="200" cy="400" rx="65" ry="5" fill={m.primary} opacity="0.04" />
    </svg>
  )
}

// Unified placeholder component
export function JewelryPlaceholder({
  type,
  className = '',
  variant = 0,
  metal = 'rose-gold'
}: {
  type: 'ring' | 'necklace' | 'earring' | 'bracelet'
  className?: string
  variant?: number
  metal?: 'rose-gold' | 'yellow-gold' | 'white-gold' | 'silver'
}) {
  switch (type) {
    case 'ring': return <RingPlaceholder className={className} variant={variant} metal={metal} />
    case 'necklace': return <NecklacePlaceholder className={className} variant={variant} metal={metal} />
    case 'earring': return <EarringPlaceholder className={className} variant={variant} metal={metal} />
    case 'bracelet': return <BraceletPlaceholder className={className} variant={variant} metal={metal} />
  }
}

// Category hero placeholder (larger, for hero/banner sections)
export function CategoryHeroPlaceholder({
  category,
  className = '',
}: {
  category: string
  className?: string
}) {
  const gradient = {
    rings: { from: '#F5E6E0', via: '#EDD5CC', to: '#E0C4B8' },
    necklaces: { from: '#F5ECD5', via: '#EDE0C0', to: '#E0D0A8' },
    earrings: { from: '#E8EDF5', via: '#D8E0ED', to: '#C8D0E0' },
    bracelets: { from: '#E8F0E8', via: '#D5E8D5', to: '#C0D8C0' },
    sale: { from: '#FDE8E8', via: '#F8D0D0', to: '#F0B8B8' },
    gifts: { from: '#F0E8F5', via: '#E8D8F0', to: '#D8C8E0' },
  }[category.toLowerCase()] || { from: '#FAF8F6', via: '#F0EDE8', to: '#E8E0D8' }

  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`cat-${category}`} x1="0" y1="0" x2="600" y2="400">
          <stop offset="0%" stopColor={gradient.from} />
          <stop offset="50%" stopColor={gradient.via} />
          <stop offset="100%" stopColor={gradient.to} />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#cat-${category})`} />
      {/* Subtle decorative circles */}
      <circle cx="450" cy="200" r="80" fill="white" opacity="0.15" />
      <circle cx="460" cy="190" r="50" fill="white" opacity="0.1" />
      <circle cx="150" cy="320" r="40" fill="white" opacity="0.08" />
    </svg>
  )
}

// Video placeholder - animated gradient that simulates video content
export function VideoPlaceholder({
  theme = 'light',
  className = '',
}: {
  theme?: 'light' | 'dark' | 'pink' | 'blue' | 'warm'
  className?: string
}) {
  const themes = {
    light: { bg1: '#FAF8F6', bg2: '#F0EDE8', bg3: '#E8E0D8', accent: '#B76E79' },
    dark: { bg1: '#2D2D2D', bg2: '#1A1A1A', bg3: '#0D0D0D', accent: '#D4145A' },
    pink: { bg1: '#FDF2F4', bg2: '#F8D8E0', bg3: '#F0C0D0', accent: '#D4145A' },
    blue: { bg1: '#E8EEF8', bg2: '#D0DCF0', bg3: '#B8C8E0', accent: '#4A6FA5' },
    warm: { bg1: '#F8F0E0', bg2: '#F0E0C8', bg3: '#E8D0B0', accent: '#C49A6C' },
  }
  const t = themes[theme]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`video-${theme}`} x1="0" y1="0" x2="1920" y2="1080">
            <stop offset="0%" stopColor={t.bg1} />
            <stop offset="50%" stopColor={t.bg2} />
            <stop offset="100%" stopColor={t.bg3} />
          </linearGradient>
          <radialGradient id={`video-glow-${theme}`} cx="65%" cy="45%" r="40%">
            <stop offset="0%" stopColor={t.accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill={`url(#video-${theme})`} />
        <rect width="1920" height="1080" fill={`url(#video-glow-${theme})`} />
        {/* Decorative elements suggesting product photography */}
        <circle cx="1200" cy="500" r="200" fill="white" opacity="0.06" />
        <circle cx="1250" cy="480" r="120" fill="white" opacity="0.04" />
        <circle cx="700" cy="800" r="80" fill={t.accent} opacity="0.03" />
      </svg>
      {/* Animated shimmer overlay to simulate video movement */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `linear-gradient(105deg, transparent 40%, white 50%, transparent 60%)`,
          backgroundSize: '200% 100%',
          animation: 'videoShimmer 8s ease-in-out infinite',
        }}
      />
    </div>
  )
}

export default JewelryPlaceholder
