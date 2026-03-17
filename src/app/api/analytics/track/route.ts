import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const events = await request.json();
    
    // Validate event data
    if (!Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Events must be an array' },
        { status: 400 }
      );
    }

    // Process each event
    const processedEvents = [];
    
    for (const event of events) {
      // Validate required fields
      if (!event.event || !event.timestamp) {
        continue; // Skip invalid events
      }

      // Add server-side data
      const enrichedEvent = {
        ...event,
        server_timestamp: new Date().toISOString(),
        ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        referrer: request.headers.get('referer') || '',
        
        // Add jewelry-specific context
        business_category: 'luxury_jewelry',
        currency: event.currency || 'USD'
      };

      processedEvents.push(enrichedEvent);

      // Send to analytics platforms
      await Promise.all([
        sendToCustomAnalytics(enrichedEvent),
        sendToBusinessIntelligence(enrichedEvent),
        sendToCustomerData(enrichedEvent)
      ]);
    }

    return NextResponse.json({
      processed: processedEvents.length,
      status: 'success'
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track events' },
      { status: 500 }
    );
  }
}

async function sendToCustomAnalytics(event: any): Promise<void> {
  try {
    // Store in database for custom analytics dashboard
    console.log('Custom analytics event:', event.event, event.value);
    
    // In production, store in time-series database like InfluxDB or TimescaleDB
    // for real-time jewelry business metrics
    
  } catch (error) {
    console.error('Failed to send to custom analytics:', error);
  }
}

async function sendToBusinessIntelligence(event: any): Promise<void> {
  try {
    // Send jewelry-specific business metrics
    if (event.event === 'purchase') {
      // Track revenue, average order value, conversion rates
      const metrics = {
        revenue: event.value,
        items_sold: event.items?.length || 0,
        customer_segment: event.custom_parameters?.vip_status || 'standard',
        product_categories: event.items?.map((item: any) => item.category) || [],
        metals_sold: event.items?.map((item: any) => item.metal) || [],
        diamond_carats_sold: event.items?.reduce((sum: number, item: any) => 
          sum + (item.carat || 0), 0) || 0
      };
      
      console.log('Business intelligence metrics:', metrics);
    }
    
    if (event.event === 'view_item') {
      // Track product interest, popular categories
      const productMetrics = {
        product_id: event.items?.[0]?.item_id,
        category: event.items?.[0]?.category,
        price_point: event.items?.[0]?.price,
        metal: event.items?.[0]?.metal,
        carat: event.items?.[0]?.carat
      };
      
      console.log('Product interest metrics:', productMetrics);
    }
    
  } catch (error) {
    console.error('Failed to send to business intelligence:', error);
  }
}

async function sendToCustomerData(event: any): Promise<void> {
  try {
    // Update customer profiles for personalization
    if (event.user_id) {
      const customerData = {
        user_id: event.user_id,
        last_activity: event.timestamp,
        engagement_score: calculateEngagementScore(event),
        preferences: extractPreferences(event),
        value_segment: determineValueSegment(event)
      };
      
      console.log('Customer data update:', customerData);
      
      // In production, update customer data platform
    }
    
  } catch (error) {
    console.error('Failed to update customer data:', error);
  }
}

function calculateEngagementScore(event: any): number {
  // Calculate engagement based on event type and value
  const scores: Record<string, number> = {
    'page_view': 1,
    'view_item': 3,
    'add_to_cart': 10,
    'begin_checkout': 25,
    'purchase': 100,
    'add_to_wishlist': 5,
    'search': 2
  };
  
  return scores[event.event] || 0;
}

function extractPreferences(event: any): any {
  // Extract customer preferences from behavior
  if (event.items) {
    return {
      metals: event.items.map((item: any) => item.metal).filter(Boolean),
      categories: event.items.map((item: any) => item.category).filter(Boolean),
      price_range: [
        Math.min(...event.items.map((item: any) => item.price)),
        Math.max(...event.items.map((item: any) => item.price))
      ]
    };
  }
  
  return {};
}

function determineValueSegment(event: any): string {
  if (event.event === 'purchase') {
    const value = event.value || 0;
    if (value >= 50000) return 'ultra_luxury';
    if (value >= 15000) return 'high_value';
    if (value >= 5000) return 'premium';
    if (value >= 1000) return 'mid_market';
    return 'entry_level';
  }
  
  if (event.event === 'view_item' && event.items?.[0]?.price) {
    const price = event.items[0].price;
    if (price >= 25000) return 'luxury_browser';
    if (price >= 10000) return 'premium_browser';
    return 'general_browser';
  }
  
  return 'unknown';
}