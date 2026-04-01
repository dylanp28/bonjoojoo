export interface PromoCode {
  code: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
  minimumOrder?: number
}

export interface AppliedPromo {
  code: string
  description: string
  discount: number
}

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'WELCOME10',
    description: '10% off your first order',
    type: 'percentage',
    value: 10,
  },
  {
    code: 'SAVE20',
    description: '20% off orders over $500',
    type: 'percentage',
    value: 20,
    minimumOrder: 500,
  },
  {
    code: 'LABDIAMOND',
    description: '15% off all items',
    type: 'percentage',
    value: 15,
  },
  {
    code: 'GIFT50',
    description: '$50 off orders over $300',
    type: 'fixed',
    value: 50,
    minimumOrder: 300,
  },
]

export function validatePromoCode(
  code: string,
  subtotal: number,
): { valid: true; promo: PromoCode } | { valid: false; error: string } {
  const promo = PROMO_CODES.find(p => p.code === code.toUpperCase().trim())
  if (!promo) {
    return { valid: false, error: 'Invalid promo code' }
  }
  if (promo.minimumOrder && subtotal < promo.minimumOrder) {
    return {
      valid: false,
      error: `Minimum order of $${promo.minimumOrder} required for this code`,
    }
  }
  return { valid: true, promo }
}

export function calculateDiscount(promo: PromoCode, subtotal: number): number {
  if (promo.type === 'percentage') {
    return subtotal * (promo.value / 100)
  }
  return Math.min(promo.value, subtotal)
}
