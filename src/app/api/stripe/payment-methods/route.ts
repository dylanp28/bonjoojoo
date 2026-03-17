import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

export async function GET(request: NextRequest) {
  try {
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

    // Get user's payment methods from Stripe
    let paymentMethods = [];
    
    if (user.stripeCustomerId) {
      const methods = await stripe.paymentMethods.list({
        customer: user.stripeCustomerId,
        type: 'card'
      });
      
      paymentMethods = methods.data.map(pm => ({
        id: pm.id,
        type: pm.type,
        card: pm.card ? {
          brand: pm.card.brand,
          last4: pm.card.last4,
          exp_month: pm.card.exp_month,
          exp_year: pm.card.exp_year
        } : null,
        created: pm.created
      }));
    }

    return NextResponse.json({ paymentMethods });

  } catch (error) {
    console.error('Payment methods retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { paymentMethodId } = await request.json();

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: 'Payment method ID is required' },
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

    // Create or get Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user.id
        }
      });
      customerId = customer.id;
      
      // Update user with Stripe customer ID
      // Note: This would require a user service to update the database
      // await userService.updateStripeCustomerId(user.id, customerId);
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId
    });

    // Retrieve the attached payment method
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    // Log security event
    await authService.logSecurityEvent({
      type: 'payment_method_added',
      userId: user.id,
      metadata: {
        paymentMethodId,
        cardLast4: paymentMethod.card?.last4,
        cardBrand: paymentMethod.card?.brand,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      paymentMethod: {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card ? {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year
        } : null
      }
    });

  } catch (error) {
    console.error('Payment method attachment error:', error);
    
    if (error instanceof Error && error.message.includes('already been attached')) {
      return NextResponse.json(
        { error: 'Payment method already attached to another customer' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}