'use client'

import { useState, useEffect, useRef } from 'react'
import { X, CheckCircle } from 'lucide-react'

const EXIT_INTENT_KEY = 'bonjoojoo_exit_intent_shown'

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(EXIT_INTENT_KEY)) return

    const isDesktop = window.innerWidth >= 1024

    if (isDesktop) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setVisible(true)
          sessionStorage.setItem(EXIT_INTENT_KEY, '1')
        }
      }
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    } else {
      // Mobile: show after 30 seconds
      timerRef.current = setTimeout(() => {
        if (!sessionStorage.getItem(EXIT_INTENT_KEY)) {
          setVisible(true)
          sessionStorage.setItem(EXIT_INTENT_KEY, '1')
        }
      }, 30000)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json()
      setPromoCode(data.promoCode || 'WELCOME10')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal */}
      <div className="relative bg-white max-w-md w-full mx-4 p-10 text-center shadow-overlay border border-bj-black/10">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 p-1.5 text-bj-gray-400 hover:text-bj-black transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Diamond icon */}
        <div className="flex justify-center mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-bj-pink">
            <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <p className="text-overline text-bj-pink mb-3">Before You Go</p>
        <h2 className="font-display text-[30px] font-light text-bj-black mb-3 leading-snug">
          Get 10% Off<br />
          <span className="italic">Your First Order</span>
        </h2>
        <p className="text-[14px] text-bj-gray-500 mb-6 leading-relaxed max-w-[280px] mx-auto">
          Join our list for exclusive offers, new arrivals, and jewelry inspiration.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle size={28} className="text-green-600" />
            <p className="text-[14px] font-medium text-bj-black">
              You&apos;re in! Use code:
            </p>
            <div className="border border-bj-black px-6 py-2 font-mono text-[18px] font-semibold tracking-widest text-bj-black">
              {promoCode}
            </div>
            <p className="text-[12px] text-bj-gray-400 mt-1">10% off your first order</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="Enter your email address"
              className="input-bj text-[13px] text-center"
              disabled={loading}
            />
            {error && <p className="text-[12px] text-red-500">{error}</p>}
            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-[12px] tracking-[0.12em] disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Claiming...' : 'Claim My 10% Off'}
            </button>
          </form>
        )}

        <button
          onClick={() => setVisible(false)}
          className="mt-5 text-[11px] text-bj-gray-400 hover:text-bj-gray-600 transition-colors underline underline-offset-2"
        >
          No thanks, I&apos;ll pay full price
        </button>
      </div>
    </div>
  )
}
