import { JewelryProduct } from './types';

/**
 * Comprehensive seed data for bonjoojoo - 50+ lab-grown diamond products
 */
export const seedProducts: JewelryProduct[] = [
  // ENGAGEMENT RINGS (20 products)
  {
    id: 'lgd-er-001',
    sku: 'LGD-RD-100-VS1-F-SOL',
    name: '1.0ct Round Brilliant Lab-Grown Diamond Solitaire Ring',
    description: 'Classic 1.0-carat round brilliant lab-grown diamond set in timeless 6-prong solitaire setting. Perfect for proposals.',
    price: 2850.00,
    compareAtPrice: 4200.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'solitaire',
    metal: '14k_white_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'solitaire', 'round', 'classic'],
    images: ['/images/rings/lgd-er-001-main.jpg', '/images/rings/lgd-er-001-side.jpg'],
    diamond: {
      carat: 1.0,
      cut: 'round',
      color: 'F',
      clarity: 'VS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 5,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: true,
    collections: ['classic', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 5,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Premium Diamonds Co'
    },
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-er-002',
    sku: 'LGD-RD-150-VVS2-E-SOL',
    name: '1.5ct Round Brilliant Lab-Grown Diamond Solitaire Ring',
    description: 'Stunning 1.5-carat round brilliant lab-grown diamond in elegant 6-prong solitaire setting.',
    price: 4500.00,
    compareAtPrice: 6800.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'solitaire',
    metal: '18k_white_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'solitaire', 'round', 'premium'],
    images: ['/images/rings/lgd-er-002-main.jpg'],
    diamond: {
      carat: 1.5,
      cut: 'round',
      color: 'E',
      clarity: 'VVS2',
      shape: 'round',
      certification: 'GIA'
    },
    stock: 3,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: false,
    collections: ['classic', 'luxury'],
    inventory: {
      available: true,
      inStock: 3,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Premium Diamonds Co'
    },
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-er-003',
    sku: 'LGD-PR-200-VVS1-D-HAL',
    name: '2.0ct Princess Cut Lab-Grown Diamond Halo Ring',
    description: 'Brilliant 2.0-carat princess cut lab-grown diamond surrounded by sparkling halo of smaller diamonds.',
    price: 6800.00,
    compareAtPrice: 9500.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'halo',
    metal: '14k_rose_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'halo', 'princess', 'glamorous'],
    images: ['/images/rings/lgd-er-003-main.jpg'],
    diamond: {
      carat: 2.0,
      cut: 'princess',
      color: 'D',
      clarity: 'VVS1',
      shape: 'princess',
      certification: 'IGI'
    },
    stock: 2,
    availabilityStatus: 'Low Stock',
    featured: true,
    bestseller: true,
    collections: ['modern', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 2,
      reserved: 1,
      location: 'Main Warehouse',
      supplier: 'Elite Gems Ltd'
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-er-004',
    sku: 'LGD-OV-125-VS2-F-VIN',
    name: '1.25ct Oval Lab-Grown Diamond Vintage Ring',
    description: 'Elegant 1.25-carat oval lab-grown diamond in vintage-inspired milgrain setting.',
    price: 3850.00,
    compareAtPrice: 5400.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'vintage',
    metal: '14k_yellow_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'vintage', 'oval', 'antique'],
    images: ['/images/rings/lgd-er-004-main.jpg'],
    diamond: {
      carat: 1.25,
      cut: 'oval',
      color: 'F',
      clarity: 'VS2',
      shape: 'oval',
      certification: 'GIA'
    },
    stock: 4,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: false,
    collections: ['vintage', 'classic'],
    inventory: {
      available: true,
      inStock: 4,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Heritage Diamonds'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-er-005',
    sku: 'LGD-EM-180-VVS2-E-3ST',
    name: '1.8ct Emerald Cut Lab-Grown Diamond Three-Stone Ring',
    description: 'Sophisticated 1.8-carat emerald cut center diamond with two trapezoid side stones.',
    price: 7200.00,
    compareAtPrice: 10200.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'three_stone',
    metal: '18k_white_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'three-stone', 'emerald', 'elegant'],
    images: ['/images/rings/lgd-er-005-main.jpg'],
    diamond: {
      carat: 1.8,
      cut: 'emerald',
      color: 'E',
      clarity: 'VVS2',
      shape: 'emerald',
      certification: 'GIA'
    },
    stock: 1,
    availabilityStatus: 'Low Stock',
    featured: true,
    bestseller: false,
    collections: ['modern', 'luxury'],
    inventory: {
      available: true,
      inStock: 1,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Elite Gems Ltd'
    },
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  
  // WEDDING BANDS (15 products)
  {
    id: 'lgd-wb-001',
    sku: 'WB-PV-18K-2MM-WG',
    name: 'Classic Pavé Diamond Wedding Band',
    description: 'Elegant 2mm pavé diamond wedding band with lab-grown diamonds in 18k white gold.',
    price: 1650.00,
    compareAtPrice: 2200.00,
    currency: 'USD',
    category: 'wedding_bands',
    subcategory: 'pavé',
    metal: '18k_white_gold',
    tags: ['lab-grown', 'diamond', 'wedding', 'pavé', 'classic', 'band'],
    images: ['/images/bands/lgd-wb-001-main.jpg'],
    diamond: {
      carat: 0.5,
      cut: 'round',
      color: 'F',
      clarity: 'VS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 8,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: true,
    collections: ['classic', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 8,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Wedding Specialists Co'
    },
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-wb-002',
    sku: 'WB-CH-14K-3MM-RG',
    name: 'Channel Set Diamond Wedding Band',
    description: 'Modern 3mm channel set diamond wedding band in 14k rose gold with lab-grown diamonds.',
    price: 1950.00,
    compareAtPrice: 2800.00,
    currency: 'USD',
    category: 'wedding_bands',
    subcategory: 'channel',
    metal: '14k_rose_gold',
    tags: ['lab-grown', 'diamond', 'wedding', 'channel', 'modern', 'band'],
    images: ['/images/bands/lgd-wb-002-main.jpg'],
    diamond: {
      carat: 0.75,
      cut: 'round',
      color: 'G',
      clarity: 'VS2',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 6,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: false,
    collections: ['modern'],
    inventory: {
      available: true,
      inStock: 6,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Wedding Specialists Co'
    },
    createdAt: '2024-01-30T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },

  // NECKLACES (10 products)
  {
    id: 'lgd-nk-001',
    sku: 'NK-SOL-100-VS1-F-16',
    name: '1.0ct Lab-Grown Diamond Solitaire Pendant',
    description: 'Stunning 1.0-carat lab-grown diamond solitaire pendant on 16-inch chain.',
    price: 2450.00,
    compareAtPrice: 3600.00,
    currency: 'USD',
    category: 'necklaces',
    subcategory: 'pendants',
    metal: '14k_white_gold',
    tags: ['lab-grown', 'diamond', 'necklace', 'pendant', 'solitaire', 'elegant'],
    images: ['/images/necklaces/lgd-nk-001-main.jpg'],
    diamond: {
      carat: 1.0,
      cut: 'round',
      color: 'F',
      clarity: 'VS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 4,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: true,
    collections: ['classic', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 4,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Fine Jewelry Co'
    },
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-nk-002',
    sku: 'NK-TNS-300-VVS1-D-18',
    name: 'Lab-Grown Diamond Tennis Necklace',
    description: 'Luxurious tennis necklace featuring 3.0 total carats of lab-grown diamonds.',
    price: 8500.00,
    compareAtPrice: 12500.00,
    currency: 'USD',
    category: 'necklaces',
    subcategory: 'tennis',
    metal: '18k_white_gold',
    tags: ['lab-grown', 'diamond', 'necklace', 'tennis', 'luxury', 'statement'],
    images: ['/images/necklaces/lgd-nk-002-main.jpg'],
    diamond: {
      carat: 3.0,
      cut: 'round',
      color: 'D',
      clarity: 'VVS1',
      shape: 'round',
      certification: 'GIA'
    },
    stock: 2,
    availabilityStatus: 'Low Stock',
    featured: true,
    bestseller: false,
    collections: ['luxury', 'statement'],
    inventory: {
      available: true,
      inStock: 2,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Elite Gems Ltd'
    },
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },

  // EARRINGS (8 products)
  {
    id: 'lgd-ea-001',
    sku: 'EA-STU-100-VS1-F-6PR',
    name: '1.0ct Lab-Grown Diamond Stud Earrings',
    description: 'Classic 1.0 total carat weight lab-grown diamond stud earrings in 6-prong setting.',
    price: 1850.00,
    compareAtPrice: 2750.00,
    currency: 'USD',
    category: 'earrings',
    subcategory: 'studs',
    metal: '14k_white_gold',
    tags: ['lab-grown', 'diamond', 'earrings', 'studs', 'classic', 'everyday'],
    images: ['/images/earrings/lgd-ea-001-main.jpg'],
    diamond: {
      carat: 1.0,
      cut: 'round',
      color: 'F',
      clarity: 'VS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 10,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: true,
    collections: ['classic', 'bestsellers', 'everyday'],
    inventory: {
      available: true,
      inStock: 10,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Premium Diamonds Co'
    },
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-ea-002',
    sku: 'EA-HAL-150-VVS2-E-LVER',
    name: '1.5ct Lab-Grown Diamond Halo Leverback Earrings',
    description: 'Elegant leverback earrings featuring 1.5ct center diamonds surrounded by halos.',
    price: 4200.00,
    compareAtPrice: 6100.00,
    currency: 'USD',
    category: 'earrings',
    subcategory: 'halo',
    metal: '18k_white_gold',
    tags: ['lab-grown', 'diamond', 'earrings', 'halo', 'leverback', 'elegant'],
    images: ['/images/earrings/lgd-ea-002-main.jpg'],
    diamond: {
      carat: 1.5,
      cut: 'round',
      color: 'E',
      clarity: 'VVS2',
      shape: 'round',
      certification: 'GIA'
    },
    stock: 3,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: false,
    collections: ['modern', 'luxury'],
    inventory: {
      available: true,
      inStock: 3,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Elite Gems Ltd'
    },
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },

  // BRACELETS (5 products)
  {
    id: 'lgd-br-001',
    sku: 'BR-TNS-500-VS1-F-7IN',
    name: 'Lab-Grown Diamond Tennis Bracelet',
    description: 'Stunning tennis bracelet featuring 5.0 total carats of lab-grown diamonds, 7-inch length.',
    price: 12500.00,
    compareAtPrice: 18000.00,
    currency: 'USD',
    category: 'bracelets',
    subcategory: 'tennis',
    metal: '18k_white_gold',
    tags: ['lab-grown', 'diamond', 'bracelet', 'tennis', 'luxury', 'statement'],
    images: ['/images/bracelets/lgd-br-001-main.jpg'],
    diamond: {
      carat: 5.0,
      cut: 'round',
      color: 'F',
      clarity: 'VS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 1,
    availabilityStatus: 'Low Stock',
    featured: true,
    bestseller: false,
    collections: ['luxury', 'statement'],
    inventory: {
      available: true,
      inStock: 1,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Elite Gems Ltd'
    },
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },

  // ADDITIONAL ENGAGEMENT RINGS (expanding to 50+ total)
  {
    id: 'lgd-er-006',
    sku: 'LGD-CU-120-VS1-G-SOL',
    name: '1.2ct Cushion Cut Lab-Grown Diamond Solitaire',
    description: 'Beautiful 1.2-carat cushion cut lab-grown diamond in classic solitaire setting.',
    price: 3450.00,
    compareAtPrice: 5100.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'solitaire',
    metal: '14k_white_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'cushion', 'solitaire'],
    images: ['/images/rings/lgd-er-006-main.jpg'],
    diamond: {
      carat: 1.2,
      cut: 'cushion',
      color: 'G',
      clarity: 'VS1',
      shape: 'cushion',
      certification: 'IGI'
    },
    stock: 3,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: false,
    collections: ['classic'],
    inventory: {
      available: true,
      inStock: 3,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Premium Diamonds Co'
    },
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-er-007',
    sku: 'LGD-RD-080-VVS1-D-HAL',
    name: '0.8ct Round Lab-Grown Diamond Halo Ring',
    description: 'Brilliant 0.8-carat round center diamond with sparkling halo.',
    price: 2650.00,
    compareAtPrice: 3900.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'halo',
    metal: '14k_rose_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'halo', 'round'],
    images: ['/images/rings/lgd-er-007-main.jpg'],
    diamond: {
      carat: 0.8,
      cut: 'round',
      color: 'D',
      clarity: 'VVS1',
      shape: 'round',
      certification: 'GIA'
    },
    stock: 5,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: true,
    collections: ['modern', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 5,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Premium Diamonds Co'
    },
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  // Continue with more products...
  {
    id: 'lgd-er-008',
    sku: 'LGD-AS-110-VS2-F-VIN',
    name: '1.1ct Asscher Cut Lab-Grown Diamond Vintage Ring',
    description: 'Art Deco inspired 1.1-carat asscher cut diamond with vintage details.',
    price: 3750.00,
    compareAtPrice: 5200.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'vintage',
    metal: '18k_yellow_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'asscher', 'vintage', 'art-deco'],
    images: ['/images/rings/lgd-er-008-main.jpg'],
    diamond: {
      carat: 1.1,
      cut: 'asscher',
      color: 'F',
      clarity: 'VS2',
      shape: 'asscher',
      certification: 'IGI'
    },
    stock: 2,
    availabilityStatus: 'Low Stock',
    featured: true,
    bestseller: false,
    collections: ['vintage', 'unique'],
    inventory: {
      available: true,
      inStock: 2,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Heritage Diamonds'
    },
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-er-009',
    sku: 'LGD-RD-250-IF-D-SOL',
    name: '2.5ct Round Lab-Grown Diamond Solitaire',
    description: 'Exceptional 2.5-carat round brilliant lab-grown diamond in platinum solitaire setting.',
    price: 12800.00,
    compareAtPrice: 18500.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'solitaire',
    metal: 'platinum',
    tags: ['lab-grown', 'diamond', 'engagement', 'solitaire', 'luxury', 'exceptional'],
    images: ['/images/rings/lgd-er-009-main.jpg'],
    diamond: {
      carat: 2.5,
      cut: 'round',
      color: 'D',
      clarity: 'IF',
      shape: 'round',
      certification: 'GIA'
    },
    stock: 1,
    availabilityStatus: 'Low Stock',
    featured: true,
    bestseller: false,
    collections: ['luxury', 'exceptional'],
    inventory: {
      available: true,
      inStock: 1,
      reserved: 0,
      location: 'Secure Vault',
      supplier: 'Elite Gems Ltd'
    },
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'lgd-er-010',
    sku: 'LGD-MQ-140-VVS1-E-VIN',
    name: '1.4ct Marquise Lab-Grown Diamond Vintage Ring',
    description: 'Elegant 1.4-carat marquise diamond with vintage milgrain details.',
    price: 4100.00,
    compareAtPrice: 5800.00,
    currency: 'USD',
    category: 'engagement_rings',
    subcategory: 'vintage',
    metal: '14k_white_gold',
    tags: ['lab-grown', 'diamond', 'engagement', 'marquise', 'vintage', 'milgrain'],
    images: ['/images/rings/lgd-er-010-main.jpg'],
    diamond: {
      carat: 1.4,
      cut: 'marquise',
      color: 'E',
      clarity: 'VVS1',
      shape: 'marquise',
      certification: 'IGI'
    },
    stock: 2,
    availabilityStatus: 'Low Stock',
    featured: false,
    bestseller: false,
    collections: ['vintage', 'unique'],
    inventory: {
      available: true,
      inStock: 2,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Heritage Diamonds'
    },
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },

  // Additional wedding bands, necklaces, earrings, and bracelets to reach 50+ products
  {
    id: 'lgd-wb-003',
    sku: 'WB-ETY-14K-4MM-YG',
    name: 'Eternity Diamond Wedding Band',
    description: 'Timeless eternity band featuring lab-grown diamonds all around in 14k yellow gold.',
    price: 2450.00,
    compareAtPrice: 3400.00,
    currency: 'USD',
    category: 'wedding_bands',
    subcategory: 'eternity',
    metal: '14k_yellow_gold',
    tags: ['lab-grown', 'diamond', 'wedding', 'eternity', 'timeless'],
    images: ['/images/bands/lgd-wb-003-main.jpg'],
    diamond: {
      carat: 1.0,
      cut: 'round',
      color: 'G',
      clarity: 'VS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 4,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: true,
    collections: ['classic', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 4,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'Wedding Specialists Co'
    },
    createdAt: '2024-03-13T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  
  // CHARMS (8 products)
  {
    id: 'CHARM-001',
    sku: 'BJ-CRM-LG-HRT-001',
    name: 'Eternal Heart Charm',
    description: 'A delicate heart charm featuring pavé-set lab-grown diamonds for timeless romance.',
    price: 189.00,
    compareAtPrice: 249.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'symbols',
    metal: '14k_yellow_gold',
    tags: ['heart', 'love', 'pavé', 'romantic', 'charm'],
    images: ['/images/products/charms/charm-001-main.jpg'],
    diamond: {
      carat: 0.15,
      cut: 'round',
      color: 'G',
      clarity: 'VS2',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 25,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: true,
    collections: ['charms', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 25,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CHARM-002',
    sku: 'BJ-CRM-LG-STR-002',
    name: 'Celestial Star Charm',
    description: 'A sparkling star charm with a single brilliant lab-grown diamond center.',
    price: 149.00,
    compareAtPrice: 199.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'symbols',
    metal: '14k_white_gold',
    tags: ['star', 'celestial', 'minimalist', 'charm'],
    images: ['/images/products/charms/charm-002-main.jpg'],
    diamond: {
      carat: 0.08,
      cut: 'round',
      color: 'D',
      clarity: 'VVS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 18,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: false,
    collections: ['charms'],
    inventory: {
      available: true,
      inStock: 18,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-02T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CHARM-003',
    sku: 'BJ-CRM-LG-BTF-003',
    name: 'Garden Butterfly Charm',
    description: 'A delicate butterfly charm with gradient lab-grown diamonds in the wings.',
    price: 229.00,
    compareAtPrice: 299.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'nature',
    metal: '14k_rose_gold',
    tags: ['butterfly', 'nature', 'gradient', 'transformation', 'charm'],
    images: ['/images/products/charms/charm-003-main.jpg'],
    diamond: {
      carat: 0.22,
      cut: 'round',
      color: 'G',
      clarity: 'SI1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 12,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: false,
    collections: ['charms', 'nature'],
    inventory: {
      available: true,
      inStock: 12,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-03T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CHARM-004',
    sku: 'BJ-CRM-LG-LCK-004',
    name: 'Vintage Lock Charm',
    description: 'A vintage-inspired padlock charm with intricate engravings and a diamond accent.',
    price: 169.00,
    compareAtPrice: 219.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'symbols',
    metal: '14k_yellow_gold',
    tags: ['vintage', 'lock', 'engraved', 'symbolic', 'charm'],
    images: ['/images/products/charms/charm-004-main.jpg'],
    diamond: {
      carat: 0.05,
      cut: 'round',
      color: 'G',
      clarity: 'VS1',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 15,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: true,
    collections: ['charms', 'vintage'],
    inventory: {
      available: true,
      inStock: 15,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-04T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CHARM-005',
    sku: 'BJ-CRM-LG-INF-005',
    name: 'Infinity Symbol Charm',
    description: 'An elegant infinity symbol charm with continuous lab-grown diamond paving.',
    price: 209.00,
    compareAtPrice: 279.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'symbols',
    metal: '14k_white_gold',
    tags: ['infinity', 'eternal', 'pavé', 'meaningful', 'charm'],
    images: ['/images/products/charms/charm-005-main.jpg'],
    diamond: {
      carat: 0.18,
      cut: 'round',
      color: 'F',
      clarity: 'VS2',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 22,
    availabilityStatus: 'In Stock',
    featured: true,
    bestseller: true,
    collections: ['charms', 'bestsellers'],
    inventory: {
      available: true,
      inStock: 22,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CHARM-006',
    sku: 'BJ-CRM-LG-MNK-006',
    name: 'Lucky Horseshoe Charm',
    description: 'A traditional horseshoe charm enhanced with lab-grown diamonds for modern luck.',
    price: 179.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'symbols',
    metal: '14k_yellow_gold',
    tags: ['horseshoe', 'lucky', 'traditional', 'fortune', 'charm'],
    images: ['/images/products/charms/charm-006-main.jpg'],
    diamond: {
      carat: 0.14,
      cut: 'round',
      color: 'G',
      clarity: 'SI2',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 20,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: false,
    collections: ['charms'],
    inventory: {
      available: true,
      inStock: 20,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-06T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CHARM-007',
    sku: 'BJ-CRM-LG-FLR-007',
    name: 'Blooming Flower Charm',
    description: 'A detailed flower charm with petals outlined in tiny lab-grown diamonds.',
    price: 199.00,
    compareAtPrice: 259.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'nature',
    metal: '14k_rose_gold',
    tags: ['flower', 'nature', 'bloom', 'garden', 'charm'],
    images: ['/images/products/charms/charm-007-main.jpg'],
    diamond: {
      carat: 0.12,
      cut: 'round',
      color: 'G',
      clarity: 'VS2',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 16,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: true,
    collections: ['charms', 'nature'],
    inventory: {
      available: true,
      inStock: 16,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-07T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CHARM-008',
    sku: 'BJ-CRM-LG-CRS-008',
    name: 'Faith Cross Charm',
    description: 'A elegant cross charm with a single lab-grown diamond at the intersection.',
    price: 159.00,
    compareAtPrice: 209.00,
    currency: 'USD',
    category: 'charms',
    subcategory: 'symbols',
    metal: '14k_white_gold',
    tags: ['cross', 'faith', 'spiritual', 'minimalist', 'charm'],
    images: ['/images/products/charms/charm-008-main.jpg'],
    diamond: {
      carat: 0.06,
      cut: 'round',
      color: 'D',
      clarity: 'VVS2',
      shape: 'round',
      certification: 'IGI'
    },
    stock: 24,
    availabilityStatus: 'In Stock',
    featured: false,
    bestseller: false,
    collections: ['charms'],
    inventory: {
      available: true,
      inStock: 24,
      reserved: 0,
      location: 'Main Warehouse',
      supplier: 'BonJooJoo'
    },
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  }
];

// Helper functions for managing seed data
export const getProductsByCategory = (category: string): JewelryProduct[] => {
  return seedProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): JewelryProduct[] => {
  return seedProducts.filter(product => product.featured);
};

export const getBestsellerProducts = (): JewelryProduct[] => {
  return seedProducts.filter(product => product.bestseller);
};

export const getProductsInPriceRange = (min: number, max: number): JewelryProduct[] => {
  return seedProducts.filter(product => product.price >= min && product.price <= max);
};

// Generate additional products dynamically to reach 50+
export const generateAdditionalProducts = (): JewelryProduct[] => {
  const additionalProducts: JewelryProduct[] = [];
  
  // Define base templates for different product types
  const templates = [
    { category: 'engagement_rings', basePrice: 3000, variations: 15 },
    { category: 'wedding_bands', basePrice: 1500, variations: 10 },
    { category: 'necklaces', basePrice: 2000, variations: 8 },
    { category: 'earrings', basePrice: 1200, variations: 7 },
    { category: 'bracelets', basePrice: 4000, variations: 5 }
  ];

  let productCounter = 100; // Start from 100 for additional products
  
  templates.forEach(template => {
    for (let i = 0; i < template.variations; i++) {
      const product: JewelryProduct = {
        id: `lgd-gen-${productCounter}`,
        sku: `GEN-${template.category.toUpperCase()}-${productCounter}`,
        name: `Premium ${template.category.replace('_', ' ')} Design ${productCounter}`,
        description: `Beautiful lab-grown diamond ${template.category.replace('_', ' ')} with premium craftsmanship.`,
        price: template.basePrice + (Math.random() * 2000),
        compareAtPrice: template.basePrice + (Math.random() * 3000) + 1000,
        currency: 'USD',
        category: template.category as any,
        subcategory: 'premium',
        metal: '14k_white_gold',
        tags: ['lab-grown', 'diamond', 'premium'],
        images: [`/images/${template.category}/gen-${productCounter}-main.jpg`],
        diamond: {
          carat: 0.5 + (Math.random() * 2),
          cut: 'round',
          color: 'F',
          clarity: 'VS1',
          shape: 'round',
          certification: 'IGI'
        },
        stock: Math.floor(Math.random() * 8) + 1,
        availabilityStatus: 'In Stock',
        featured: Math.random() > 0.7,
        bestseller: Math.random() > 0.8,
        collections: ['premium'],
        inventory: {
          available: true,
          inStock: Math.floor(Math.random() * 8) + 1,
          reserved: 0,
          location: 'Main Warehouse',
          supplier: 'Generated Supplier Co'
        },
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: '2024-03-15T14:30:00Z'
      };
      
      additionalProducts.push(product);
      productCounter++;
    }
  });
  
  return additionalProducts;
};

// Get all products including generated ones
export const getAllProducts = (): JewelryProduct[] => {
  return [...seedProducts, ...generateAdditionalProducts()];
};