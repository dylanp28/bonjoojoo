'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#fff' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#e5a0b0', marginBottom: '16px' }}>500</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 400 }}>
              Something Went Wrong
            </h1>
            <p style={{ color: '#888', marginBottom: '40px' }}>
              A critical error occurred. Our team has been notified.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                style={{ padding: '12px 28px', background: '#1a1a1a', color: '#fff', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{ padding: '12px 28px', border: '1px solid #1a1a1a', color: '#1a1a1a', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}
              >
                Return Home
              </a>
            </div>
            {error.digest && (
              <p style={{ marginTop: '32px', fontSize: '11px', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Reference: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
