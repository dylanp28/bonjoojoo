import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';
import { RegisterData } from '@/lib/auth/types';

const authService = new AuthService();

export async function POST(request: NextRequest) {
  try {
    const body: RegisterData = await request.json();
    
    // Validate required fields
    const { email, password, firstName, lastName } = body;
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const result = await authService.register(body);
    
    // Check if result is an error
    if ('code' in result) {
      return NextResponse.json(
        { error: result.message },
        { status: result.code === 'EMAIL_EXISTS' ? 409 : 400 }
      );
    }

    // Log security event
    await authService.logSecurityEvent({
      type: 'user_registered',
      userId: result.user.id,
      metadata: {
        email: body.email,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      user: result.user,
      token: result.accessToken,
      session: result.session
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}