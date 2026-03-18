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
}

// PRODUCTS CLEARED - Using productGroups.ts instead
export const products: Product[] = [
  // All products moved to productGroups.ts
  // Use the productManager utility to add new products
]