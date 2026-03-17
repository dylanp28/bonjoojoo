import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '@/lib/stripe/server';
import { authService } from '@/lib/auth/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      amount, 
      currency = 'USD', 
      productIds = [], 
      shippingAddress,
      installments = false 
    } = body;

    // Validate request
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Get user from auth token (if present)
    const authHeader = request.headers.get('authorization');
    let customerId: string | undefined;
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const user = await authService.validateToken(token);
      customerId = user?.id;
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent({
      amount,
      currency,
      customerId,
      shippingAddress,
      productIds,
      installments,
      metadata: {
        source: 'bonjoojoo_website',
        timestamp: new Date().toISOString(),
        user_agent: request.headers.get('user-agent') || 'unknown'
      }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}