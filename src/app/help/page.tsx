import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, Clock, MessageCircle, RotateCcw, Truck, Ruler, Shield, CreditCard, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Get support for your Bonjoojoo order. Find answers to common questions, contact our team, and access shipping, returns, sizing, and care resources.',
  alternates: { canonical: 'https://bonjoojoo.com/help' },
}

const QUICK_LINKS = [
  { icon: Truck, label: 'Shipping Information', href: '/shipping', description: 'Delivery times, tracking, and international orders' },
  { icon: RotateCcw, label: 'Returns & Exchanges', href: '/returns', description: '30-day returns, how to start a return, refund timeline' },
  { icon: Ruler, label: 'Size Guide', href: '/help/sizing', description: 'Ring, bracelet, and necklace sizing tools' },
  { icon: Shield, label: 'Warranty & Repairs', href: '/help/warranty', description: '1-year manufacturing warranty and repair services' },
  { icon: CreditCard, label: 'Financing Options', href: '/help/financing', description: 'Afterpay, Shop Pay Installments, and more' },
  { icon: Gift, label: 'Product Care', href: '/help/care', description: 'How to clean, store, and maintain your jewelry' },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How can we help you today? Browse our resources below or reach out to our team directly.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Contact Info */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">Contact Our Team</h2>
          <div className="grid sm:grid-cols-3 gap-6">

            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Mail size={20} className="text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
              <a
                href="mailto:hello@bonjoojoo.com"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm block mb-3"
              >
                hello@bonjoojoo.com
              </a>
              <p className="text-xs text-gray-500">Response within 1 business day</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Phone size={20} className="text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone & Text</h3>
              <a
                href="tel:+12135550123"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm block mb-3"
              >
                (213) 555-0123
              </a>
              <p className="text-xs text-gray-500">Mon–Fri, 9 AM–6 PM PST<br />Sat, 10 AM–4 PM PST</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={20} className="text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-3">Chat with a jewelry expert directly on our site.</p>
              <p className="text-xs text-gray-500">Mon–Fri, 9 AM–6 PM PST</p>
            </div>

          </div>
        </section>

        {/* Response Times */}
        <section className="mb-16 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock size={18} className="text-gray-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Expected Response Times</h2>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">Within 1 business day</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">Immediate during business hours</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Live Chat</p>
                  <p className="text-gray-600">Usually under 5 minutes</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Business hours: Monday–Friday 9 AM–6 PM PST · Saturday 10 AM–4 PM PST · Sunday Closed.<br />
                Messages received outside business hours will be answered the next business day.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">Common Topics</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {QUICK_LINKS.map(({ icon: Icon, label, href, description }) => (
              <Link
                key={href}
                href={href}
                className="flex items-start gap-4 p-5 border border-gray-200 rounded-xl hover:border-gray-900 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="mb-16 text-center p-10 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-light text-gray-900 mb-3">Browse Our FAQ</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We&apos;ve answered 25+ of the most common questions about our diamonds, shipping, returns, sizing, and more.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            View All FAQs
          </Link>
        </section>

        {/* Contact form CTA */}
        <section className="text-center">
          <p className="text-gray-600 mb-4">Prefer to send a detailed message?</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Send Us a Message
          </Link>
        </section>

      </div>
    </div>
  )
}
