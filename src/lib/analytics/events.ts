/**
 * Lightweight client-side analytics event helpers.
 * Wraps window.gtag (GA4) and window.fbq (Facebook Pixel) with safe guards.
 * Scripts are injected in layout.tsx — these helpers are safe to call even
 * if the env vars are not set (they no-op gracefully).
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}

// ─── GA4 helpers ─────────────────────────────────────────────────────────────

function gtag(...args: any[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

function fbq(...args: any[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

// ─── ViewContent / view_item ─────────────────────────────────────────────────

export interface ViewContentParams {
  id: string
  name: string
  category?: string
  price: number
  currency?: string
}

export function trackViewContent(params: ViewContentParams) {
  const { id, name, category, price, currency = 'USD' } = params

  // GA4 view_item
  gtag('event', 'view_item', {
    currency,
    value: price,
    items: [
      {
        item_id: id,
        item_name: name,
        item_category: category,
        price,
        quantity: 1,
      },
    ],
  })

  // Facebook Pixel ViewContent
  fbq('track', 'ViewContent', {
    content_type: 'product',
    content_ids: [id],
    content_name: name,
    value: price,
    currency,
  })
}

// ─── AddToCart / add_to_cart ──────────────────────────────────────────────────

export interface AddToCartParams {
  id: string
  name: string
  category?: string
  price: number
  quantity?: number
  currency?: string
}

export function trackAddToCart(params: AddToCartParams) {
  const { id, name, category, price, quantity = 1, currency = 'USD' } = params
  const value = price * quantity

  // GA4 add_to_cart
  gtag('event', 'add_to_cart', {
    currency,
    value,
    items: [
      {
        item_id: id,
        item_name: name,
        item_category: category,
        price,
        quantity,
      },
    ],
  })

  // Facebook Pixel AddToCart
  fbq('track', 'AddToCart', {
    content_type: 'product',
    content_ids: [id],
    content_name: name,
    value,
    currency,
  })
}

// ─── Purchase ─────────────────────────────────────────────────────────────────

export interface PurchaseItem {
  id: string
  name: string
  category?: string
  price: number
  quantity: number
}

export interface PurchaseParams {
  transactionId: string
  items: PurchaseItem[]
  total: number
  subtotal?: number
  shipping?: number
  tax?: number
  coupon?: string
  currency?: string
}

export function trackPurchase(params: PurchaseParams) {
  const {
    transactionId,
    items,
    total,
    subtotal,
    shipping = 0,
    tax = 0,
    coupon,
    currency = 'USD',
  } = params

  // GA4 purchase
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    currency,
    value: total,
    shipping,
    tax,
    coupon,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })

  // Facebook Pixel Purchase
  fbq('track', 'Purchase', {
    value: total,
    currency,
    content_type: 'product',
    content_ids: items.map((i) => i.id),
    num_items: items.reduce((s, i) => s + i.quantity, 0),
  })
}

// ─── Thank You Page Events ────────────────────────────────────────────────────

export function trackThankYouView(params: { orderNumber: string; total: number; currency?: string }) {
  const { orderNumber, total, currency = 'USD' } = params
  gtag('event', 'purchase_complete', {
    transaction_id: orderNumber,
    currency,
    value: total,
  })
}

export function trackReferralShareClick(channel: 'instagram' | 'whatsapp' | 'copy_link') {
  gtag('event', 'referral_share_click', {
    channel,
  })
}

export function trackUpsellClick(params: { productId: string; productName: string; position?: number }) {
  const { productId, productName, position } = params
  gtag('event', 'upsell_click', {
    item_id: productId,
    item_name: productName,
    position,
  })
}
