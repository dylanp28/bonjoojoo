import { Product } from '@/types/product'

// Load products directly from our updated database
import productData from '../../data/product_database.json'

export const products: Product[] = productData.products.map(p => ({
  id: p.id,
  sku: p.sku,
  name: p.name,
  price: p.price,
  originalPrice: p.compare_at_price,
  description: p.description,
  category: p.category,
  subcategory: p.subcategory,
  images: p.images,
  materials: ['14k Gold', 'Lab-Grown Diamonds'],
  features: ['IGI Certified', 'Ethically Created', 'Lifetime Warranty'],
  specifications: p.specifications || {},
  inStock: true,
  rating: 4.8,
  reviewCount: 127,
  tags: p.tags || []
}))

export default products