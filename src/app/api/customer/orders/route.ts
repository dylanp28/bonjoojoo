import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  items: Array<{
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    image: string;
    specifications?: any;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: any;
  billingAddress: any;
  paymentMethod: {
    type: string;
    last4?: string;
    brand?: string;
  };
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  notes?: string;
}

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

    // Parse query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 50);
    const status = url.searchParams.get('status');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    // Build filter criteria
    const filters = {
      userId: user.id,
      ...(status && { status }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(endDate && { endDate: new Date(endDate) })
    };

    // Get user's orders
    // Note: This would typically fetch from an order service or database
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'BJ-2024-001',
        status: 'delivered',
        items: [
          {
            id: 'prod1',
            name: '2.5ct Round Brilliant Lab-Grown Diamond Ring',
            sku: 'LGD-RD-25',
            quantity: 1,
            price: 8500,
            image: '/images/diamond-ring-1.jpg',
            specifications: {
              carat: 2.5,
              cut: 'Round Brilliant',
              color: 'F',
              clarity: 'VS1',
              certification: 'IGI'
            }
          }
        ],
        subtotal: 8500,
        tax: 680,
        shipping: 0,
        total: 9180,
        currency: 'USD',
        shippingAddress: {
          name: `${user.firstName} ${user.lastName}`,
          street: '123 Main St',
          city: 'Berkeley',
          state: 'CA',
          zipCode: '94720',
          country: 'US'
        },
        billingAddress: {
          name: `${user.firstName} ${user.lastName}`,
          street: '123 Main St',
          city: 'Berkeley',
          state: 'CA',
          zipCode: '94720',
          country: 'US'
        },
        paymentMethod: {
          type: 'card',
          last4: '4242',
          brand: 'visa'
        },
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
        estimatedDelivery: '2024-01-25T00:00:00Z',
        trackingNumber: 'UPS123456789',
        notes: 'Signature required upon delivery'
      }
    ];

    // Apply filters and pagination
    let filteredOrders = mockOrders;
    
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    const totalOrders = filteredOrders.length;
    const startIndex = (page - 1) * limit;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + limit);

    // Calculate order statistics
    const orderStats = {
      total: totalOrders,
      pending: mockOrders.filter(o => o.status === 'pending').length,
      processing: mockOrders.filter(o => o.status === 'processing').length,
      shipped: mockOrders.filter(o => o.status === 'shipped').length,
      delivered: mockOrders.filter(o => o.status === 'delivered').length,
      cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
      refunded: mockOrders.filter(o => o.status === 'refunded').length,
      totalSpent: mockOrders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: mockOrders.length > 0 
        ? mockOrders.reduce((sum, order) => sum + order.total, 0) / mockOrders.length 
        : 0
    };

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        page,
        limit,
        total: totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        hasNext: page * limit < totalOrders,
        hasPrev: page > 1
      },
      stats: orderStats,
      filters
    });

  } catch (error) {
    console.error('Orders retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

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

    // Validate order data
    const { items, shippingAddress, billingAddress, paymentMethodId } = orderData;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Order items are required' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !billingAddress) {
      return NextResponse.json(
        { error: 'Shipping and billing addresses are required' },
        { status: 400 }
      );
    }

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: 'Payment method is required' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `BJ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
    const shipping = subtotal >= 5000 ? 0 : 50; // Free shipping over $5000
    const total = subtotal + tax + shipping;

    // Create order
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderNumber,
      status: 'pending',
      items,
      subtotal,
      tax,
      shipping,
      total,
      currency: 'USD',
      shippingAddress,
      billingAddress,
      paymentMethod: {
        type: 'card',
        last4: '****', // This would come from Stripe payment method
        brand: 'unknown'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };

    // Log order creation
    await authService.logSecurityEvent({
      type: 'order_created',
      userId: user.id,
      metadata: {
        orderId: newOrder.id,
        orderNumber: newOrder.orderNumber,
        total: newOrder.total,
        itemCount: items.length,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      order: newOrder,
      message: 'Order created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}