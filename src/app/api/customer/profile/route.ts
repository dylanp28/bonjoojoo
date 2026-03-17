import { NextRequest, NextResponse } from 'next/server';
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

    // Get user profile with preferences and additional data
    // Note: This would typically fetch from a user service or database
    const profile = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      preferences: user.preferences || {
        emailMarketing: true,
        smsMarketing: false,
        currency: 'USD',
        language: 'en',
        jewelryStyles: [],
        priceRange: { min: 0, max: 50000 },
        metals: [],
        gemstones: [],
        occasions: []
      },
      vipStatus: user.vipStatus || {
        tier: 'standard',
        points: 0,
        benefits: [],
        tierProgress: {
          current: 0,
          nextTier: 'silver',
          required: 5000
        }
      },
      addresses: user.addresses || [],
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      stats: {
        totalOrders: 0,
        totalSpent: 0,
        favoriteCategory: null,
        avgOrderValue: 0
      }
    };

    return NextResponse.json({ profile });

  } catch (error) {
    console.error('Profile retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json();

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

    // Validate update data
    const allowedFields = [
      'firstName', 'lastName', 'phone', 'dateOfBirth', 
      'preferences', 'addresses'
    ];
    
    const validUpdates = Object.keys(updates).reduce((acc, key) => {
      if (allowedFields.includes(key)) {
        acc[key] = updates[key];
      }
      return acc;
    }, {} as any);

    if (Object.keys(validUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Validate email format if updating email
    if (validUpdates.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(validUpdates.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Update user profile
    // Note: This would typically call a user service to update the database
    const updatedProfile = { ...user, ...validUpdates };

    // Log profile update
    await authService.logSecurityEvent({
      type: 'profile_updated',
      userId: user.id,
      metadata: {
        updatedFields: Object.keys(validUpdates),
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      profile: updatedProfile,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}