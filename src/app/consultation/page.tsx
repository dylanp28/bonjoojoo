'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, Shield, Award } from 'lucide-react'

const CONSULTATION_STORAGE_KEY = 'bonjoojoo_consultations'

interface ConsultationForm {
  name: string
  email: string
  phone: string
  shoppingFor: string
  budget: string
  preferredDate: string
  preferredTime: string
  notes: string
}

function getAvailableDates(): string[] {
  const dates: string[] = []
  const today = new Date()
  let count = 0
  let d = new Date(today)
  d.setDate(d.getDate() + 1) // Start from tomorrow
  while (count < 10) {
    const day = d.getDay()
    if (day !== 0 && day !== 6) {
      dates.push(d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
      count++
    }
    d.setDate(d.getDate() + 1)
  }
  return dates
}

const TIME_SLOTS = ['10:00 AM', '1:00 PM', '4:00 PM']

export default function ConsultationPage() {
  const [form, setForm] = useState<ConsultationForm>({
    name: '',
    email: '',
    phone: '',
    shoppingFor: '',
    budget: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<ConsultationForm>>({})
  const [submitted, setSubmitted] = useState(false)

  const availableDates = getAvailableDates()

  const validate = () => {
    const errs: Partial<ConsultationForm> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Valid email is required'
    if (!form.shoppingFor) errs.shoppingFor = 'Please select what you are shopping for'
    if (!form.budget) errs.budget = 'Please select a budget range'
    if (!form.preferredDate) errs.preferredDate = 'Please select a preferred date'
    if (!form.preferredTime) errs.preferredTime = 'Please select a time slot'
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    try {
      const existing = JSON.parse(localStorage.getItem(CONSULTATION_STORAGE_KEY) || '[]')
      existing.push({ ...form, bookedAt: new Date().toISOString(), id: Date.now() })
      localStorage.setItem(CONSULTATION_STORAGE_KEY, JSON.stringify(existing))
    } catch {}
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChange = (field: keyof ConsultationForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-bj-offwhite flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <p className="text-overline text-bj-pink mb-3">Consultation Booked</p>
          <h1 className="text-display-sm text-bj-black mb-4">We&apos;ll See You Soon</h1>
          <p className="text-body text-bj-gray-500 mb-4">
            Thank you, <strong>{form.name}</strong>. Your consultation is confirmed for{' '}
            <strong>{form.preferredDate}</strong> at <strong>{form.preferredTime}</strong>.
          </p>
          <p className="text-body text-bj-gray-500 mb-10">
            A confirmation will be sent to <strong>{form.email}</strong>. Our specialist will reach out 24 hours before your appointment with a private call link.
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 p-6 text-left rounded-sm">
              <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider mb-4">What to Expect</h3>
              <ul className="space-y-3 text-[14px] text-bj-gray-500">
                <li className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-bj-pink mt-0.5 flex-shrink-0" />
                  A private 30-minute video or phone call with your dedicated specialist
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-bj-pink mt-0.5 flex-shrink-0" />
                  Personalized guidance on diamond quality, settings, and styles
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-bj-pink mt-0.5 flex-shrink-0" />
                  No obligation to purchase — we&apos;re here to help you find the perfect piece
                </li>
              </ul>
            </div>
            <Link href="/" className="btn-secondary inline-block py-3 px-8 text-[12px]">
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bj-offwhite">
      {/* ═══ HERO ═══ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-bj py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-overline text-bj-pink mb-4">Free Consultation</p>
            <h1 className="text-display text-bj-black mb-6">
              Speak with a Bonjoojoo<br />Diamond Specialist
            </h1>
            <p className="text-body text-bj-gray-500 max-w-xl">
              Finding the perfect piece of fine jewelry is a deeply personal journey. Our specialists are here to guide you — with no pressure, just expertise.
            </p>
          </div>
        </div>
        {/* Decorative bar */}
        <div className="h-px bg-gradient-to-r from-bj-rose-gold/40 via-bj-pink/20 to-transparent" />
      </section>

      {/* ═══ VALUE PROPS ═══ */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container-bj">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Free 30-Minute Call',
                desc: 'Dedicated time with a certified specialist — at no cost.',
              },
              {
                icon: Shield,
                title: 'No Pressure, Ever',
                desc: 'We guide and inform. The decision is always yours.',
              },
              {
                icon: Award,
                title: 'Expert Guidance on the 4Cs',
                desc: 'Understand cut, clarity, color, and carat to find your ideal diamond.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-5">
                <div className="w-12 h-12 bg-bj-blush rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-bj-pink" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-bj-black mb-1">{title}</h3>
                  <p className="text-[13px] text-bj-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOOKING FORM ═══ */}
      <section className="py-16 lg:py-20">
        <div className="container-bj max-w-2xl">
          <div className="bg-white border border-gray-100 p-8 lg:p-12">
            <h2 className="text-display-sm text-bj-black mb-2">Book Your Free Consultation</h2>
            <p className="text-[14px] text-bj-gray-400 mb-10">Fields marked * are required.</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              {/* Name */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Your full name"
                  className={`input-bj w-full ${errors.name ? 'border-red-400' : ''}`}
                />
                {errors.name && <p className="mt-1 text-[12px] text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="you@email.com"
                  className={`input-bj w-full ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>}
              </div>

              {/* Phone (optional) */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  Phone <span className="font-normal text-bj-gray-400 normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="input-bj w-full"
                />
              </div>

              {/* What are you shopping for */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  What Are You Shopping For? *
                </label>
                <select
                  value={form.shoppingFor}
                  onChange={e => handleChange('shoppingFor', e.target.value)}
                  className={`input-bj w-full bg-white ${errors.shoppingFor ? 'border-red-400' : ''}`}
                >
                  <option value="">Select an option</option>
                  <option value="Engagement Ring">Engagement Ring</option>
                  <option value="Anniversary Gift">Anniversary Gift</option>
                  <option value="Self Purchase">Self Purchase</option>
                  <option value="Other">Other</option>
                </select>
                {errors.shoppingFor && <p className="mt-1 text-[12px] text-red-500">{errors.shoppingFor}</p>}
              </div>

              {/* Budget range */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  Budget Range *
                </label>
                <select
                  value={form.budget}
                  onChange={e => handleChange('budget', e.target.value)}
                  className={`input-bj w-full bg-white ${errors.budget ? 'border-red-400' : ''}`}
                >
                  <option value="">Select a range</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                  <option value="$2,500 – $5,000">$2,500 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
                {errors.budget && <p className="mt-1 text-[12px] text-red-500">{errors.budget}</p>}
              </div>

              {/* Preferred date */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  Preferred Date * <span className="font-normal text-bj-gray-400 normal-case tracking-normal">(Mon – Fri)</span>
                </label>
                <select
                  value={form.preferredDate}
                  onChange={e => handleChange('preferredDate', e.target.value)}
                  className={`input-bj w-full bg-white ${errors.preferredDate ? 'border-red-400' : ''}`}
                >
                  <option value="">Select a date</option>
                  {availableDates.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.preferredDate && <p className="mt-1 text-[12px] text-red-500">{errors.preferredDate}</p>}
              </div>

              {/* Preferred time */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  Preferred Time * <span className="font-normal text-bj-gray-400 normal-case tracking-normal">(PT)</span>
                </label>
                <div className="flex gap-3">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleChange('preferredTime', slot)}
                      className={`flex-1 py-3 text-[13px] font-medium border transition-colors ${
                        form.preferredTime === slot
                          ? 'bg-bj-black text-white border-bj-black'
                          : 'bg-white text-bj-gray-500 border-gray-200 hover:border-bj-black hover:text-bj-black'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.preferredTime && <p className="mt-1 text-[12px] text-red-500">{errors.preferredTime}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[12px] font-semibold text-bj-black uppercase tracking-wider mb-2">
                  Notes <span className="font-normal text-bj-gray-400 normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  placeholder="Any details about what you're looking for, questions you have, or anything that would help us prepare..."
                  rows={4}
                  className="input-bj w-full resize-none"
                />
              </div>

              {/* Submit */}
              <button type="submit" className="w-full btn-primary py-5 text-[13px] flex items-center justify-center gap-3">
                Book My Free Consultation
              </button>
            </form>
          </div>

          <p className="text-center text-[12px] text-bj-gray-400 mt-6">
            Have questions? <Link href="/contact" className="underline hover:text-bj-black transition-colors">Contact us</Link> or call{' '}
            <a href="tel:+18005550100" className="underline hover:text-bj-black transition-colors">1-800-555-0100</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
