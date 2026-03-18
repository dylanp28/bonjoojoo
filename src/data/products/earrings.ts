import { ProductGroup } from '@/types/product'
import { createProduct, createSimpleProduct } from '@/utils/productManager'

export const earringProducts: ProductGroup[] = [
  createProduct({
    id: 'lhe3781a',
    name: 'Diamond Drop Earrings',
    description: 'Stunning drop earrings featuring brilliant lab-grown diamonds in an elegant cascade design. These sophisticated pieces catch the light beautifully with every movement, creating captivating sparkle that elevates any look. Perfect for special occasions or adding glamour to everyday wear.',
    category: 'earrings',
    subcategory: 'drops',
    basePrice: 885,
    originalPrice: 1025,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHE3781A.jpg', sku: 'LHE3781A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHE3781A-R.jpg', sku: 'LHE3781A-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHE3781A-Y.jpg', sku: 'LHE3781A-Y' }
    ],
    tags: ['diamond', 'drop', 'elegant', 'luxury', 'sale'],
    featured: true,
    bestseller: false
  }),

  createProduct({
    id: 'lhe3822a',
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings featuring brilliant lab-grown diamonds in timeless settings. These versatile essentials offer effortless elegance for every occasion, from casual everyday wear to formal events. The perfect foundation piece for any jewelry collection.',
    category: 'earrings',
    subcategory: 'studs',
    basePrice: 585,
    originalPrice: 675,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHE3822A-Y.jpg', sku: 'LHE3822A-Y' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHE3822A-R.jpg', sku: 'LHE3822A-R' }
    ],
    tags: ['diamond', 'studs', 'classic', 'everyday', 'sale'],
    featured: false,
    bestseller: true
  }),
]
