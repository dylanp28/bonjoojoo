import { Product, ProductGroup } from '@/types/product'

// Load products directly from our updated database
import productData from '../../data/product_database.json'

// Load all products from our updated database
const getAllProducts = (): Product[] => {
  return (productData as any).products.map((p: any) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    description: p.description,
    short_description: p.short_description || p.description.substring(0, 150) + '...',
    price: p.price,
    compare_at_price: p.compare_at_price,
    images: p.images,
    specifications: p.specifications || {},
    tags: p.tags || [],
    is_featured: p.tags?.includes('premium') || p.tags?.includes('luxury') || false,
    is_bestseller: p.tags?.includes('bestseller') || p.tags?.includes('luxury') || p.tags?.includes('signature') || false,
    rating: 4.8,
    reviews: 127,
    stock: p.inventory?.quantity || 10,
    availability_status: (p.inventory?.quantity || 10) > 0 ? 'in_stock' : 'out_of_stock',
    metal: '14k Gold',
    variants: ((p as any).variants || []).map((v: any) => ({
      id: v.id,
      name: v.name,
      metal: v.metal,
      price: v.price,
      originalPrice: v.originalPrice,
      images: v.images || [],
      inStock: v.inStock !== false,
      sku: v.sku,
    })),
    isGrouped: false
  }))
}

// Enhanced search functionality
export interface SearchOptions {
  query?: string
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  inStockOnly?: boolean
  featured?: boolean
  bestseller?: boolean
  tags?: string[]
  sortBy?: 'price' | 'name' | 'newest' | 'rating' | 'popular'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

export interface SearchResult {
  products: Product[]
  total: number
  hasMore: boolean
}

export function searchProducts(options: SearchOptions = {}): SearchResult {
  let products = getAllProducts()

  // Apply filters
  if (options.query) {
    const query = options.query.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (options.category) {
    products = products.filter(p => p.category === options.category)
  }

  if (options.subcategory) {
    products = products.filter(p => p.subcategory === options.subcategory)
  }

  if (options.minPrice !== undefined) {
    products = products.filter(p => p.price >= options.minPrice!)
  }

  if (options.maxPrice !== undefined) {
    products = products.filter(p => p.price <= options.maxPrice!)
  }

  if (options.inStockOnly) {
    products = products.filter(p => p.availability_status === 'in_stock')
  }

  if (options.featured) {
    products = products.filter(p => p.is_featured)
  }

  if (options.bestseller) {
    products = products.filter(p => p.is_bestseller)
  }

  if (options.tags && options.tags.length > 0) {
    products = products.filter(p => 
      options.tags!.some(tag => p.tags.includes(tag))
    )
  }

  // Apply sorting
  if (options.sortBy) {
    products.sort((a, b) => {
      let comparison = 0
      switch (options.sortBy) {
        case 'price':
          comparison = a.price - b.price
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0)
          break
        case 'popular': {
          const aScore = (a.is_bestseller ? 100 : 0) + (a.rating || 0)
          const bScore = (b.is_bestseller ? 100 : 0) + (b.rating || 0)
          comparison = bScore - aScore
          break
        }
        case 'newest':
          // Maintain original DB order; no comparison needed
          comparison = 0
          break
        default:
          comparison = 0
      }
      return options.sortOrder === 'desc' ? -comparison : comparison
    })
  }

  const total = products.length
  const offset = options.offset || 0
  const limit = options.limit || products.length

  // Apply pagination
  products = products.slice(offset, offset + limit)

  return {
    products,
    total,
    hasMore: offset + products.length < total
  }
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(p => p.is_featured)
}

export function getBestsellerProducts(): Product[] {
  return getAllProducts().filter(p => p.is_bestseller)
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId)
  if (!product) return []

  return getAllProducts()
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit)
}

// Legacy function for backward compatibility
export function getProductWithVariants(id: string): Product | undefined {
  const product = getProductById(id)
  if (!product) return undefined
  
  // Ensure the product has the expected structure
  return {
    ...product,
    variants: product.variants || [],
    isGrouped: product.isGrouped || false
  }
}

export default getAllProducts