import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface RecentlyViewedProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface RecentlyViewedState {
  products: RecentlyViewedProduct[]
  addProduct: (product: RecentlyViewedProduct) => void
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product: RecentlyViewedProduct) =>
        set((state) => ({
          products: [
            product,
            ...state.products.filter((p) => p.id !== product.id),
          ].slice(0, 10),
        })),
    }),
    { name: 'bonjoojoo_recently_viewed' }
  )
)
