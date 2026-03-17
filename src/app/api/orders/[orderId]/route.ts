import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// This would normally come from your database
const orders: any[] = []

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
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

    const orderId = params.orderId

    // Find the order
    const order = orders.find(o => o.orderId === orderId && o.userId === userId)

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      order
    })

  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve order' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    // This endpoint can be used to update order status, tracking info, etc.
    const body = await req.json()
    const orderId = params.orderId

    // Find and update the order
    const orderIndex = orders.findIndex(o => o.orderId === orderId)

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      order: orders[orderIndex]
    })

  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}