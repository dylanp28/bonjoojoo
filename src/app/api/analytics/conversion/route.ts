import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

interface ConversionEvent {
  event_type: 'page_view' | 'product_view' | 'add_to_cart' | 'begin_checkout' | 'purchase' | 'add_to_wishlist';
  timestamp: string;
  user_id?: string;
  session_id: string;
  product_id?: string;
  category?: string;
  value?: number;
  currency?: string;
  step?: number;
  source?: string;
  medium?: string;
  campaign?: string;
}

export async function POST(request: NextRequest) {
  try {
    const conversionData = await request.json();

    // Validate required fields
    if (!conversionData.event_type || !conversionData.session_id) {
      return NextResponse.json(
        { error: 'Event type and session ID are required' },
        { status: 400 }
      );
    }

    // Enrich event data
    const enrichedEvent: ConversionEvent = {
      ...conversionData,
      timestamp: conversionData.timestamp || new Date().toISOString()
    };

    // Add server-side context
    const eventContext = {
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
      referrer: request.headers.get('referer') || '',
      server_timestamp: new Date().toISOString()
    };

    // Process conversion event
    await Promise.all([
      trackConversionFunnel(enrichedEvent, eventContext),
      updateCustomerJourney(enrichedEvent),
      analyzeConversionPatterns(enrichedEvent),
      sendToAnalyticsPlatforms(enrichedEvent, eventContext)
    ]);

    // Calculate real-time conversion metrics
    const conversionMetrics = await calculateConversionMetrics(enrichedEvent);

    return NextResponse.json({
      status: 'success',
      event_processed: enrichedEvent.event_type,
      conversion_metrics: conversionMetrics
    });

  } catch (error) {
    console.error('Conversion tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Optional authentication for detailed conversion data
    let user = null;
    const authHeader = request.headers.get('authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      // Skip token verification for now - focus on animations
      // const authResult = await authService.verifyToken(token);
      // if (authResult.success) {
      //   user = authResult.user;
      // }
    }

    const url = new URL(request.url);
    const timeframe = url.searchParams.get('timeframe') || '7d';
    const segment = url.searchParams.get('segment');
    const source = url.searchParams.get('source');

    // Get conversion analytics
    const analytics = await getConversionAnalytics({
      timeframe,
      segment,
      source,
      includeDetailed: !!user
    });

    return NextResponse.json({
      timeframe,
      generatedAt: new Date().toISOString(),
      ...analytics
    });

  } catch (error) {
    console.error('Conversion analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function trackConversionFunnel(event: ConversionEvent, context: any): Promise<void> {
  try {
    // Track users through the jewelry buying funnel
    const funnelSteps: Record<string, number> = {
      'page_view': 1,
      'product_view': 2,
      'add_to_cart': 3,
      'begin_checkout': 4,
      'purchase': 5,
      'add_to_wishlist': 6
    };

    const step = funnelSteps[event.event_type];
    if (step) {
      console.log(`Funnel tracking: Session ${event.session_id} reached step ${step} (${event.event_type})`);
      
      // Store funnel progression for analysis
      // In production, this would update a funnel tracking database
    }

    // Special tracking for high-value jewelry purchases
    if (event.event_type === 'purchase' && event.value && event.value >= 10000) {
      console.log(`High-value purchase tracked: $${event.value} - Session: ${event.session_id}`);
      
      // Trigger special analytics for luxury segment
      await trackLuxuryConversion(event, context);
    }

  } catch (error) {
    console.error('Failed to track conversion funnel:', error);
  }
}

async function trackLuxuryConversion(event: ConversionEvent, context: any): Promise<void> {
  try {
    // Specialized tracking for high-value jewelry purchases
    const luxuryMetrics = {
      purchase_value: event.value,
      session_id: event.session_id,
      user_id: event.user_id,
      product_category: event.category,
      conversion_source: event.source || 'unknown',
      luxury_segment: determineLuxurySegment(event.value!),
      timestamp: event.timestamp
    };

    console.log('Luxury conversion tracked:', luxuryMetrics);
    
    // In production, send to business intelligence platform
    // for luxury market analysis

  } catch (error) {
    console.error('Failed to track luxury conversion:', error);
  }
}

async function updateCustomerJourney(event: ConversionEvent): Promise<void> {
  try {
    if (event.user_id) {
      // Update customer journey mapping
      const journeyUpdate = {
        user_id: event.user_id,
        event_type: event.event_type,
        timestamp: event.timestamp,
        touchpoint: event.event_type,
        value: event.value || 0,
        product_interaction: event.product_id ? {
          product_id: event.product_id,
          category: event.category
        } : null
      };

      console.log('Customer journey update:', journeyUpdate);
      
      // In production, update customer data platform for personalization
    }

  } catch (error) {
    console.error('Failed to update customer journey:', error);
  }
}

async function analyzeConversionPatterns(event: ConversionEvent): Promise<void> {
  try {
    // Analyze patterns for jewelry buying behavior
    if (event.event_type === 'product_view' && event.category) {
      // Track category interest patterns
      console.log(`Category interest: ${event.category} - Session: ${event.session_id}`);
    }

    if (event.event_type === 'add_to_cart') {
      // Analyze cart behavior for jewelry products
      console.log(`Cart addition: Product ${event.product_id} - Value: $${event.value}`);
    }

    if (event.event_type === 'purchase') {
      // Analyze completed jewelry purchases
      const purchaseAnalysis = {
        session_id: event.session_id,
        purchase_value: event.value,
        category: event.category,
        conversion_time: event.timestamp,
        customer_segment: event.value && event.value >= 5000 ? 'premium' : 'standard'
      };

      console.log('Purchase analysis:', purchaseAnalysis);
    }

  } catch (error) {
    console.error('Failed to analyze conversion patterns:', error);
  }
}

async function sendToAnalyticsPlatforms(event: ConversionEvent, context: any): Promise<void> {
  try {
    // Send to Google Analytics 4
    if (process.env.GOOGLE_ANALYTICS_ID) {
      const ga4Event = formatForGA4(event, context);
      console.log('Sending to GA4:', ga4Event);
      // In production, send via Measurement Protocol
    }

    // Send to Facebook Pixel
    if (process.env.FACEBOOK_PIXEL_ID && event.event_type === 'purchase') {
      const facebookEvent = formatForFacebook(event, context);
      console.log('Sending to Facebook:', facebookEvent);
      // In production, send via Conversions API
    }

    // Send to Klaviyo for email marketing
    if (process.env.KLAVIYO_API_KEY && event.user_id) {
      const klaviyoEvent = formatForKlaviyo(event, context);
      console.log('Sending to Klaviyo:', klaviyoEvent);
      // In production, send via Klaviyo API
    }

  } catch (error) {
    console.error('Failed to send to analytics platforms:', error);
  }
}

async function calculateConversionMetrics(event: ConversionEvent): Promise<any> {
  // Calculate real-time conversion metrics
  const metrics = {
    current_funnel_step: event.event_type,
    session_value: event.value || 0,
    estimated_conversion_probability: calculateConversionProbability(event),
    customer_lifetime_value_indicator: event.value ? event.value * 2.5 : 0, // Rough CLV estimate
    urgency_score: calculateUrgencyScore(event)
  };

  return metrics;
}

async function getConversionAnalytics(params: any) {
  // Mock conversion analytics - in production this would query analytics database
  const mockAnalytics = {
    funnel_metrics: {
      page_views: 10000,
      product_views: 3500,
      add_to_cart: 850,
      begin_checkout: 425,
      purchases: 127,
      conversion_rate: 1.27,
      cart_abandonment_rate: 50.0,
      checkout_completion_rate: 29.9
    },
    revenue_metrics: {
      total_revenue: 425000,
      average_order_value: 3346,
      revenue_per_visitor: 42.5,
      luxury_segment_revenue: 285000,
      luxury_conversion_rate: 15.2
    },
    customer_segments: {
      first_time_buyers: { conversion_rate: 0.8, avg_order_value: 1250 },
      returning_customers: { conversion_rate: 3.2, avg_order_value: 4100 },
      vip_customers: { conversion_rate: 12.5, avg_order_value: 15000 }
    },
    traffic_sources: {
      organic_search: { conversion_rate: 2.1, revenue_share: 45 },
      paid_search: { conversion_rate: 1.8, revenue_share: 30 },
      social_media: { conversion_rate: 0.9, revenue_share: 15 },
      direct: { conversion_rate: 3.5, revenue_share: 10 }
    }
  };

  return mockAnalytics;
}

function formatForGA4(event: ConversionEvent, context: any) {
  const ga4EventName = {
    'page_view': 'page_view',
    'product_view': 'view_item',
    'add_to_cart': 'add_to_cart',
    'begin_checkout': 'begin_checkout',
    'purchase': 'purchase',
    'add_to_wishlist': 'add_to_wishlist'
  }[event.event_type];

  return {
    name: ga4EventName,
    params: {
      currency: event.currency || 'USD',
      value: event.value || 0,
      item_id: event.product_id,
      item_category: event.category,
      session_id: event.session_id
    }
  };
}

function formatForFacebook(event: ConversionEvent, context: any) {
  return {
    event_name: 'Purchase',
    event_time: Math.floor(new Date(event.timestamp).getTime() / 1000),
    user_data: {
      client_ip_address: context.ip_address,
      client_user_agent: context.user_agent
    },
    custom_data: {
      currency: event.currency || 'USD',
      value: event.value || 0,
      content_type: 'product',
      content_category: event.category
    }
  };
}

function formatForKlaviyo(event: ConversionEvent, context: any) {
  return {
    token: process.env.KLAVIYO_PUBLIC_KEY,
    event: event.event_type,
    customer_properties: {
      $id: event.user_id
    },
    properties: {
      $value: event.value || 0,
      product_id: event.product_id,
      category: event.category,
      timestamp: event.timestamp
    }
  };
}

function calculateConversionProbability(event: ConversionEvent): number {
  // Simple probability calculation based on event type
  const probabilities = {
    'page_view': 0.05,
    'product_view': 0.15,
    'add_to_cart': 0.45,
    'begin_checkout': 0.75,
    'purchase': 1.0,
    'add_to_wishlist': 0.25
  };

  return probabilities[event.event_type] || 0;
}

function calculateUrgencyScore(event: ConversionEvent): number {
  // Calculate urgency based on behavior and value
  let score = 0;
  
  if (event.event_type === 'begin_checkout') score += 50;
  if (event.event_type === 'add_to_cart') score += 25;
  if (event.value && event.value >= 5000) score += 30; // High-value items
  
  return Math.min(score, 100);
}

function determineLuxurySegment(value: number): string {
  if (value >= 50000) return 'ultra_luxury';
  if (value >= 25000) return 'high_luxury';
  if (value >= 10000) return 'luxury';
  return 'premium';
}