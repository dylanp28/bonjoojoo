import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lab-Grown Diamonds | What They Are & Why They Matter',
  description:
    'Lab-grown diamonds are real diamonds — chemically identical to mined stones, IGI & GIA certified, 60–80% less expensive, and 95% lower environmental impact. Learn more at Bonjoojoo.',
  alternates: { canonical: 'https://bonjoojoo.com/education/lab-grown-diamonds' },
  openGraph: {
    title: 'Lab-Grown Diamonds | What They Are & Why They Matter | Bonjoojoo',
    description:
      'Real diamonds, grown in a lab. Chemically identical to mined stones. IGI & GIA certified. 60–80% less expensive. 95% lower environmental impact.',
    url: 'https://bonjoojoo.com/education/lab-grown-diamonds',
    siteName: 'Bonjoojoo',
    type: 'article',
    images: [
      {
        url: 'https://bonjoojoo.com/images/lab-grown-education.png',
        width: 1200,
        height: 630,
        alt: 'Lab-Grown Diamonds — Bonjoojoo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lab-Grown Diamonds | Bonjoojoo',
    description:
      'Real diamonds, grown in a lab. IGI & GIA certified. 60–80% less expensive. 95% lower environmental impact.',
    images: ['https://bonjoojoo.com/images/lab-grown-education.png'],
  },
}

export default function LabGrownDiamondsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
