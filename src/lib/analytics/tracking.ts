/**
 * Comprehensive analytics and conversion tracking for luxury jewelry ecommerce
 * Integrates GA4, Klaviyo, Facebook Pixel, and custom analytics
 */

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  currency?: string;
  
  // E-commerce specific
  items?: AnalyticsItem[];
  transaction_id?: string;
  coupon?: string;
  shipping?: number;
  tax?: number;
  
  // Custom properties
  custom_parameters?: Record<string, any>;
  
  // User context
  user_id?: string;
  session_id?: string;
  timestamp: string;
}

export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  category: string;
  category2?: string; // subcategory
  category3?: string; // collection
  category4?: string; // metal type
  category5?: string; // stone type
  
  quantity: number;
  price: number;
  currency: string;
  
  // Jewelry-specific attributes
  brand?: string;
  sku?: string;
  variant?: string;
  carat?: number;
  cut?: string;
  color?: string;
  clarity?: string;
  metal?: string;
  setting?: string;
  
  // Inventory info
  availability?: string;
  custom_made?: boolean;
  lead_time?: number;
}

export interface UserProperties {
  user_id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  
  // Customer segmentation
  customer_lifetime_value: number;
  total_orders: number;
  vip_status: string;
  acquisition_channel: string;
  signup_date: string;
  last_order_date?: string;
  
  // Preferences
  preferred_metal: string[];
  price_range: [number, number];
  style_preferences: string[];
  
  // Engagement
  email_subscriber: boolean;
  marketing_opt_in: boolean;
  last_email_click?: string;
  last_email_open?: string;
  
  // Geographic
  country?: string;
  state?: string;
  city?: string;
  timezone?: string;
}

export interface ConversionFunnel {
  session_id: string;
  user_id?: string;
  
  // Funnel stages with timestamps
  page_view?: string;
  product_view?: string;
  add_to_cart?: string;
  begin_checkout?: string;
  add_payment_info?: string;
  purchase?: string;
  
  // Outcome
  converted: boolean;
  conversion_value?: number;
  drop_off_stage?: string;
  
  // Attribution
  source: string;
  medium: string;
  campaign?: string;
  referrer?: string;
  
  // Context
  device_type: string;
  browser: string;
  landing_page: string;
  exit_page?: string;
  session_duration?: number;
}

export class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private userProperties: Map<string, UserProperties> = new Map();
  private funnels: Map<string, ConversionFunnel> = new Map();
  
  private ga4MeasurementId: string;
  private facebookPixelId: string;
  private klaviyoPublicKey: string;
  private customApiEndpoint: string;

  constructor(config: {
    ga4MeasurementId: string;
    facebookPixelId: string;
    klaviyoPublicKey: string;
    customApiEndpoint: string;
  }) {
    this.ga4MeasurementId = config.ga4MeasurementId;
    this.facebookPixelId = config.facebookPixelId;
    this.klaviyoPublicKey = config.klaviyoPublicKey;
    this.customApiEndpoint = config.customApiEndpoint;
    
    this.initializeTracking();
  }

  /**
   * Initialize all tracking platforms
   */
  private initializeTracking(): void {
    this.initializeGA4();
    this.initializeFacebookPixel();
    this.initializeKlaviyo();
    console.log('Analytics tracking initialized');
  }

  /**
   * Track page view
   */
  async trackPageView(
    page: string,
    title: string,
    userId?: string,
    customParams?: Record<string, any>
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'page_view',
      category: 'navigation',
      action: 'view',
      label: page,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: {
        page_title: title,
        page_location: window.location.href,
        page_referrer: document.referrer,
        ...customParams
      }
    };

    await this.sendEvent(event);
    
    // Update conversion funnel
    if (userId) {
      this.updateFunnel(userId, 'page_view', page);
    }
  }

  /**
   * Track product view
   */
  async trackProductView(
    product: AnalyticsItem,
    userId?: string,
    customParams?: Record<string, any>
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'view_item',
      category: 'ecommerce',
      action: 'view_product',
      label: product.item_name,
      value: product.price,
      currency: product.currency,
      items: [product],
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: customParams
    };

    await this.sendEvent(event);
    
    // Track in Klaviyo for personalization
    if (userId) {
      await this.trackKlaviyoEvent('Viewed Product', {
        ProductID: product.item_id,
        ProductName: product.item_name,
        Price: product.price,
        Category: product.category,
        Metal: product.metal,
        Carat: product.carat,
        URL: window.location.href
      }, userId);
      
      this.updateFunnel(userId, 'product_view', product.item_id);
    }
  }

  /**
   * Track add to cart
   */
  async trackAddToCart(
    items: AnalyticsItem[],
    userId?: string,
    customParams?: Record<string, any>
  ): Promise<void> {
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const event: AnalyticsEvent = {
      event: 'add_to_cart',
      category: 'ecommerce',
      action: 'add_to_cart',
      value: totalValue,
      currency: items[0]?.currency || 'USD',
      items,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: customParams
    };

    await this.sendEvent(event);
    
    // Track high-value add to cart events
    if (totalValue > 5000) {
      await this.sendEvent({
        ...event,
        event: 'add_to_cart_high_value',
        category: 'ecommerce_premium'
      });
    }
    
    if (userId) {
      // Klaviyo tracking
      for (const item of items) {
        await this.trackKlaviyoEvent('Added to Cart', {
          ProductID: item.item_id,
          ProductName: item.item_name,
          Price: item.price,
          Quantity: item.quantity,
          Total: item.price * item.quantity
        }, userId);
      }
      
      this.updateFunnel(userId, 'add_to_cart');
    }
  }

  /**
   * Track remove from cart
   */
  async trackRemoveFromCart(
    items: AnalyticsItem[],
    userId?: string,
    customParams?: Record<string, any>
  ): Promise<void> {
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const event: AnalyticsEvent = {
      event: 'remove_from_cart',
      category: 'ecommerce',
      action: 'remove_from_cart',
      value: totalValue,
      currency: items[0]?.currency || 'USD',
      items,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: customParams
    };

    await this.sendEvent(event);
  }

  /**
   * Track checkout process
   */
  async trackBeginCheckout(
    items: AnalyticsItem[],
    totalValue: number,
    currency: string = 'USD',
    userId?: string,
    customParams?: Record<string, any>
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'begin_checkout',
      category: 'ecommerce',
      action: 'begin_checkout',
      value: totalValue,
      currency,
      items,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: customParams
    };

    await this.sendEvent(event);
    
    if (userId) {
      await this.trackKlaviyoEvent('Started Checkout', {
        CheckoutURL: window.location.href,
        ItemNames: items.map(i => i.item_name),
        Categories: items.map(i => i.category),
        Total: totalValue,
        ItemCount: items.reduce((sum, i) => sum + i.quantity, 0)
      }, userId);
      
      this.updateFunnel(userId, 'begin_checkout');
    }
  }

  /**
   * Track payment info addition
   */
  async trackAddPaymentInfo(
    items: AnalyticsItem[],
    totalValue: number,
    currency: string = 'USD',
    paymentMethod: string,
    userId?: string,
    customParams?: Record<string, any>
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'add_payment_info',
      category: 'ecommerce',
      action: 'add_payment_info',
      value: totalValue,
      currency,
      items,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: {
        payment_method: paymentMethod,
        ...customParams
      }
    };

    await this.sendEvent(event);
    
    if (userId) {
      this.updateFunnel(userId, 'add_payment_info');
    }
  }

  /**
   * Track successful purchase
   */
  async trackPurchase(
    transactionId: string,
    items: AnalyticsItem[],
    totalValue: number,
    currency: string = 'USD',
    shipping?: number,
    tax?: number,
    coupon?: string,
    userId?: string,
    customParams?: Record<string, any>
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'purchase',
      category: 'ecommerce',
      action: 'purchase',
      value: totalValue,
      currency,
      transaction_id: transactionId,
      items,
      shipping,
      tax,
      coupon,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: customParams
    };

    await this.sendEvent(event);
    
    // Track high-value purchases separately
    if (totalValue > 10000) {
      await this.sendEvent({
        ...event,
        event: 'purchase_high_value',
        category: 'ecommerce_premium'
      });
    }
    
    if (userId) {
      // Update customer lifetime value
      await this.updateCustomerValue(userId, totalValue);
      
      // Klaviyo purchase tracking
      await this.trackKlaviyoEvent('Placed Order', {
        OrderID: transactionId,
        ItemNames: items.map(i => i.item_name),
        Categories: items.map(i => i.category),
        Total: totalValue,
        ItemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        Shipping: shipping || 0,
        Tax: tax || 0,
        CouponCode: coupon
      }, userId);
      
      this.updateFunnel(userId, 'purchase', transactionId);
      this.completeFunnel(userId, true, totalValue);
    }
  }

  /**
   * Track search events
   */
  async trackSearch(
    searchTerm: string,
    resultsCount: number,
    filters?: Record<string, any>,
    userId?: string
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'search',
      category: 'engagement',
      action: 'search',
      label: searchTerm,
      value: resultsCount,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: {
        search_term: searchTerm,
        results_count: resultsCount,
        filters: filters
      }
    };

    await this.sendEvent(event);
    
    if (userId && resultsCount === 0) {
      // Track no results for product development insights
      await this.sendEvent({
        ...event,
        event: 'search_no_results',
        category: 'product_insights'
      });
    }
  }

  /**
   * Track wishlist actions
   */
  async trackWishlistAdd(
    item: AnalyticsItem,
    userId?: string
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'add_to_wishlist',
      category: 'engagement',
      action: 'add_to_wishlist',
      label: item.item_name,
      value: item.price,
      currency: item.currency,
      items: [item],
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString()
    };

    await this.sendEvent(event);
    
    if (userId) {
      await this.trackKlaviyoEvent('Added to Wishlist', {
        ProductID: item.item_id,
        ProductName: item.item_name,
        Price: item.price,
        Category: item.category
      }, userId);
    }
  }

  /**
   * Track custom luxury jewelry events
   */
  async trackCustomEvent(
    eventName: string,
    category: string,
    properties: Record<string, any>,
    userId?: string
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: eventName,
      category,
      action: eventName,
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: properties
    };

    await this.sendEvent(event);
    
    if (userId) {
      await this.trackKlaviyoEvent(eventName, properties, userId);
    }
  }

  /**
   * Track appointment booking for personal shopping
   */
  async trackAppointmentBooked(
    appointmentType: string,
    appointmentDate: string,
    preferredBudget: number,
    userId?: string
  ): Promise<void> {
    const event: AnalyticsEvent = {
      event: 'appointment_booked',
      category: 'high_value_engagement',
      action: 'book_appointment',
      label: appointmentType,
      value: preferredBudget,
      currency: 'USD',
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      custom_parameters: {
        appointment_type: appointmentType,
        appointment_date: appointmentDate,
        budget_range: preferredBudget
      }
    };

    await this.sendEvent(event);
  }

  /**
   * Send event to all platforms
   */
  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    // Store locally
    this.events.push(event);
    
    // Send to GA4
    await this.sendToGA4(event);
    
    // Send to Facebook Pixel
    await this.sendToFacebookPixel(event);
    
    // Send to custom analytics endpoint
    await this.sendToCustomEndpoint(event);
  }

  /**
   * Send to Google Analytics 4
   */
  private async sendToGA4(event: AnalyticsEvent): Promise<void> {
    if (typeof gtag !== 'undefined') {
      const gaEvent: any = {
        currency: event.currency,
        value: event.value,
        transaction_id: event.transaction_id,
        coupon: event.coupon,
        shipping: event.shipping,
        tax: event.tax,
        items: event.items?.map(item => ({
          item_id: item.item_id,
          item_name: item.item_name,
          category: item.category,
          category2: item.category2,
          category3: item.category3,
          category4: item.category4,
          category5: item.category5,
          quantity: item.quantity,
          price: item.price,
          item_brand: item.brand,
          item_variant: item.variant
        })),
        custom_parameters: event.custom_parameters
      };

      gtag('event', event.event, gaEvent);
    }
  }

  /**
   * Send to Facebook Pixel
   */
  private async sendToFacebookPixel(event: AnalyticsEvent): Promise<void> {
    if (typeof fbq !== 'undefined') {
      let fbEvent = '';
      const fbParams: any = {};

      // Map events to Facebook Pixel events
      switch (event.event) {
        case 'page_view':
          fbEvent = 'PageView';
          break;
        case 'view_item':
          fbEvent = 'ViewContent';
          fbParams.content_type = 'product';
          fbParams.content_ids = event.items?.map(i => i.item_id);
          fbParams.value = event.value;
          fbParams.currency = event.currency;
          break;
        case 'add_to_cart':
          fbEvent = 'AddToCart';
          fbParams.content_type = 'product';
          fbParams.content_ids = event.items?.map(i => i.item_id);
          fbParams.value = event.value;
          fbParams.currency = event.currency;
          break;
        case 'begin_checkout':
          fbEvent = 'InitiateCheckout';
          fbParams.value = event.value;
          fbParams.currency = event.currency;
          fbParams.num_items = event.items?.reduce((sum, i) => sum + i.quantity, 0);
          break;
        case 'add_payment_info':
          fbEvent = 'AddPaymentInfo';
          fbParams.value = event.value;
          fbParams.currency = event.currency;
          break;
        case 'purchase':
          fbEvent = 'Purchase';
          fbParams.value = event.value;
          fbParams.currency = event.currency;
          fbParams.content_type = 'product';
          fbParams.content_ids = event.items?.map(i => i.item_id);
          break;
        case 'search':
          fbEvent = 'Search';
          fbParams.search_string = event.label;
          break;
        case 'add_to_wishlist':
          fbEvent = 'AddToWishlist';
          fbParams.content_type = 'product';
          fbParams.content_ids = event.items?.map(i => i.item_id);
          fbParams.value = event.value;
          fbParams.currency = event.currency;
          break;
      }

      if (fbEvent) {
        fbq('track', fbEvent, fbParams);
      }
    }
  }

  /**
   * Track event in Klaviyo
   */
  private async trackKlaviyoEvent(
    eventName: string,
    properties: Record<string, any>,
    userId: string
  ): Promise<void> {
    // In production, use Klaviyo's JavaScript API
    console.log('Klaviyo event:', eventName, properties, userId);
  }

  /**
   * Send to custom analytics endpoint
   */
  private async sendToCustomEndpoint(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch(this.customApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Failed to send to custom analytics:', error);
    }
  }

  /**
   * Update conversion funnel
   */
  private updateFunnel(
    userId: string,
    stage: string,
    value?: string
  ): void {
    const sessionId = this.getSessionId();
    const funnelKey = `${userId}_${sessionId}`;
    
    if (!this.funnels.has(funnelKey)) {
      this.funnels.set(funnelKey, {
        session_id: sessionId,
        user_id: userId,
        converted: false,
        source: this.getAttribution().source,
        medium: this.getAttribution().medium,
        campaign: this.getAttribution().campaign,
        device_type: this.getDeviceType(),
        browser: this.getBrowser(),
        landing_page: this.getLandingPage()
      });
    }

    const funnel = this.funnels.get(funnelKey)!;
    const timestamp = new Date().toISOString();
    
    switch (stage) {
      case 'page_view':
        if (!funnel.page_view) funnel.page_view = timestamp;
        break;
      case 'product_view':
        if (!funnel.product_view) funnel.product_view = timestamp;
        break;
      case 'add_to_cart':
        if (!funnel.add_to_cart) funnel.add_to_cart = timestamp;
        break;
      case 'begin_checkout':
        if (!funnel.begin_checkout) funnel.begin_checkout = timestamp;
        break;
      case 'add_payment_info':
        if (!funnel.add_payment_info) funnel.add_payment_info = timestamp;
        break;
      case 'purchase':
        if (!funnel.purchase) funnel.purchase = timestamp;
        break;
    }
  }

  /**
   * Complete conversion funnel
   */
  private completeFunnel(
    userId: string,
    converted: boolean,
    value?: number
  ): void {
    const sessionId = this.getSessionId();
    const funnelKey = `${userId}_${sessionId}`;
    const funnel = this.funnels.get(funnelKey);
    
    if (funnel) {
      funnel.converted = converted;
      funnel.conversion_value = value;
      funnel.exit_page = window.location.pathname;
      
      // Calculate session duration
      if (funnel.page_view) {
        const startTime = new Date(funnel.page_view).getTime();
        const endTime = Date.now();
        funnel.session_duration = Math.round((endTime - startTime) / 1000);
      }
    }
  }

  /**
   * Update customer lifetime value
   */
  private async updateCustomerValue(userId: string, orderValue: number): Promise<void> {
    const user = this.userProperties.get(userId);
    if (user) {
      user.customer_lifetime_value += orderValue;
      user.total_orders += 1;
      user.last_order_date = new Date().toISOString();
      
      // Update VIP status based on spending
      if (user.customer_lifetime_value >= 100000) {
        user.vip_status = 'diamond';
      } else if (user.customer_lifetime_value >= 50000) {
        user.vip_status = 'platinum';
      } else if (user.customer_lifetime_value >= 15000) {
        user.vip_status = 'gold';
      } else if (user.customer_lifetime_value >= 5000) {
        user.vip_status = 'silver';
      }
    }
  }

  /**
   * Get session ID
   */
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Get attribution data
   */
  private getAttribution(): { source: string; medium: string; campaign?: string } {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      source: urlParams.get('utm_source') || 'direct',
      medium: urlParams.get('utm_medium') || 'none',
      campaign: urlParams.get('utm_campaign') || undefined
    };
  }

  /**
   * Get device type
   */
  private getDeviceType(): string {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
    return 'desktop';
  }

  /**
   * Get browser name
   */
  private getBrowser(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  /**
   * Get landing page
   */
  private getLandingPage(): string {
    return sessionStorage.getItem('landing_page') || window.location.pathname;
  }

  /**
   * Initialize GA4
   */
  private initializeGA4(): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.ga4MeasurementId, {
        send_page_view: false, // We'll handle page views manually
        cookie_domain: 'auto',
        cookie_expires: 28 * 24 * 60 * 60, // 28 days
        anonymize_ip: true
      });
    }
  }

  /**
   * Initialize Facebook Pixel
   */
  private initializeFacebookPixel(): void {
    if (typeof fbq !== 'undefined') {
      fbq('init', this.facebookPixelId);
    }
  }

  /**
   * Initialize Klaviyo
   */
  private initializeKlaviyo(): void {
    // Klaviyo initialization would go here
    console.log('Klaviyo initialized with key:', this.klaviyoPublicKey);
  }
}

// Global analytics instance
declare global {
  interface Window {
    analytics: AnalyticsTracker;
    gtag: any;
    fbq: any;
  }
}

// Export for use in components
export default AnalyticsTracker;