import { NextRequest, NextResponse } from 'next/server';
import { InventoryManager } from '@/lib/inventory/manager';
import { AuthService } from '@/lib/auth/service';

const inventoryManager = new InventoryManager();
const authService = new AuthService();

export async function GET(request: NextRequest) {
  try {
    // Optional authentication for public stats vs detailed stats
    let user = null;
    const authHeader = request.headers.get('authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const authResult = await authService.verifyToken(token);
      if (authResult.success) {
        user = authResult.user;
      }
    }

    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const timeframe = url.searchParams.get('timeframe') || '30d';

    // Get basic inventory statistics
    const stats = await inventoryManager.getInventoryStats({
      category,
      timeframe,
      includeDetailed: !!user // Only include detailed stats for authenticated users
    });

    // Get category breakdown
    const categoryStats = await inventoryManager.getCategoryStats();

    // Get price range statistics
    const priceStats = await inventoryManager.getPriceRangeStats();

    // Get availability statistics
    const availabilityStats = await inventoryManager.getAvailabilityStats();

    // Public statistics (always included)
    const publicStats = {
      totalProducts: stats.totalProducts,
      availableProducts: stats.availableProducts,
      categories: categoryStats,
      priceRanges: priceStats,
      availability: {
        inStock: availabilityStats.inStock,
        lowStock: availabilityStats.lowStock,
        outOfStock: availabilityStats.outOfStock
      }
    };

    // Detailed statistics (only for authenticated users)
    const detailedStats = user ? {
      revenueStats: stats.revenue,
      conversionStats: stats.conversions,
      popularProducts: stats.popularProducts,
      inventoryTurnover: stats.turnover,
      restockAlerts: stats.restockAlerts,
      performanceMetrics: {
        avgOrderValue: stats.avgOrderValue,
        topSellingCategories: stats.topCategories,
        seasonalTrends: stats.seasonalTrends
      }
    } : {};

    return NextResponse.json({
      timeframe,
      generatedAt: new Date().toISOString(),
      public: publicStats,
      ...(user && { detailed: detailedStats })
    });

  } catch (error) {
    console.error('Inventory stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update inventory statistics (admin only)
export async function POST(request: NextRequest) {
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

    // Check if user has admin privileges
    // Note: This would typically check user role from database
    if (!user.email.includes('admin') && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin privileges required' },
        { status: 403 }
      );
    }

    const { action } = await request.json();

    let result;
    switch (action) {
      case 'refresh':
        result = await inventoryManager.refreshStats();
        break;
      case 'recalculate':
        result = await inventoryManager.recalculateAllStats();
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: refresh, recalculate' },
          { status: 400 }
        );
    }

    // Log admin action
    await authService.logSecurityEvent({
      type: 'admin_inventory_stats_update',
      userId: user.id,
      metadata: {
        action,
        result: result ? 'success' : 'failed',
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    return NextResponse.json({
      message: `Inventory stats ${action} completed successfully`,
      result
    });

  } catch (error) {
    console.error('Inventory stats update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}