'use client'

import { useState, useEffect, useCallback } from 'react'

const LOYALTY_KEY = 'bonjoojoo_loyalty'

export interface LoyaltyHistoryEntry {
  id: string
  date: string
  type: 'earn' | 'redeem'
  points: number
  description: string
}

export interface LoyaltyData {
  points: number          // current balance
  lifetimePoints: number  // total ever earned (for tier calculation)
  history: LoyaltyHistoryEntry[]
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold'

export const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 500,
  gold: 1500,
} as const

export const TIER_LABELS: Record<LoyaltyTier, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
}

export const TIER_COLORS: Record<LoyaltyTier, { text: string; bg: string; border: string }> = {
  bronze: { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  silver: { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
  gold: { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
}

/** Points per dollar spent */
export const POINTS_PER_DOLLAR = 1

/** Points required for $10 discount */
export const POINTS_PER_REDEMPTION = 100

/** Dollar value of one redemption block */
export const REDEMPTION_VALUE = 10

export function getTier(lifetimePoints: number): LoyaltyTier {
  if (lifetimePoints >= TIER_THRESHOLDS.gold) return 'gold'
  if (lifetimePoints >= TIER_THRESHOLDS.silver) return 'silver'
  return 'bronze'
}

export function getNextTier(tier: LoyaltyTier): LoyaltyTier | null {
  if (tier === 'bronze') return 'silver'
  if (tier === 'silver') return 'gold'
  return null
}

export function pointsToNextTier(lifetimePoints: number): number {
  const tier = getTier(lifetimePoints)
  if (tier === 'bronze') return TIER_THRESHOLDS.silver - lifetimePoints
  if (tier === 'silver') return TIER_THRESHOLDS.gold - lifetimePoints
  return 0
}

/** How much $$ a given number of points is worth (must be in multiples of 100) */
export function pointsToDiscount(points: number): number {
  const blocks = Math.floor(points / POINTS_PER_REDEMPTION)
  return blocks * REDEMPTION_VALUE
}

const DEFAULT_DATA: LoyaltyData = {
  points: 0,
  lifetimePoints: 0,
  history: [],
}

function loadFromStorage(): LoyaltyData {
  if (typeof window === 'undefined') return DEFAULT_DATA
  try {
    const stored = localStorage.getItem(LOYALTY_KEY)
    if (stored) return { ...DEFAULT_DATA, ...JSON.parse(stored) }
  } catch {
    // ignore
  }
  return DEFAULT_DATA
}

function saveToStorage(data: LoyaltyData) {
  try {
    localStorage.setItem(LOYALTY_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function useLoyalty() {
  const [data, setData] = useState<LoyaltyData>(DEFAULT_DATA)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setData(loadFromStorage())
    setMounted(true)
  }, [])

  const earnPoints = useCallback((dollarAmount: number, description: string) => {
    const pts = Math.floor(dollarAmount * POINTS_PER_DOLLAR)
    if (pts <= 0) return 0
    setData(prev => {
      const updated: LoyaltyData = {
        points: prev.points + pts,
        lifetimePoints: prev.lifetimePoints + pts,
        history: [
          {
            id: `earn-${Date.now()}`,
            date: new Date().toISOString(),
            type: 'earn' as const,
            points: pts,
            description,
          },
          ...prev.history,
        ].slice(0, 50), // keep last 50 entries
      }
      saveToStorage(updated)
      return updated
    })
    return pts
  }, [])

  const redeemPoints = useCallback((points: number, description: string): number => {
    const blocks = Math.floor(points / POINTS_PER_REDEMPTION)
    const toRedeem = blocks * POINTS_PER_REDEMPTION
    const discount = blocks * REDEMPTION_VALUE
    if (toRedeem <= 0) return 0
    setData(prev => {
      if (prev.points < toRedeem) return prev
      const updated: LoyaltyData = {
        ...prev,
        points: prev.points - toRedeem,
        history: [
          {
            id: `redeem-${Date.now()}`,
            date: new Date().toISOString(),
            type: 'redeem' as const,
            points: toRedeem,
            description,
          },
          ...prev.history,
        ].slice(0, 50),
      }
      saveToStorage(updated)
      return updated
    })
    return discount
  }, [])

  const tier = getTier(data.lifetimePoints)
  const nextTier = getNextTier(tier)
  const ptsToNext = pointsToNextTier(data.lifetimePoints)

  return {
    mounted,
    points: data.points,
    lifetimePoints: data.lifetimePoints,
    history: data.history,
    tier,
    nextTier,
    pointsToNextTier: ptsToNext,
    earnPoints,
    redeemPoints,
  }
}
