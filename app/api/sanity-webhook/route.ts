import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { SanityProductRepository } from "@/lib/sanity-product-repo";
import { syncProductToStripe } from "@/lib/stripe-sync";

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
    const repo = new SanityProductRepository();
    const product = await repo.getProductForSync(body._id);
    const result = await syncProductToStripe(product);
    await repo.writeBackStripeIds(result);

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Sanity webhook sync error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
