import { create } from 'zustand'

interface RecentlyViewedState {
  products: string[]
  addProduct: (id: string) => void
}

export const useRecentlyViewed = create<RecentlyViewedState>((set) => ({
  products: [],
  addProduct: (id: string) =>
    set((state) => ({
      products: [id, ...state.products.filter((p) => p !== id)].slice(0, 10),
    })),
}))
