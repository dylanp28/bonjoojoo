/**
 * Authentication types for luxury jewelry ecommerce platform
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  
  // Customer profile
  dateOfBirth?: string;
  anniversary?: string;
  
  // Preferences
  preferredMetal: string[];
  priceRange: [number, number];
  stylePreferences: string[];
  sizePreferences: Record<string, string>; // ring size, bracelet size, etc.
  
  // Account settings
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  marketingOptIn: boolean;
  
  // Addresses
  addresses: Address[];
  defaultBillingAddress?: string;
  defaultShippingAddress?: string;
  
  // Account status
  accountStatus: AccountStatus;
  vipStatus: VIPStatus;
  loyaltyPoints: number;
  
  // Security
  lastLoginAt?: string;
  passwordChangedAt?: string;
  failedLoginAttempts: number;
  lockedUntil?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
}

export interface Address {
  id: string;
  type: AddressType;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone?: string;
  isDefault: boolean;
  
  // For shipping
  deliveryInstructions?: string;
  secureLocation: boolean; // For high-value jewelry
}

export type AddressType = 'billing' | 'shipping';

export type AccountStatus = 
  | 'active'
  | 'inactive' 
  | 'suspended'
  | 'pending_verification';

export type VIPStatus = 
  | 'standard'
  | 'silver'   // $5,000+ lifetime
  | 'gold'     // $15,000+ lifetime
  | 'platinum' // $50,000+ lifetime
  | 'diamond'; // $100,000+ lifetime

export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  
  // Security tracking
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
  
  // Session metadata
  lastActivityAt: string;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  marketingOptIn?: boolean;
  
  // Optional profile data
  dateOfBirth?: string;
  referralCode?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerification {
  userId: string;
  code: string;
  type: '2fa' | 'backup';
}

export interface CustomerPreferences {
  // Communication
  emailNotifications: {
    orderUpdates: boolean;
    marketing: boolean;
    newArrivals: boolean;
    priceDrops: boolean;
    backInStock: boolean;
    vipEvents: boolean;
  };
  
  smsNotifications: {
    orderUpdates: boolean;
    deliveryUpdates: boolean;
    appointmentReminders: boolean;
  };
  
  // Shopping preferences
  jewelry: {
    metals: string[];
    gemstones: string[];
    styles: string[];
    occasions: string[];
    priceRange: [number, number];
  };
  
  // Personal information
  sizes: {
    ringSize?: string;
    braceletSize?: string;
    necklaceLength?: string;
  };
  
  // Special dates
  importantDates: {
    name: string;
    date: string;
    type: 'birthday' | 'anniversary' | 'custom';
  }[];
}

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  items: WishlistItem[];
  sharedWith: string[]; // email addresses
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
  notes?: string;
  priorityLevel: 'low' | 'medium' | 'high';
}

export interface PersonalShopperRequest {
  id: string;
  userId: string;
  occasion: string;
  budget: [number, number];
  preferences: string;
  timeline: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  assignedShopperId?: string;
  createdAt: string;
  updatedAt: string;
  
  // Communication thread
  messages: ShopperMessage[];
}

export interface ShopperMessage {
  id: string;
  senderId: string;
  senderType: 'customer' | 'shopper';
  message: string;
  attachments?: string[];
  sentAt: string;
}

export interface VIPBenefits {
  level: VIPStatus;
  benefits: {
    earlyAccess: boolean;
    freeShipping: boolean;
    personalShopper: boolean;
    exclusiveEvents: boolean;
    extendedReturns: boolean;
    prioritySupport: boolean;
    customDesign: boolean;
    privateShowroom: boolean;
  };
  
  discounts: {
    percentage: number;
    applicableCategories: string[];
    minimumOrderValue: number;
  };
  
  rewards: {
    pointsMultiplier: number;
    birthdayBonus: number;
    anniversaryBonus: number;
  };
}

export interface SecurityEvent {
  id: string;
  userId: string;
  type: SecurityEventType;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
  createdAt: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
}

export type SecurityEventType = 
  | 'login_success'
  | 'login_failure'
  | 'password_change'
  | 'email_change'
  | '2fa_enabled'
  | '2fa_disabled'
  | 'suspicious_activity'
  | 'account_locked'
  | 'account_unlocked'
  | 'high_value_purchase'
  | 'address_change'
  | 'payment_method_added';

export interface AuthResponse {
  user: User;
  session: Session;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface RateLimitInfo {
  remainingAttempts: number;
  resetTime: string;
  blocked: boolean;
}

// JWT payload interface
export interface JWTPayload {
  userId: string;
  email: string;
  sessionId: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

// OAuth provider data
export interface OAuthProvider {
  provider: 'google' | 'apple' | 'facebook';
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

// Account deletion request
export interface AccountDeletionRequest {
  userId: string;
  reason: string;
  scheduledFor: string;
  confirmationCode: string;
  createdAt: string;
}