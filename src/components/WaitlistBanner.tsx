'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle } from 'lucide-react'

const BANNER_DISMISSED_KEY = 'bonjoojoo_waitlist_banner_dismissed'

export function WaitlistBanner() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(47)

  useEffect(() => {
    if (sessionStorage.getItem(BANNER_DISMISSED_KEY)) return
    setVisible(true)

    fetch('/api/waitlist')
      .then((r) => r.json())
      .then((d) => { if (d.count) setCount(d.count) })
      .catch(() => {})
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(BANNER_DISMISSED_KEY, '1')
    setVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }
      if (data.count) setCount(data.count)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="relative z-[110] bg-bj-black text-white px-4 py-2.5">
      <div className="container-bj-wide flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        {/* Message */}
        <span className="text-[12px] tracking-[0.08em] font-light flex-shrink-0">
          <span className="text-bj-pink font-medium">Launching soon</span>
          {' '}— get{' '}
          <span className="font-semibold">15% off</span>{' '}your first order
          <span className="hidden sm:inline text-white/50 mx-2">·</span>
          <span className="hidden sm:inline text-white/60 text-[11px]">Join {count} others waiting</span>
        </span>

        {/* Mobile count */}
        <span className="sm:hidden text-white/60 text-[11px]">Join {count} others waiting</span>

        {/* Form */}
        {submitted ? (
          <div className="flex items-center gap-1.5 text-green-400 text-[12px]">
            <CheckCircle size={14} />
            <span>You&apos;re on the list! Use code <strong className="tracking-widest">LAUNCH15</strong> at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-0 flex-shrink-0">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="Your email"
              className="h-[30px] px-3 text-[12px] bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/50 w-[180px]"
              disabled={loading}
            />
            <button
              type="submit"
              className="h-[30px] px-4 bg-bj-pink hover:bg-bj-pink-hover text-white text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors disabled:opacity-60 whitespace-nowrap"
              disabled={loading}
            >
              {loading ? '...' : 'Join'}
            </button>
          </form>
        )}

        {error && <span className="text-red-400 text-[11px]">{error}</span>}
      </div>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={14} />
      </button>
    </div>
  )
}
