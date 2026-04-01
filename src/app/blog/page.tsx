import { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Journal — Guides, Gift Ideas & Style Tips',
  description: 'Explore the Bonjoojoo Journal for diamond buying guides, jewelry gift ideas, and expert styling tips. Learn about the 4Cs, lab-grown diamonds, and how to style fine jewelry.',
  alternates: { canonical: 'https://bonjoojoo.com/blog' },
  openGraph: {
    title: 'Journal | Bonjoojoo',
    description: 'Diamond guides, gift ideas, and styling tips from the Bonjoojoo editorial team.',
    url: 'https://bonjoojoo.com/blog',
    siteName: 'Bonjoojoo',
    type: 'website',
    images: [{ url: 'https://bonjoojoo.com/images/bonjoojoo-1.png', width: 1200, height: 630, alt: 'Bonjoojoo Journal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal | Bonjoojoo',
    description: 'Diamond guides, gift ideas, and styling tips from the Bonjoojoo editorial team.',
    images: ['https://bonjoojoo.com/images/bonjoojoo-1.png'],
  },
}

export default function BlogPage() {
  return <BlogClient />
}
