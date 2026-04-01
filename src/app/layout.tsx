import type { Metadata } from 'next'
import Script from 'next/script'
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bonjoojoo.com/#organization',
      name: 'Bonjoojoo',
      url: 'https://bonjoojoo.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bonjoojoo.com/logos/bonjoojoo-logo-primary.svg',
        width: 200,
        height: 60,
      },
      sameAs: [
        'https://www.instagram.com/bonjoojoo',
        'https://www.facebook.com/bonjoojoo',
        'https://www.tiktok.com/@bonjoojoo',
        'https://www.pinterest.com/bonjoojoo',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://bonjoojoo.com/#website',
      url: 'https://bonjoojoo.com',
      name: 'Bonjoojoo',
      publisher: { '@id': 'https://bonjoojoo.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://bonjoojoo.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Preconnect to gstatic BEFORE the stylesheet to warm the connection early */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://api.stripe.com" />
      </head>
      <body>
        {/* Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}', {
                send_page_view: true,
                cookie_domain: 'auto',
                anonymize_ip: true
              });
            `}</Script>
          </>
        )}

        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <>
            <Script id="fb-pixel-init" strategy="afterInteractive">{`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}</Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

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
