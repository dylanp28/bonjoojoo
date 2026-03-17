import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe client instance
 * Handles high-value transactions with enhanced security
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      {
        // Enhanced options for luxury jewelry transactions
        advancedFraudSignals: true,
        locale: 'auto',
        apiVersion: '2023-10-16'
      }
    );
  }
  return stripePromise;
};

/**
 * Stripe configuration for luxury jewelry
 */
export const stripeConfig = {
  // Support high-value transactions
  maximumAmount: 5000000, // $50,000 in cents
  
  // Enhanced security for luxury goods
  captureMethod: 'automatic_async' as const,
  confirmationMethod: 'automatic' as const,
  
  // 3D Secure authentication
  paymentMethodOptions: {
    card: {
      request_three_d_secure: 'automatic' as const,
      setup_future_usage: 'off_session' as const
    }
  },
  
  // International support
  supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  
  // Luxury transaction metadata
  metadata: {
    category: 'luxury_jewelry',
    business_type: 'fine_jewelry',
    risk_level: 'high_value'
  }
};

/**
 * Format amount for Stripe (convert to cents)
 */
export const formatAmountForStripe = (amount: number, currency: string): number => {
  // Zero-decimal currencies (JPY, etc.)
  const zeroDecimalCurrencies = ['bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'];
  
  return zeroDecimalCurrencies.includes(currency.toLowerCase()) 
    ? Math.round(amount)
    : Math.round(amount * 100);
};

/**
 * Format amount for display (convert from cents)
 */
export const formatAmountFromStripe = (amount: number, currency: string): number => {
  const zeroDecimalCurrencies = ['bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'];
  
  return zeroDecimalCurrencies.includes(currency.toLowerCase()) 
    ? amount
    : amount / 100;
};

/**
 * Create installment options for high-value jewelry
 */
export const createInstallmentOptions = (amount: number) => {
  // Only offer installments for purchases over $1,000
  if (amount < 100000) return null;
  
  return {
    available: true,
    plans: [
      { 
        count: 3, 
        interval: 'month',
        minAmount: 100000, // $1,000
        maxAmount: 1000000 // $10,000
      },
      { 
        count: 6, 
        interval: 'month',
        minAmount: 300000, // $3,000
        maxAmount: 2000000 // $20,000
      },
      { 
        count: 12, 
        interval: 'month',
        minAmount: 500000, // $5,000
        maxAmount: 5000000 // $50,000
      }
    ]
  };
};

export default getStripe;