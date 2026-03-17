'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const { loginWithCredentials, register, isAuthenticated } = useAuth()
  const router = useRouter()

  // Get redirect URL from query params
  const [redirectUrl, setRedirectUrl] = useState<string>('/')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const redirect = searchParams.get('redirect')
    if (redirect) {
      setRedirectUrl(redirect)
    }
  }, [])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectUrl)
    }
  }, [isAuthenticated, router, redirectUrl])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (mode === 'register') {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (formData.password.length < 8) {
          throw new Error('Password must be at least 8 characters long')
        }
        if (!formData.acceptTerms) {
          throw new Error('Please accept the terms and conditions')
        }

        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
        
        setMessage({ type: 'success', text: 'Account created successfully! You are now logged in.' })
        
        // Redirect after short delay
        setTimeout(() => {
          router.push(redirectUrl)
        }, 1500)
        
      } else if (mode === 'login') {
        await loginWithCredentials(formData.email, formData.password)
        setMessage({ type: 'success', text: 'Login successful!' })
        
        // Redirect after short delay
        setTimeout(() => {
          router.push(redirectUrl)
        }, 1000)
        
      } else if (mode === 'forgot') {
        // Simulate forgot password
        setMessage({ type: 'success', text: 'Password reset instructions sent to your email!' })
        setTimeout(() => {
          setMode('login')
        }, 2000)
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'An error occurred' 
      })
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="text-stone-600">
              {mode === 'login' && 'Sign in to your bonjoojoo account'}
              {mode === 'register' && 'Join the bonjoojoo community'}
              {mode === 'forgot' && 'Enter your email to reset your password'}
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
              )}
              <span className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {message.text}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Register fields */}
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
                placeholder="john@example.com"
              />
            </div>

            {/* Password */}
            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-12"
                    required
                    minLength={mode === 'register' ? 8 : undefined}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {mode === 'register' && (
                  <p className="text-xs text-stone-500 mt-1">Must be at least 8 characters long</p>
                )}
              </div>
            )}

            {/* Confirm Password */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-12"
                    required
                    minLength={8}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms acceptance */}
            {mode === 'register' && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-green-600 border-stone-300 rounded focus:ring-green-500"
                  required
                />
                <label className="ml-3 text-sm text-stone-600">
                  I accept the{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              ) : (
                <ArrowRight className="w-5 h-5 mr-2" />
              )}
              {mode === 'login' && (loading ? 'Signing In...' : 'Sign In')}
              {mode === 'register' && (loading ? 'Creating Account...' : 'Create Account')}
              {mode === 'forgot' && (loading ? 'Sending...' : 'Send Reset Email')}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center">
            {mode === 'login' && (
              <div className="space-y-2">
                <button
                  onClick={() => setMode('forgot')}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  Forgot your password?
                </button>
                <div className="text-sm text-stone-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Create one here
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div className="text-sm text-stone-600">
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign in here
                </button>
              </div>
            )}

            {mode === 'forgot' && (
              <button
                onClick={() => setMode('login')}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                ← Back to sign in
              </button>
            )}
          </div>

          {/* Guest checkout option */}
          {redirectUrl.includes('/checkout') && mode === 'login' && (
            <div className="mt-6 pt-6 border-t border-stone-200 text-center">
              <p className="text-sm text-stone-600 mb-3">
                Don't want to create an account?
              </p>
              <button
                onClick={() => router.push('/checkout?guest=true')}
                className="text-green-600 hover:text-green-700 font-medium text-sm"
              >
                Continue as Guest
              </button>
            </div>
          )}
        </div>

        {/* Environmental message */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 text-sm">
            🌱 By joining bonjoojoo, you're supporting sustainable luxury and lab-grown diamonds
          </p>
        </div>
      </div>
    </div>
  )
}