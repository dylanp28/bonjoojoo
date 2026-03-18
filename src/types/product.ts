export interface ProductVariant {
  id: string
  name: string
  metal: string
  price?: number // Optional if different from parent
  originalPrice?: number
  images: string[]
  inStock: boolean
  sku?: string
}

export interface ProductGroup {
  id: string // Base product ID (e.g., 'lhbd3782a')
  name: string
  description: string
  category: string
  subcategory: string
  basePrice: number
  originalPrice?: number
  
  // Style variants (different metals/finishes)
  variants: ProductVariant[]
  defaultVariant: string // ID of default variant to show
  
  // Shared properties
  materials: string[]
  features: string[]
  specifications: {
    [key: string]: string
  }
  rating: number
  reviewCount: number
  tags: string[]
  
  // Product gallery - all images from variants
  allImages: string[]
}

// Legacy product interface for backward compatibility
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  subcategory: string
  images: string[]
  materials: string[]
  features: string[]
  specifications: {
    [key: string]: string
  }
  inStock: boolean
  rating: number
  reviewCount: number
  tags: string[]
  
  // Additional properties for API compatibility
  sku?: string
  short_description?: string
  compare_at_price?: number
  is_featured?: boolean
  is_bestseller?: boolean
  reviews?: number
  stock?: number
  availability_status?: string
  metal?: string
  diamond?: any
}

export interface ProductWithVariants extends Product {
  variants?: ProductVariant[]
  isGrouped?: boolean
  parentId?: string
}