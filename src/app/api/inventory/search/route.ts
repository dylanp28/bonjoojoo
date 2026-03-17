import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse search parameters
    const params = {
      query: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      sortBy: searchParams.get('sortBy') || 'name',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
      limit: parseInt(searchParams.get('limit') || '20'),
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      inStock: searchParams.get('inStock') === 'true',
      featured: searchParams.get('featured') === 'true',
      bestseller: searchParams.get('bestseller') === 'true'
    };

    // Perform search
    const results = searchProducts(params);

    return NextResponse.json(results);

  } catch (error) {
    console.error('Inventory search error:', error);
    return NextResponse.json(
      { error: 'Failed to search inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const results = searchProducts(body);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Inventory search error:', error);
    return NextResponse.json(
      { error: 'Failed to search inventory' },
      { status: 500 }
    );
  }
}