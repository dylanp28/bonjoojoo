import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, paymentMethodId } = await request.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const authResult = await authService.verifyToken(token);
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = authResult.user!;

    // Retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Verify the payment intent belongs to this user
    if (paymentIntent.metadata.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    let confirmedPaymentIntent;

    if (paymentMethodId) {
      // Confirm with specific payment method
      confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
        use_stripe_sdk: true,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/complete?payment_intent=${paymentIntentId}`
      });
    } else {
      // Confirm existing payment intent
      confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        use_stripe_sdk: true,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/complete?payment_intent=${paymentIntentId}`
      });
    }

    // Log payment attempt
    await authService.logSecurityEvent({
      type: 'payment_confirmation_attempted',
      userId: user.id,
      metadata: {
        paymentIntentId,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: confirmedPaymentIntent.status,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      paymentIntent: {
        id: confirmedPaymentIntent.id,
        status: confirmedPaymentIntent.status,
        client_secret: confirmedPaymentIntent.client_secret,
        next_action: confirmedPaymentIntent.next_action
      }
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    
    // Log error for security monitoring
    try {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const authResult = await authService.verifyToken(token);
        if (authResult.success) {
          await authService.logSecurityEvent({
            type: 'payment_confirmation_failed',
            userId: authResult.user!.id,
            metadata: {
              error: error instanceof Error ? error.message : 'Unknown error',
              userAgent: request.headers.get('user-agent'),
              ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
            },
            timestamp: new Date()
          });
        }
      }
    } catch (logError) {
      console.error('Error logging payment failure:', logError);
    }

    if (error instanceof Error && error.message.includes('stripe')) {
      return NextResponse.json(
        { error: 'Payment processing error' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}