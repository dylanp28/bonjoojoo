'use client'

import { Award, TrendingUp, Star, Gift, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import {
  useLoyalty,
  TIER_LABELS,
  TIER_COLORS,
  TIER_THRESHOLDS,
  POINTS_PER_REDEMPTION,
  REDEMPTION_VALUE,
  getTier,
  type LoyaltyTier,
} from '@/hooks/useLoyalty'

function TierBadge({ tier, size = 'md' }: { tier: LoyaltyTier; size?: 'sm' | 'md' | 'lg' }) {
  const colors = TIER_COLORS[tier]
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-[12px] px-3 py-1',
    lg: 'text-[14px] px-4 py-1.5',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${colors.text} ${colors.bg} ${colors.border} ${sizeClasses[size]} uppercase tracking-wider`}
    >
      <Award size={size === 'lg' ? 14 : 12} />
      {TIER_LABELS[tier]}
    </span>
  )
}

function TierProgressBar({ lifetimePoints }: { lifetimePoints: number }) {
  const tier = getTier(lifetimePoints)
  const tiers: LoyaltyTier[] = ['bronze', 'silver', 'gold']

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end mb-1">
        {tiers.map(t => (
          <div key={t} className="text-center flex-1">
            <TierBadge tier={t} size="sm" />
            <p className="text-[11px] text-stone-400 mt-1">{TIER_THRESHOLDS[t].toLocaleString()} pts</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-stone-100 rounded-full overflow-hidden">
        {/* Bronze → Silver segment */}
        <div className="absolute left-0 top-0 h-full w-1/2 bg-stone-200 rounded-full" />
        {/* Silver → Gold segment */}
        <div className="absolute left-1/2 top-0 h-full w-1/2 bg-stone-200 rounded-full" />

        {/* Filled portion */}
        {tier === 'bronze' && (
          <div
            className="absolute left-0 top-0 h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((lifetimePoints / TIER_THRESHOLDS.silver) * 50, 50)}%` }}
          />
        )}
        {tier === 'silver' && (
          <>
            <div className="absolute left-0 top-0 h-full bg-amber-500 rounded-full" style={{ width: '50%' }} />
            <div
              className="absolute left-1/2 top-0 h-full bg-slate-400 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  ((lifetimePoints - TIER_THRESHOLDS.silver) /
                    (TIER_THRESHOLDS.gold - TIER_THRESHOLDS.silver)) *
                    50,
                  50,
                )}%`,
              }}
            />
          </>
        )}
        {tier === 'gold' && (
          <div className="absolute left-0 top-0 h-full w-full bg-yellow-400 rounded-full" />
        )}
      </div>

      <p className="text-center text-[12px] text-stone-500">
        {tier === 'gold' ? (
          <span className="text-yellow-600 font-medium">You&apos;ve reached Gold — the highest tier!</span>
        ) : (
          <>
            <span className="font-medium text-stone-700">
              {(TIER_THRESHOLDS[tier === 'bronze' ? 'silver' : 'gold'] - lifetimePoints).toLocaleString()} pts
            </span>{' '}
            to {TIER_LABELS[tier === 'bronze' ? 'silver' : 'gold']}
          </>
        )}
      </p>
    </div>
  )
}

export default function LoyaltyPage() {
  const { mounted, points, lifetimePoints, history, tier } = useLoyalty()

  const maxRedeemableBlocks = Math.floor(points / POINTS_PER_REDEMPTION)
  const maxDiscount = maxRedeemableBlocks * REDEMPTION_VALUE

  if (!mounted) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 bg-stone-100 rounded w-48" />
        <div className="h-32 bg-stone-100 rounded" />
        <div className="h-24 bg-stone-100 rounded" />
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-1">Loyalty Rewards</h1>
        <p className="text-stone-500 text-sm">Earn 1 point for every $1 you spend. Redeem 100 pts for $10 off.</p>
      </div>

      {/* Points Card */}
      <div className="bg-stone-900 rounded-xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white" />
          <div className="absolute -left-6 -bottom-10 w-36 h-36 rounded-full bg-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-stone-400 text-[12px] font-medium uppercase tracking-widest mb-1">Current Balance</p>
              <p className="text-5xl font-serif font-medium tracking-tight">
                {points.toLocaleString()}
              </p>
              <p className="text-stone-400 text-sm mt-1">points</p>
            </div>
            <TierBadge tier={tier} size="lg" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-700">
            <div>
              <p className="text-stone-400 text-[11px] uppercase tracking-widest mb-0.5">Lifetime Earned</p>
              <p className="text-lg font-medium">{lifetimePoints.toLocaleString()} pts</p>
            </div>
            <div>
              <p className="text-stone-400 text-[11px] uppercase tracking-widest mb-0.5">Available to Redeem</p>
              <p className="text-lg font-medium">${maxDiscount.toFixed(2)} off</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
        <h3 className="text-[13px] font-semibold text-stone-700 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp size={14} className="text-stone-500" />
          Tier Progress
        </h3>
        <TierProgressBar lifetimePoints={lifetimePoints} />
      </div>

      {/* How it works */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-6">
        <h3 className="text-[13px] font-semibold text-stone-700 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Star size={14} className="text-stone-500" />
          How It Works
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-stone-100">
            <p className="text-2xl font-serif text-stone-900 mb-1">1 pt</p>
            <p className="text-[12px] text-stone-500">per $1 spent</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-100">
            <p className="text-2xl font-serif text-stone-900 mb-1">100 pts</p>
            <p className="text-[12px] text-stone-500">= $10 off at checkout</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-100">
            <p className="text-2xl font-serif text-stone-900 mb-1">No expiry</p>
            <p className="text-[12px] text-stone-500">points never expire</p>
          </div>
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-[12px]">
          {([['bronze', '0–499 pts'], ['silver', '500–1,499 pts'], ['gold', '1,500+ pts']] as [LoyaltyTier, string][]).map(
            ([t, range]) => (
              <div
                key={t}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${TIER_COLORS[t].bg} ${TIER_COLORS[t].border}`}
              >
                <Award size={14} className={TIER_COLORS[t].text} />
                <span className={`font-semibold ${TIER_COLORS[t].text}`}>{TIER_LABELS[t]}</span>
                <span className="text-stone-500 ml-auto">{range}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Redeem CTA */}
      {maxRedeemableBlocks > 0 && (
        <div className="border border-bj-pink/30 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Gift size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-stone-900 text-[14px]">
                You have ${maxDiscount} to redeem!
              </p>
              <p className="text-[12px] text-stone-600">
                Use your {maxRedeemableBlocks * POINTS_PER_REDEMPTION} points at checkout for ${maxDiscount} off.
              </p>
            </div>
            <Link
              href="/checkout"
              className="flex items-center gap-1 text-[13px] font-medium text-stone-900 hover:text-stone-600 transition-colors flex-shrink-0"
            >
              Shop now <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* History */}
      <div>
        <h3 className="text-[13px] font-semibold text-stone-700 uppercase tracking-wider mb-4">Points History</h3>
        {history.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-stone-200 rounded-xl">
            <Award size={32} className="text-stone-300 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-stone-500 text-sm">No points activity yet.</p>
            <p className="text-stone-400 text-[12px] mt-1">Start shopping to earn your first points.</p>
            <Link
              href="/"
              className="inline-block mt-4 bg-stone-900 text-white text-[13px] px-5 py-2.5 rounded hover:bg-stone-800 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="divide-y divide-stone-100">
              {history.map(entry => (
                <div key={entry.id} className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        entry.type === 'earn' ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      {entry.type === 'earn' ? (
                        <TrendingUp size={14} className="text-green-600" />
                      ) : (
                        <Gift size={14} className="text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-stone-900">{entry.description}</p>
                      <p className="text-[11px] text-stone-400">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[14px] font-semibold ${
                      entry.type === 'earn' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {entry.type === 'earn' ? '+' : '−'}{entry.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
