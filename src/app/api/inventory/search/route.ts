import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const sortByRaw = searchParams.get('sortBy') || 'name';
    let sortBy: 'price' | 'name' | 'newest' | 'rating' | 'popular' = 'name';
    let sortOrder: 'asc' | 'desc' = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';

    if (sortByRaw === 'price') {
      sortBy = 'price';
    } else if (sortByRaw === 'newest') {
      sortBy = 'newest';
    } else if (sortByRaw === 'popular') {
      sortBy = 'popular';
      sortOrder = 'desc';
    } else if (sortByRaw === 'rating') {
      sortBy = 'rating';
      sortOrder = 'desc';
    } else {
      sortBy = 'name';
    }

    const params = {
      query: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      sortBy,
      sortOrder,
      limit: parseInt(searchParams.get('limit') || '20'),
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      inStockOnly: searchParams.get('inStock') === 'true',
      featured: searchParams.get('featured') === 'true',
      bestseller: searchParams.get('bestseller') === 'true',
    };

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
