import { sql } from '@vercel/postgres'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
}

export interface EnvironmentalImpact {
  carbonSaved: string
  waterSaved: string
}

export interface Order {
  orderId: string
  userId: string
  paymentIntentId: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  billing: {
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
  environmentalImpact?: EnvironmentalImpact
  status: string
  trackingNumber: string | null
  createdAt: string
  updatedAt: string
  estimatedDelivery: string
}

export async function createOrder(order: Omit<Order, 'createdAt' | 'updatedAt'>): Promise<Order> {
  const now = new Date().toISOString()

  const result = await sql`
    INSERT INTO orders (
      order_id, user_id, payment_intent_id, items, shipping_info, billing,
      environmental_impact, status, tracking_number, estimated_delivery,
      created_at, updated_at
    ) VALUES (
      ${order.orderId},
      ${order.userId},
      ${order.paymentIntentId},
      ${JSON.stringify(order.items)},
      ${JSON.stringify(order.shippingInfo)},
      ${JSON.stringify(order.billing)},
      ${order.environmentalImpact ? JSON.stringify(order.environmentalImpact) : null},
      ${order.status},
      ${order.trackingNumber},
      ${order.estimatedDelivery},
      ${now},
      ${now}
    )
    ON CONFLICT (payment_intent_id) DO NOTHING
    RETURNING *
  `

  if (result.rowCount === 0) {
    // Already exists due to idempotency constraint — return the existing row
    const existing = await getOrderByPaymentIntent(order.paymentIntentId)
    if (!existing) throw new Error('Order conflict: could not retrieve existing order')
    return existing
  }

  return rowToOrder(result.rows[0])
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const result = await sql`
    SELECT * FROM orders
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
  return result.rows.map(rowToOrder)
}

export async function getOrderByPaymentIntent(paymentIntentId: string): Promise<Order | null> {
  const result = await sql`
    SELECT * FROM orders WHERE payment_intent_id = ${paymentIntentId}
  `
  if (result.rowCount === 0) return null
  return rowToOrder(result.rows[0])
}

export async function updateOrderStatus(
  paymentIntentId: string,
  status: string
): Promise<Order | null> {
  const result = await sql`
    UPDATE orders
    SET status = ${status}, updated_at = ${new Date().toISOString()}
    WHERE payment_intent_id = ${paymentIntentId}
    RETURNING *
  `
  if (result.rowCount === 0) return null
  return rowToOrder(result.rows[0])
}

function rowToOrder(row: Record<string, any>): Order {
  const parse = (val: unknown) =>
    typeof val === 'string' ? JSON.parse(val) : val

  return {
    orderId: row.order_id,
    userId: row.user_id,
    paymentIntentId: row.payment_intent_id,
    items: parse(row.items),
    shippingInfo: parse(row.shipping_info),
    billing: parse(row.billing),
    environmentalImpact: row.environmental_impact ? parse(row.environmental_impact) : undefined,
    status: row.status,
    trackingNumber: row.tracking_number,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    estimatedDelivery: row.estimated_delivery,
  }
}
