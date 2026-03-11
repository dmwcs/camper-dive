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
  media?: MediaItem[];
  description?: string;
  specs?: { label: string; value: string }[];
  features?: string[];
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
  content?: PortableTextBlock[];
}

export interface TutorialCategory {
  slug: string;
  label: string;
  count: number;
}
