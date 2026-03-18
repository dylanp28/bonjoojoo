export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  subcategory: string
  images: string[]
  materials: string[]
  features: string[]
  specifications: {
    [key: string]: string
  }
  inStock: boolean
  rating: number
  reviewCount: number
  tags: string[]
}

// NOTE: Most products have been moved to productGroups.ts for proper variant handling.
// This file now contains only single-variant products (no color options).
// Products with multiple metal/color options should be defined in productGroups.ts

export const products: Product[] = [
  // SINGLE-VARIANT PRODUCTS ONLY
  
  // EARRINGS - Single Variants
  {
    id: 'lhe3781a',
    name: 'Diamond Floral Ear Jackets',
    price: 1185,
    description: 'Elevate your everyday elegance with these versatile diamond ear jackets. A delicate openwork floral stud pairs with a curved crescent jacket adorned with graduated round brilliant-cut diamonds. Wear as studs alone or with jackets for contemporary dimension.',
    category: 'earrings',
    subcategory: 'jackets',
    images: [
      '/images/products/LHE3781A.jpg',
      '/images/products/LHE3781A-detail.jpg'
    ],
    materials: ['14k White Gold', 'Diamond'],
    features: ['2-in-1 Versatility', 'Floral Stud Design', 'Crescent Jacket', 'Graduated Diamonds'],
    specifications: {
      'Metal Type': '14k White Gold',
      'Total Diamond Weight': '0.75 ct',
      'Stud Diameter': '8mm',
      'Jacket Length': '18mm'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 94,
    tags: ['versatile', 'modern', 'floral']
  },

  // NECKLACES - Station Necklace (single variant)
  {
    id: 'lhn3800a',
    name: 'Diamond Station Chain Necklace',
    price: 1285,
    description: 'Elegant station necklace featuring bezel-set diamonds spaced along a delicate gold chain. Perfect for layering or wearing alone as a sophisticated statement piece.',
    category: 'necklaces',
    subcategory: 'chain',
    images: ['/images/products/LHN3800A.jpg'],
    materials: ['14k Yellow Gold', 'Diamond'],
    features: ['Station Design', 'Bezel Settings', 'Layerable', 'Delicate Chain'],
    specifications: {
      'Chain Length': '16-20 inches adjustable',
      'Diamond Count': '5 stations',
      'Total Diamond Weight': '0.50 ct',
      'Station Spacing': 'Graduated'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 145,
    tags: ['layerable', 'elegant', 'versatile']
  },

  {
    id: 'lhn3881a',
    name: 'Diamond Tennis Necklace',
    price: 2485,
    originalPrice: 2850,
    description: 'Classic tennis necklace featuring a continuous line of round brilliant-cut diamonds. This timeless piece offers effortless elegance for any occasion, from casual to formal.',
    category: 'necklaces',
    subcategory: 'tennis',
    images: ['/images/products/LHN3881A.jpg'],
    materials: ['14k White Gold', 'Diamond'],
    features: ['Tennis Style', 'Continuous Diamonds', 'Secure Clasp', 'Classic Design'],
    specifications: {
      'Chain Length': '16 inches',
      'Diamond Count': '32 stones',
      'Total Diamond Weight': '3.20 ct',
      'Setting': 'Four-prong'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['luxury', 'classic', 'tennis', 'sale']
  },

  // PENDANTS - Single metal color options
  {
    id: 'lhp3779a',
    name: 'Diamond Flower Burst Pendant',
    price: 875,
    description: 'Radiant flower-inspired pendant with petals of brilliant diamonds arranged in a sunburst pattern. This nature-inspired piece captures light beautifully from every angle.',
    category: 'necklaces',
    subcategory: 'pendants',
    images: ['/images/products/LHP3779A.jpg'],
    materials: ['14k Yellow Gold', 'Diamond'],
    features: ['Flower Burst Design', 'Radial Diamond Setting', 'Nature-Inspired', 'Light-Catching'],
    specifications: {
      'Metal Type': '14k Yellow Gold',
      'Diamond Weight': '0.42 ct',
      'Pendant Diameter': '18mm',
      'Design': 'Sunburst Flower'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 85,
    tags: ['floral', 'nature', 'radiant']
  },

  {
    id: 'lhp3838a',
    name: 'Diamond Vertical Bar Pendant',
    price: 655,
    originalPrice: 745,
    description: 'Sleek vertical bar pendant with sophisticated two-tone design. The upper portion features smooth polished gold, while the lower half sparkles with pavé-set diamonds. Perfect for layering or as a standalone statement.',
    category: 'necklaces',
    subcategory: 'pendants',
    images: ['/images/products/LHP3838A.jpg'],
    materials: ['14k Yellow Gold', 'Diamond'],
    features: ['Vertical Bar Design', 'Two-Tone Finish', 'Pavé Lower Section', 'Modern Minimalist'],
    specifications: {
      'Metal Type': '14k Yellow Gold',
      'Diamond Weight': '0.15 ct',
      'Pendant Length': '25mm',
      'Chain Length': '16-18 inches'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['modern', 'minimalist', 'layerable', 'sale']
  },

  {
    id: 'lhp3840a',
    name: 'Pavé Diamond Butterfly Pendant',
    price: 785,
    description: 'Embrace elegance with this exquisite pavé butterfly pendant. Adorned with sparkling round-cut diamonds set in lustrous white gold, this delicate butterfly symbolizes transformation and femininity.',
    category: 'necklaces',
    subcategory: 'pendants',
    images: ['/images/products/LHP3840A.jpg'],
    materials: ['14k White Gold', 'Diamond'],
    features: ['Butterfly Motif', 'Full Pavé Setting', 'Symbolic Design', 'Romantic Style'],
    specifications: {
      'Metal Type': '14k White Gold',
      'Diamond Count': '45-50 stones',
      'Diamond Weight': '0.45 ct',
      'Pendant Size': '18mm wingspan'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    tags: ['romantic', 'symbolic', 'butterfly', 'bestseller']
  }
]



export const categories = [
  { 
    id: 'rings', 
    name: 'Rings', 
    subcategories: ['statement', 'eternity', 'delicate', 'stacking', 'bands'] 
  },
  { 
    id: 'necklaces', 
    name: 'Necklaces', 
    subcategories: ['pendants', 'chain', 'tennis', 'station'] 
  },
  { 
    id: 'earrings', 
    name: 'Earrings', 
    subcategories: ['jackets', 'drops', 'studs', 'hoops'] 
  },
  { 
    id: 'bracelets', 
    name: 'Bracelets', 
    subcategories: ['chain', 'tennis', 'statement', 'vintage'] 
  }
]

export function getProductsByCategory(category: string) {
  return products.filter(product => product.category === category)
}



export function getProductById(id: string) {
  return products.find(product => product.id === id)
}

export function getFeaturedProducts() {
  return products.filter(product => product.tags.includes('bestseller')).slice(0, 6)
}

export function getProductsOnSale() {
  return products.filter(product => product.originalPrice && product.originalPrice > product.price)
}

export function getProductsByPriceRange(minPrice: number, maxPrice: number) {
  return products.filter(product => product.price >= minPrice && product.price <= maxPrice)
}

export function searchProducts(query: string) {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)) ||
    product.materials.some(material => material.toLowerCase().includes(lowercaseQuery))
  )
}

export function getNewArrivals() {
  // Return products with higher IDs as "new arrivals"
  return products.slice(-8)
}

export function getRelatedProducts(productId: string, limit: number = 4) {
  const product = getProductById(productId)
  if (!product) return []
  
  return products
    .filter(p => 
      p.id !== productId && 
      (p.category === product.category || 
       p.tags.some(tag => product.tags.includes(tag)))
    )
    .slice(0, limit)
}

export function getProductsByMaterial(material: string) {
  return products.filter(product => 
    product.materials.some(m => 
      m.toLowerCase().includes(material.toLowerCase())
    )
  )
}

export function getProductStats() {
  return {
    total: products.length,
    categories: {
      rings: getProductsByCategory('rings').length,
      necklaces: getProductsByCategory('necklaces').length,
      earrings: getProductsByCategory('earrings').length,
      bracelets: getProductsByCategory('bracelets').length
    },
    onSale: getProductsOnSale().length,
    priceRange: {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    }
  }
}