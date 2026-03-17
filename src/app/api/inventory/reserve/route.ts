import { NextRequest, NextResponse } from 'next/server';
import { InventoryManager } from '@/lib/inventory/manager';
import { AuthService } from '@/lib/auth/service';

const inventoryManager = new InventoryManager();
const authService = new AuthService();

export async function POST(request: NextRequest) {
  try {
    const { productIds, duration = 600 } = await request.json(); // Default 10 minutes

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: 'Product IDs array is required' },
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

    // Check if all products are available
    const availabilityChecks = await Promise.all(
      productIds.map(async (id: string) => ({
        id,
        available: await inventoryManager.isProductAvailable(id)
      }))
    );

    const unavailableProducts = availabilityChecks.filter(check => !check.available);
    
    if (unavailableProducts.length > 0) {
      return NextResponse.json(
        { 
          error: 'Some products are not available',
          unavailableProducts: unavailableProducts.map(p => p.id)
        },
        { status: 409 }
      );
    }

    // Reserve the products
    const reservationId = await inventoryManager.reserveProducts(productIds, {
      userId: user.id,
      duration: duration,
      timestamp: new Date()
    });

    // Log security event
    await authService.logSecurityEvent({
      type: 'products_reserved',
      userId: user.id,
      metadata: {
        reservationId,
        productIds,
        duration,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      reservationId,
      productIds,
      expiresAt: new Date(Date.now() + duration * 1000).toISOString(),
      message: 'Products reserved successfully'
    });

  } catch (error) {
    console.error('Product reservation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Release reservation
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const reservationId = url.searchParams.get('reservationId');

    if (!reservationId) {
      return NextResponse.json(
        { error: 'Reservation ID is required' },
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

    // Release the reservation
    const released = await inventoryManager.releaseReservation(reservationId, user.id);

    if (!released) {
      return NextResponse.json(
        { error: 'Reservation not found or already released' },
        { status: 404 }
      );
    }

    // Log security event
    await authService.logSecurityEvent({
      type: 'reservation_released',
      userId: user.id,
      metadata: {
        reservationId,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      message: 'Reservation released successfully'
    });

  } catch (error) {
    console.error('Reservation release error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}