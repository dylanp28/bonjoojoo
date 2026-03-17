import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  addedAt: string;
  priceHistory?: Array<{
    price: number;
    date: string;
  }>;
  specifications?: any;
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
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
    const sortBy = url.searchParams.get('sortBy') || 'addedAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';

    // Get user's wishlist
    // Note: This would typically fetch from a wishlist service or database
    const mockWishlistItems: WishlistItem[] = [
      {
        id: 'wish1',
        productId: 'prod1',
        name: '1.5ct Princess Cut Lab-Grown Diamond Solitaire Ring',
        price: 4500,
        image: '/images/princess-ring.jpg',
        availability: 'in_stock',
        addedAt: '2024-01-10T10:00:00Z',
        priceHistory: [
          { price: 4800, date: '2024-01-01T00:00:00Z' },
          { price: 4500, date: '2024-01-10T00:00:00Z' }
        ],
        specifications: {
          carat: 1.5,
          cut: 'Princess',
          color: 'G',
          clarity: 'VS2',
          certification: 'GIA'
        }
      },
      {
        id: 'wish2',
        productId: 'prod2',
        name: 'Lab-Grown Diamond Tennis Bracelet',
        price: 2800,
        image: '/images/tennis-bracelet.jpg',
        availability: 'limited',
        addedAt: '2024-01-08T15:30:00Z',
        specifications: {
          totalCarats: 3.0,
          stoneCount: 30,
          metal: 'White Gold 18K'
        }
      }
    ];

    // Sort wishlist items
    const sortedItems = [...mockWishlistItems].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'addedAt':
        default:
          aValue = new Date(a.addedAt).getTime();
          bValue = new Date(b.addedAt).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Apply pagination
    const totalItems = sortedItems.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = sortedItems.slice(startIndex, startIndex + limit);

    // Calculate wishlist statistics
    const stats = {
      totalItems,
      totalValue: sortedItems.reduce((sum, item) => sum + item.price, 0),
      averagePrice: totalItems > 0 
        ? sortedItems.reduce((sum, item) => sum + item.price, 0) / totalItems 
        : 0,
      availability: {
        inStock: sortedItems.filter(item => item.availability === 'in_stock').length,
        outOfStock: sortedItems.filter(item => item.availability === 'out_of_stock').length,
        limited: sortedItems.filter(item => item.availability === 'limited').length
      },
      priceAlerts: sortedItems.filter(item => 
        item.priceHistory && item.priceHistory.length > 1 &&
        item.priceHistory[item.priceHistory.length - 1].price < 
        item.priceHistory[item.priceHistory.length - 2].price
      ).length
    };

    return NextResponse.json({
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total: totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNext: page * limit < totalItems,
        hasPrev: page > 1
      },
      stats,
      sorting: { sortBy, sortOrder }
    });

  } catch (error) {
    console.error('Wishlist retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add item to wishlist
export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
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

    // Check if product is already in wishlist
    // Note: This would typically check the database
    const existingItem = false; // Mock check

    if (existingItem) {
      return NextResponse.json(
        { error: 'Product is already in your wishlist' },
        { status: 409 }
      );
    }

    // Add item to wishlist
    // Note: This would typically save to database
    const wishlistItem: WishlistItem = {
      id: `wish_${Date.now()}`,
      productId,
      name: 'Sample Product', // Would fetch from product service
      price: 1000, // Would fetch from product service
      image: '/images/sample.jpg', // Would fetch from product service
      availability: 'in_stock', // Would fetch from inventory service
      addedAt: new Date().toISOString()
    };

    // Log wishlist addition
    await authService.logSecurityEvent({
      type: 'wishlist_item_added',
      userId: user.id,
      metadata: {
        productId,
        wishlistItemId: wishlistItem.id,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      item: wishlistItem,
      message: 'Product added to wishlist successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Wishlist add error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const itemId = url.searchParams.get('itemId');
    const productId = url.searchParams.get('productId');

    if (!itemId && !productId) {
      return NextResponse.json(
        { error: 'Item ID or Product ID is required' },
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

    // Remove item from wishlist
    // Note: This would typically remove from database
    const removed = true; // Mock removal

    if (!removed) {
      return NextResponse.json(
        { error: 'Wishlist item not found' },
        { status: 404 }
      );
    }

    // Log wishlist removal
    await authService.logSecurityEvent({
      type: 'wishlist_item_removed',
      userId: user.id,
      metadata: {
        itemId,
        productId,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      message: 'Product removed from wishlist successfully'
    });

  } catch (error) {
    console.error('Wishlist remove error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}