import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

const authService = new AuthService();

interface CustomerPreferences {
  emailMarketing: boolean;
  smsMarketing: boolean;
  pushNotifications: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  language: 'en' | 'es' | 'fr' | 'de';
  timezone: string;
  jewelryStyles: string[];
  priceRange: { min: number; max: number };
  metals: string[];
  gemstones: string[];
  occasions: string[];
  sizes: {
    ring?: string;
    necklace?: string;
    bracelet?: string;
    earrings?: string;
  };
  communicationPreferences: {
    orderUpdates: boolean;
    promotions: boolean;
    newArrivals: boolean;
    restockNotifications: boolean;
    priceAlerts: boolean;
  };
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const authResult = await authService.verifyToken(token);
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = authResult.user!;

    // Get user preferences with defaults
    const preferences: CustomerPreferences = user.preferences || {
      emailMarketing: true,
      smsMarketing: false,
      pushNotifications: true,
      currency: 'USD',
      language: 'en',
      timezone: 'America/New_York',
      jewelryStyles: [],
      priceRange: { min: 0, max: 50000 },
      metals: [],
      gemstones: [],
      occasions: [],
      sizes: {},
      communicationPreferences: {
        orderUpdates: true,
        promotions: true,
        newArrivals: false,
        restockNotifications: false,
        priceAlerts: false
      }
    };

    return NextResponse.json({ preferences });

  } catch (error) {
    console.error('Preferences retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const newPreferences: Partial<CustomerPreferences> = await request.json();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const authResult = await authService.verifyToken(token);
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = authResult.user!;

    // Validate preferences data
    if (newPreferences.currency && !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(newPreferences.currency)) {
      return NextResponse.json(
        { error: 'Invalid currency code' },
        { status: 400 }
      );
    }

    if (newPreferences.language && !['en', 'es', 'fr', 'de'].includes(newPreferences.language)) {
      return NextResponse.json(
        { error: 'Invalid language code' },
        { status: 400 }
      );
    }

    if (newPreferences.priceRange) {
      const { min, max } = newPreferences.priceRange;
      if (min < 0 || max < min || max > 500000) {
        return NextResponse.json(
          { error: 'Invalid price range' },
          { status: 400 }
        );
      }
    }

    // Merge with existing preferences
    const currentPreferences = user.preferences || {};
    const updatedPreferences = { ...currentPreferences, ...newPreferences };

    // Update user preferences
    // Note: This would typically call a user service to update the database
    const updatedUser = { ...user, preferences: updatedPreferences };

    // Log preference update
    await authService.logSecurityEvent({
      type: 'preferences_updated',
      userId: user.id,
      metadata: {
        updatedFields: Object.keys(newPreferences),
        emailMarketingChanged: newPreferences.emailMarketing !== currentPreferences.emailMarketing,
        smsMarketingChanged: newPreferences.smsMarketing !== currentPreferences.smsMarketing,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      },
      timestamp: new Date()
    });

    // If email marketing preference changed, update email service
    if (newPreferences.emailMarketing !== undefined && 
        newPreferences.emailMarketing !== currentPreferences.emailMarketing) {
      // Note: This would integrate with email service (Klaviyo, SendGrid, etc.)
      console.log(`Email marketing preference changed for user ${user.id}: ${newPreferences.emailMarketing}`);
    }

    // If SMS marketing preference changed, update SMS service
    if (newPreferences.smsMarketing !== undefined && 
        newPreferences.smsMarketing !== currentPreferences.smsMarketing) {
      // Note: This would integrate with SMS service
      console.log(`SMS marketing preference changed for user ${user.id}: ${newPreferences.smsMarketing}`);
    }

    return NextResponse.json({
      preferences: updatedPreferences,
      message: 'Preferences updated successfully'
    });

  } catch (error) {
    console.error('Preferences update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get available preference options
export async function OPTIONS() {
  try {
    const options = {
      currencies: [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
      ],
      languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' }
      ],
      jewelryStyles: [
        'Classic', 'Modern', 'Vintage', 'Art Deco', 'Minimalist', 
        'Bohemian', 'Gothic', 'Romantic', 'Geometric', 'Nature-inspired'
      ],
      metals: [
        'White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum', 
        'Sterling Silver', 'Titanium', 'Palladium'
      ],
      gemstones: [
        'Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 
        'Tanzanite', 'Amethyst', 'Citrine', 'Garnet', 'Opal'
      ],
      occasions: [
        'Engagement', 'Wedding', 'Anniversary', 'Birthday', 
        'Graduation', 'Holiday', 'Self-purchase', 'Gift'
      ],
      priceRanges: [
        { min: 0, max: 500, label: 'Under $500' },
        { min: 500, max: 1000, label: '$500 - $1,000' },
        { min: 1000, max: 2500, label: '$1,000 - $2,500' },
        { min: 2500, max: 5000, label: '$2,500 - $5,000' },
        { min: 5000, max: 10000, label: '$5,000 - $10,000' },
        { min: 10000, max: 25000, label: '$10,000 - $25,000' },
        { min: 25000, max: 50000, label: '$25,000 - $50,000' },
        { min: 50000, max: 500000, label: '$50,000+' }
      ]
    };

    return NextResponse.json({ options });

  } catch (error) {
    console.error('Preference options error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}