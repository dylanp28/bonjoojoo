import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, amount, reason } = await request.json();

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

    // Retrieve the payment intent to verify ownership
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Verify the payment intent belongs to this user
    if (paymentIntent.metadata.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Check if payment intent is refundable
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment cannot be refunded. Payment was not successful.' },
        { status: 400 }
      );
    }

    // Calculate refund amount
    const refundAmount = amount || paymentIntent.amount;
    
    if (refundAmount > paymentIntent.amount) {
      return NextResponse.json(
        { error: 'Refund amount cannot exceed original payment amount' },
        { status: 400 }
      );
    }

    // Create the refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: refundAmount,
      reason: reason || 'requested_by_customer',
      metadata: {
        userId: user.id,
        originalAmount: paymentIntent.amount.toString(),
        refundReason: reason || 'customer_request'
      }
    });

    // Log security event
    await authService.logSecurityEvent({
      type: 'refund_processed',
      userId: user.id,
      metadata: {
        paymentIntentId,
        refundId: refund.id,
        originalAmount: paymentIntent.amount,
        refundAmount: refundAmount,
        reason: reason || 'requested_by_customer',
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      refund: {
        id: refund.id,
        amount: refund.amount,
        currency: refund.currency,
        status: refund.status,
        reason: refund.reason,
        created: refund.created
      }
    });

  } catch (error) {
    console.error('Refund processing error:', error);
    
    // Log error for security monitoring
    try {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const authResult = await authService.verifyToken(token);
        if (authResult.success) {
          await authService.logSecurityEvent({
            type: 'refund_failed',
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
      console.error('Error logging refund failure:', logError);
    }

    if (error instanceof Error) {
      if (error.message.includes('has already been refunded')) {
        return NextResponse.json(
          { error: 'Payment has already been refunded' },
          { status: 400 }
        );
      }
      
      if (error.message.includes('amount_too_large')) {
        return NextResponse.json(
          { error: 'Refund amount is too large' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}