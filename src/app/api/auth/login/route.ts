import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth/service';
import { LoginCredentials } from '@/lib/auth/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const credentials: LoginCredentials = body;

    // Get client info for security
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Attempt login
    const result = await authService.login(credentials, clientIP, userAgent);

    // Check if it's an error
    if ('code' in result) {
      const statusCode = getStatusCodeForError(result.code);
      return NextResponse.json(
        { error: result.message, code: result.code },
        { status: statusCode }
      );
    }

    // Successful login
    const response = NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        vipStatus: result.user.vipStatus,
        loyaltyPoints: result.user.loyaltyPoints
      },
      accessToken: result.accessToken,
      expiresAt: result.expiresAt
    });

    // Set refresh token as httpOnly cookie
    response.cookies.set('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    // Set CSRF token
    const csrfToken = generateCSRFToken();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

function getStatusCodeForError(code: string): number {
  switch (code) {
    case 'INVALID_CREDENTIALS':
      return 401;
    case 'RATE_LIMITED':
      return 429;
    case 'ACCOUNT_SUSPENDED':
      return 403;
    case '2FA_REQUIRED':
      return 200; // Special case - need 2FA code
    case 'INVALID_2FA':
      return 401;
    case 'VALIDATION_ERROR':
      return 400;
    default:
      return 500;
  }
}

function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}