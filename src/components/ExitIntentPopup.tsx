'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle } from 'lucide-react'

const EXIT_INTENT_KEY = 'bonjoojoo_exit_intent_shown'
const EMAIL_LIST_KEY = 'bonjoojoo_newsletter_emails'

function storeEmail(email: string) {
  try {
    const list = JSON.parse(localStorage.getItem(EMAIL_LIST_KEY) || '[]') as string[]
    if (!list.includes(email)) {
      localStorage.setItem(EMAIL_LIST_KEY, JSON.stringify([...list, email]))
    }
  } catch {}
}

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Desktop only
    if (typeof window === 'undefined' || window.innerWidth < 1024) return
    // Once per session via localStorage flag
    if (localStorage.getItem(EXIT_INTENT_KEY)) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true)
        localStorage.setItem(EXIT_INTENT_KEY, '1')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    storeEmail(trimmed)
    setSubmitted(true)
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
      <div className="relative bg-white max-w-md w-full mx-4 p-10 text-center shadow-overlay">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 p-1.5 text-bj-gray-400 hover:text-bj-black transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Ornamental line */}
        <div className="w-10 h-px bg-bj-rose-gold/50 mx-auto mb-6" />

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
              You're in! Your 10% off code is on its way.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="Enter your email address"
              className="input-bj text-[13px] text-center"
            />
            {error && <p className="text-[12px] text-red-500">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3.5 text-[12px] tracking-[0.12em]">
              Claim My 10% Off
            </button>
          </form>
        )}

        <button
          onClick={() => setVisible(false)}
          className="mt-5 text-[11px] text-bj-gray-400 hover:text-bj-gray-600 transition-colors underline underline-offset-2"
        >
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  )
}
