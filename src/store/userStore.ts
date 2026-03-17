import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  emailVerified: boolean
  phoneVerified: boolean
  twoFactorEnabled: boolean
  marketingOptIn: boolean
  addresses: any[]
  accountStatus: 'active' | 'pending_verification' | 'suspended'
  vipStatus: 'standard' | 'silver' | 'gold' | 'platinum' | 'diamond'
  loyaltyPoints: number
  preferredMetal: string[]
  priceRange: [number, number]
  stylePreferences: string[]
  sizePreferences: Record<string, string>
  createdAt: string
  updatedAt: string
  lastActiveAt: string
  lastLoginAt?: string
}

interface UserState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  
  // Actions
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken?: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  refreshAccessToken: () => Promise<boolean>
  
  // Helper methods
  isVIP: () => boolean
  getFullName: () => string
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setUser: (user: User) => {
        set({ 
          user, 
          isAuthenticated: true 
        })
      },

      setTokens: (accessToken: string, refreshToken?: string) => {
        set(state => ({ 
          accessToken,
          refreshToken: refreshToken || state.refreshToken,
          isAuthenticated: !!accessToken
        }))
      },

      logout: async () => {
        const { accessToken } = get()
        
        // Call logout API if we have a token
        if (accessToken) {
          try {
            await fetch('/api/auth/logout', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            })
          } catch (error) {
            console.error('Logout API error:', error)
          }
        }

        // Clear local state
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false
        })

        // Clear localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      },

      updateUser: (updates: Partial<User>) => {
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
      },

      refreshAccessToken: async (): Promise<boolean> => {
        const { refreshToken } = get()
        
        if (!refreshToken) {
          return false
        }

        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken })
          })

          if (response.ok) {
            const data = await response.json()
            
            if (data.accessToken && data.user) {
              set({
                accessToken: data.accessToken,
                user: data.user,
                isAuthenticated: true
              })
              
              localStorage.setItem('accessToken', data.accessToken)
              return true
            }
          }
          
          // If refresh failed, logout
          get().logout()
          return false
        } catch (error) {
          console.error('Token refresh error:', error)
          get().logout()
          return false
        }
      },

      // Helper methods
      isVIP: () => {
        const { user } = get()
        return user ? user.vipStatus !== 'standard' : false
      },

      getFullName: () => {
        const { user } = get()
        return user ? `${user.firstName} ${user.lastName}`.trim() : ''
      }
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist certain fields
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

// Auto-refresh token interceptor
let refreshPromise: Promise<boolean> | null = null

export const withAuthRefresh = async (apiCall: () => Promise<Response>): Promise<Response> => {
  const { accessToken, refreshAccessToken, logout } = useUserStore.getState()
  
  if (!accessToken) {
    throw new Error('No access token available')
  }

  try {
    const response = await apiCall()
    
    // If unauthorized, try to refresh token
    if (response.status === 401) {
      // Prevent multiple simultaneous refresh attempts
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken()
      }
      
      const refreshSuccess = await refreshPromise
      refreshPromise = null
      
      if (refreshSuccess) {
        // Retry the original request with new token
        return await apiCall()
      } else {
        // Refresh failed, user needs to login again
        logout()
        throw new Error('Session expired, please login again')
      }
    }
    
    return response
  } catch (error) {
    refreshPromise = null
    throw error
  }
}

// Helper hook for authenticated API calls
export const useAuthenticatedFetch = () => {
  const { accessToken, refreshAccessToken, logout } = useUserStore()

  const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    if (!accessToken) {
      throw new Error('Not authenticated')
    }

    const authOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }

    return withAuthRefresh(() => fetch(url, authOptions))
  }

  return authFetch
}