import { Metadata } from 'next'
import Script from 'next/script'
import FAQClient from './FAQClient'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Bonjoojoo lab-grown diamond jewelry, sizing, care, shipping, returns, and more.',
  alternates: { canonical: 'https://bonjoojoo.com/faq' },
  openGraph: {
    title: 'FAQ | Bonjoojoo',
    description: 'Answers to common questions about lab-grown diamonds, sizing, care, shipping, and returns.',
    url: 'https://bonjoojoo.com/faq',
    siteName: 'Bonjoojoo',
    type: 'website',
    images: [{ url: 'https://bonjoojoo.com/images/bonjoojoo-1.png', width: 1200, height: 630, alt: 'Bonjoojoo FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Bonjoojoo',
    description: 'Answers to common questions about lab-grown diamonds, sizing, care, shipping, and returns.',
    images: ['https://bonjoojoo.com/images/bonjoojoo-1.png'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are lab-grown diamonds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lab-grown diamonds are real diamonds created in controlled laboratory conditions using advanced technology (HPHT or CVD) that replicates the natural diamond formation process. They have the same chemical, physical, and optical properties as mined diamonds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are lab-grown diamonds real diamonds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lab-grown diamonds are chemically and physically identical to mined diamonds. They exhibit the same brilliance, fire, and scintillation, and are graded by the same internationally recognized standards (IGI, GIA).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard shipping (free on all orders) takes 5–7 business days. Express shipping (2–3 business days) is available at checkout for an additional fee.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer international shipping?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we ship to over 40 countries worldwide. International delivery typically takes 10–15 business days. Orders may be subject to import duties and taxes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your return policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer 30-day hassle-free returns on all items in their original unworn condition. Custom pieces and engraved jewelry are not eligible for return.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find my ring size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can find your ring size using our free Ring Size Guide available on any product page. We recommend measuring at the end of the day when fingers are at their largest.',
      },
    },
    {
      '@type': 'Question',
      name: 'What metals do you use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our jewelry is crafted in 14k and 18k gold (yellow, white, and rose), and 925 sterling silver with rhodium plating. All metals are nickel-tested and hypoallergenic where specified.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I care for my jewelry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clean your jewelry with warm water, mild dish soap, and a soft-bristle brush. Rinse thoroughly and pat dry with a lint-free cloth. Store each piece separately to prevent scratching.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), Apple Pay, Google Pay, Shop Pay, and PayPal. All transactions are secured with 256-bit SSL encryption.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer buy now, pay later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer interest-free installments through Afterpay (4 payments over 6 weeks) and Shop Pay Installments (4–12 months). Available at checkout for eligible orders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get my jewelry engraved?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many of our pieces can be personalized with engraving — names, initials, dates, or a short message. Select the engraving option on the product page or visit bonjoojoo.com/services/engraving.',
      },
    },
    {
      '@type': 'Question',
      name: 'How sustainable are lab-grown diamonds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lab-grown diamonds use 95% less land and 98% less water than mined diamonds and produce significantly fewer carbon emissions. Our facility partners are certified to use renewable energy sources.',
      },
    },
  ],
}

export default function FAQPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  )
}
