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

export const products: Product[] = [
  // Crown Collection - Romantic Tiara Rings
  {
    id: 'crown-001',
    name: 'Crown Stacking Ring - Rose Gold',
    price: 340,
    originalPrice: 390,
    description: 'Delicate crown-inspired stacking ring featuring scattered diamonds in an organic tiara silhouette. Part of our signature collection celebrating feminine elegance.',
    category: 'rings',
    subcategory: 'stacking',
    images: ['/images/bonjoojoo-1.png'],
    materials: ['14k Rose Gold', 'Diamond'],
    features: ['Crown Design', 'Scattered Diamonds', 'Stackable', 'Milgrain Detail'],
    specifications: {
      'Metal Type': '14k Rose Gold',
      'Diamond Count': '7-9 stones',
      'Diamond Weight': '0.15 ct total',
      'Band Width': '1.5mm',
      'Crown Height': '3-5mm variable'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['bestseller', 'romantic', 'stackable', 'sale']
  },
  {
    id: 'crown-002',
    name: 'Crown Stacking Ring - Yellow Gold',
    price: 340,
    description: 'Classic yellow gold crown ring with delicate diamond placement. Timeless elegance meets whimsical design in this stackable favorite.',
    category: 'rings',
    subcategory: 'stacking',
    images: ['/images/bonjoojoo-1.png'],
    materials: ['14k Yellow Gold', 'Diamond'],
    features: ['Crown Design', 'Scattered Diamonds', 'Stackable', 'Milgrain Detail'],
    specifications: {
      'Metal Type': '14k Yellow Gold',
      'Diamond Count': '7-9 stones',
      'Diamond Weight': '0.15 ct total',
      'Band Width': '1.5mm',
      'Crown Height': '3-5mm variable'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 76,
    tags: ['classic', 'stackable', 'romantic']
  },
  {
    id: 'crown-003',
    name: 'Crown Stacking Ring - White Gold',
    price: 360,
    description: 'Sophisticated white gold crown ring with brilliant diamonds. Modern interpretation of classic romantic jewelry, perfect for everyday elegance.',
    category: 'rings',
    subcategory: 'stacking',
    images: ['/images/bonjoojoo-1.png'],
    materials: ['14k White Gold', 'Diamond'],
    features: ['Crown Design', 'Scattered Diamonds', 'Stackable', 'Milgrain Detail'],
    specifications: {
      'Metal Type': '14k White Gold',
      'Diamond Count': '7-9 stones',
      'Diamond Weight': '0.15 ct total',
      'Band Width': '1.5mm',
      'Crown Height': '3-5mm variable'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 92,
    tags: ['modern', 'stackable', 'sophisticated']
  },

  // Cuff Collection - Asymmetric Beauty
  {
    id: 'cuff-001',
    name: 'Asymmetric Diamond Cuff Ring',
    price: 445,
    description: 'Contemporary open-cuff ring featuring contrasting round brilliant and baguette diamonds. Modern minimalism meets unexpected details.',
    category: 'rings',
    subcategory: 'statement',
    images: ['/images/bonjoojoo-2.png'],
    materials: ['14k Rose Gold', 'Diamond'],
    features: ['Open Cuff Design', 'Asymmetric Settings', 'Mixed Diamond Cuts', 'Minimalist'],
    specifications: {
      'Metal Type': '14k Rose Gold',
      'Round Diamond': '0.10 ct',
      'Baguette Diamond': '0.08 ct',
      'Total Carat Weight': '0.18 ct',
      'Band Width': '1.2mm'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 54,
    tags: ['bestseller', 'modern', 'minimalist']
  },

  // Pavé Collection - Delicate Sparkle
  {
    id: 'pave-001',
    name: 'Pavé Stacking Band - Rose Gold',
    price: 210,
    originalPrice: 240,
    description: 'Ultra-fine pavé stacking band featuring continuous row of brilliant diamonds. Perfect for creating personalized layered looks.',
    category: 'rings',
    subcategory: 'stacking',
    images: ['/images/bonjoojoo-3.png'],
    materials: ['14k Rose Gold', 'Diamond'],
    features: ['Micro Pavé Setting', 'Stackable Design', 'Continuous Sparkle', 'Delicate Proportions'],
    specifications: {
      'Metal Type': '14k Rose Gold',
      'Diamond Count': '18-22 stones',
      'Diamond Weight': '0.25 ct total',
      'Band Width': '1.8mm',
      'Setting': 'Micro Pavé'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 134,
    tags: ['stackable', 'delicate', 'sparkle', 'sale']
  },
  {
    id: 'pave-002',
    name: 'Pavé Stacking Trio Set',
    price: 590,
    originalPrice: 670,
    description: 'Set of three delicate pavé stacking bands designed to be worn together. Create the perfect layered look with this curated trio.',
    category: 'rings',
    subcategory: 'stacking',
    images: ['/images/bonjoojoo-3.png'],
    materials: ['14k Rose Gold', 'Diamond'],
    features: ['Three Band Set', 'Micro Pavé Setting', 'Coordinated Design', 'Gift Box Included'],
    specifications: {
      'Metal Type': '14k Rose Gold',
      'Total Diamond Weight': '0.75 ct',
      'Band Count': '3 bands',
      'Band Width': '1.8mm each',
      'Packaging': 'bonjoojoo Gift Box'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    tags: ['bestseller', 'set', 'stackable', 'sale']
  },

  // Station Collection - Graduated Elegance
  {
    id: 'station-001',
    name: 'Diamond Station Bracelet - Rose Gold',
    price: 375,
    description: 'Diamond station bracelet featuring graduated bezel-set stones on delicate chain. Includes signature bonjoojoo logo charm.',
    category: 'bracelets',
    subcategory: 'chain',
    images: ['/images/bonjoojoo-4.png'],
    materials: ['14k Rose Gold', 'Diamond'],
    features: ['Bezel Set Diamonds', 'Graduated Design', 'Fine Chain Links', 'Signature Logo Charm'],
    specifications: {
      'Metal Type': '14k Rose Gold',
      'Diamond Count': '3 stones',
      'Center Diamond': '0.08 ct',
      'Side Diamonds': '0.05 ct each',
      'Chain Length': '7 inches adjustable'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 92,
    tags: ['elegant', 'bracelet', 'station']
  },
  {
    id: 'station-002',
    name: 'Diamond Station Bracelet - White Gold',
    price: 375,
    description: 'Classic white gold station bracelet with three graduated bezel-set diamonds. Contemporary elegance with signature logo detail.',
    category: 'bracelets',
    subcategory: 'chain',
    images: ['/images/bonjoojoo-5.png'],
    materials: ['14k White Gold', 'Diamond'],
    features: ['Bezel Set Diamonds', 'Graduated Design', 'Fine Chain Links', 'Signature Logo Charm'],
    specifications: {
      'Metal Type': '14k White Gold',
      'Diamond Count': '3 stones',
      'Center Diamond': '0.08 ct',
      'Side Diamonds': '0.05 ct each',
      'Chain Length': '7 inches adjustable'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 78,
    tags: ['elegant', 'bracelet', 'station']
  },

  // Constellation Collection - Celestial Gardens
  {
    id: 'constellation-001',
    name: 'Constellation Ring - Celestial Garden',
    price: 260,
    description: 'Whimsical ring featuring scattered gemstones in constellation patterns. Organic stone placement creates ethereal, celestial beauty.',
    category: 'rings',
    subcategory: 'statement',
    images: ['/images/bonjoojoo-6.png'],
    materials: ['Sterling Silver', 'Mixed Gemstones', 'Opal'],
    features: ['Scattered Gemstones', 'Celestial Design', 'Organic Placement', 'Ethereal Beauty'],
    specifications: {
      'Metal Type': 'Sterling Silver',
      'Center Stone': 'Opal 0.15 ct',
      'Accent Stones': 'Mixed crystals',
      'Stone Count': '6-8 stones',
      'Band Style': 'Organic curved'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 43,
    tags: ['whimsical', 'celestial', 'unique']
  },

  // Complementary Necklaces
  {
    id: 'nec-001',
    name: 'Crown Scattered Necklace',
    price: 425,
    description: 'Delicate chain necklace with scattered diamonds mimicking the crown ring aesthetic. Romantic and whimsical for everyday elegance.',
    category: 'necklaces',
    subcategory: 'delicate',
    images: ['/images/bonjoojoo-1.png'],
    materials: ['14k Gold', 'Diamond'],
    features: ['Scattered Design', 'Delicate Chain', 'Romantic', 'Layerable'],
    specifications: {
      'Chain Length': '16-18 inches adjustable',
      'Diamond Count': '5-7 stones',
      'Total Carat Weight': '0.20 ct',
      'Metal Type': '14k Gold'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
    tags: ['romantic', 'delicate', 'layerable']
  },

  // Complementary Earrings
  {
    id: 'ear-001',
    name: 'Asymmetric Diamond Studs',
    price: 225,
    description: 'Modern twist on classic studs featuring round and baguette diamonds. Contemporary asymmetry inspired by our cuff collection.',
    category: 'earrings',
    subcategory: 'studs',
    images: ['/images/bonjoojoo-2.png'],
    materials: ['14k Gold', 'Diamond'],
    features: ['Asymmetric Design', 'Mixed Cuts', 'Modern', 'Everyday'],
    specifications: {
      'Round Diamond': '0.08 ct each',
      'Baguette Diamond': '0.06 ct each',
      'Total Carat Weight': '0.28 ct',
      'Metal Type': '14k Gold'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    tags: ['modern', 'everyday', 'asymmetric']
  },
  {
    id: 'ear-002',
    name: 'Pavé Huggie Hoops',
    price: 190,
    description: 'Delicate huggie hoops featuring continuous pavé diamonds. Perfect complement to the pavé stacking collection.',
    category: 'earrings',
    subcategory: 'hoops',
    images: ['/images/bonjoojoo-3.png'],
    materials: ['14k Gold', 'Diamond'],
    features: ['Huggie Style', 'Pavé Setting', 'Comfortable Fit', 'Stackable'],
    specifications: {
      'Diameter': '12mm',
      'Diamond Count': '16 stones per earring',
      'Total Carat Weight': '0.32 ct',
      'Closure': 'Hinged huggie'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    tags: ['huggie', 'pavé', 'everyday']
  }
]

export const collections = [
  { 
    id: 'crown', 
    name: 'Crown Collection',
    description: 'Romantic crown-inspired rings with scattered diamonds'
  },
  { 
    id: 'cuff', 
    name: 'Cuff Collection',
    description: 'Contemporary asymmetric cuff rings'
  },
  { 
    id: 'pave', 
    name: 'Pavé Collection',
    description: 'Delicate stackable pavé bands'
  },
  { 
    id: 'station', 
    name: 'Station Collection',
    description: 'Graduated diamond station bracelets'
  },
  { 
    id: 'constellation', 
    name: 'Constellation Collection',
    description: 'Whimsical rings with scattered gemstones'
  }
]

export const categories = [
  { id: 'rings', name: 'Rings', subcategories: ['stacking', 'statement', 'wedding'] },
  { id: 'necklaces', name: 'Necklaces', subcategories: ['delicate', 'statement', 'layering'] },
  { id: 'earrings', name: 'Earrings', subcategories: ['studs', 'hoops', 'climbers'] },
  { id: 'bracelets', name: 'Bracelets', subcategories: ['chain', 'tennis', 'cuff'] }
]

export function getProductsByCategory(category: string) {
  return products.filter(product => product.category === category)
}

export function getProductsByCollection(collectionId: string) {
  return products.filter(product => 
    product.tags.includes(collectionId) || 
    product.id.includes(collectionId)
  )
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