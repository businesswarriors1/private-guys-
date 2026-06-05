import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors
let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
      apiVersion: '2024-06-20',
    });
  }
  return stripeClient;
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

export const PRICING_TIERS = {
  standard: {
    name: 'Standard',
    description: 'Perfect for starting out',
    prices: {
      monthly: 500, // $5.00 in cents
      quarterly: 1200, // $12.00
      annual: 3000, // $30.00
    },
    features: [
      'Up to 5 listings per city',
      'Basic profile',
      '30-day listing duration',
      'Standard support',
    ],
    lookupKey: 'standard',
  },
  premium: {
    name: 'Premium',
    description: 'For active professionals',
    prices: {
      monthly: 9900, // $99.00 in cents
      quarterly: 19800, // $198.00
      annual: 19900, // $199.00
    },
    features: [
      'Unlimited listings per city',
      'Premium profile with verification badge',
      'Featured in search',
      '90-day listing duration',
      'Priority support',
      'Analytics dashboard',
    ],
    lookupKey: 'premium',
  },
  platinum: {
    name: 'Platinum',
    description: 'Full-featured multi-city presence',
    prices: {
      custom: 0, // Custom pricing
    },
    features: [
      'Unlimited listings across cities',
      'Platinum badge & verification',
      'Always featured in search',
      'Lifetime listing duration',
      'VIP support (24/7)',
      'Advanced analytics',
      'Featured placement rotation',
      'Custom promotion options',
    ],
    lookupKey: 'platinum',
  },
};

export const CITY_ADDON_PRICE = 5000; // $50 per additional city per month

export interface SubscriptionMetadata {
  userId: string;
  tier: 'standard' | 'premium' | 'platinum';
  cities: string[];
  citiesCount: number;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
}

export async function createCheckoutSession(
  customerId: string,
  tier: 'standard' | 'premium' | 'platinum',
  cities: string[],
  billingCycle: 'monthly' | 'quarterly' | 'annual',
  successUrl: string,
  cancelUrl: string
) {
  const tierConfig = PRICING_TIERS[tier];
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Base tier pricing
  const basePriceInCents = tierConfig.prices[billingCycle as keyof typeof tierConfig.prices] || 0;
  if (basePriceInCents > 0) {
    lineItems.push({
      price_data: {
        currency: 'aud',
        product_data: {
          name: `${tierConfig.name} Subscription`,
          description: tierConfig.description,
        },
        unit_amount: basePriceInCents,
        recurring:
          tier === 'platinum'
            ? undefined
            : {
                interval: billingCycle === 'annual' ? 'year' : billingCycle === 'quarterly' ? 'month' : 'month',
                interval_count: billingCycle === 'quarterly' ? 3 : 1,
              },
      },
      quantity: 1,
    });
  }

  // City add-ons (first city is included, additional are add-ons)
  if (cities.length > 1) {
    lineItems.push({
      price_data: {
        currency: 'aud',
        product_data: {
          name: `Additional Cities (${cities.length - 1})`,
          description: `${cities.slice(1).join(', ')}`,
        },
        unit_amount: CITY_ADDON_PRICE * (cities.length - 1),
        recurring:
          tier === 'platinum'
            ? undefined
            : {
                interval: billingCycle === 'annual' ? 'year' : billingCycle === 'quarterly' ? 'month' : 'month',
                interval_count: billingCycle === 'quarterly' ? 3 : 1,
              },
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: lineItems,
    mode: tier === 'platinum' ? 'payment' : 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: customerId,
      tier,
      cities: cities.join(','),
      citiesCount: cities.length.toString(),
      billingCycle,
    } as Record<string, string>,
  });

  return session;
}

export async function getOrCreateCustomer(userId: string, email: string, name?: string) {
  // In a real app, you'd look up the customer in your database first
  // For now, we'll create a new one each time
  const customer = await stripe.customers.create({
    email,
    name: name || email,
    metadata: {
      userId,
    },
  });

  return customer;
}
