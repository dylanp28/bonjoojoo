import type { Metadata } from 'next'
import './globals.css'
import '../styles/pandora-animations.css'
import { PerformanceOptimizer, CriticalResourceHints, MobilePerformanceOptimizer } from '@/components/PerformanceOptimizer'
import { AuthProvider } from '@/hooks/useAuth'
import { ClientLayout } from '@/components/ClientLayout'

export const metadata: Metadata = {
  metadataBase: new URL('https://bonjoojoo.com'),
  title: {
    default: 'Bonjoojoo | Ethical Lab-Grown Diamond Jewelry',
    template: '%s | Bonjoojoo',
  },
  description: 'Discover sustainable luxury with lab-grown diamonds. IGI & GIA certified, 95% less environmental impact, exceptional value. Handcrafted in LA.',
  keywords: ['lab grown diamonds', 'sustainable jewelry', 'ethical diamonds', 'bonjoojoo', 'lab-grown diamond rings', 'diamond jewelry LA'],
  alternates: {
    canonical: 'https://bonjoojoo.com',
  },
  openGraph: {
    title: 'Bonjoojoo | Ethical Lab-Grown Diamond Jewelry',
    description: 'Sustainable luxury with lab-grown diamonds. IGI & GIA certified. Handcrafted in LA.',
    url: 'https://bonjoojoo.com',
    siteName: 'Bonjoojoo',
    type: 'website',
    images: [
      {
        url: '/images/bonjoojoo-1.png',
        width: 1200,
        height: 630,
        alt: 'Bonjoojoo Lab-Grown Diamond Jewelry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonjoojoo | Ethical Lab-Grown Diamond Jewelry',
    description: 'Sustainable luxury with lab-grown diamonds. IGI & GIA certified. Handcrafted in LA.',
    images: ['/images/bonjoojoo-1.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <CriticalResourceHints />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
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
