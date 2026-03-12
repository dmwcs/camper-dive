import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  stripePriceId: string;
  quantity: number;
}

/* ── Supported shipping countries ────────────────────────────────────── */
const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ["AU", "US", "NZ", "JP", "TW", "CN"];

/* ── Free shipping threshold: AUD $150 (in cents) ───────────────────── */
const FREE_SHIPPING_THRESHOLD_CENTS = 15000;

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

    /* ── Calculate cart total (for free-shipping eligibility) ────────── */
    const prices = await Promise.all(
      items.map((item) => stripe.prices.retrieve(item.stripePriceId)),
    );
    let cartTotalCents = 0;
    items.forEach((item, i) => {
      cartTotalCents += (prices[i].unit_amount || 0) * item.quantity;
    });

    /* ── Build shipping options ──────────────────────────────────────── */
    const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [];

    if (cartTotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
      shipping_options.push({
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "aud" },
          display_name: "Free Shipping (Orders over $150 AUD)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      });
    }

    shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 995, currency: "aud" },
        display_name: "Standard Shipping (Australia)",
        delivery_estimate: {
          minimum: { unit: "business_day", value: 3 },
          maximum: { unit: "business_day", value: 5 },
        },
      },
    });

    shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 1495, currency: "aud" },
        display_name: "Express Shipping (Australia)",
        delivery_estimate: {
          minimum: { unit: "business_day", value: 1 },
          maximum: { unit: "business_day", value: 2 },
        },
      },
    });

    shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 6000, currency: "aud" },
        display_name: "International Shipping",
        delivery_estimate: {
          minimum: { unit: "business_day", value: 7 },
          maximum: { unit: "business_day", value: 14 },
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
      automatic_tax: { enabled: true },
      shipping_address_collection: {
        allowed_countries: SHIPPING_COUNTRIES,
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options,
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
