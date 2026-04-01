import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmation, type OrderConfirmationData } from '@/lib/email/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, email, customerName, items, subtotal, shipping, tax, total, shippingAddress, estimatedDelivery, trackingUrl } = body

    if (!orderId || !email) {
      return NextResponse.json({ error: 'orderId and email are required' }, { status: 400 })
    }

    const orderData: OrderConfirmationData = {
      orderId,
      customerEmail: email,
      customerName: customerName ?? 'Valued Customer',
      items: items ?? [],
      subtotal: subtotal ?? 0,
      shipping: shipping ?? 0,
      tax: tax ?? 0,
      total: total ?? 0,
      shippingAddress: shippingAddress ?? {
        line1: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US',
      },
      estimatedDelivery,
      trackingUrl,
    }

    const result = await sendOrderConfirmation(orderData)

    if (!result.success) {
      // Log but don't hard-fail — email is non-critical path for order flow
      console.error('[send-confirmation] Email send failed:', result.error)
      return NextResponse.json({
        success: false,
        message: 'Order recorded but confirmation email could not be sent',
        orderId,
        error: result.error,
      }, { status: 207 })
    }

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent',
      orderId,
      messageId: result.messageId,
    })

  } catch (error) {
    console.error('Send confirmation email error:', error)
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    )
  }
}
