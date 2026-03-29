import type { Metadata } from 'next'
import './globals.css'
import '../styles/pandora-animations.css'
import { PerformanceOptimizer, CriticalResourceHints, MobilePerformanceOptimizer } from '@/components/PerformanceOptimizer'
import { AuthProvider } from '@/hooks/useAuth'
import { ClientLayout } from '@/components/ClientLayout'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Bonjoojoo | Lab-Grown Diamond Jewelry',
  description: 'Discover sustainable luxury with lab-grown diamonds. IGI & GIA certified, 95% less environmental impact, exceptional value. Handcrafted in LA.',
  keywords: ['lab grown diamonds', 'sustainable jewelry', 'ethical diamonds', 'bonjoojoo', 'lab-grown diamond rings', 'diamond jewelry LA'],
  openGraph: {
    title: 'Bonjoojoo | Lab-Grown Diamond Jewelry',
    description: 'Sustainable luxury with lab-grown diamonds. IGI & GIA certified. Handcrafted in LA.',
    type: 'website',
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
        <Analytics />
      </body>
    </html>
  )
}
