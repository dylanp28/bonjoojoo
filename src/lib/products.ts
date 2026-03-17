import productData from '../../data/product_database.json'
import charmsData from '../../data/charms.json'

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  subcategory?: string
  description: string
  short_description?: string
  price: number
  compare_at_price?: number
  images: string[]
  specifications?: any
  tags?: string[]
  is_featured?: boolean
  is_bestseller?: boolean
  rating?: number
  reviews?: number
  stock?: number
  availability_status?: string
  metal?: string
  diamond?: any
}

// Combine all products from different data sources
const getAllProducts = (): Product[] => {
  const products: Product[] = []
  
  // Add products from main database
  if (productData.products) {
    products.push(...productData.products.map(p => ({
      ...p,
      images: p.images || [],
      rating: 4.5 + Math.random() * 0.5, // Generate ratings 4.5-5.0
      reviews: Math.floor(Math.random() * 200) + 10 // Generate review counts 10-209
    })))
  }
  
  // Add charms
  if (charmsData.charms) {
    products.push(...charmsData.charms.map(c => ({
      ...c,
      category: 'charms',
      images: c.images || [],
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 150) + 5
    })))
  }
  
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