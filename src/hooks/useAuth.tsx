'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  loginWithCredentials: (email: string, password: string) => Promise<void>
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  const login = (token: string, userData: User) => {
    localStorage.setItem('accessToken', token)
    setUser(userData)
  }

  const register = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<void> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration failed')
      }

      const data = await response.json()
      
      // Store auth token
      localStorage.setItem('accessToken', data.token)
      
      // Set user data
      setUser(data.user)
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const loginWithCredentials = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Login failed')
      }

      const data = await response.json()
      
      // Store auth token
      localStorage.setItem('accessToken', data.token)
      
      // Set user data
      setUser(data.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    const token = localStorage.getItem('accessToken')
    localStorage.removeItem('accessToken')
    setUser(null)
    
    // Call logout API to invalidate server-side session
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch(() => {
        // Ignore errors on logout
      })
    }
  }

  const refreshUser = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        // Token is invalid
        localStorage.removeItem('accessToken')
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      localStorage.removeItem('accessToken')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize auth state
  useEffect(() => {
    refreshUser()
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    loginWithCredentials,
    register,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook for authentication modal state
export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const openLogin = () => {
    setMode('login')
    setIsOpen(true)
  }

  const openRegister = () => {
    setMode('register')
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode)
  }

  return {
    isOpen,
    mode,
    openLogin,
    openRegister,
    close,
    switchMode
  }
}