'use client'

import Script from 'next/script'
import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// ── IDs (set in .env.local) ──────────────────────────────────────────────────
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

// ── Type helpers ─────────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
    fbq: (...args: unknown[]) => void
    _fbq: unknown
  }
}

export interface AnalyticsItem {
  item_id: string
  item_name: string
  item_category?: string
  item_variant?: string
  price: number
  quantity?: number
}

// ── GA4 helpers ──────────────────────────────────────────────────────────────
function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// ── Meta Pixel helpers ───────────────────────────────────────────────────────
function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args)
  }
}

// ── Exported tracking functions ───────────────────────────────────────────────

/** Product page view (GA4 view_item + Meta ViewContent) */
export function trackViewItem(item: AnalyticsItem) {
  gtag('event', 'view_item', {
    currency: 'USD',
    value: item.price,
    items: [{ ...item, quantity: item.quantity ?? 1 }],
  })
  fbq('track', 'ViewContent', {
    content_ids: [item.item_id],
    content_name: item.item_name,
    content_type: 'product',
    value: item.price,
    currency: 'USD',
  })
}

/** Add to cart (GA4 add_to_cart + Meta AddToCart) */
export function trackAddToCart(item: AnalyticsItem) {
  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: item.price * (item.quantity ?? 1),
    items: [{ ...item, quantity: item.quantity ?? 1 }],
  })
  fbq('track', 'AddToCart', {
    content_ids: [item.item_id],
    content_name: item.item_name,
    content_type: 'product',
    value: item.price * (item.quantity ?? 1),
    currency: 'USD',
  })
}

/** Begin checkout (GA4 begin_checkout + Meta InitiateCheckout) */
export function trackBeginCheckout(items: AnalyticsItem[], total: number) {
  gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: total,
    items,
  })
  fbq('track', 'InitiateCheckout', {
    content_ids: items.map((i) => i.item_id),
    num_items: items.reduce((s, i) => s + (i.quantity ?? 1), 0),
    value: total,
    currency: 'USD',
  })
}

/** Purchase (GA4 purchase + Meta Purchase) */
export function trackPurchase(
  orderId: string,
  items: AnalyticsItem[],
  total: number,
  tax?: number,
  shipping?: number
) {
  gtag('event', 'purchase', {
    transaction_id: orderId,
    currency: 'USD',
    value: total,
    tax: tax ?? 0,
    shipping: shipping ?? 0,
    items,
  })
  fbq('track', 'Purchase', {
    content_ids: items.map((i) => i.item_id),
    content_type: 'product',
    value: total,
    currency: 'USD',
    num_items: items.reduce((s, i) => s + (i.quantity ?? 1), 0),
  })
}

/** Email sign-up / lead capture */
export function trackEmailSignup(source?: string) {
  gtag('event', 'generate_lead', { event_category: 'engagement', event_label: source ?? 'email_signup' })
  fbq('track', 'Lead', { content_name: source ?? 'email_signup' })
}

/** Wishlist add */
export function trackWishlist(item: AnalyticsItem) {
  gtag('event', 'add_to_wishlist', {
    currency: 'USD',
    value: item.price,
    items: [item],
  })
  fbq('track', 'AddToWishlist', {
    content_ids: [item.item_id],
    content_name: item.item_name,
    value: item.price,
    currency: 'USD',
  })
}

/** Search */
export function trackSearch(term: string) {
  gtag('event', 'search', { search_term: term })
  fbq('track', 'Search', { search_string: term })
}

// ── Route-change page-view tracker ───────────────────────────────────────────
function RouteChangeTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA4_ID) return
    const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`
    gtag('config', GA4_ID, { page_path: url })
  }, [pathname, searchParams])

  return null
}

// ── Main Analytics component (add to root layout) ────────────────────────────
export default function Analytics() {
  if (!GA4_ID && !META_PIXEL_ID) return null

  return (
    <>
      {/* Google Analytics 4 */}
      {GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', {
                page_path: window.location.pathname,
                send_page_view: true,
                cookie_flags: 'max-age=7200;secure;samesite=none'
              });
            `}
          </Script>
          <Suspense fallback={null}>
            <RouteChangeTracker />
          </Suspense>
        </>
      )}

      {/* Meta Pixel */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  )
}
