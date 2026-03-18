# Add New Product - Simple Template

## Method 1: Quick Single Product
Copy this to the bottom of `src/data/productGroups.ts` (before the closing `]`):

```typescript
createSimpleProduct(
  'product-id',           // Unique ID (like 'lhbd3782a')
  'Product Name',         // Display name
  'Product description',  // Full description
  'rings',               // Category: rings|earrings|necklaces|bracelets
  1285,                  // Price in dollars
  'image-file.jpg',      // Image filename (just the name, not full path)
  'SKU-CODE'            // SKU/product code
),
```

## Method 2: Multi-Variant Product
For products with multiple colors/metals:

```typescript
createProduct({
  id: 'product-id',
  name: 'Product Name',
  description: 'Detailed description',
  category: 'rings',
  subcategory: 'statement',
  basePrice: 1285,
  originalPrice: 1450,  // Optional for sale items
  variants: [
    { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'FILE1.jpg', sku: 'SKU1' },
    { name: 'Rose Gold', metal: '14k Rose Gold', image: 'FILE2.jpg', sku: 'SKU2' },
    { name: 'White Gold', metal: '14k White Gold', image: 'FILE3.jpg', sku: 'SKU3' }
  ],
  tags: ['bestseller', 'sale'],
  featured: true,
  rating: 4.8,
  reviews: 156
}),
```

## Categories
- **rings**: subcategories: statement, delicate, tennis, bands, vintage, engagement
- **earrings**: subcategories: drops, studs, hoops, climbers
- **necklaces**: subcategories: pendants, chains, chokers, tennis, station
- **bracelets**: subcategories: tennis, bangles, chains, cuffs

## After Adding
1. Save the file
2. Refresh localhost:3001 to see changes
3. Products will automatically appear in search and category pages

## Example
```typescript
createSimpleProduct(
  'diamond-ring-001',
  'Classic Diamond Ring',
  'Beautiful solitaire diamond ring in 14k gold',
  'rings',
  1500,
  'diamond-ring.jpg',
  'DR-001'
),
```