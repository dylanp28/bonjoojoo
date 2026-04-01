'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// Removed import for non-existent file

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  engraving?: string
  engravingFont?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: any, options?: { size?: string; engraving?: string; engravingFont?: string }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  
  // Computed
  totalItems: number
  totalPrice: number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, options = {}) => {
        const { items } = get()
        const cartId = `${product.id}-${options.size || 'default'}-${options.engraving || 'none'}-${options.engravingFont || 'none'}`

        const existingItem = items.find(item => item.id === cartId)

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === cartId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          const newItem: CartItem = {
            id: cartId,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '',
            quantity: 1,
            size: options.size,
            engraving: options.engraving,
            engravingFont: options.engravingFont,
          }
          
          set({
            items: [...items, newItem]
          })
        }
      },
      
      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        })
      },
      
      clearCart: () => {
        set({ items: [], isOpen: false })
      },
      
      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },
      
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      get totalPrice() {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'bonjoojoo-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items })
    }
  )
)