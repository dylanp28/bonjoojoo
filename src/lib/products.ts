import { Product, ProductGroup } from '@/types/product'
import { productGroups } from '@/data/productGroups'
import { products as legacyProducts } from '@/data/products'

// Combine all products from different data sources
const getAllProducts = (): Product[] => {
  const products: Product[] = []
  
  // Add products from new grouped structure (MAIN PRODUCTS ONLY, NOT VARIANTS)
  for (const group of productGroups) {
    // Only add the main product entry with default variant
    const defaultVariant = group.variants.find(v => v.id === group.defaultVariant) || group.variants[0]
    products.push({
      id: group.id,
      sku: defaultVariant.sku || group.id.toUpperCase(),
      name: group.name,
      category: group.category,
      subcategory: group.subcategory,
      description: group.description,
      short_description: group.description.substring(0, 150) + '...',
      price: defaultVariant.price || group.basePrice,
      compare_at_price: defaultVariant.originalPrice || group.originalPrice,
      images: group.allImages,
      specifications: group.specifications,
      tags: group.tags,
      is_featured: group.featured || false,
      is_bestseller: group.bestseller || false,
      rating: group.rating,
      reviews: group.reviewCount,
      stock: defaultVariant.inStock ? 10 : 0,
      availability_status: defaultVariant.inStock ? 'in_stock' : 'out_of_stock',
      metal: defaultVariant.metal,
      variants: group.variants,
      isGrouped: true
    })
  }
  
  // Add legacy products (for backward compatibility) - only those NOT in groups
  const groupIds = new Set(productGroups.map(g => g.id))
  products.push(...legacyProducts.filter(p => !groupIds.has(p.id)).map(p => ({
    id: p.id,
    sku: p.id.toUpperCase(),
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    description: p.description,
    short_description: p.description.substring(0, 150) + '...',
    price: p.price,
    compare_at_price: p.originalPrice,
    images: p.images,
    specifications: p.specifications,
    tags: p.tags,
    is_featured: p.tags?.includes('featured') || false,
    is_bestseller: p.tags?.includes('bestseller') || false,
    rating: p.rating,
    reviews: p.reviewCount,
    stock: p.inStock ? 10 : 0,
    availability_status: p.inStock ? 'in_stock' : 'out_of_stock',
    metal: p.materials?.find(m => m.includes('Gold')) || undefined,
    diamond: p.materials?.includes('Diamond') ? { present: true } : undefined
  })))
  
  return products
}

export const searchProducts = (params: {
  query?: string
  category?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  bestseller?: boolean
}) => {
  let products = getAllProducts()
  
  // Filter by query
  if (params.query) {
    const query = params.query.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  
  // Filter by category
  if (params.category) {
    products = products.filter(p => p.category === params.category)
  }
  
  // Filter by price range
  if (params.minPrice !== undefined) {
    products = products.filter(p => p.price >= params.minPrice!)
  }
  if (params.maxPrice !== undefined) {
    products = products.filter(p => p.price <= params.maxPrice!)
  }
  
  // Filter by stock
  if (params.inStock) {
    products = products.filter(p => p.availability_status !== 'out_of_stock')
  }
  
  // Filter by featured
  if (params.featured) {
    products = products.filter(p => p.is_featured)
  }
  
  // Filter by bestseller
  if (params.bestseller) {
    products = products.filter(p => p.is_bestseller)
  }
  
  // Sort products
  if (params.sortBy) {
    products.sort((a, b) => {
      let aValue: any
      let bValue: any
      
      switch (params.sortBy) {
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'rating':
          aValue = a.rating || 0
          bValue = b.rating || 0
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }
      
      if (params.sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1
      } else {
        return aValue < bValue ? -1 : 1
      }
    })
  }
  
  // Apply limit
  if (params.limit) {
    products = products.slice(0, params.limit)
  }
  
  return {
    products,
    total: products.length,
    page: 1,
    totalPages: 1,
    hasMore: false
  }
}

export const getProductById = (id: string): Product | null => {
  const products = getAllProducts()
  return products.find(p => p.id === id) || null
}

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId)
  if (!product) return []
  
  const products = getAllProducts()
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit)
}

export const getCategories = () => {
  const products = getAllProducts()
  const categories = Array.from(new Set(products.map(p => p.category)))
  return categories.map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
    count: products.filter(p => p.category === category).length
  }))
}

// Product group-specific functions
export const getProductGroupById = (id: string): ProductGroup | null => {
  return productGroups.find(g => g.id === id) || null
}

export const getProductWithVariants = (id: string): Product | null => {
  // First check if it's a group ID
  const group = getProductGroupById(id)
  if (group) {
    const defaultVariant = group.variants.find(v => v.id === group.defaultVariant) || group.variants[0]
    return {
      id: group.id,
      sku: defaultVariant.sku || group.id.toUpperCase(),
      name: group.name,
      category: group.category,
      subcategory: group.subcategory,
      description: group.description,
      short_description: group.description.substring(0, 150) + '...',
      price: defaultVariant.price || group.basePrice,
      compare_at_price: defaultVariant.originalPrice || group.originalPrice,
      images: group.allImages,
      specifications: group.specifications,
      tags: group.tags,
      is_featured: group.tags?.includes('bestseller') || false,
      is_bestseller: group.tags?.includes('bestseller') || false,
      rating: group.rating,
      reviews: group.reviewCount,
      stock: defaultVariant.inStock ? 10 : 0,
      availability_status: defaultVariant.inStock ? 'in_stock' : 'out_of_stock',
      metal: defaultVariant.metal,
      variants: group.variants,
      isGrouped: true
    }
  }
  
  // Fall back to regular product lookup
  return getProductById(id)
}

export const getVariantById = (groupId: string, variantId: string) => {
  const group = getProductGroupById(groupId)
  if (!group) return null
  
  return group.variants.find(v => v.id === variantId) || null
}