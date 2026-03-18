import { ProductGroup } from '@/types/product'
import { createProduct, createSimpleProduct } from '@/utils/productManager'

export const braceletProducts: ProductGroup[] = [
  createProduct({
    id: 'b3406a',
    name: 'Classic Gold Band Bracelet',
    description: 'Timeless elegance meets modern sophistication in this classic gold band bracelet. Crafted with precision and designed for versatility, this sleek piece features a polished finish that catches the light beautifully. Perfect for everyday wear or layering with other pieces, this bracelet transitions seamlessly from day to night.',
    category: 'bracelets',
    subcategory: 'bands',
    basePrice: 485,
    originalPrice: 565,
    variants: [
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'b3406a-rg.jpg', sku: 'B3406A-RG' },
      { name: 'White Gold', metal: '14k White Gold', image: 'b3406a-wg.jpg', sku: 'B3406A-WG' },
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'b3406a-yg.jpg', sku: 'B3406A-YG' }
    ],
    tags: ['classic', 'stackable', 'versatile'],
    featured: false,
    bestseller: true
  }),

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
