import { getStripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  try {
    const body = await request.text();
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        console.log('✅ Checkout session completed:', session.id);

        // Update user subscription in database
        // Example: await db.user.update({ where: { id: session.metadata.userId }, data: { subscriptionId: session.subscription } })

        // Send confirmation email
        // Example: await sendEmail({ to: session.customer_email, template: 'subscription-confirmed' })

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any;
        console.log('✅ Invoice payment succeeded:', invoice.id);

        // Update subscription status
        // Example: await db.subscription.update({ ... })

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        console.log('❌ Invoice payment failed:', invoice.id);

        // Notify user and potentially suspend listing
        // Example: await sendEmail({ to: invoice.customer_email, template: 'payment-failed' })

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        console.log('🗑️ Subscription deleted:', subscription.id);

        // Downgrade user back to free tier
        // Example: await db.user.update({ where: { stripeId: subscription.customer }, data: { tier: 'free' } })

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        console.log('📝 Subscription updated:', subscription.id);

        // Update subscription details
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}
