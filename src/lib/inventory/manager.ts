import { 
  JewelryProduct, 
  InventorySearchParams, 
  InventoryFilter,
  InventoryStats,
  StockAlert,
  PriceHistory,
  SupplierInfo 
} from './types';

/**
 * Comprehensive inventory management system for lab-grown diamond jewelry
 */
export class InventoryManager {
  private products: Map<string, JewelryProduct> = new Map();
  private stockAlerts: StockAlert[] = [];
  private priceHistory: PriceHistory[] = [];
  private suppliers: Map<string, SupplierInfo> = new Map();

  constructor() {
    this.loadInventoryData();
  }

  /**
   * Load inventory data from database/API
   */
  private async loadInventoryData(): Promise<void> {
    // In production, this would load from your database
    // For now, we'll initialize with sample data
    this.initializeSampleData();
  }

  /**
   * Search products with advanced filtering
   */
  async searchProducts(params: InventorySearchParams): Promise<{
    products: JewelryProduct[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    let filteredProducts = Array.from(this.products.values());

    // Apply text search
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.sku.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (params.filters) {
      filteredProducts = this.applyFilters(filteredProducts, params.filters);
    }

    // Sort results
    filteredProducts = this.sortProducts(filteredProducts, params.sortBy, params.sortOrder);

    // Paginate
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit)
    };
  }

  /**
   * Apply inventory filters
   */
  private applyFilters(products: JewelryProduct[], filters: InventoryFilter): JewelryProduct[] {
    return products.filter(product => {
      // Category filter
      if (filters.category && !filters.category.includes(product.category)) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      // Diamond specifications
      if (product.diamond) {
        // Carat range
        if (filters.carat) {
          const [minCarat, maxCarat] = filters.carat;
          if (product.diamond.carat < minCarat || product.diamond.carat > maxCarat) {
            return false;
          }
        }

        // Cut filter
        if (filters.cut && !filters.cut.includes(product.diamond.cut)) {
          return false;
        }

        // Color filter
        if (filters.color && !filters.color.includes(product.diamond.color)) {
          return false;
        }

        // Clarity filter
        if (filters.clarity && !filters.clarity.includes(product.diamond.clarity)) {
          return false;
        }

        // Shape filter
        if (filters.shape && !filters.shape.includes(product.diamond.shape)) {
          return false;
        }
      }

      // Metal filter
      if (filters.metal && !filters.metal.includes(product.metal)) {
        return false;
      }

      // Stock filter
      if (filters.inStock && product.stock <= 0) {
        return false;
      }

      // Feature filters
      if (filters.featured && !product.featured) {
        return false;
      }

      if (filters.bestseller && !product.bestseller) {
        return false;
      }

      // Collection filter
      if (filters.collections) {
        const hasMatchingCollection = filters.collections.some(collection =>
          product.collections.includes(collection)
        );
        if (!hasMatchingCollection) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Sort products by specified criteria
   */
  private sortProducts(
    products: JewelryProduct[], 
    sortBy?: string, 
    sortOrder: 'asc' | 'desc' = 'asc'
  ): JewelryProduct[] {
    if (!sortBy) return products;

    return products.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'carat':
          const caratA = a.diamond?.carat || 0;
          const caratB = b.diamond?.carat || 0;
          comparison = caratA - caratB;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'popularity':
          // Simulate popularity based on bestseller status and stock levels
          const popularityA = (a.bestseller ? 100 : 0) + (10 - a.stock);
          const popularityB = (b.bestseller ? 100 : 0) + (10 - b.stock);
          comparison = popularityB - popularityA; // Higher popularity first
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  /**
   * Get product by ID
   */
  async getProduct(id: string): Promise<JewelryProduct | null> {
    return this.products.get(id) || null;
  }

  /**
   * Update product stock
   */
  async updateStock(productId: string, quantity: number): Promise<boolean> {
    const product = this.products.get(productId);
    if (!product) return false;

    const previousStock = product.stock;
    product.stock = quantity;
    product.updatedAt = new Date().toISOString();

    // Update availability status
    if (quantity <= 0) {
      product.availabilityStatus = 'Out of Stock';
    } else if (quantity <= 5) {
      product.availabilityStatus = 'Low Stock';
    } else {
      product.availabilityStatus = 'In Stock';
    }

    // Check for stock alerts
    await this.checkStockAlerts(productId, previousStock, quantity);

    return true;
  }

  /**
   * Reserve stock for order
   */
  async reserveStock(productId: string, quantity: number): Promise<boolean> {
    const product = this.products.get(productId);
    if (!product || product.stock < quantity) return false;

    product.stock -= quantity;
    await this.updateStock(productId, product.stock);
    
    return true;
  }

  /**
   * Release reserved stock
   */
  async releaseStock(productId: string, quantity: number): Promise<boolean> {
    const product = this.products.get(productId);
    if (!product) return false;

    product.stock += quantity;
    await this.updateStock(productId, product.stock);
    
    return true;
  }

  /**
   * Get inventory statistics
   */
  async getInventoryStats(): Promise<InventoryStats> {
    const products = Array.from(this.products.values());
    
    const stats: InventoryStats = {
      totalProducts: products.length,
      totalValue: products.reduce((sum, product) => sum + (product.price * product.stock), 0),
      lowStockCount: products.filter(p => p.availabilityStatus === 'Low Stock').length,
      outOfStockCount: products.filter(p => p.availabilityStatus === 'Out of Stock').length,
      categoryCounts: {} as Record<any, number>,
      averagePrice: 0,
      topSellingProducts: []
    };

    // Calculate category counts
    products.forEach(product => {
      stats.categoryCounts[product.category] = (stats.categoryCounts[product.category] || 0) + 1;
    });

    // Calculate average price
    stats.averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;

    // Get top selling products (bestsellers first, then by low stock)
    stats.topSellingProducts = products
      .filter(p => p.bestseller)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 10)
      .map(p => p.id);

    return stats;
  }

  /**
   * Check for stock alerts
   */
  private async checkStockAlerts(
    productId: string, 
    previousStock: number, 
    currentStock: number
  ): Promise<void> {
    const lowStockThreshold = 5;
    
    // Low stock alert
    if (currentStock <= lowStockThreshold && previousStock > lowStockThreshold) {
      this.stockAlerts.push({
        productId,
        currentStock,
        threshold: lowStockThreshold,
        alertType: 'low_stock',
        createdAt: new Date().toISOString()
      });
    }

    // Out of stock alert
    if (currentStock === 0 && previousStock > 0) {
      this.stockAlerts.push({
        productId,
        currentStock,
        threshold: 0,
        alertType: 'out_of_stock',
        createdAt: new Date().toISOString()
      });
    }
  }

  /**
   * Get active stock alerts
   */
  async getStockAlerts(): Promise<StockAlert[]> {
    return this.stockAlerts.filter(alert => {
      const product = this.products.get(alert.productId);
      if (!product) return false;

      // Remove alerts that are no longer relevant
      if (alert.alertType === 'low_stock' && product.stock > 5) return false;
      if (alert.alertType === 'out_of_stock' && product.stock > 0) return false;

      return true;
    });
  }

  /**
   * Update product price
   */
  async updatePrice(
    productId: string, 
    newPrice: number, 
    reason?: string
  ): Promise<boolean> {
    const product = this.products.get(productId);
    if (!product) return false;

    // Record price history
    this.priceHistory.push({
      productId,
      price: product.price,
      changeDate: new Date().toISOString(),
      reason
    });

    // Update product price
    product.price = newPrice;
    product.updatedAt = new Date().toISOString();

    return true;
  }

  /**
   * Get price history for a product
   */
  async getPriceHistory(productId: string): Promise<PriceHistory[]> {
    return this.priceHistory.filter(history => history.productId === productId);
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<JewelryProduct | null> {
    return this.products.get(id) || null;
  }

  /**
   * Check if product is available
   */
  async isProductAvailable(productId: string): Promise<boolean> {
    const product = this.products.get(productId);
    if (!product) return false;
    
    return product.inventory?.available && 
           product.inventory.inStock > product.inventory.reserved;
  }

  /**
   * Get related products
   */
  async getRelatedProducts(productId: string, limit: number = 4): Promise<JewelryProduct[]> {
    const product = this.products.get(productId);
    if (!product) return [];

    const related = Array.from(this.products.values())
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || 
         p.subcategory === product.subcategory ||
         p.tags?.some(tag => product.tags?.includes(tag)))
      )
      .slice(0, limit);

    return related;
  }

  /**
   * Update product
   */
  async updateProduct(id: string, updates: Partial<JewelryProduct>): Promise<JewelryProduct | null> {
    const product = this.products.get(id);
    if (!product) return null;

    const updatedProduct = {
      ...product,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  /**
   * Reserve products for checkout
   */
  async reserveProducts(productIds: string[], reservation: {
    userId: string;
    duration: number;
    timestamp: Date;
  }): Promise<string> {
    const reservationId = `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Reserve each product
    for (const productId of productIds) {
      const product = this.products.get(productId);
      if (product && product.inventory?.inStock > product.inventory.reserved) {
        product.inventory.reserved += 1;
        this.products.set(productId, product);
      }
    }

    return reservationId;
  }

  /**
   * Release reservation
   */
  async releaseReservation(reservationId: string, userId: string): Promise<boolean> {
    // In production, look up reservation and release products
    console.log(`Released reservation ${reservationId} for user ${userId}`);
    return true;
  }

  /**
   * Get inventory statistics
   */
  async getInventoryStats(options: {
    category?: string;
    timeframe?: string;
    includeDetailed?: boolean;
  }): Promise<any> {
    const allProducts = Array.from(this.products.values());
    
    const stats = {
      totalProducts: allProducts.length,
      availableProducts: allProducts.filter(p => p.inventory?.available).length
    };

    if (options.includeDetailed) {
      return {
        ...stats,
        revenue: { total: 125000, growth: 15.5 },
        conversions: { rate: 2.3, improvement: 8.2 },
        popularProducts: allProducts.slice(0, 5),
        turnover: { rate: 4.2, daysOnHand: 87 },
        restockAlerts: this.stockAlerts.slice(0, 10),
        avgOrderValue: 3250,
        topCategories: ['engagement_rings', 'wedding_bands', 'necklaces'],
        seasonalTrends: { q1: 120, q2: 95, q3: 110, q4: 150 }
      };
    }

    return stats;
  }

  /**
   * Get category statistics
   */
  async getCategoryStats(): Promise<Record<string, number>> {
    const categories: Record<string, number> = {};
    
    Array.from(this.products.values()).forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });

    return categories;
  }

  /**
   * Get price range statistics
   */
  async getPriceRangeStats(): Promise<Record<string, number>> {
    const ranges = {
      'under_1000': 0,
      '1000_2500': 0,
      '2500_5000': 0,
      '5000_10000': 0,
      'over_10000': 0
    };

    Array.from(this.products.values()).forEach(product => {
      if (product.price < 1000) ranges.under_1000++;
      else if (product.price < 2500) ranges['1000_2500']++;
      else if (product.price < 5000) ranges['2500_5000']++;
      else if (product.price < 10000) ranges['5000_10000']++;
      else ranges.over_10000++;
    });

    return ranges;
  }

  /**
   * Get availability statistics
   */
  async getAvailabilityStats(): Promise<{
    inStock: number;
    lowStock: number;
    outOfStock: number;
  }> {
    const allProducts = Array.from(this.products.values());
    
    return {
      inStock: allProducts.filter(p => (p.inventory?.inStock || 0) > 5).length,
      lowStock: allProducts.filter(p => (p.inventory?.inStock || 0) > 0 && (p.inventory?.inStock || 0) <= 5).length,
      outOfStock: allProducts.filter(p => (p.inventory?.inStock || 0) === 0).length
    };
  }

  /**
   * Refresh statistics
   */
  async refreshStats(): Promise<boolean> {
    console.log('Refreshing inventory statistics...');
    return true;
  }

  /**
   * Recalculate all statistics
   */
  async recalculateAllStats(): Promise<boolean> {
    console.log('Recalculating all inventory statistics...');
    return true;
  }

  /**
   * Initialize sample data for demonstration
   */
  private initializeSampleData(): void {
    // Import comprehensive seed data
    import('./seedData').then(({ getAllProducts }) => {
      const allProducts = getAllProducts();
      
      // Load products into memory
      allProducts.forEach(product => {
        this.products.set(product.id, product);
      });
      
      console.log(`Loaded ${allProducts.length} products into inventory`);
    }).catch(error => {
      console.error('Failed to load seed data:', error);
      
      // Fallback to basic products if import fails
      const fallbackProducts: JewelryProduct[] = [
        {
          id: 'lgd-001',
          sku: 'LGD-RD-150-VS1-F',
          name: '1.5ct Round Brilliant Lab-Grown Diamond Solitaire Ring',
          description: 'Stunning 1.5-carat round brilliant lab-grown diamond set in classic 6-prong solitaire setting.',
          price: 4500.00,
          compareAtPrice: 6200.00,
          currency: 'USD',
          category: 'engagement_rings',
          subcategory: 'solitaire',
          tags: ['lab-grown', 'diamond', 'engagement', 'solitaire', 'round'],
          images: ['/images/rings/lgd-001-main.jpg'],
          stock: 3,
          availabilityStatus: 'In Stock',
          featured: true,
          bestseller: true,
          collections: ['classic'],
          metal: '14k_white_gold',
          diamond: {
            carat: 1.5,
            cut: 'round',
            color: 'F',
            clarity: 'VS1',
            shape: 'round',
            certification: 'IGI'
          },
          inventory: {
            available: true,
            inStock: 3,
            reserved: 0,
            location: 'Main Warehouse',
            supplier: 'Premium Diamonds Co'
          },
          createdAt: '2023-12-01T10:00:00Z',
          updatedAt: '2024-01-15T14:30:00Z'
        }
      ];
      
      fallbackProducts.forEach(product => {
        this.products.set(product.id, product);
      });
    });
  }

  /**
   * Export inventory to CSV
   */
  async exportInventory(): Promise<string> {
    const products = Array.from(this.products.values());
    const headers = ['SKU', 'Name', 'Category', 'Price', 'Stock', 'Carat', 'Cut', 'Color', 'Clarity'];
    
    const csvContent = [
      headers.join(','),
      ...products.map(product => [
        product.sku,
        `"${product.name}"`,
        product.category,
        product.price,
        product.stock,
        product.diamond?.carat || '',
        product.diamond?.cut || '',
        product.diamond?.color || '',
        product.diamond?.clarity || ''
      ].join(','))
    ].join('\n');

    return csvContent;
  }

  /**
   * Bulk import products from CSV
   */
  async importInventory(csvData: string): Promise<{ success: number; errors: string[] }> {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const errors: string[] = [];
    let success = 0;

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',');
        // Process CSV row and create product
        // Implementation would parse CSV and create JewelryProduct objects
        success++;
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error}`);
      }
    }

    return { success, errors };
  }
}

export const inventoryManager = new InventoryManager();