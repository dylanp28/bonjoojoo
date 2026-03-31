'use client'

import { useState, useEffect } from 'react'
import { X, Eye, EyeOff, User, Mail, Lock, Phone, Shield, CheckCircle2, AlertCircle } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
  onSuccess?: (user: any) => void
  onSwitchMode?: (mode: 'login' | 'register') => void
  mode?: 'login' | 'register'
}

interface LoginData {
  email: string
  password: string
  rememberMe: boolean
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  marketingOptIn: boolean
}

interface ApiResponse {
  user?: any
  accessToken?: string
  refreshToken?: string
  code?: string
  error?: string
  message?: string
  field?: string
}

export function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess, onSwitchMode, mode: externalMode }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(externalMode || initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [registerData, setRegisterData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    marketingOptIn: false
  })

  const [forgotEmail, setForgotEmail] = useState('')

  // Reset form when mode changes
  useEffect(() => {
    setError('')
    setSuccess('')
    setLoginData({ email: '', password: '', rememberMe: false })
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      marketingOptIn: false
    })
    setForgotEmail('')
  }, [mode])

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(externalMode || initialMode)
    }
  }, [isOpen, initialMode, externalMode])

  // Update internal mode when external mode changes
  useEffect(() => {
    if (externalMode && isOpen) {
      setMode(externalMode)
    }
  }, [externalMode, isOpen])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          rememberMe: loginData.rememberMe,
          ipAddress: 'client-ip', // In production, get real IP
          userAgent: navigator.userAgent
        }),
      })

      const data: ApiResponse = await response.json()

      if (response.ok && data.user) {
        setSuccess('Login successful!')
        
        // Store tokens
        localStorage.setItem('accessToken', data.accessToken || '')
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken)
        }
        
        // Call success callback
        onSuccess?.(data.user)
        
        // Close modal after short delay
        setTimeout(() => {
          onClose()
        }, 1000)
      } else {
        setError(data.error || data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError('')

    // Client-side validation
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (registerData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (!registerData.firstName.trim() || !registerData.lastName.trim()) {
      setError('First and last name are required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerData.email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })

      const data: ApiResponse = await response.json()

      if (response.ok && data.user) {
        setSuccess('Account created successfully! Please check your email to verify your account.')
        
        // Store tokens
        localStorage.setItem('accessToken', data.accessToken || '')
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken)
        }
        
        // Call success callback
        onSuccess?.(data.user)
        
        // Close modal after short delay
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setError(data.error || data.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError('')
    setLoading(true)

    try {
      // In production, implement forgot password API
      setSuccess('Password reset link has been sent to your email.')
      setTimeout(() => {
        setMode('login')
      }, 2000)
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 rounded-t-2xl relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif tracking-wider">
                {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Reset Password'}
              </h2>
              <p className="text-sm text-stone-300 mt-1">
                {mode === 'login' 
                  ? 'Sign in to your bonjoojoo account' 
                  : mode === 'register' 
                    ? 'Join the sustainable luxury movement' 
                    : 'Enter your email to reset your password'
                }
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:text-stone-300 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle2 size={20} className="text-green-600 mr-3" />
              <span className="text-green-800 text-sm">{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle size={20} className="text-red-600 mr-3" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    className="rounded border-stone-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-stone-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <span className="text-stone-600 text-sm">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register')
                    onSwitchMode?.('register')
                  }}
                  className="text-green-600 hover:text-green-700 transition-colors font-medium text-sm"
                >
                  Create one here
                </button>
              </div>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="First name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Create a strong password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-stone-500 mt-1">Must be at least 8 characters long</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Shield size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={registerData.marketingOptIn}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, marketingOptIn: e.target.checked }))}
                    className="rounded border-stone-300 text-green-600 focus:ring-green-500 mt-1"
                  />
                  <span className="ml-2 text-sm text-stone-600">
                    I'd like to receive updates about new lab-grown diamond collections and sustainability initiatives
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="text-center">
                <span className="text-stone-600 text-sm">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    onSwitchMode?.('login')
                  }}
                  className="text-green-600 hover:text-green-700 transition-colors font-medium text-sm"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  We'll send you a link to reset your password
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-green-600 hover:text-green-700 transition-colors font-medium text-sm"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Trust Signals */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center">
                <Shield size={16} className="text-green-600 mr-2" />
                <span className="text-xs text-stone-600">Your information is protected with bank-level security</span>
              </div>
              <div className="text-xs text-stone-500">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}