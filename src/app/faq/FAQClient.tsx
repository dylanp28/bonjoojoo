'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const FAQ_SECTIONS: FAQSection[] = [
  {
    title: 'Lab-Grown Diamonds',
    items: [
      {
        question: 'What are lab-grown diamonds?',
        answer: 'Lab-grown diamonds are real diamonds created in controlled laboratory conditions using advanced technology (HPHT or CVD) that replicates the natural diamond formation process. They have the same chemical, physical, and optical properties as mined diamonds — pure carbon in a crystalline structure.',
      },
      {
        question: 'Are lab-grown diamonds real diamonds?',
        answer: 'Yes. Lab-grown diamonds are chemically and physically identical to mined diamonds. They exhibit the same brilliance, fire, and scintillation, and are graded by the same internationally recognized standards (IGI, GIA). Even expert gemologists cannot distinguish them from mined diamonds without specialized equipment.',
      },
      {
        question: 'Why choose lab-grown diamonds over mined diamonds?',
        answer: 'Lab-grown diamonds offer exceptional value (typically 50–80% more affordable than comparable mined stones), ethical sourcing with full traceability, and 95% less environmental impact. You get the same beauty and durability — more diamond for your budget, with a clear conscience.',
      },
      {
        question: 'Are Bonjoojoo diamonds certified?',
        answer: "Yes. Our diamonds are certified by IGI (International Gemological Institute) or GIA (Gemological Institute of America), the two most respected grading laboratories in the world. Every certificate details the stone's 4Cs: cut, color, clarity, and carat weight.",
      },
    ],
  },
  {
    title: 'Shipping',
    items: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping (free on all orders) takes 5–7 business days. Express shipping (2–3 business days) is available at checkout for an additional fee. Overnight delivery is available for orders placed before 12 PM PST Monday–Thursday.',
      },
      {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to over 40 countries worldwide. International delivery typically takes 10–15 business days depending on destination and customs processing. International orders may be subject to import duties and taxes, which are the responsibility of the recipient. Duties are estimated at checkout when possible.',
      },
      {
        question: 'How do I track my order?',
        answer: "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can track your package at any time by visiting your order history at bonjoojoo.com/account/orders or by clicking the tracking link in your confirmation email. Tracking updates may take up to 24 hours to appear after shipment.",
      },
      {
        question: 'Is my order insured during shipping?',
        answer: 'Yes. All Bonjoojoo orders are fully insured during transit and shipped in a discreet, unmarked outer package for your security. Signature confirmation is required on orders over $500.',
      },
    ],
  },
  {
    title: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer 30-day hassle-free returns on all items in their original unworn condition with tags attached and original packaging. Custom pieces, engraved jewelry, and items marked Final Sale are not eligible for return. To start a return, visit bonjoojoo.com/returns/start or contact hello@bonjoojoo.com.',
      },
      {
        question: 'How do exchanges work?',
        answer: "Exchanges for a different size, metal, or style are accepted within 30 days of delivery. Contact our team at hello@bonjoojoo.com to initiate an exchange. We'll send you a prepaid return label and ship the new item once we receive the original.",
      },
      {
        question: 'How long does a refund take?',
        answer: 'Refunds are processed within 3–5 business days of receiving your return. Credit card refunds typically appear on your statement within 5–10 business days depending on your bank. Store credit is issued immediately upon return receipt.',
      },
    ],
  },
  {
    title: 'Sizing',
    items: [
      {
        question: 'How do I find my ring size?',
        answer: "You can find your ring size using our free Ring Size Guide (available on any product page). We recommend measuring at the end of the day when fingers are at their largest, and to avoid measuring when cold. If you're between sizes, we recommend sizing up. You can also visit our showroom in Los Angeles for a professional sizing.",
      },
      {
        question: 'Do you offer free ring resizing?',
        answer: 'Yes. We offer one complimentary ring resizing within 60 days of purchase. The ring must be returned in its original condition. Simply contact hello@bonjoojoo.com to arrange. Additional resizes are available for a small fee depending on the complexity of the design.',
      },
      {
        question: "What if my bracelet or necklace doesn't fit?",
        answer: 'Our necklaces come with standard 16" + 2" extender chains. Bracelets include adjustable closures where possible. If a piece does not fit, contact us within 30 days and we\'ll arrange a free adjustment or exchange for a different length.',
      },
    ],
  },
  {
    title: 'Materials & Allergies',
    items: [
      {
        question: 'What metals do you use?',
        answer: 'Our jewelry is crafted in 14k and 18k gold (yellow, white, and rose), and 925 sterling silver with rhodium plating. All metals are nickel-tested and hypoallergenic where specified. Each product page lists the exact metal composition.',
      },
      {
        question: 'Is your jewelry safe for sensitive skin?',
        answer: 'Our 14k and 18k gold pieces are safe for sensitive skin. We do not use nickel in our gold alloys. Sterling silver pieces are rhodium-plated to minimize tarnish and skin reactions. If you have a known metal allergy, we recommend 14k or 18k gold. Contact us at hello@bonjoojoo.com for personalized advice.',
      },
    ],
  },
  {
    title: 'Care & Maintenance',
    items: [
      {
        question: 'How do I care for my Bonjoojoo jewelry?',
        answer: 'Clean your jewelry with warm water, mild dish soap, and a soft-bristle brush (a baby toothbrush works well). Rinse thoroughly and pat dry with a lint-free cloth. Store each piece in a separate soft pouch or the original Bonjoojoo box to prevent scratching. Bring it to a jeweler annually for professional inspection.',
      },
      {
        question: 'What should I avoid?',
        answer: 'Avoid exposing your jewelry to chlorine (pools, hot tubs), harsh cleaning chemicals, hairspray, lotions, and perfumes. Remove jewelry before exercising, sleeping, or showering. Ultrasonic cleaners are safe for diamonds but should be avoided for pieces with soft gemstones or enamel details.',
      },
      {
        question: 'Do you offer a warranty?',
        answer: 'Yes. All Bonjoojoo pieces come with a 1-year warranty against manufacturing defects, covering prong tightening, stone tightening, and clasp repair. This does not cover accidental damage, loss, or normal wear. Visit bonjoojoo.com/help/warranty for full details.',
      },
    ],
  },
  {
    title: 'Payment & Financing',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), Apple Pay, Google Pay, Shop Pay, and PayPal. All transactions are secured with 256-bit SSL encryption.',
      },
      {
        question: 'Do you offer buy now, pay later?',
        answer: 'Yes. We offer interest-free installments through Afterpay (4 payments over 6 weeks) and Shop Pay Installments (4–12 months). These options are available at checkout for eligible orders. No credit check is required for Afterpay.',
      },
    ],
  },
  {
    title: 'Gifting & Personalization',
    items: [
      {
        question: 'Can I get my jewelry engraved?',
        answer: 'Yes. Many of our pieces can be personalized with engraving — names, initials, dates, or a short message (up to 20 characters depending on the piece). Select the engraving option on the product page or visit bonjoojoo.com/services/engraving. Engraved pieces are typically ready within 5–7 business days.',
      },
      {
        question: 'Do you offer gift wrapping?',
        answer: 'Yes. Every Bonjoojoo order ships in our signature branded box. Premium gift wrapping with a handwritten note card is available at checkout for $8.99. You can also add a gift receipt so the recipient can exchange for a different size or style.',
      },
      {
        question: 'Can I send a gift directly to someone else?',
        answer: "Absolutely. Enter the recipient's address as the shipping address at checkout. Choose 'This is a gift' to add a personal message, premium wrapping, and a gift receipt. The order confirmation and invoice will be sent only to your email — not included in the package.",
      },
    ],
  },
  {
    title: 'Sustainability',
    items: [
      {
        question: 'How sustainable are lab-grown diamonds?',
        answer: 'Lab-grown diamonds use 95% less land and 98% less water than mined diamonds and produce significantly fewer carbon emissions. Our facility partners are certified to use renewable energy sources. Unlike mined diamonds, our stones require no large-scale earth disruption or mining community displacement.',
      },
      {
        question: 'What is Bonjoojoo doing for the environment?',
        answer: 'Beyond choosing lab-grown diamonds, we use recycled gold and silver in our settings, ship in biodegradable packaging, and partner with 1% for the Planet to donate 1% of annual revenue to environmental nonprofits. Learn more at bonjoojoo.com/about/sustainability.',
      },
    ],
  },
]

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-gray-900 pr-4">{item.question}</span>
            <ChevronDown
              size={18}
              className={`flex-shrink-0 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function FAQClient() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Everything you need to know about Bonjoojoo lab-grown diamond jewelry. Can&apos;t find your answer?{' '}
            <Link href="/contact" className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
              Contact our team
            </Link>{' '}
            or visit our{' '}
            <Link href="/help" className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
              Help Center
            </Link>
            .
          </p>
        </div>

        {/* Quick jump links */}
        <div className="mb-12 p-6 bg-gray-50 rounded-xl">
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-widest mb-4">Jump to a topic</p>
          <div className="flex flex-wrap gap-2">
            {FAQ_SECTIONS.map((section) => (
              <a
                key={section.title}
                href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="text-sm px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {FAQ_SECTIONS.map((section) => (
            <section
              key={section.title}
              id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            >
              <h2 className="text-2xl font-medium text-gray-900 mb-5">{section.title}</h2>
              <FAQAccordion items={section.items} />
            </section>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-16 pt-12 border-t border-gray-200 text-center">
          <h3 className="text-xl font-light text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our jewelry experts are available Monday–Friday, 9 AM–6 PM PST.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
