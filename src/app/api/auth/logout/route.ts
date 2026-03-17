import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify token and get user info for logging
    const verifyResult = await authService.verifyToken(token);
    if (!verifyResult.success) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Invalidate the token
    const result = await authService.logout(token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Log security event
    await authService.logSecurityEvent({
      type: 'user_logged_out',
      userId: verifyResult.user!.id,
      metadata: {
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        tokenId: token.substring(0, 10) + '...' // Log partial token for tracking
      },
      timestamp: new Date()
    });

    return NextResponse.json({ message: 'Logged out successfully' });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}