import { ProductGroup, ProductVariant } from '@/types/product'

export interface ProductInput {
  id: string
  name: string
  description: string
  category: 'rings' | 'earrings' | 'necklaces' | 'bracelets'
  subcategory: string
  basePrice: number
  originalPrice?: number
  
  // Variants can be simple (single image) or complex (multiple metals)
  variants: {
    name: string
    metal: string
    image: string // filename like 'LHBD3782A.jpg'
    sku: string
    inStock?: boolean
  }[]
  
  // Optional metadata
  tags?: string[]
  featured?: boolean
  bestseller?: boolean
}

/**
 * Convert a simple ProductInput into a full ProductGroup
 * Handles image paths, default variants, etc. automatically
 */
export function createProduct(input: ProductInput): ProductGroup {
  const variants: ProductVariant[] = input.variants.map((v, index) => ({
    id: `${input.id}-${index}`,
    name: v.name,
    metal: v.metal,
    images: [`/images/products/${v.image}`],
    inStock: v.inStock ?? true,
    sku: v.sku
  }))

  // Collect all images from variants
  const allImages = variants.flatMap(v => v.images)

  return {
    id: input.id,
    name: input.name,
    description: input.description,
    category: input.category,
    subcategory: input.subcategory,
    basePrice: input.basePrice,
    originalPrice: input.originalPrice,
    defaultVariant: variants[0].id,
    variants,
    tags: input.tags || [],
    featured: input.featured || false,
    bestseller: input.bestseller || false,
    materials: variants.map(v => v.metal),
    features: [],
    specifications: {},
    allImages
  }
}

/**
 * Quick helper to add a single-variant product
 */
export function createSimpleProduct(
  id: string,
  name: string,
  description: string,
  category: 'rings' | 'earrings' | 'necklaces' | 'bracelets',
  price: number,
  image: string,
  sku: string,
  metal: string = '14k Yellow Gold'
): ProductGroup {
  return createProduct({
    id,
    name,
    description,
    category,
    subcategory: 'classic',
    basePrice: price,
    variants: [{
      name: metal.includes('14k') ? metal.split(' ')[1] + ' Gold' : metal,
      metal,
      image,
      sku,
    }]
  })
}

// Example usage:
// const ring = createProduct({
//   id: 'lhbd3782a',
//   name: 'Diamond Filigree Wide Band Ring',
//   description: 'Beautiful filigree ring with diamonds',
//   category: 'rings',
//   subcategory: 'statement',
//   basePrice: 1285,
//   originalPrice: 1450,
//   variants: [
//     { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHBD3782A.jpg', sku: 'LHBD3782A' },
//     { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHBD3782A-R.jpg', sku: 'LHBD3782A-R' }
//   ],
//   tags: ['bestseller', 'sale'],
//   featured: true
// })