import { NextResponse } from "next/server";
import {
  PRICING_TIERS,
  createCheckoutSession,
  getOrCreateCustomer,
} from "@/lib/stripe";

type CheckoutTier = keyof typeof PRICING_TIERS;

function getBaseUrl(request: Request) {
  return (
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://privateguys.com.au"
  );
}

function isStripeConfigured() {
  const key = process.env.STRIPE_SECRET_KEY || "";
  return key.startsWith("sk_live_") || key.startsWith("sk_test_");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tier = body.tier as CheckoutTier;
    const cities = Array.isArray(body.cities) ? body.cities : ["Sydney"];
    const billingCycle = body.billingCycle || "monthly";
    const baseUrl = getBaseUrl(request);

    if (!tier || !(tier in PRICING_TIERS)) {
      return NextResponse.json({ error: "Invalid tier selected" }, { status: 400 });
    }

    if (tier === "platinum") {
      return NextResponse.json({
        url: `${baseUrl}/checkout/success?tier=platinum&custom=1`,
      });
    }

    if (!isStripeConfigured()) {
      return NextResponse.json({
        url: `${baseUrl}/checkout/success?tier=${tier}&demo=1`,
      });
    }

    const customer = await getOrCreateCustomer(
      "demo-advertiser",
      "advertiser@privateguys.com.au",
      "Private Guys Advertiser",
    );
    const session = await createCheckoutSession(
      customer.id,
      tier,
      cities,
      billingCycle,
      `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      `${baseUrl}/checkout/cancel`,
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout route error", error);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 },
    );
  }
}
