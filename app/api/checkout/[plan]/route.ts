import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { planBySlug } from "@/components/legacai-tokens";

const PRICE_IDS: Record<string, string> = {
  "1yr": process.env.STRIPE_PRICE_1YR ?? "",
  "10yr": process.env.STRIPE_PRICE_10YR ?? "",
  "century": process.env.STRIPE_PRICE_CENTURY ?? "",
};

function stripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  const p = planBySlug(plan);
  if (!p) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  if (!stripeConfigured()) {
    return NextResponse.json({ error: "Payments not yet configured — contact hello@legacai.com to purchase." }, { status: 503 });
  }

  const priceId = PRICE_IDS[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Price not configured for this plan" }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:17010").replace(/\/$/, "");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: p.slug === "1yr" ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/vault/welcome?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${appUrl}/checkout/${plan}`,
      metadata: { plan, app: "legacai" },
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("stripe checkout error:", e);
    return NextResponse.json({ error: "Payment session failed" }, { status: 500 });
  }
}
