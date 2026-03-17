import { 
  EmailTemplate, 
  EmailCampaign, 
  PersonalizationData, 
  EmailEvent,
  EmailTrigger,
  UnsubscribePreferences,
  DeliverabilityMetrics,
  EmailDeliveryJob,
  CampaignAnalytics 
} from './types';

/**
 * Comprehensive email automation platform for luxury jewelry marketing
 * Handles high-value customer communications with personalization and analytics
 */
export class EmailAutomationService {
  private templates: Map<string, EmailTemplate> = new Map();
  private campaigns: Map<string, EmailCampaign> = new Map();
  private events: EmailEvent[] = [];
  private deliveryQueue: EmailDeliveryJob[] = [];
  private unsubscribePrefs: Map<string, UnsubscribePreferences> = new Map();

  constructor() {
    this.initializeService();
    this.startDeliveryProcessor();
  }

  /**
   * Initialize email automation service
   */
  private initializeService(): void {
    this.loadEmailTemplates();
    this.loadActiveCampaigns();
    console.log('Email automation service initialized');
  }

  /**
   * Create welcome series for new jewelry customers
   */
  async createWelcomeSeries(userId: string, email: string, firstName: string): Promise<boolean> {
    const welcomeTemplate = this.templates.get('welcome_series_1');
    if (!welcomeTemplate) return false;

    // Welcome email 1: Immediate send
    await this.scheduleEmail({
      templateId: 'welcome_series_1',
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId),
      scheduledAt: new Date().toISOString(),
      campaignType: 'welcome_series',
      sequenceStep: 1
    });

    // Welcome email 2: 3 days later with jewelry care guide
    await this.scheduleEmail({
      templateId: 'welcome_series_2',
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId),
      scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      campaignType: 'welcome_series',
      sequenceStep: 2
    });

    // Welcome email 3: 7 days later with style preference survey
    await this.scheduleEmail({
      templateId: 'welcome_series_3',
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId),
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      campaignType: 'welcome_series',
      sequenceStep: 3
    });

    return true;
  }

  /**
   * Trigger abandoned cart recovery sequence
   */
  async triggerAbandonedCartRecovery(
    userId: string, 
    email: string, 
    cartValue: number,
    cartItems: any[]
  ): Promise<boolean> {
    // Don't send if customer has unsubscribed from marketing
    const prefs = this.unsubscribePrefs.get(email);
    if (prefs?.globalUnsubscribe || prefs?.preferences.marketing === false) {
      return false;
    }

    // Different flow for high-value carts (>$5,000)
    const isHighValue = cartValue > 5000;
    const templatePrefix = isHighValue ? 'abandoned_cart_luxury' : 'abandoned_cart_standard';

    // Email 1: 30 minutes after abandonment
    await this.scheduleEmail({
      templateId: `${templatePrefix}_1`,
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId, { cartItems, cartValue }),
      scheduledAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      campaignType: 'abandoned_cart',
      sequenceStep: 1
    });

    // Email 2: 24 hours later with incentive
    const incentive = isHighValue ? 'personal_consultation' : '10_percent_discount';
    await this.scheduleEmail({
      templateId: `${templatePrefix}_2`,
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId, { 
        cartItems, 
        cartValue, 
        incentive 
      }),
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      campaignType: 'abandoned_cart',
      sequenceStep: 2
    });

    // Email 3: 72 hours later - final reminder
    if (isHighValue) {
      // High-value: Personal shopper offer
      await this.scheduleEmail({
        templateId: 'abandoned_cart_luxury_3',
        recipientId: userId,
        email,
        personalizationData: await this.getPersonalizationData(userId, { 
          cartItems, 
          cartValue,
          personalShopperAvailable: true
        }),
        scheduledAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        campaignType: 'abandoned_cart',
        sequenceStep: 3
      });
    } else {
      // Standard: Social proof and urgency
      await this.scheduleEmail({
        templateId: 'abandoned_cart_standard_3',
        recipientId: userId,
        email,
        personalizationData: await this.getPersonalizationData(userId, { cartItems, cartValue }),
        scheduledAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        campaignType: 'abandoned_cart',
        sequenceStep: 3
      });
    }

    return true;
  }

  /**
   * Send post-purchase care instructions
   */
  async sendPostPurchaseCare(
    userId: string,
    email: string,
    orderData: any
  ): Promise<boolean> {
    const hasLabDiamond = orderData.items.some((item: any) => 
      item.diamond && item.diamond.growthMethod
    );

    const hasGoldJewelry = orderData.items.some((item: any) => 
      item.metal.includes('Gold')
    );

    const hasPlatinum = orderData.items.some((item: any) => 
      item.metal.includes('Platinum')
    );

    // Immediate: Order confirmation
    await this.scheduleEmail({
      templateId: 'order_confirmation',
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId, { orderData }),
      scheduledAt: new Date().toISOString(),
      campaignType: 'transactional'
    });

    // 1 week later: Care instructions based on jewelry type
    let careTemplateId = 'general_care_instructions';
    if (hasLabDiamond && hasPlatinum) {
      careTemplateId = 'lab_diamond_platinum_care';
    } else if (hasLabDiamond && hasGoldJewelry) {
      careTemplateId = 'lab_diamond_gold_care';
    } else if (hasGoldJewelry) {
      careTemplateId = 'gold_jewelry_care';
    } else if (hasPlatinum) {
      careTemplateId = 'platinum_jewelry_care';
    }

    await this.scheduleEmail({
      templateId: careTemplateId,
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId, { orderData }),
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      campaignType: 'educational'
    });

    // 30 days later: Review request
    await this.scheduleEmail({
      templateId: 'review_request',
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId, { orderData }),
      scheduledAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      campaignType: 'behavioral'
    });

    // 1 year later: Anniversary and maintenance reminder
    await this.scheduleEmail({
      templateId: 'anniversary_maintenance',
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId, { orderData }),
      scheduledAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      campaignType: 'lifecycle'
    });

    return true;
  }

  /**
   * Send VIP customer exclusive offers
   */
  async sendVIPExclusive(
    vipSegment: string, // 'silver', 'gold', 'platinum', 'diamond'
    newCollectionId: string
  ): Promise<boolean> {
    const vipCustomers = await this.getVIPCustomers(vipSegment);

    for (const customer of vipCustomers) {
      // Skip if unsubscribed from marketing
      const prefs = this.unsubscribePrefs.get(customer.email);
      if (prefs?.globalUnsubscribe || prefs?.preferences.vipEvents === false) {
        continue;
      }

      await this.scheduleEmail({
        templateId: `vip_${vipSegment}_exclusive`,
        recipientId: customer.id,
        email: customer.email,
        personalizationData: await this.getPersonalizationData(customer.id, {
          newCollectionId,
          vipLevel: vipSegment,
          earlyAccessHours: this.getEarlyAccessHours(vipSegment)
        }),
        scheduledAt: new Date().toISOString(),
        campaignType: 'promotional'
      });
    }

    return true;
  }

  /**
   * Send back in stock notifications
   */
  async sendBackInStockAlert(
    productId: string,
    productName: string,
    originalPrice: number
  ): Promise<boolean> {
    const interestedCustomers = await this.getInterestedCustomers(productId);

    for (const customer of interestedCustomers) {
      // Skip if unsubscribed
      const prefs = this.unsubscribePrefs.get(customer.email);
      if (prefs?.globalUnsubscribe || prefs?.preferences.backInStock === false) {
        continue;
      }

      await this.scheduleEmail({
        templateId: 'back_in_stock',
        recipientId: customer.id,
        email: customer.email,
        personalizationData: await this.getPersonalizationData(customer.id, {
          productId,
          productName,
          originalPrice,
          timeOutOfStock: customer.wishlistedAt
        }),
        scheduledAt: new Date().toISOString(),
        campaignType: 'behavioral'
      });
    }

    return true;
  }

  /**
   * Send birthday celebration email
   */
  async sendBirthdayEmail(userId: string, email: string): Promise<boolean> {
    const customerData = await this.getCustomerLifetimeValue(userId);
    
    // Different birthday offers based on customer value
    let templateId = 'birthday_standard';
    let giftValue = 50; // Standard $50 birthday credit
    
    if (customerData.lifetimeValue > 50000) {
      templateId = 'birthday_diamond_vip';
      giftValue = 500;
    } else if (customerData.lifetimeValue > 15000) {
      templateId = 'birthday_platinum_vip';
      giftValue = 250;
    } else if (customerData.lifetimeValue > 5000) {
      templateId = 'birthday_gold_vip';
      giftValue = 150;
    }

    await this.scheduleEmail({
      templateId,
      recipientId: userId,
      email,
      personalizationData: await this.getPersonalizationData(userId, {
        birthdayGiftValue: giftValue,
        vipLevel: customerData.vipStatus,
        birthMonth: new Date().getMonth() + 1
      }),
      scheduledAt: new Date().toISOString(),
      campaignType: 'lifecycle'
    });

    return true;
  }

  /**
   * Schedule email for delivery
   */
  private async scheduleEmail(emailJob: Partial<EmailDeliveryJob>): Promise<string> {
    const jobId = this.generateId();
    
    const job: EmailDeliveryJob = {
      id: jobId,
      campaignId: emailJob.campaignId || this.generateCampaignId(),
      templateId: emailJob.templateId!,
      recipientId: emailJob.recipientId!,
      email: emailJob.email!,
      status: 'pending',
      scheduledAt: emailJob.scheduledAt!,
      attemptCount: 0,
      maxAttempts: 3,
      personalizationData: emailJob.personalizationData!
    };

    this.deliveryQueue.push(job);
    return jobId;
  }

  /**
   * Process email delivery queue
   */
  private startDeliveryProcessor(): void {
    setInterval(async () => {
      await this.processDeliveryQueue();
    }, 60000); // Process every minute
  }

  /**
   * Process pending emails in queue
   */
  private async processDeliveryQueue(): Promise<void> {
    const now = new Date();
    const readyJobs = this.deliveryQueue.filter(job => 
      job.status === 'pending' && 
      new Date(job.scheduledAt) <= now
    );

    for (const job of readyJobs) {
      try {
        await this.sendEmail(job);
      } catch (error) {
        console.error(`Failed to send email job ${job.id}:`, error);
        await this.handleFailedDelivery(job);
      }
    }
  }

  /**
   * Send individual email
   */
  private async sendEmail(job: EmailDeliveryJob): Promise<void> {
    const template = this.templates.get(job.templateId);
    if (!template) {
      throw new Error(`Template ${job.templateId} not found`);
    }

    job.status = 'sending';
    job.attemptCount++;
    job.lastAttemptAt = new Date().toISOString();

    // Personalize email content
    const personalizedContent = await this.personalizeContent(template, job.personalizationData);

    // Send via email provider (Klaviyo, SendGrid, etc.)
    const messageId = await this.sendViaProvider({
      to: job.email,
      subject: personalizedContent.subject,
      html: personalizedContent.html,
      text: personalizedContent.text,
      trackingPixel: true,
      clickTracking: true
    });

    job.status = 'sent';
    job.sentAt = new Date().toISOString();
    job.messageId = messageId;

    // Log event
    await this.logEmailEvent({
      type: 'sent',
      recipientId: job.recipientId,
      email: job.email,
      campaignId: job.campaignId,
      templateId: job.templateId
    });
  }

  /**
   * Personalize email content with dynamic data
   */
  private async personalizeContent(
    template: EmailTemplate, 
    data: PersonalizationData
  ): Promise<{ subject: string; html: string; text: string }> {
    let subject = template.subject;
    let html = template.htmlContent;
    let text = template.textContent;

    // Basic personalization
    const replacements: Record<string, string> = {
      '{{firstName}}': data.firstName || '',
      '{{lastName}}': data.lastName || '',
      '{{email}}': data.email,
      '{{vipStatus}}': data.vipStatus,
      '{{loyaltyPoints}}': data.loyaltyPoints.toString(),
      '{{totalSpent}}': this.formatCurrency(data.totalSpent),
      '{{orderCount}}': data.orderCount.toString(),
    };

    // Advanced personalization
    if (data.recentlyViewed?.length > 0) {
      replacements['{{recentlyViewed}}'] = this.formatProductList(data.recentlyViewed);
    }

    if (data.wishlist?.length > 0) {
      replacements['{{wishlistItems}}'] = this.formatProductList(data.wishlist);
    }

    if (data.cartItems?.length > 0) {
      replacements['{{cartItems}}'] = this.formatCartItems(data.cartItems);
      replacements['{{cartTotal}}'] = this.formatCurrency(
        data.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      );
    }

    // Apply replacements
    for (const [placeholder, value] of Object.entries(replacements)) {
      const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
      subject = subject.replace(regex, value);
      html = html.replace(regex, value);
      text = text.replace(regex, value);
    }

    return { subject, html, text };
  }

  /**
   * Format product list for email
   */
  private formatProductList(products: any[]): string {
    return products.map(product => `
      <div style="border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px;">
        <img src="${product.image}" alt="${product.name}" style="width: 120px; height: 120px; object-fit: cover; float: left; margin-right: 15px;">
        <div>
          <h3 style="margin: 0; font-size: 18px;">${product.name}</h3>
          <p style="font-size: 20px; font-weight: bold; color: #a67c52;">${this.formatCurrency(product.price)}</p>
          <a href="${product.url}" style="background-color: #a67c52; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Details</a>
        </div>
        <div style="clear: both;"></div>
      </div>
    `).join('');
  }

  /**
   * Format cart items for abandoned cart emails
   */
  private formatCartItems(items: any[]): string {
    return items.map(item => `
      <div style="border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; background-color: #fafaf9;">
        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; float: left; margin-right: 15px;">
        <div>
          <h3 style="margin: 0; font-size: 16px;">${item.name}</h3>
          <p style="margin: 5px 0;">Quantity: ${item.quantity}</p>
          <p style="font-size: 18px; font-weight: bold; color: #a67c52;">${this.formatCurrency(item.price * item.quantity)}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    `).join('');
  }

  /**
   * Send email via provider (placeholder for actual implementation)
   */
  private async sendViaProvider(emailData: any): Promise<string> {
    // In production, integrate with Klaviyo, SendGrid, Mailgun, etc.
    console.log('Sending email:', emailData.subject, 'to:', emailData.to);
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Log email events for analytics
   */
  private async logEmailEvent(eventData: Partial<EmailEvent>): Promise<void> {
    const event: EmailEvent = {
      id: this.generateId(),
      campaignId: eventData.campaignId!,
      templateId: eventData.templateId!,
      recipientId: eventData.recipientId!,
      email: eventData.email!,
      type: eventData.type!,
      timestamp: new Date().toISOString(),
      metadata: eventData.metadata || {}
    };

    this.events.push(event);
  }

  /**
   * Get personalization data for user
   */
  private async getPersonalizationData(
    userId: string, 
    additionalData?: any
  ): Promise<PersonalizationData> {
    // In production, fetch from database/CRM
    const baseData: PersonalizationData = {
      userId,
      email: '',
      firstName: '',
      lastName: '',
      vipStatus: 'standard',
      loyaltyPoints: 0,
      totalSpent: 0,
      orderCount: 0,
      preferredMetal: [],
      priceRange: [0, 50000],
      stylePreferences: [],
      recentlyViewed: [],
      wishlist: [],
      cartItems: [],
      emailEngagementScore: 0.75
    };

    return { ...baseData, ...additionalData };
  }

  /**
   * Get VIP customers by segment
   */
  private async getVIPCustomers(segment: string): Promise<any[]> {
    // In production, query database for VIP customers
    return [];
  }

  /**
   * Get interested customers for product
   */
  private async getInterestedCustomers(productId: string): Promise<any[]> {
    // In production, query wishlist/interest database
    return [];
  }

  /**
   * Get customer lifetime value
   */
  private async getCustomerLifetimeValue(userId: string): Promise<any> {
    // In production, calculate from order history
    return { lifetimeValue: 0, vipStatus: 'standard' };
  }

  /**
   * Handle failed email delivery
   */
  private async handleFailedDelivery(job: EmailDeliveryJob): Promise<void> {
    if (job.attemptCount >= job.maxAttempts) {
      job.status = 'failed';
      console.error(`Email job ${job.id} failed after ${job.maxAttempts} attempts`);
    } else {
      // Retry with exponential backoff
      const retryDelay = Math.pow(2, job.attemptCount) * 60 * 1000; // 2^attempt minutes
      job.scheduledAt = new Date(Date.now() + retryDelay).toISOString();
      job.status = 'pending';
    }
  }

  /**
   * Load email templates (placeholder)
   */
  private loadEmailTemplates(): void {
    // In production, load from database or CMS
  }

  /**
   * Load active campaigns (placeholder)
   */
  private loadActiveCampaigns(): void {
    // In production, load from database
  }

  /**
   * Get early access hours based on VIP level
   */
  private getEarlyAccessHours(vipLevel: string): number {
    const hours = { silver: 24, gold: 48, platinum: 72, diamond: 96 };
    return hours[vipLevel as keyof typeof hours] || 0;
  }

  /**
   * Format currency for display
   */
  private formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate campaign ID
   */
  private generateCampaignId(): string {
    return `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const emailAutomation = new EmailAutomationService();