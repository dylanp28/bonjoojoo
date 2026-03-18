import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getRelatedProducts, getProductWithVariants } from '@/lib/products';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get detailed product information with variants
    const product = getProductWithVariants(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get related products (same category or similar specifications)
    const relatedProducts = getRelatedProducts(id, 4);

    // Track product view for analytics
    const userAgent = request.headers.get('user-agent');
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
    
    // Log product view event
    console.log(`Product ${id} viewed - IP: ${ip}, User-Agent: ${userAgent}`);

    return NextResponse.json({
      product: {
        ...product,
        available: product.availability_status !== 'out_of_stock',
        lastUpdated: new Date().toISOString()
      },
      relatedProducts
    });

  } catch (error) {
    console.error('Product retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;
    const updates = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // This endpoint would typically require admin authentication
    // For now, we'll return a placeholder response
    
    // Validate update data
    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No updates provided' },
        { status: 400 }
      );
    }

    // Update product - placeholder implementation
    // const updatedProduct = await inventoryManager.updateProduct(id, updates);
    const updatedProduct = null;

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found or could not be updated' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      product: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // This endpoint would typically require admin authentication
    // For now, we'll return a placeholder response
    
    // const deleted = await inventoryManager.deleteProduct(id);
    const deleted = false;

    if (!deleted) {
      return NextResponse.json(
        { error: 'Product not found or could not be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Product deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}