import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth/service'

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization')
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header required' },
        { status: 401 }
      )
    }

    const token = authorization.replace('Bearer ', '')
    
    // Verify token and get user data
    const user = await AuthService.verifyToken(token)
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt
      }
    })

  } catch (error: any) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 }
    )
  }
}