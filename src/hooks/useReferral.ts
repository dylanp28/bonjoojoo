'use client'

import { useState, useEffect, useCallback } from 'react'

const REFERRAL_KEY = 'bonjoojoo_referral'

interface ReferralData {
  code: string
  friendsReferred: number
  creditsEarned: number
}

function generateCode(name?: string): string {
  if (name) {
    const clean = name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
    if (clean.length >= 3) return clean
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export function useReferral(userName?: string) {
  const [referral, setReferral] = useState<ReferralData | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(REFERRAL_KEY)
      if (stored) {
        setReferral(JSON.parse(stored))
      } else {
        const code = generateCode(userName)
        const fresh: ReferralData = { code, friendsReferred: 0, creditsEarned: 0 }
        localStorage.setItem(REFERRAL_KEY, JSON.stringify(fresh))
        setReferral(fresh)
      }
    } catch {
      const code = generateCode(userName)
      setReferral({ code, friendsReferred: 0, creditsEarned: 0 })
    }
  }, [userName])

  const getReferralUrl = useCallback((code: string) => {
    if (typeof window === 'undefined') return `https://bonjoojoo.com/refer?code=${code}`
    return `${window.location.origin}/refer?code=${code}`
  }, [])

  return { referral, getReferralUrl }
}
