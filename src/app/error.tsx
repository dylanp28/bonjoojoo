'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center max-w-lg mx-auto px-6">
        <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-bj-pink mb-4">500</p>
        <h1 className="font-display text-[2.5rem] tracking-[0.05em] text-bj-black mb-4 uppercase">
          Something Went Wrong
        </h1>
        <p className="text-body text-bj-gray-500 mb-10">
          We encountered an unexpected error. Our team has been notified. Please try again or return to the shop.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Return Home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 text-[11px] text-bj-gray-400 tracking-widest uppercase">
            Error reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
