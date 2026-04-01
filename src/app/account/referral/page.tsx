'use client'

import { useState } from 'react'
import { Copy, Check, Mail, Share2, Gift, Users, Sparkles, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useReferral } from '@/hooks/useReferral'

export default function ReferralPage() {
  const { user } = useAuth()
  const userName = user ? `${user.firstName}${user.lastName ? user.lastName[0] : ''}` : undefined
  const { referral, getReferralUrl } = useReferral(userName)
  const [copied, setCopied] = useState(false)

  const referralUrl = referral ? getReferralUrl(referral.code) : ''

  const handleCopy = async () => {
    if (!referralUrl) return
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const el = document.createElement('textarea')
      el.value = referralUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent("I found the most beautiful jewelry — here's $50 off for you")
    const body = encodeURIComponent(
      `Hey!\n\nI've been loving Bonjoojoo's lab-grown diamond jewelry and thought you'd love it too.\n\nUse my link to get $50 off your first order — and I'll earn $50 credit too:\n\n${referralUrl}\n\nThey have stunning rings, necklaces, and bracelets, all ethically made. Enjoy!\n`
    )
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `✨ Get $50 off your first Bonjoojoo order — stunning lab-grown diamond jewelry!\n\n${referralUrl}`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">Refer a Friend</h1>
        <p className="text-stone-600">
          Share your unique link. When a friend makes their first purchase, you both get $50 credit.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-pink-50 to-rose-100 p-6 rounded-lg border border-pink-200">
          <div className="flex items-center">
            <div className="p-2 bg-bj-pink rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-pink-600 font-medium">Friends Referred</p>
              <p className="text-2xl font-bold text-pink-800">{referral?.friendsReferred ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-100 p-6 rounded-lg border border-amber-200">
          <div className="flex items-center">
            <div className="p-2 bg-amber-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-amber-600 font-medium">Credits Earned</p>
              <p className="text-2xl font-bold text-amber-800">${referral?.creditsEarned ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="border border-stone-200 rounded-lg overflow-hidden mb-8">
        <div className="bg-stone-50 px-5 py-4 border-b border-stone-200">
          <p className="text-[12px] font-semibold text-stone-500 uppercase tracking-[0.12em]">Your Unique Referral Link</p>
        </div>
        <div className="p-5">
          {referral ? (
            <>
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 mb-5">
                <span className="flex-1 text-[13px] text-stone-700 font-mono truncate">{referralUrl}</span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 flex items-center gap-1.5 text-[12px] font-medium text-bj-pink hover:text-bj-black transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={14} strokeWidth={2.5} className="text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-md text-[13px] font-medium hover:bg-stone-800 transition-colors"
                >
                  <Copy size={14} />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={handleEmailShare}
                  className="flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-stone-700 rounded-md text-[13px] font-medium hover:bg-stone-50 transition-colors"
                >
                  <Mail size={14} />
                  Email
                </button>
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-stone-700 rounded-md text-[13px] font-medium hover:bg-stone-50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900 mx-auto mb-3" />
              <p className="text-stone-500 text-[13px]">Loading your link…</p>
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="border border-stone-200 rounded-lg overflow-hidden mb-8">
        <div className="bg-stone-50 px-5 py-4 border-b border-stone-200">
          <p className="text-[12px] font-semibold text-stone-500 uppercase tracking-[0.12em]">How It Works</p>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {[
              { icon: <Share2 size={16} />, step: '1', text: 'Share your unique link with friends who love jewelry.' },
              { icon: <Gift size={16} />, step: '2', text: 'Your friend gets $50 off their first Bonjoojoo order of $150+.' },
              { icon: <Sparkles size={16} />, step: '3', text: "Once their order ships, $50 credit is added to your account." },
            ].map(({ icon, step, text }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-white">
                  {icon}
                </div>
                <p className="text-[14px] text-stone-700 pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View full page link */}
      <div className="text-center">
        <Link
          href="/refer"
          className="inline-flex items-center gap-2 text-[13px] text-bj-pink hover:text-bj-black font-medium transition-colors"
        >
          View full referral page
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  )
}
