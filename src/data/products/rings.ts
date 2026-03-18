import { ProductGroup } from '@/types/product'
import { createProduct, createSimpleProduct } from '@/utils/productManager'

export const ringProducts: ProductGroup[] = [
  createProduct({
    id: 'lhbd3782a',
    name: 'Diamond Filigree Wide Band Ring',
    description: 'Stunning wide band ring featuring intricate filigree metalwork with scattered lab-grown diamonds. Each diamond is strategically placed to create maximum sparkle and catch the light beautifully. This statement piece combines traditional craftsmanship with modern luxury, perfect for special occasions or as an elevated everyday essential.',
    category: 'rings',
    subcategory: 'statement',
    basePrice: 1285,
    originalPrice: 1450,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHBD3782A.jpg', sku: 'LHBD3782A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3782A-R.jpg', sku: 'LHBD3782A-R' },
      { name: 'White Gold', metal: '14k White Gold', image: 'LHBD3782A-W.jpg', sku: 'LHBD3782A-W' }
    ],
    tags: ['diamond', 'filigree', 'statement', 'luxury', 'sale'],
    featured: true,
    bestseller: true
  }),

  createProduct({
    id: 'lhbd3783a',
    name: 'Diamond Crown Ring',
    description: 'Elegant crown-inspired ring adorned with brilliant lab-grown diamonds. This romantic piece features a tiara-like silhouette with carefully placed diamonds that catch the light beautifully. The sophisticated design adds regal elegance to any look, perfect for those who appreciate refined luxury with a royal touch.',
    category: 'rings',
    subcategory: 'romantic',
    basePrice: 975,
    originalPrice: 1125,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHBD3783A.jpg', sku: 'LHBD3783A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3783A-R.jpg', sku: 'LHBD3783A-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHBD3783A-Y.jpg', sku: 'LHBD3783A-Y' }
    ],
    tags: ['diamond', 'crown', 'romantic', 'luxury', 'sale'],
    featured: false,
    bestseller: false
  }),

  createProduct({
    id: 'lhbd3784a',
    name: 'Diamond Vintage-Inspired Ring',
    description: 'Exquisite vintage-inspired ring featuring lab-grown diamonds in an intricate setting. This timeless piece combines classic design elements with modern craftsmanship, showcasing brilliant diamonds in a sophisticated arrangement. Perfect for those who appreciate vintage aesthetics with contemporary luxury.',
    category: 'rings',
    subcategory: 'vintage',
    basePrice: 1185,
    originalPrice: 1350,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHBD3784A.jpg', sku: 'LHBD3784A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3784A-R.jpg', sku: 'LHBD3784A-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHBD3784A-Y.jpg', sku: 'LHBD3784A-Y' }
    ],
    tags: ['diamond', 'vintage', 'classic', 'luxury', 'sale'],
    featured: true,
    bestseller: false
  }),

  createProduct({
    id: 'lhbd3785a',
    name: 'Diamond Halo Ring',
    description: 'Stunning halo ring featuring a brilliant center lab-grown diamond surrounded by a sparkling diamond halo. This classic design maximizes sparkle and creates the appearance of a larger center stone. The timeless halo setting offers exceptional brilliance and elegance for any special occasion.',
    category: 'rings',
    subcategory: 'engagement',
    basePrice: 1485,
    originalPrice: 1695,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHBD3785A.jpg', sku: 'LHBD3785A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3785A-R.jpg', sku: 'LHBD3785A-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHBD3785A-Y.jpg', sku: 'LHBD3785A-Y' }
    ],
    tags: ['diamond', 'halo', 'engagement', 'luxury', 'sale'],
    featured: false,
    bestseller: true
  }),

  createProduct({
    id: 'lhbd3786a',
    name: 'Diamond Eternity Ring',
    description: 'Exquisite eternity ring featuring a continuous row of brilliant lab-grown diamonds. This timeless symbol of eternal love showcases matching diamonds set in a seamless band that sparkles from every angle. Perfect as a wedding band, anniversary gift, or elegant everyday piece.',
    category: 'rings',
    subcategory: 'eternity',
    basePrice: 1385,
    originalPrice: 1585,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'lhbd3786a-et.jpg', sku: 'LHBD3786A-ET' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3786A-ET-R.jpg', sku: 'LHBD3786A-ET-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHBD3786A-ET-Y.jpg', sku: 'LHBD3786A-ET-Y' }
    ],
    tags: ['diamond', 'eternity', 'wedding', 'luxury', 'sale'],
    featured: true,
    bestseller: false
  }),

  createProduct({
    id: 'lhbd3787a',
    name: 'Diamond Three-Piece Ring Set',
    description: 'Elegant three-piece stackable ring set featuring lab-grown diamonds in complementary designs. This versatile collection includes coordinating rings that can be worn together for maximum impact or separately for understated elegance. Perfect for those who love layered jewelry and customizable styling options.',
    category: 'rings',
    subcategory: 'sets',
    basePrice: 1785,
    originalPrice: 2050,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHBD3787A.jpg', sku: 'LHBD3787A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3787A-R.jpg', sku: 'LHBD3787A-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHBD3787A-Y.jpg', sku: 'LHBD3787A-Y' }
    ],
    tags: ['diamond', 'set', 'stackable', 'luxury', 'sale'],
    featured: false,
    bestseller: true
  }),

  createProduct({
    id: 'lhbd3788a',
    name: 'Diamond Geometric Ring',
    description: 'Modern geometric ring featuring lab-grown diamonds in a contemporary angular design. This architectural piece showcases clean lines and brilliant diamonds that create stunning light play. Perfect for those who appreciate modern jewelry design with a sophisticated edge.',
    category: 'rings',
    subcategory: 'modern',
    basePrice: 1085,
    originalPrice: 1250,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHBD3788A-Y.jpg', sku: 'LHBD3788A-Y' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3788A-R.jpg', sku: 'LHBD3788A-R' },
      { name: 'White Gold', metal: '14k White Gold', image: 'LHBD3788A-W.jpg', sku: 'LHBD3788A-W' }
    ],
    tags: ['diamond', 'geometric', 'modern', 'luxury', 'sale'],
    featured: true,
    bestseller: false
  }),

  createProduct({
    id: 'lhbd3839a',
    name: 'Diamond Wave Ring',
    description: 'Elegant wave-inspired ring featuring flowing lab-grown diamonds that create a graceful undulating pattern. This organic design captures the beauty of natural movement with sparkling diamonds that seem to flow like water. Available in two distinctive style variations for personalized elegance.',
    category: 'rings',
    subcategory: 'organic',
    basePrice: 1185,
    originalPrice: 1385,
    variants: [
      { name: 'Style 1', metal: '14k Yellow Gold', image: 'LHBD3839A.jpg', sku: 'LHBD3839A' },
      { name: 'Style 2', metal: '14k Yellow Gold', image: 'LHBD3839A-V2.jpg', sku: 'LHBD3839A-V2' }
    ],
    tags: ['diamond', 'wave', 'organic', 'luxury', 'sale'],
    featured: false,
    bestseller: false
  }),
]
