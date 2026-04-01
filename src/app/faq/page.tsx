import { Metadata } from 'next'
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

export default function FAQPage() {
  return <FAQClient />
}
