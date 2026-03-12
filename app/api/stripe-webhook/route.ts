import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { SanityInventoryRepository } from "@/lib/inventory-repo";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve line items from the completed session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const inventory = new SanityInventoryRepository();

    for (const item of lineItems.data) {
      const priceId = item.price?.id;
      const qty = item.quantity ?? 0;
      if (priceId && qty > 0) {
        await inventory.deductStock(priceId, qty);
      }
    }
  }

  return NextResponse.json({ received: true });
}
