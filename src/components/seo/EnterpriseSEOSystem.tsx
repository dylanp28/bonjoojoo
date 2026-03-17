'use client'

import { ReactNode } from 'react'
import Head from 'next/head'

// ============================================================================
// ENTERPRISE SEO & ACCESSIBILITY SYSTEM
// Google/Stripe Quality SEO & A11y Implementation
// ============================================================================

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  twitterCard?: 'summary' | 'summary_large_image'
  jsonLd?: any
  noindex?: boolean
  children?: ReactNode
}

export const EnterpriseSEO = ({
  title,
  description,
  canonical,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd,
  noindex = false,
  children
}: SEOProps) => {
  const fullTitle = title.includes('BONJOOJOO') ? title : `${title} | BONJOOJOO`
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BONJOOJOO" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@bonjoojoo" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="BONJOOJOO" />
      <meta name="publisher" content="BONJOOJOO" />
      <meta name="theme-color" content="#000000" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      {children}
    </Head>
  )
}

// Product-specific SEO
export const ProductSEO = ({
  product,
  images = [],
  reviews = []
}: {
  product: {
    name: string
    description: string
    price: number
    currency: string
    sku: string
    brand: string
    category: string
    availability: 'InStock' | 'OutOfStock' | 'PreOrder'
    condition: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition'
  }
  images: string[]
  reviews?: any[]
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images,
    brand: {
      "@type": "Brand",
      name: product.brand
    },
    sku: product.sku,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      itemCondition: `https://schema.org/${product.condition}`,
      seller: {
        "@type": "Organization",
        name: "BONJOOJOO"
      }
    },
    ...(reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
        reviewCount: reviews.length
      },
      review: reviews.map(review => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.author
        },
        datePublished: review.date,
        description: review.content,
        ratingValue: review.rating
      }))
    })
  }

  return (
    <EnterpriseSEO
      title={product.name}
      description={product.description}
      ogType="product"
      ogImage={images[0]}
      jsonLd={jsonLd}
    />
  )
}

// Organization JSON-LD
export const OrganizationSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BONJOOJOO",
    url: "https://bonjoojoo.com",
    logo: "https://bonjoojoo.com/logo.png",
    description: "Premium jewelry and lab-grown diamonds. Discover our curated collection of rings, necklaces, bracelets, and charms.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-0123",
      contactType: "Customer Service",
      availableLanguage: "English"
    },
    sameAs: [
      "https://facebook.com/bonjoojoo",
      "https://instagram.com/bonjoojoo",
      "https://twitter.com/bonjoojoo"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US"
    }
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Breadcrumb schema
export const BreadcrumbSchema = ({ 
  items 
}: {
  items: { name: string; url: string }[]
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Accessibility improvements
export const A11yFocusManager = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {/* Skip to main content link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-black text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>
      {children}
    </div>
  )
}

// Screen reader announcements
export const ScreenReaderAnnouncer = ({ 
  message, 
  priority = 'polite' 
}: {
  message: string
  priority?: 'polite' | 'assertive'
}) => {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// High contrast mode detection
export const useHighContrast = () => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Reduced motion detection
export const useReducedMotion = () => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Color scheme preference
export const useColorSchemePreference = () => {
  if (typeof window === 'undefined') return 'light'
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Accessible button component
export const AccessibleButton = ({
  children,
  ariaLabel,
  ariaDescription,
  onClick,
  disabled = false,
  className = '',
  ...props
}: {
  children: ReactNode
  ariaLabel?: string
  ariaDescription?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  [key: string]: any
}) => {
  return (
    <button
      aria-label={ariaLabel}
      aria-describedby={ariaDescription}
      onClick={onClick}
      disabled={disabled}
      className={`
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// Alt text generator for product images
export const generateProductAltText = (
  productName: string,
  variant?: string,
  angle?: string
): string => {
  let altText = productName

  if (variant) {
    altText += ` in ${variant}`
  }

  if (angle) {
    altText += ` - ${angle} view`
  }

  return altText
}

// Meta tags for different page types
export const getPageMetaTags = (pageType: string, data: any) => {
  const metaTags = {
    home: {
      title: 'BONJOOJOO - Premium Jewelry & Lab-Grown Diamonds',
      description: 'Discover our curated collection of premium jewelry including rings, necklaces, bracelets, and charms. Featuring lab-grown diamonds and sustainable luxury.',
      ogImage: '/images/og-home.jpg'
    },
    
    product: {
      title: data.name,
      description: `${data.description} Available at BONJOOJOO. Premium quality jewelry with exceptional craftsmanship.`,
      ogImage: data.images?.[0] || '/images/og-product.jpg'
    },
    
    category: {
      title: `${data.name} - Premium Jewelry Collection`,
      description: `Explore our ${data.name.toLowerCase()} collection. Handcrafted jewelry with premium materials and exceptional design.`,
      ogImage: data.image || '/images/og-category.jpg'
    },
    
    collection: {
      title: `${data.name} Collection - BONJOOJOO`,
      description: `Discover the ${data.name} collection featuring curated jewelry pieces that embody luxury and craftsmanship.`,
      ogImage: data.image || '/images/og-collection.jpg'
    }
  }

  return metaTags[pageType as keyof typeof metaTags] || metaTags.home
}

export default EnterpriseSEO