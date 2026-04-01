import { Resend } from 'resend'

let resend: Resend | null = null

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY is not set — email sending is disabled. Set this env var to activate real sends.')
    return null
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
  imageUrl?: string
}

export interface OrderConfirmationData {
  orderId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  estimatedDelivery?: string
  trackingUrl?: string
}

function buildOrderConfirmationHtml(order: OrderConfirmationData): string {
  const itemRows = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8;">${item.name}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`
    )
    .join('')

  const addressLine = [
    order.shippingAddress.line1,
    order.shippingAddress.line2,
    `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`,
    order.shippingAddress.country,
  ]
    .filter(Boolean)
    .join('<br>')

  const trackButton = order.trackingUrl
    ? `<a href="${order.trackingUrl}" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:4px;font-size:14px;">Track your order</a>`
    : ''

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'Georgia',serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#c9a96e;font-size:22px;letter-spacing:4px;text-transform:uppercase;">bonjoojoo</p>
              <p style="margin:8px 0 0;color:#fff;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.6;">Lab-Grown Diamond Jewelry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">

              <h1 style="margin:0 0 8px;font-size:24px;font-weight:normal;">Order Confirmed</h1>
              <p style="margin:0 0 4px;color:#666;font-size:14px;">Hi ${order.customerName},</p>
              <p style="margin:0 0 32px;color:#666;font-size:14px;">Thank you for your order! We're preparing your pieces with care.</p>

              <!-- Order ID -->
              <p style="margin:0 0 24px;font-size:13px;color:#888;">Order <strong style="color:#1a1a1a;">#${order.orderId}</strong></p>

              <!-- Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <th style="text-align:left;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;padding-bottom:8px;border-bottom:2px solid #1a1a1a;">Item</th>
                  <th style="text-align:center;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;padding-bottom:8px;border-bottom:2px solid #1a1a1a;">Qty</th>
                  <th style="text-align:right;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;padding-bottom:8px;border-bottom:2px solid #1a1a1a;">Price</th>
                </tr>
                ${itemRows}
              </table>

              <!-- Totals -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="font-size:13px;color:#888;padding:4px 0;">Subtotal</td>
                  <td style="font-size:13px;text-align:right;">$${order.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding:4px 0;">Shipping</td>
                  <td style="font-size:13px;text-align:right;">${order.shipping === 0 ? 'Free' : '$' + order.shipping.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding:4px 0;">Tax</td>
                  <td style="font-size:13px;text-align:right;">$${order.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="font-size:15px;font-weight:bold;padding:12px 0 4px;border-top:1px solid #e8e4de;">Total</td>
                  <td style="font-size:15px;font-weight:bold;text-align:right;padding:12px 0 4px;border-top:1px solid #e8e4de;">$${order.total.toFixed(2)}</td>
                </tr>
              </table>

              <!-- Shipping address -->
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;">Shipping to</p>
              <p style="margin:0 0 24px;font-size:13px;line-height:1.6;">${addressLine}</p>

              ${order.estimatedDelivery ? `<p style="margin:0 0 8px;font-size:13px;color:#666;">Estimated delivery: <strong>${order.estimatedDelivery}</strong></p>` : ''}

              ${trackButton}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f5f2ed;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;">Questions? Reply to this email or visit <a href="https://bonjoojoo.com" style="color:#c9a96e;">bonjoojoo.com</a></p>
              <p style="margin:8px 0 0;font-size:11px;color:#bbb;">© ${new Date().getFullYear()} bonjoojoo. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export async function sendOrderConfirmation(order: OrderConfirmationData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const client = getResendClient()

  if (!client) {
    console.warn(`[email] Skipping order confirmation for order ${order.orderId} — RESEND_API_KEY not set.`)
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const { data, error } = await client.emails.send({
      from: 'Bonjoojoo Orders <onboarding@resend.dev>',
      to: order.customerEmail,
      subject: `Your Bonjoojoo order is confirmed! (#${order.orderId})`,
      html: buildOrderConfirmationHtml(order),
    })

    if (error) {
      console.error('[email] Resend API error:', error)
      return { success: false, error: error.message }
    }

    console.log(`[email] Order confirmation sent for ${order.orderId} → ${order.customerEmail} (messageId: ${data?.id})`)
    return { success: true, messageId: data?.id }
  } catch (err: any) {
    console.error('[email] Unexpected error sending order confirmation:', err)
    return { success: false, error: err?.message ?? 'Unknown error' }
  }
}
