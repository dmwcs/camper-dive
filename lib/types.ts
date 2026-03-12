/* ───────────────────────────── Products ───────────────────────────── */

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  label: string;
  price: number;
  stripePriceId: string;
}

export interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
}

export interface Product {
  name: string;
  price: number;
  stripePriceId: string;
  category: string;
  slug: string;
  shortDesc: string;
  image: string;
  mostPopular?: boolean;
  media?: MediaItem[];
  description?: string;
  specs?: { label: string; value: string }[];
  features?: string[];
  stripeProductId?: string;
  options?: ProductOption[];
  variants?: ProductVariant[];
}

/* ───────────────────────────── Tutorials ───────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;

export interface Tutorial {
  title: string;
  category: string;
  format: "Article" | "Video" | "Article + Video";
  slug: string;
  lastEdited: string;
  description: string;
  image: string;
  featured?: boolean;
  content?: PortableTextBlock[];
}

export interface TutorialCategory {
  slug: string;
  label: string;
  count: number;
}

/* ───────────────────── Stripe Sync (DB-agnostic) ──────────────────── */

export interface SyncableProduct {
  id: string;
  name: string;
  stripeProductId?: string;
  variants: SyncableVariant[];
}

export interface SyncableVariant {
  key: string;
  priceInCents: number;
  stripePriceId?: string;
}

export interface SyncResult {
  productId: string;
  stripeProductId: string;
  variants: {
    key: string;
    stripePriceId: string;
    created: boolean;
    archivedOldPriceId?: string;
  }[];
}

export interface ProductRepository {
  getProductForSync(documentId: string): Promise<SyncableProduct>;
  writeBackStripeIds(result: SyncResult): Promise<void>;
}
