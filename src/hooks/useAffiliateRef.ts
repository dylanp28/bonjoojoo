'use client'

import { useEffect, useCallback } from 'react'

const AFFILIATE_REF_KEY = 'bonjoojoo_ref'
const EXPIRY_DAYS = 30

interface AffiliateRef {
  code: string
  capturedAt: string
  expiresAt: string
}

/**
 * Captures ?ref=CODE URL parameter and persists to localStorage with 30-day expiry.
 * Use at the layout level so every page load is covered.
 */
export function useAffiliateRefCapture() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (!ref) return

    const now = new Date()
    const expires = new Date(now.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000)

    const data: AffiliateRef = {
      code: ref.toUpperCase().trim(),
      capturedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    }

    try {
      localStorage.setItem(AFFILIATE_REF_KEY, JSON.stringify(data))
    } catch {
      // localStorage unavailable — silently skip
    }
  }, [])
}

/**
 * Returns the active affiliate ref code (if not expired), or null.
 */
export function getAffiliateRef(): string | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(AFFILIATE_REF_KEY)
    if (!raw) return null

    const data: AffiliateRef = JSON.parse(raw)
    if (new Date(data.expiresAt) < new Date()) {
      localStorage.removeItem(AFFILIATE_REF_KEY)
      return null
    }

    return data.code
  } catch {
    return null
  }
}

/**
 * Hook to read the current affiliate ref code reactively.
 */
export function useAffiliateRef() {
  const getRef = useCallback(() => getAffiliateRef(), [])
  return { getRef, affiliateRefKey: AFFILIATE_REF_KEY }
}
