'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Diamond, TrendingUp, Clock, DollarSign, Share2, Star } from 'lucide-react'

const COMMISSION_TIERS = [
  { label: 'Standard', range: '$0–$2,000 / mo', rate: '15%' },
  { label: 'Silver', range: '$2,001–$5,000 / mo', rate: '18%' },
  { label: 'Gold', range: '$5,001–$10,000 / mo', rate: '20%' },
  { label: 'Elite', range: '$10,000+ / mo', rate: '22% + bonus' },
]

const BENEFITS = [
  { icon: DollarSign, text: '15% commission on every sale — avg. $135+ per conversion' },
  { icon: TrendingUp, text: 'High-AOV products ($485–$2,485) — each sale pays well' },
  { icon: Clock, text: '30-day cookie window — get credit for sales that convert later' },
  { icon: Share2, text: 'Personal discount code for your audience (they save 15% too)' },
  { icon: Star, text: 'Monthly payouts, no minimums, no exclusivity' },
  { icon: Diamond, text: 'Free product seeding for active affiliates + campaign assets' },
]

export default function AffiliatePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    handle: '',
    platform: '',
    followers: '',
    niche: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/affiliate/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-stone-950 text-white py-24 px-6 text-center">
        <p className="text-[11px] tracking-[0.3em] text-amber-400 uppercase mb-4">Partner Program</p>
        <h1 className="font-display text-4xl md:text-5xl font-light tracking-wide mb-6">
          Earn with Bonjoojoo
        </h1>
        <p className="text-stone-300 max-w-xl mx-auto text-base leading-relaxed">
          Join our affiliate program and earn <strong className="text-white">15% commission</strong> on every sale you drive.
          Average order value is $900+ — which means $135+ per conversion.
        </p>
        <a href="#apply" className="inline-block mt-8 bg-amber-400 text-stone-950 text-sm font-medium tracking-widest uppercase px-8 py-3 hover:bg-amber-300 transition-colors">
          Apply Now
        </a>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase text-center mb-3">How It Works</p>
        <h2 className="font-display text-3xl font-light text-center text-stone-900 mb-12">Simple, transparent, rewarding</h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 font-medium text-sm mx-auto mb-4">1</div>
            <h3 className="font-medium text-stone-900 mb-2">Apply</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Fill out the form below. We review every application within 48 hours.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 font-medium text-sm mx-auto mb-4">2</div>
            <h3 className="font-medium text-stone-900 mb-2">Share</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Get your unique affiliate link and personal discount code for your audience.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 font-medium text-sm mx-auto mb-4">3</div>
            <h3 className="font-medium text-stone-900 mb-2">Earn</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Earn 15% on every sale. Monthly payouts via PayPal or bank transfer.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase text-center mb-3">Benefits</p>
          <h2 className="font-display text-3xl font-light text-center text-stone-900 mb-12">Why partners love us</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {BENEFITS.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-5 border border-stone-100">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-stone-900 text-white rounded">
                  <Icon size={14} />
                </div>
                <p className="text-stone-700 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission tiers */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase text-center mb-3">Commission Tiers</p>
        <h2 className="font-display text-3xl font-light text-center text-stone-900 mb-4">Grow your earnings as you grow</h2>
        <p className="text-center text-stone-500 text-sm mb-12">Unlock higher rates after 90 days based on monthly sales performance.</p>
        <div className="grid md:grid-cols-4 gap-4">
          {COMMISSION_TIERS.map((tier, i) => (
            <div key={i} className={`p-6 text-center border ${i === 0 ? 'border-stone-200 bg-white' : i === 3 ? 'border-amber-300 bg-amber-50' : 'border-stone-200 bg-white'}`}>
              <p className="text-[11px] tracking-[0.2em] text-stone-400 uppercase mb-2">{tier.label}</p>
              <p className="font-display text-3xl font-light text-stone-900 mb-3">{tier.rate}</p>
              <p className="text-stone-500 text-xs leading-relaxed">{tier.range}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who thrives */}
      <section className="py-16 px-6 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] text-amber-400 uppercase mb-3">Who Thrives Here</p>
          <h2 className="font-display text-3xl font-light mb-6">Built for authentic creators</h2>
          <p className="text-stone-300 text-sm leading-relaxed mb-8">
            Content creators in jewelry, bridal, fashion, lifestyle, and minimalist aesthetics do especially well.
            If your audience buys jewelry or is shopping for engagement and wedding pieces, Bonjoojoo is a natural fit.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {['Jewelry', 'Bridal', 'Fashion', 'Lifestyle', 'Minimalist', 'Lab-Grown Diamond', 'Sustainable Fashion', 'NYC Style'].map(tag => (
              <span key={tag} className="border border-stone-600 text-stone-300 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Example affiliate URLs for priority influencers */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase text-center mb-3">Example Links</p>
          <h2 className="font-display text-3xl font-light text-center text-stone-900 mb-4">Your personalised affiliate link</h2>
          <p className="text-center text-stone-500 text-sm mb-10">
            Once approved, you'll receive a link like one of these — just share it and we'll track every sale.
          </p>
          <div className="space-y-3">
            {[
              { handle: '@theringwhisperer', code: 'THERINGWHISPERER' },
              { handle: '@claramoss.nyc', code: 'CLARAMOSSNYC' },
              { handle: '@siennawearsjewels', code: 'SIENNAWEARSJEWELS' },
              { handle: '@diamonddiaries_', code: 'DIAMONDDIARIES' },
              { handle: '@stackedandstyled', code: 'STACKEDANDSTYLED' },
            ].map(({ handle, code }) => (
              <div key={code} className="flex items-center justify-between bg-white border border-stone-200 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-stone-900">{handle}</p>
                  <p className="text-xs text-stone-400 mt-0.5">Discount code: <span className="font-mono text-stone-600">{code}15</span></p>
                </div>
                <code className="text-xs text-stone-500 font-mono hidden md:block">
                  bonjoojoo.com/?ref={code}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-24 px-6 max-w-2xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase text-center mb-3">Apply</p>
        <h2 className="font-display text-3xl font-light text-center text-stone-900 mb-4">Join the program</h2>
        <p className="text-center text-stone-500 text-sm mb-12">We review every application within 48 hours. No minimums, no exclusivity.</p>

        {status === 'success' ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-5">
              <Check size={20} className="text-white" />
            </div>
            <h3 className="font-display text-2xl font-light text-stone-900 mb-3">Application received</h3>
            <p className="text-stone-500 text-sm">We'll be in touch within 48 hours at the email you provided.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Full Name *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Handle *</label>
                <input
                  required
                  type="text"
                  value={form.handle}
                  onChange={e => setForm(f => ({ ...f, handle: e.target.value }))}
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                  placeholder="@yourhandle"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Platform</label>
                <select
                  value={form.platform}
                  onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                >
                  <option value="">Select platform</option>
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>YouTube</option>
                  <option>Blog / Website</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-widests uppercase text-stone-500 mb-2">Followers</label>
                <input
                  type="text"
                  value={form.followers}
                  onChange={e => setForm(f => ({ ...f, followers: e.target.value }))}
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                  placeholder="e.g. 25K"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widests uppercase text-stone-500 mb-2">Niche / Content Type</label>
                <input
                  type="text"
                  value={form.niche}
                  onChange={e => setForm(f => ({ ...f, niche: e.target.value }))}
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                  placeholder="e.g. Jewelry, Bridal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widests uppercase text-stone-500 mb-2">Tell us about your audience (optional)</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={4}
                className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 bg-white resize-none"
                placeholder="Anything else you'd like us to know..."
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600">Something went wrong — please try again or email hello@bonjoojoo.com.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-stone-900 text-white text-sm tracking-widest uppercase py-4 hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
            </button>

            <p className="text-center text-xs text-stone-400">
              Already an affiliate?{' '}
              <Link href="/affiliate/dashboard" className="underline hover:text-stone-600">
                View your dashboard
              </Link>
            </p>
          </form>
        )}
      </section>
    </main>
  )
}
