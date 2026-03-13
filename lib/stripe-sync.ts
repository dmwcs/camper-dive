import "server-only";

import { stripe } from "./stripe";
import type { SyncableProduct, SyncResult } from "./types";

/**
 * Sync a product to Stripe. Creates Products/Prices as needed,
 * archives old Prices when amounts change.
 *
 * This module has ZERO database imports — it works with plain
 * TypeScript interfaces so the database layer can be swapped.
 */
export async function archiveStripeProduct(
  sanityDocumentId: string,
): Promise<{ archived: boolean; stripeProductId?: string }> {
  const products = await stripe.products.search({
    query: `metadata["sourceId"]:"${sanityDocumentId}"`,
  });

  const product = products.data[0];
  if (!product || !product.active) {
    return { archived: false };
  }

  await stripe.products.update(product.id, { active: false });
  return { archived: true, stripeProductId: product.id };
}

export async function syncProductToStripe(
  product: SyncableProduct,
): Promise<SyncResult> {
  // 1. Ensure Stripe Product exists
  let stripeProductId = product.stripeProductId;

  if (!stripeProductId) {
    const stripeProduct = await stripe.products.create({
      name: product.name,
      metadata: { sourceId: product.id },
    });
    stripeProductId = stripeProduct.id;
  } else {
    await stripe.products.update(stripeProductId, {
      name: product.name,
    });
  }

  // 2. Sync each variant's Price
  const variantResults: SyncResult["variants"] = [];

  for (const variant of product.variants) {
    // No existing Price → create one
    if (!variant.stripePriceId) {
      const price = await stripe.prices.create({
        product: stripeProductId,
        nickname: variant.key,
        unit_amount: variant.priceInCents,
        currency: "aud",
        metadata: { variantKey: variant.key },
      });
      variantResults.push({
        key: variant.key,
        stripePriceId: price.id,
        created: true,
      });
      continue;
    }

    // Existing Price → check if amount matches
    const existing = await stripe.prices.retrieve(variant.stripePriceId);

    if (existing.unit_amount === variant.priceInCents) {
      // Price unchanged → still sync nickname
      if (existing.nickname !== variant.key) {
        await stripe.prices.update(variant.stripePriceId, {
          nickname: variant.key,
        });
      }
      variantResults.push({
        key: variant.key,
        stripePriceId: variant.stripePriceId,
        created: false,
      });
      continue;
    }

    // Price changed → create new, archive old
    const newPrice = await stripe.prices.create({
      product: stripeProductId,
      nickname: variant.key,
      unit_amount: variant.priceInCents,
      currency: "aud",
      metadata: { variantKey: variant.key },
    });
    await stripe.prices.update(variant.stripePriceId, { active: false });

    variantResults.push({
      key: variant.key,
      stripePriceId: newPrice.id,
      created: true,
      archivedOldPriceId: variant.stripePriceId,
    });
  }

  return {
    productId: product.id,
    stripeProductId,
    variants: variantResults,
  };
}
