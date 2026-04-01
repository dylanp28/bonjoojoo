'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react'

type TimeSlot = '10:00 AM' | '11:00 AM' | '1:00 PM' | '2:00 PM' | '3:00 PM' | '4:00 PM'

const timeSlots: TimeSlot[] = ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const consultationTypes = [
  { value: 'engagement', label: 'Engagement Ring Design' },
  { value: 'wedding', label: 'Wedding Band Selection' },
  { value: 'custom', label: 'Custom Jewelry Design' },
  { value: 'lab-diamonds', label: 'Lab-Grown Diamond Education' },
  { value: 'general', label: 'General Jewelry Consultation' },
]

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState<TimeSlot | ''>('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consultationType: '',
    preferredDate: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-bj-offwhite pt-[124px]">
        <div className="container-bj py-20 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-20 h-20 bg-bj-blush rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-bj-pink" />
            </div>
            <h1 className="text-display-md text-bj-black mb-4">Consultation Booked</h1>
            <p className="text-body text-bj-gray-500 mb-4">
              Thank you, {formData.firstName}! Your consultation has been scheduled for{' '}
              <strong>{formData.preferredDate}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <p className="text-body text-bj-gray-500 mb-10">
              We&apos;ll send a confirmation to <strong>{formData.email}</strong> with everything you need to know before your appointment.
            </p>
            <a href="/" className="btn-primary inline-block">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bj-offwhite pt-[124px]">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-bj py-14 text-center">
          <p className="text-overline text-bj-pink mb-3">Personalized Service</p>
          <h1 className="text-display-lg text-bj-black mb-4">Book a Consultation</h1>
          <p className="text-body text-bj-gray-500 max-w-xl mx-auto">
            Meet with our jewelry experts to design your perfect piece, learn about lab-grown diamonds, or find the ideal gift. All consultations are complimentary.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container-bj py-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-10 space-y-8">

            {/* Name */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-2">
                  First Name <span className="text-bj-pink">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bj-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-bj pl-10 w-full"
                    placeholder="Jane"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-2">
                  Last Name <span className="text-bj-pink">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-bj w-full"
                  placeholder="Smith"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-2">
                  Email <span className="text-bj-pink">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bj-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-bj pl-10 w-full"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bj-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-bj pl-10 w-full"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Consultation type */}
            <div>
              <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-2">
                Consultation Type <span className="text-bj-pink">*</span>
              </label>
              <select
                name="consultationType"
                required
                value={formData.consultationType}
                onChange={handleChange}
                className="input-bj w-full"
              >
                <option value="">Select a topic</option>
                {consultationTypes.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-2">
                Preferred Date <span className="text-bj-pink">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bj-gray-400" />
                <input
                  type="date"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-bj pl-10 w-full"
                />
              </div>
            </div>

            {/* Time slots */}
            <div>
              <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-3">
                Preferred Time <span className="text-bj-pink">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 text-[13px] border transition-colors ${
                      selectedTime === slot
                        ? 'bg-bj-black text-white border-bj-black'
                        : 'border-gray-200 text-bj-gray-500 hover:border-bj-black hover:text-bj-black'
                    }`}
                  >
                    <Clock className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                    {slot}
                  </button>
                ))}
              </div>
              {!selectedTime && (
                <input type="hidden" required name="time" value="" />
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-bj-black mb-2">
                Additional Notes
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-bj-gray-400" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-bj pl-10 w-full resize-none"
                  placeholder="Tell us about what you have in mind, budget range, any specific styles or preferences..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !selectedTime}
              className="btn-primary w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Booking...
                </span>
              ) : (
                'Book My Consultation'
              )}
            </button>

            <p className="text-[12px] text-bj-gray-400 text-center">
              Consultations are complimentary and available in-store or virtually via video call. Confirmation will be sent to your email.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
