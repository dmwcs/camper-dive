import "server-only";

import { writeClient } from "@/sanity/lib/write-client";

/* ─── Interface (swap implementation to change DB) ───────────────── */

export interface InventoryRepository {
  /** Get stock for a variant by its Stripe Price ID */
  getStockByPriceId(stripePriceId: string): Promise<number>;

  /** Deduct stock. Returns false if insufficient stock. */
  deductStock(stripePriceId: string, qty: number): Promise<boolean>;
}

/* ─── Sanity implementation ──────────────────────────────────────── */

export class SanityInventoryRepository implements InventoryRepository {
  async getStockByPriceId(stripePriceId: string): Promise<number> {
    const result = await writeClient.fetch(
      `*[_type == "product" && $priceId in variants[].stripePriceId][0]{
        "variant": variants[stripePriceId == $priceId][0]{ stock }
      }`,
      { priceId: stripePriceId },
    );
    return result?.variant?.stock ?? 0;
  }

  async deductStock(stripePriceId: string, qty: number): Promise<boolean> {
    // Find the product and variant _key
    const doc = await writeClient.fetch(
      `*[_type == "product" && $priceId in variants[].stripePriceId][0]{
        _id,
        "variant": variants[stripePriceId == $priceId][0]{ _key, stock }
      }`,
      { priceId: stripePriceId },
    );

    if (!doc?.variant) return false;

    const currentStock = doc.variant.stock ?? 0;
    if (currentStock < qty) return false;

    await writeClient
      .patch(doc._id)
      .set({
        [`variants[_key=="${doc.variant._key}"].stock`]: currentStock - qty,
      })
      .commit();

    return true;
  }
}
