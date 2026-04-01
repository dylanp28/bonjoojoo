'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Copy, Check, Mail, Share2, Users, Gift, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useReferral } from '@/hooks/useReferral'

function ShareButton({ icon, label, onClick, className }: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-md text-[13px] font-medium transition-all ${className}`}
    >
      {icon}
      {label}
    </button>
  )
}

function ReferPageContent() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const inboundCode = searchParams.get('code')

  const userName = user ? `${user.firstName}${user.lastName ? user.lastName[0] : ''}` : undefined
  const { referral, getReferralUrl } = useReferral(userName)

  const [copied, setCopied] = useState(false)

  // Store inbound referral code in localStorage for future credit application
  useEffect(() => {
    if (inboundCode) {
      try {
        localStorage.setItem('bonjoojoo_referral_from', inboundCode)
      } catch {}
    }
  }, [inboundCode])

  const referralUrl = referral ? getReferralUrl(referral.code) : ''

  const handleCopy = async () => {
    if (!referralUrl) return
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
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

  const handleInstagramPrompt = () => {
    handleCopy()
    alert('Link copied! Paste it in your Instagram bio or story to share your referral link.')
  }

  const steps = [
    {
      number: '01',
      title: 'Share your link',
      description: 'Copy your unique referral link and share it with friends who love jewelry.',
      icon: <Share2 size={20} strokeWidth={1.5} />,
    },
    {
      number: '02',
      title: 'Friend makes a purchase',
      description: "They get $50 off their first Bonjoojoo order — a gift they'll actually love.",
      icon: <Gift size={20} strokeWidth={1.5} />,
    },
    {
      number: '03',
      title: 'You both earn $50',
      description: "Once their order ships, $50 credit lands in your account automatically.",
      icon: <Sparkles size={20} strokeWidth={1.5} />,
    },
  ]

  return (
    <div className="min-h-screen bg-bj-blush">
      {/* Hero */}
      <section className="bg-bj-black text-white">
        <div className="container-bj py-20 text-center">
          <p className="text-overline text-bj-pink mb-4 tracking-[0.2em]">Referral Program</p>
          <h1 className="text-display-lg text-white mb-5 font-serif">
            Give $50, Get $50
          </h1>
          <p className="text-[18px] text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            Share the love. When a friend makes their first Bonjoojoo purchase using your link, you both receive $50 toward your next order.
          </p>
          <div className="inline-flex items-center gap-2 bg-bj-pink/20 text-bj-pink border border-bj-pink/30 rounded-full px-5 py-2 text-[13px] font-medium">
            <Users size={14} />
            No limit — refer as many friends as you like
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-bj py-16">
          <h2 className="text-center text-display-xs text-bj-black mb-12 font-serif">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={step.number} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-30px)] h-px border-t border-dashed border-bj-rose-gold/40" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-bj-black rounded-full mb-5 relative z-10">
                  <span className="text-white">{step.icon}</span>
                </div>
                <div className="text-[11px] font-bold text-bj-pink tracking-[0.15em] mb-2">{step.number}</div>
                <h3 className="text-[16px] font-semibold text-bj-black mb-2">{step.title}</h3>
                <p className="text-[14px] text-bj-gray-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Link Card */}
      <section className="container-bj py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-bj-black to-stone-800 p-6 text-white text-center">
              <Gift size={28} strokeWidth={1.5} className="mx-auto mb-3 text-bj-pink" />
              <h3 className="text-[20px] font-serif mb-1">Your Referral Link</h3>
              <p className="text-white/50 text-[13px]">Share this link with friends</p>
            </div>

            <div className="p-8">
              {referral ? (
                <>
                  {/* Link display */}
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 mb-6">
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

                  {/* Share buttons */}
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-[0.12em] mb-3">Share via</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ShareButton
                      icon={<Copy size={15} />}
                      label={copied ? 'Copied!' : 'Copy Link'}
                      onClick={handleCopy}
                      className="bg-bj-black text-white hover:bg-stone-800 justify-center"
                    />
                    <ShareButton
                      icon={<Mail size={15} />}
                      label="Email"
                      onClick={handleEmailShare}
                      className="border border-stone-200 text-stone-700 hover:bg-stone-50 justify-center"
                    />
                    <ShareButton
                      icon={
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      }
                      label="WhatsApp"
                      onClick={handleWhatsAppShare}
                      className="border border-stone-200 text-stone-700 hover:bg-stone-50 justify-center"
                    />
                    <ShareButton
                      icon={
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      }
                      label="Instagram"
                      onClick={handleInstagramPrompt}
                      className="border border-stone-200 text-stone-700 hover:bg-stone-50 justify-center"
                    />
                  </div>

                  {/* Stats */}
                  <div className="border-t border-stone-100 pt-6 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-[28px] font-bold text-bj-black">{referral.friendsReferred}</p>
                      <p className="text-[12px] text-stone-500 mt-0.5">Friends Referred</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[28px] font-bold text-bj-pink">${referral.creditsEarned}</p>
                      <p className="text-[12px] text-stone-500 mt-0.5">Credits Earned</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900 mx-auto mb-4" />
                  <p className="text-stone-500 text-[13px]">Loading your referral link…</p>
                </div>
              )}
            </div>
          </div>

          {/* Not logged in CTA */}
          {!user && (
            <div className="mt-6 text-center bg-white rounded-xl border border-stone-200 p-6">
              <p className="text-[14px] text-stone-600 mb-4">
                Sign in to get a personalized referral link tied to your account.
              </p>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 bg-bj-black text-white px-6 py-3 rounded-md text-[13px] font-medium hover:bg-stone-800 transition-colors"
              >
                Sign In to Your Account
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Terms */}
      <section className="container-bj pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-100">
            <h4 className="text-[12px] font-semibold text-stone-500 uppercase tracking-[0.12em] mb-3">Program Details</h4>
            <ul className="space-y-2">
              {[
                '$50 referral credit is issued when your friend\'s first order ships.',
                'Your friend receives $50 off their first order of $150 or more.',
                'Credits never expire and can be used on any order.',
                'There is no limit to the number of friends you can refer.',
                'Credits are applied automatically at checkout.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-stone-600">
                  <Check size={13} strokeWidth={2.5} className="text-bj-pink mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ReferPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ReferPageContent />
    </Suspense>
  )
}
