import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getMongoose, APP_ID } from "@/lib/mongoose";
import mongoose, { Schema } from "mongoose";

const ORDER_SCHEMA = new Schema(
  {
    app: { type: String, required: true, default: APP_ID },
    stripeSessionId: { type: String, required: true, unique: true },
    plan: { type: String, required: true },
    email: { type: String },
    amountTotal: { type: Number },
    currency: { type: String },
    status: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

function getOrderModel() {
  return mongoose.models.LegacaiOrder ?? mongoose.model("LegacaiOrder", ORDER_SCHEMA);
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey || !secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;

  try {
    const stripe = new Stripe(stripeKey);
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (e) {
    console.error("Webhook signature verification failed:", e);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const plan = session.metadata?.plan ?? "unknown";

    const conn = await getMongoose();
    if (conn) {
      const Order = getOrderModel();
      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          app: APP_ID,
          stripeSessionId: session.id,
          plan,
          email: session.customer_email ?? session.customer_details?.email,
          amountTotal: session.amount_total,
          currency: session.currency,
          status: "paid",
        },
        { upsert: true, new: true }
      );
    }
  }

  return NextResponse.json({ received: true });
}
