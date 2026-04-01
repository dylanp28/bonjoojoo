import { ProductGroup } from '@/types/product'
import { createProduct, createSimpleProduct } from '@/utils/productManager'

export const braceletProducts: ProductGroup[] = [

  createProduct({
    id: 'lhb3798a',
    name: 'Diamond Scatter Band Bracelet',
    description: 'Sophisticated bracelet featuring scattered lab-grown diamonds across a polished gold band. Each diamond is carefully positioned to create maximum sparkle and movement. This contemporary piece elevates any look with its modern aesthetic and luxurious feel.',
    category: 'bracelets',
    subcategory: 'diamond',
    basePrice: 895,
    originalPrice: 1050,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHB3798A.jpg', sku: 'LHB3798A' }
    ],
    tags: ['diamond', 'modern', 'luxury', 'sale'],
    featured: true,
    bestseller: true
  }),

  createProduct({
    id: 'lhb3799a',
    name: 'Lab-Grown Diamond Spiral Bracelet',
    description: 'Elegant spiral design bracelet adorned with brilliant lab-grown diamonds that create a continuous flow of light around the wrist. The sophisticated curve adds movement and grace, while the precision-set diamonds provide exceptional sparkle. A stunning statement piece perfect for special occasions.',
    category: 'bracelets',
    subcategory: 'diamond',
    basePrice: 1285,
    originalPrice: 1450,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHB3799A.jpg', sku: 'LHB3799A' }
    ],
    tags: ['diamond', 'statement', 'luxury', 'spiral', 'sale'],
    featured: false,
    bestseller: false
  }),
]
