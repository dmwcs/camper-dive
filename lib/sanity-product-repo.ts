import "server-only";

import { writeClient } from "@/sanity/lib/write-client";
import type { ProductRepository, SyncableProduct, SyncResult } from "./types";

export class SanityProductRepository implements ProductRepository {
  async getProductForSync(documentId: string): Promise<SyncableProduct> {
    const doc = await writeClient.fetch(
      `*[_type == "product" && _id == $id][0]{
        _id,
        name,
        stripeProductId,
        variants[]{ _key, label, price, stripePriceId }
      }`,
      { id: documentId },
    );

    if (!doc) throw new Error(`Product not found: ${documentId}`);

    return {
      id: doc._id,
      name: doc.name,
      stripeProductId: doc.stripeProductId || undefined,
      variants: (doc.variants || []).map(
        (v: { label: string; price: number; stripePriceId?: string }) => ({
          key: v.label,
          priceInCents: Math.round(v.price * 100),
          stripePriceId: v.stripePriceId || undefined,
        }),
      ),
    };
  }

  async writeBackStripeIds(result: SyncResult): Promise<void> {
    // 1. Set stripeProductId at document level
    await writeClient
      .patch(result.productId)
      .set({ stripeProductId: result.stripeProductId })
      .commit();

    // 2. Update each variant's stripePriceId
    // Fetch _key values to use Sanity's key-based array patching
    const doc = await writeClient.fetch(
      `*[_type == "product" && _id == $id][0]{
        variants[]{ _key, label }
      }`,
      { id: result.productId },
    );

    if (!doc?.variants) return;

    for (const variantResult of result.variants) {
      const match = doc.variants.find(
        (v: { _key: string; label: string }) => v.label === variantResult.key,
      );
      if (match) {
        await writeClient
          .patch(result.productId)
          .set({
            [`variants[_key=="${match._key}"].stripePriceId`]:
              variantResult.stripePriceId,
          })
          .commit();
      }
    }
  }
}
