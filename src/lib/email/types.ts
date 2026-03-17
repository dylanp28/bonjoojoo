/**
 * Email automation types for luxury jewelry marketing platform
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: EmailType;
  category: EmailCategory;
  
  // Template content
  htmlContent: string;
  textContent: string;
  preheader?: string;
  
  // Personalization
  personalizeSubject: boolean;
  dynamicContent: DynamicContent[];
  
  // Design settings
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  
  fonts: {
    heading: string;
    body: string;
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  version: number;
}

export type EmailType = 
  | 'welcome_series'
  | 'abandoned_cart'
  | 'order_confirmation'
  | 'shipping_update'
  | 'delivery_confirmation'
  | 'review_request'
  | 'back_in_stock'
  | 'price_drop'
  | 'birthday'
  | 'anniversary'
  | 'vip_exclusive'
  | 'new_collection'
  | 'care_instructions'
  | 'warranty_reminder'
  | 'newsletter'
  | 'win_back'
  | 'referral'
  | 'personal_shopper';

export type EmailCategory = 
  | 'transactional'
  | 'promotional'
  | 'behavioral'
  | 'lifecycle'
  | 'educational';

export interface DynamicContent {
  placeholder: string;
  type: 'text' | 'product' | 'image' | 'url' | 'price';
  fallback?: string;
  conditions?: ContentCondition[];
}

export interface ContentCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'exists';
  value: any;
  content: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  
  // Targeting
  audience: Audience;
  segmentation: SegmentationRule[];
  
  // Content
  templateId: string;
  customizations: Record<string, any>;
  
  // Scheduling
  sendTime?: string; // ISO string
  timezone: string;
  recurring?: RecurringSchedule;
  
  // Automation triggers
  triggers: EmailTrigger[];
  
  // Performance tracking
  analytics: CampaignAnalytics;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type CampaignType = 
  | 'blast'      // One-time send
  | 'drip'       // Series of emails
  | 'trigger'    // Event-based
  | 'recurring'  // Regular schedule
  | 'a_b_test';  // Split testing

export type CampaignStatus = 
  | 'draft'
  | 'scheduled'
  | 'sending'
  | 'sent'
  | 'paused'
  | 'completed'
  | 'cancelled';

export interface Audience {
  totalRecipients: number;
  segments: string[];
  excludedSegments: string[];
  customFilters: AudienceFilter[];
}

export interface AudienceFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  logic?: 'AND' | 'OR';
}

export type FilterOperator = 
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'greater_than'
  | 'less_than'
  | 'between'
  | 'exists'
  | 'not_exists'
  | 'in_list'
  | 'not_in_list';

export interface SegmentationRule {
  name: string;
  conditions: SegmentCondition[];
  logic: 'AND' | 'OR';
  weight?: number; // For scoring-based segments
}

export interface SegmentCondition {
  field: CustomerField;
  operator: FilterOperator;
  value: any;
}

export type CustomerField = 
  | 'total_spent'
  | 'order_count'
  | 'last_order_date'
  | 'signup_date'
  | 'location'
  | 'age'
  | 'gender'
  | 'vip_status'
  | 'preferred_metal'
  | 'price_range'
  | 'engagement_score'
  | 'email_opens'
  | 'email_clicks'
  | 'product_views'
  | 'cart_abandons'
  | 'birthday'
  | 'anniversary';

export interface RecurringSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // Every N days/weeks/months/years
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  endDate?: string; // ISO string
}

export interface EmailTrigger {
  id: string;
  event: TriggerEvent;
  conditions: TriggerCondition[];
  delay?: TriggerDelay;
  frequency?: TriggerFrequency;
}

export type TriggerEvent = 
  | 'user_registered'
  | 'cart_abandoned'
  | 'order_placed'
  | 'order_shipped'
  | 'order_delivered'
  | 'product_viewed'
  | 'product_back_in_stock'
  | 'price_dropped'
  | 'birthday'
  | 'anniversary'
  | 'milestone_reached'
  | 'inactive_customer'
  | 'vip_upgrade'
  | 'wishlist_item_sale'
  | 'review_due'
  | 'warranty_expiring';

export interface TriggerCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface TriggerDelay {
  amount: number;
  unit: 'minutes' | 'hours' | 'days' | 'weeks';
}

export interface TriggerFrequency {
  limit: number; // Max times to send
  period: 'day' | 'week' | 'month' | 'year';
}

export interface CampaignAnalytics {
  sent: number;
  delivered: number;
  opens: number;
  uniqueOpens: number;
  clicks: number;
  uniqueClicks: number;
  unsubscribes: number;
  bounces: number;
  complaints: number;
  conversions: number;
  revenue: number;
  
  // Rates
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  unsubscribeRate: number;
  bounceRate: number;
  
  // Timing data
  bestSendTime?: string;
  peakEngagementHour?: number;
  
  // Device/client data
  mobileOpens: number;
  desktopOpens: number;
  webmailOpens: number;
}

export interface EmailEvent {
  id: string;
  campaignId: string;
  templateId: string;
  recipientId: string;
  email: string;
  
  type: EmailEventType;
  timestamp: string;
  
  // Event-specific data
  metadata?: Record<string, any>;
  
  // Tracking
  userAgent?: string;
  ipAddress?: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
}

export type EmailEventType = 
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'unsubscribed'
  | 'complained'
  | 'converted';

export interface UnsubscribePreferences {
  userId: string;
  email: string;
  preferences: {
    marketing: boolean;
    transactional: boolean;
    newsletters: boolean;
    promotions: boolean;
    newArrivals: boolean;
    priceDrops: boolean;
    backInStock: boolean;
    vipEvents: boolean;
    educational: boolean;
  };
  globalUnsubscribe: boolean;
  unsubscribedAt?: string;
  reason?: string;
  updatedAt: string;
}

export interface PersonalizationData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  
  // Profile data
  vipStatus: string;
  loyaltyPoints: number;
  totalSpent: number;
  orderCount: number;
  lastOrderDate?: string;
  
  // Preferences
  preferredMetal: string[];
  priceRange: [number, number];
  stylePreferences: string[];
  
  // Behavioral data
  recentlyViewed: ProductReference[];
  wishlist: ProductReference[];
  cartItems: CartItem[];
  
  // Special dates
  birthday?: string;
  anniversary?: string;
  
  // Engagement
  emailEngagementScore: number;
  lastEmailOpen?: string;
  lastEmailClick?: string;
}

export interface ProductReference {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
  category: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  url: string;
  abandonedAt: string;
}

export interface EmailProvider {
  name: string;
  apiKey: string;
  sendingDomain: string;
  webhookSecret: string;
  defaultFromEmail: string;
  defaultFromName: string;
  replyToEmail?: string;
}

export interface DeliverabilityMetrics {
  date: string;
  sent: number;
  delivered: number;
  bounced: number;
  complaints: number;
  reputation: number;
  domainReputation: number;
  ipReputation: number;
  
  // Provider-specific metrics
  providerMetrics: Record<string, any>;
}

export interface ABTestVariant {
  id: string;
  name: string;
  percentage: number; // Traffic allocation
  templateId: string;
  customizations: Record<string, any>;
  analytics: CampaignAnalytics;
}

export interface ABTest {
  id: string;
  campaignId: string;
  name: string;
  hypothesis: string;
  testType: ABTestType;
  status: ABTestStatus;
  
  variants: ABTestVariant[];
  winnerVariantId?: string;
  
  // Test configuration
  duration: number; // Days
  significanceLevel: number; // 0.95 = 95%
  minimumSampleSize: number;
  
  // Results
  startDate: string;
  endDate?: string;
  results?: ABTestResults;
}

export type ABTestType = 
  | 'subject_line'
  | 'content'
  | 'send_time'
  | 'from_name'
  | 'template'
  | 'cta_button'
  | 'personalization';

export type ABTestStatus = 
  | 'draft'
  | 'running'
  | 'completed'
  | 'cancelled';

export interface ABTestResults {
  winnerVariantId: string;
  confidenceLevel: number;
  improvement: number; // Percentage improvement
  metric: 'open_rate' | 'click_rate' | 'conversion_rate' | 'revenue';
  statisticalSignificance: boolean;
}

export interface EmailDeliveryJob {
  id: string;
  campaignId: string;
  templateId: string;
  recipientId: string;
  email: string;
  
  status: DeliveryStatus;
  scheduledAt: string;
  sentAt?: string;
  
  // Retry logic
  attemptCount: number;
  maxAttempts: number;
  lastAttemptAt?: string;
  failureReason?: string;
  
  // Personalization
  personalizationData: PersonalizationData;
  
  // Tracking
  messageId?: string; // Provider message ID
  trackingPixel?: string;
  clickTrackingUrls: Record<string, string>;
}

export type DeliveryStatus = 
  | 'pending'
  | 'queued'
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'failed'
  | 'cancelled';

export interface EmailDomain {
  domain: string;
  verified: boolean;
  dkimEnabled: boolean;
  spfEnabled: boolean;
  dmarcPolicy: 'none' | 'quarantine' | 'reject';
  reputation: number;
  warmupStatus: 'not_started' | 'warming' | 'warmed' | 'cooling';
  dailyLimit: number;
  currentDailyVolume: number;
}

export interface WarmupSchedule {
  domain: string;
  day: number;
  plannedVolume: number;
  actualVolume: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  complaints: number;
  status: 'pending' | 'completed' | 'failed';
}