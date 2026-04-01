'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category?: string
}

interface WishlistState {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  toggleItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isWishlisted: (id: string) => boolean
  isInWishlist: (id: string) => boolean
  getWishlist: () => WishlistItem[]
  count: () => number
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item: WishlistItem) => {
        const { items } = get()
        if (!items.find(i => i.id === item.id)) {
          set({ items: [...items, item] })
        }
      },

      removeFromWishlist: (id: string) => {
        set({ items: get().items.filter(i => i.id !== id) })
      },

      toggleItem: (item: WishlistItem) => {
        const { items } = get()
        const exists = items.find(i => i.id === item.id)
        if (exists) {
          set({ items: items.filter(i => i.id !== item.id) })
        } else {
          set({ items: [...items, item] })
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter(i => i.id !== id) })
      },

      isWishlisted: (id: string) => {
        return get().items.some(i => i.id === id)
      },

      isInWishlist: (id: string) => {
        return get().items.some(i => i.id === id)
      },

      getWishlist: () => {
        return get().items
      },

      count: () => {
        return get().items.length
      },
    }),
    {
      name: 'bonjoojoo-wishlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
