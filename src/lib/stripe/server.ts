import Stripe from 'stripe';
import { formatAmountForStripe } from './client';

/**
 * Lazy-initialized Stripe client — only throws when actually used without a key,
 * so builds succeed without STRIPE_SECRET_KEY set.
 */
function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    typescript: true,
    appInfo: {
      name: 'Bonjoojoo Luxury Jewelry',
      version: '1.0.0',
    },
  });
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop];
  },
});

export interface CreatePaymentIntentOptions {
  amount: number;
  currency?: string;
  customerId?: string;
  metadata?: Record<string, string>;
  shippingAddress?: Stripe.PaymentIntentCreateParams.Shipping;
  productIds?: string[];
  installments?: boolean;
}

/**
 * Create payment intent for jewelry purchase
 */
export async function createPaymentIntent({
  amount,
  currency = 'USD',
  customerId,
  metadata = {},
  shippingAddress,
  productIds = [],
  installments = false
}: CreatePaymentIntentOptions): Promise<Stripe.PaymentIntent> {
  
  const stripeAmount = formatAmountForStripe(amount, currency);
  
  // Enhanced metadata for luxury jewelry
  const enhancedMetadata = {
    ...metadata,
    category: 'luxury_jewelry',
    product_ids: productIds.join(','),
    high_value: stripeAmount > 500000 ? 'true' : 'false',
    installments_requested: installments ? 'true' : 'false',
    created_at: new Date().toISOString()
  };

  const createParams: Stripe.PaymentIntentCreateParams = {
    amount: stripeAmount,
    currency: currency.toLowerCase(),
    customer: customerId,
    metadata: enhancedMetadata,
    
    // Enhanced security for luxury transactions
    confirmation_method: 'automatic',
    capture_method: stripeAmount > 500000 ? 'automatic_async' : 'automatic',
    
    // 3D Secure authentication
    payment_method_options: {
      card: {
        request_three_d_secure: 'automatic',
        capture_method: stripeAmount > 500000 ? 'manual' : 'automatic'
      }
    },
    
    // Fraud prevention
    radar_options: {
      session: `jewelry_session_${Date.now()}`
    }
  };

  // Add shipping for physical jewelry
  if (shippingAddress) {
    createParams.shipping = shippingAddress;
  }

  // Add installment options for eligible amounts
  if (installments && stripeAmount >= 100000) {
    createParams.payment_method_options = {
      ...createParams.payment_method_options,
      card: {
        ...createParams.payment_method_options?.card,
        installments: {
          enabled: true
        }
      }
    };
  }

  return await stripe.paymentIntents.create(createParams);
}

/**
 * Confirm payment intent with enhanced security
 */
export async function confirmPaymentIntent(
  paymentIntentId: string,
  paymentMethodId: string
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: paymentMethodId,
    
    // Return URL for 3D Secure
    return_url: `${process.env.NEXTAUTH_URL}/payment/confirm`,
    
    // Use the most secure confirmation method
    confirmation_method: 'automatic'
  });
}

/**
 * Create customer for luxury jewelry purchases
 */
export async function createCustomer(
  email: string,
  name: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Customer> {
  return await stripe.customers.create({
    email,
    name,
    metadata: {
      ...metadata,
      customer_type: 'luxury_jewelry',
      created_at: new Date().toISOString()
    }
  });
}

/**
 * Create subscription for jewelry maintenance or warranties
 */
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata: {
      ...metadata,
      subscription_type: 'jewelry_service',
      created_at: new Date().toISOString()
    },
    
    // Enhanced payment security
    payment_behavior: 'default_incomplete',
    payment_settings: {
      payment_method_types: ['card'],
      save_default_payment_method: 'on_subscription'
    },
    
    expand: ['latest_invoice.payment_intent']
  });
}

/**
 * Handle refunds for jewelry returns
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number,
  reason?: Stripe.RefundCreateParams.Reason,
  metadata: Record<string, string> = {}
): Promise<Stripe.Refund> {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount,
    reason,
    metadata: {
      ...metadata,
      refund_type: 'jewelry_return',
      created_at: new Date().toISOString()
    }
  });
}

/**
 * Retrieve payment intent with expanded data
 */
export async function getPaymentIntent(id: string): Promise<Stripe.PaymentIntent | null> {
  try {
    return await stripe.paymentIntents.retrieve(id, {
      expand: ['customer', 'payment_method', 'latest_charge']
    });
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    return null;
  }
}

/**
 * List customer payment methods
 */
export async function getCustomerPaymentMethods(
  customerId: string,
  type: Stripe.PaymentMethodListParams.Type = 'card'
): Promise<Stripe.PaymentMethod[]> {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type
  });
  
  return paymentMethods.data;
}

/**
 * Calculate tax for jewelry purchase
 */
export async function calculateTax(
  amount: number,
  currency: string,
  shippingAddress: Stripe.Tax.CalculationCreateParams.ShippingCost['shipping_address']
): Promise<Stripe.Tax.Calculation> {
  return await stripe.tax.calculations.create({
    currency: currency.toLowerCase(),
    line_items: [{
      amount: formatAmountForStripe(amount, currency),
      reference: 'luxury_jewelry'
    }],
    shipping_cost: {
      amount: formatAmountForStripe(50, currency), // $50 shipping
      shipping_address: shippingAddress
    },
    customer_details: {
      address: shippingAddress,
      address_source: 'shipping'
    }
  });
}

export default stripe;