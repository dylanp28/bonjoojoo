'use client'

import { create } from 'zustand'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatState {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  showTicketForm: boolean

  addMessage: (message: ChatMessage) => void
  updateLastAssistantMessage: (content: string) => void
  toggleChat: () => void
  setShowTicketForm: (show: boolean) => void
  setIsLoading: (loading: boolean) => void
}

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  showTicketForm: false,

  addMessage: (message) => {
    set({ messages: [...get().messages, message] })
  },

  updateLastAssistantMessage: (content) => {
    const messages = [...get().messages]
    const lastIndex = messages.length - 1
    if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
      messages[lastIndex] = { ...messages[lastIndex], content }
      set({ messages })
    }
  },

  toggleChat: () => {
    set({ isOpen: !get().isOpen })
  },

  setShowTicketForm: (show) => {
    set({ showTicketForm: show })
  },

  setIsLoading: (loading) => {
    set({ isLoading: loading })
  },
}))
