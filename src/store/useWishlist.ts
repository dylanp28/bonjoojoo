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
  toggleItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isWishlisted: (id: string) => boolean
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

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
    }),
    {
      name: 'bonjoojoo-wishlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
