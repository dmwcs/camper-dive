import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  stripePriceId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const body = await req.json();
    const items: CheckoutItem[] = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 },
      );
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
      shipping_address_collection: {
        allowed_countries: ["AU"],
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 995, currency: "aud" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1495, currency: "aud" },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
      ],
      allow_promotion_codes: true,
      metadata: {
        source: "camperdive-web",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode || 500 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
