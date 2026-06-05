import { createCheckoutSession, getOrCreateCustomer } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tier, cities, billingCycle } = await request.json();

    // In a real app, you'd get the user from session/auth
    // For now, we'll use a demo user
    const userId = 'user_demo_' + Date.now();
    const email = `user_${Date.now()}@example.com`;

    // Get or create Stripe customer
    const customer = await getOrCreateCustomer(userId, email);

    // Create checkout session
    const session = await createCheckoutSession(
      customer.id,
      tier,
      cities,
      billingCycle,
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success`,
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/cancel`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
