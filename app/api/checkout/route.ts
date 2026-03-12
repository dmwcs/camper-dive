import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  stripePriceId: string;
  quantity: number;
}

/* ── All Stripe-supported shipping countries ─────────────────────────── */
const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [
    "AC","AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AT","AU","AW","AX","AZ",
    "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ",
    "CA","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CV","CW","CY","CZ",
    "DE","DJ","DK","DM","DO","DZ",
    "EC","EE","EG","EH","ER","ES","ET",
    "FI","FJ","FK","FO","FR",
    "GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY",
    "HK","HN","HR","HT","HU",
    "ID","IE","IL","IM","IN","IO","IQ","IS","IT",
    "JE","JM","JO","JP",
    "KE","KG","KH","KI","KM","KN","KR","KW","KY","KZ",
    "LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY",
    "MA","MC","MD","ME","MF","MG","MK","ML","MM","MN","MO","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ",
    "NA","NC","NE","NG","NI","NL","NO","NP","NR","NU","NZ",
    "OM",
    "PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PY",
    "QA",
    "RE","RO","RS","RU","RW",
    "SA","SB","SC","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SZ",
    "TA","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ",
    "UA","UG","US","UY","UZ",
    "VA","VC","VE","VG","VN","VU",
    "WF","WS",
    "XK",
    "YE","YT",
    "ZA","ZM","ZW",
  ];

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

    /* ── Build shipping options (Stripe max = 5) ────────────────────── */
    const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [];

    // Free AU shipping when cart ≥ $150
    if (cartTotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
      shipping_options.push({
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "aud" },
          display_name: "Free Shipping (Australia)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      });
    }

    // Standard AU
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

    // Express AU
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

    // International Standard
    shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 2495, currency: "aud" },
        display_name: "International Shipping",
        delivery_estimate: {
          minimum: { unit: "business_day", value: 7 },
          maximum: { unit: "business_day", value: 14 },
        },
      },
    });

    // International Express
    shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 3995, currency: "aud" },
        display_name: "International Express Shipping",
        delivery_estimate: {
          minimum: { unit: "business_day", value: 3 },
          maximum: { unit: "business_day", value: 7 },
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
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
