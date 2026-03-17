import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
}

interface EnvironmentalImpact {
  carbonSaved: string
  waterSaved: string
}

interface CreateOrderRequest {
  paymentIntentId: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  subtotal: number
  shipping: number
  tax: number
  total: number
  environmentalImpact: EnvironmentalImpact
}

// In-memory orders store (in production, use a proper database)
const orders: any[] = []

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    let userId: string

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body: CreateOrderRequest = await req.json()
    const {
      paymentIntentId,
      items,
      shippingInfo,
      subtotal,
      shipping,
      tax,
      total,
      environmentalImpact
    } = body

    // Generate order ID
    const orderId = `BJ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order object
    const order = {
      orderId,
      userId,
      paymentIntentId,
      items,
      shippingInfo,
      billing: {
        subtotal,
        shipping,
        tax,
        total
      },
      environmentalImpact,
      status: 'confirmed',
      trackingNumber: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    }

    // Store order (in production, save to database)
    orders.push(order)

    console.log('Order created:', {
      orderId: order.orderId,
      userId,
      total,
      itemCount: items.length
    })

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      order
    })

  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    let userId: string

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
      userId = decoded.userId
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get user's orders
    const userOrders = orders
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      success: true,
      orders: userOrders
    })

  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve orders' },
      { status: 500 }
    )
  }
}