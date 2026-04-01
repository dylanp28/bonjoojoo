import type { Metadata } from 'next'
import './globals.css'
import '../styles/pandora-animations.css'
import { PerformanceOptimizer, CriticalResourceHints, MobilePerformanceOptimizer } from '@/components/PerformanceOptimizer'
import { AuthProvider } from '@/hooks/useAuth'
import { ClientLayout } from '@/components/ClientLayout'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://bonjoojoo.com'),
  title: {
    default: 'Bonjoojoo | Lab-Grown Diamond Jewelry',
    template: '%s | Bonjoojoo',
  },
  description: 'Discover sustainable luxury with lab-grown diamonds. IGI & GIA certified, 95% less environmental impact, exceptional value. Handcrafted in LA.',
  keywords: ['lab grown diamonds', 'sustainable jewelry', 'ethical diamonds', 'bonjoojoo', 'lab-grown diamond rings', 'diamond jewelry LA'],
  openGraph: {
    title: 'Bonjoojoo | Lab-Grown Diamond Jewelry',
    description: 'Sustainable luxury with lab-grown diamonds. IGI & GIA certified. Handcrafted in LA.',
    type: 'website',
    url: 'https://bonjoojoo.com',
    siteName: 'Bonjoojoo',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Bonjoojoo Lab-Grown Diamond Jewelry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bonjoojoo',
    creator: '@bonjoojoo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bonjoojoo.com',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <CriticalResourceHints />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Analytics />
        <PerformanceOptimizer />
        <MobilePerformanceOptimizer />
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
