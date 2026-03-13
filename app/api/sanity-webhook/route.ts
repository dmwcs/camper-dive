import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { SanityProductRepository } from "@/lib/sanity-product-repo";
import { archiveStripeProduct, syncProductToStripe } from "@/lib/stripe-sync";

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{
    _type: string;
    _id: string;
  }>(req, secret, true);

  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (!body || body._type !== "product") {
    return NextResponse.json({ skipped: true });
  }

  try {
    console.log(`[sanity-webhook] Syncing product: ${body._id}`);
    const repo = new SanityProductRepository();
    const product = await repo.tryGetProductForSync(body._id);

    // Product deleted in Sanity → archive in Stripe
    if (!product) {
      console.log(`[sanity-webhook] Product deleted, archiving in Stripe: ${body._id}`);
      const archiveResult = await archiveStripeProduct(body._id);
      return NextResponse.json({ ok: true, archived: archiveResult });
    }

    const result = await syncProductToStripe(product);

    // Only write back if something actually changed to prevent infinite webhook loop
    const hasChanges =
      result.stripeProductId !== product.stripeProductId ||
      result.variants.some((v) => v.created);

    if (hasChanges) {
      await repo.writeBackStripeIds(result);
      console.log(`[sanity-webhook] Sync complete (wrote back IDs):`, JSON.stringify(result, null, 2));
    } else {
      console.log(`[sanity-webhook] Sync complete (no changes, skipped writeBack)`);
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("[sanity-webhook] Sync error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
