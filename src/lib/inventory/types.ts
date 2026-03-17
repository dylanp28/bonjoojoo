/**
 * Inventory types for lab-grown diamond jewelry
 */

export interface DiamondSpecification {
  // The 4 Cs
  carat: number;
  cut: DiamondCut;
  color: DiamondColor;
  clarity: DiamondClarity;
  
  // Additional specifications
  shape: DiamondShape;
  polish: DiamondPolish;
  symmetry: DiamondSymmetry;
  fluorescence: DiamondFluorescence;
  
  // Measurements
  measurements: {
    length: number; // mm
    width: number;  // mm
    depth: number;  // mm
  };
  
  // Ratios and percentages
  tablePercentage: number;
  depthPercentage: number;
  crownAngle: number;
  pavilionAngle: number;
  
  // Certification
  certification: DiamondCertification;
  certificateNumber: string;
  certificationDate: string;
  
  // Lab-grown specific
  growthMethod: GrowthMethod;
  origin: string; // Lab origin
}

export type DiamondCut = 
  | 'Excellent' 
  | 'Very Good' 
  | 'Good' 
  | 'Fair' 
  | 'Poor';

export type DiamondColor = 
  | 'D' | 'E' | 'F' // Colorless
  | 'G' | 'H' | 'I' | 'J' // Near Colorless
  | 'K' | 'L' | 'M' // Faint
  | 'N' | 'O' | 'P' | 'Q' | 'R' // Very Light
  | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'; // Light

export type DiamondClarity = 
  | 'FL'    // Flawless
  | 'IF'    // Internally Flawless
  | 'VVS1'  // Very Very Slightly Included
  | 'VVS2'
  | 'VS1'   // Very Slightly Included
  | 'VS2'
  | 'SI1'   // Slightly Included
  | 'SI2'
  | 'I1'    // Included
  | 'I2'
  | 'I3';

export type DiamondShape = 
  | 'Round'
  | 'Princess'
  | 'Emerald'
  | 'Asscher'
  | 'Oval'
  | 'Radiant'
  | 'Cushion'
  | 'Heart'
  | 'Pear'
  | 'Marquise';

export type DiamondPolish = 
  | 'Excellent'
  | 'Very Good'
  | 'Good'
  | 'Fair'
  | 'Poor';

export type DiamondSymmetry = 
  | 'Excellent'
  | 'Very Good'
  | 'Good'
  | 'Fair'
  | 'Poor';

export type DiamondFluorescence = 
  | 'None'
  | 'Faint'
  | 'Medium'
  | 'Strong'
  | 'Very Strong';

export type DiamondCertification = 
  | 'GIA'   // Gemological Institute of America
  | 'IGI'   // International Gemological Institute
  | 'GCAL'  // Gem Certification & Assurance Lab
  | 'EGL'   // European Gemological Laboratory
  | 'SSEF'  // Swiss Gemmological Institute
  | 'AIGS'; // Asian Institute of Gemological Sciences

export type GrowthMethod = 
  | 'CVD'   // Chemical Vapor Deposition
  | 'HPHT'; // High Pressure High Temperature

export interface JewelryProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: JewelryCategory;
  subcategory: string;
  
  // Pricing
  price: number;
  compareAtPrice?: number;
  currency: string;
  
  // Inventory
  stock: number;
  availabilityStatus: AvailabilityStatus;
  isCustomizable: boolean;
  leadTime?: number; // days for custom pieces
  
  // Specifications
  diamond?: DiamondSpecification;
  metal: MetalType;
  setting: SettingType;
  size?: string;
  
  // Media
  images: ProductImage[];
  videos: ProductVideo[];
  threeDModel?: string; // URL to 3D model
  
  // SEO and display
  slug: string;
  tags: string[];
  collections: string[];
  featured: boolean;
  bestseller: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  vendor: string;
  weight: number; // grams
}

export type JewelryCategory = 
  | 'Engagement Rings'
  | 'Wedding Bands'
  | 'Necklaces'
  | 'Earrings'
  | 'Bracelets'
  | 'Pendants'
  | 'Loose Diamonds';

export type AvailabilityStatus = 
  | 'In Stock'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Pre-Order'
  | 'Custom Order'
  | 'Discontinued';

export type MetalType = 
  | '14K Yellow Gold'
  | '14K White Gold'
  | '14K Rose Gold'
  | '18K Yellow Gold'
  | '18K White Gold'
  | '18K Rose Gold'
  | 'Platinum'
  | 'Palladium'
  | 'Sterling Silver';

export type SettingType = 
  | 'Prong'
  | 'Bezel'
  | 'Channel'
  | 'Pave'
  | 'Tension'
  | 'Halo'
  | 'Three Stone'
  | 'Solitaire'
  | 'Vintage'
  | 'Modern';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  type: ImageType;
  width: number;
  height: number;
}

export type ImageType = 
  | 'main'
  | 'detail'
  | 'lifestyle'
  | 'certificate'
  | '360_view'
  | 'size_guide';

export interface ProductVideo {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
  type: VideoType;
  order: number;
}

export type VideoType = 
  | '360_rotation'
  | 'lifestyle'
  | 'detail'
  | 'comparison';

export interface InventoryFilter {
  category?: JewelryCategory[];
  priceRange?: [number, number];
  carat?: [number, number];
  cut?: DiamondCut[];
  color?: DiamondColor[];
  clarity?: DiamondClarity[];
  shape?: DiamondShape[];
  metal?: MetalType[];
  inStock?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  collections?: string[];
}

export interface InventorySearchParams {
  query?: string;
  filters?: InventoryFilter;
  sortBy?: InventorySortBy;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export type InventorySortBy = 
  | 'price'
  | 'carat'
  | 'name'
  | 'created'
  | 'popularity'
  | 'rating';

export interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  categoryCounts: Record<JewelryCategory, number>;
  averagePrice: number;
  topSellingProducts: string[];
}

export interface StockAlert {
  productId: string;
  currentStock: number;
  threshold: number;
  alertType: 'low_stock' | 'out_of_stock';
  createdAt: string;
}

export interface PriceHistory {
  productId: string;
  price: number;
  changeDate: string;
  reason?: string;
}

export interface SupplierInfo {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  specialties: JewelryCategory[];
  leadTime: number;
  minimumOrder: number;
  paymentTerms: string;
  certifications: DiamondCertification[];
  rating: number;
}