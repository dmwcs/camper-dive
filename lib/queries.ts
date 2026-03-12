import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Product, Tutorial, TutorialCategory } from "./types";

/* ─── helpers ─────────────────────────────────────────────────────── */

const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

function resolveImage(image: unknown, width = 800): string {
  if (!image) return PLACEHOLDER_IMAGE;
  try {
    return urlFor(image as Parameters<typeof urlFor>[0])
      .width(width)
      .url();
  } catch {
    return PLACEHOLDER_IMAGE;
  }
}

const FORMAT_MAP: Record<string, Tutorial["format"]> = {
  article: "Article",
  video: "Video",
  "article-video": "Article + Video",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── products ────────────────────────────────────────────────────── */

export async function getProducts(): Promise<Product[]> {
  const raw = await client.fetch(
    `*[_type == "product"] | order(_createdAt asc) {
      name,
      "slug": slug.current,
      price,
      stripePriceId,
      stripeProductId,
      "category": category->title,
      shortDesc,
      image,
      specs[]{ "label": label, "value": value },
      features,
      options[]{ "name": name, "values": values },
      variants[]{ "label": label, "price": price, "stripePriceId": stripePriceId },
      description
    }`
  );

  return raw.map(mapProduct);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const raw = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      name,
      "slug": slug.current,
      price,
      stripePriceId,
      stripeProductId,
      "category": category->title,
      shortDesc,
      image,
      media[]{
        _type,
        "asset": asset->url,
        alt
      },
      specs[]{ "label": label, "value": value },
      features,
      options[]{ "name": name, "values": values },
      variants[]{ "label": label, "price": price, "stripePriceId": stripePriceId },
      description
    }`,
    { slug }
  );

  if (!raw) return null;

  const mainImage = resolveImage(raw.image);
  const media = Array.isArray(raw.media)
    ? raw.media.map((m: Record<string, unknown>) => {
        const isVideo = m._type === "file";
        return {
          type: isVideo ? ("video" as const) : ("image" as const),
          src: (m.asset as string) || resolveImage(m),
          ...(isVideo ? { poster: mainImage } : {}),
        };
      })
    : undefined;

  return {
    name: raw.name,
    slug: raw.slug,
    price: raw.price,
    stripePriceId: raw.stripePriceId || "",
    stripeProductId: raw.stripeProductId || undefined,
    category: raw.category || "",
    shortDesc: raw.shortDesc || "",
    image: resolveImage(raw.image),
    media,
    specs: raw.specs || [],
    features: raw.features || [],
    options: raw.options || [],
    variants: raw.variants || [],
    description: raw.description || "",
  };
}

/* ─── products (filtered) ─────────────────────────────────────────── */

export interface FilterParams {
  category?: string;
  search?: string;
  sort?: string;
  limit?: number;
}

const PRODUCT_FIELDS = `
  name,
  "slug": slug.current,
  price,
  stripePriceId,
  stripeProductId,
  "category": category->title,
  shortDesc,
  image,
  specs[]{ "label": label, "value": value },
  features,
  options[]{ "name": name, "values": values },
  variants[]{ "label": label, "price": price, "stripePriceId": stripePriceId },
  description
`;

const PRODUCT_SORT_MAP: Record<string, string> = {
  "price-asc": "price asc",
  "price-desc": "price desc",
  "name-asc": "name asc",
  "name-desc": "name desc",
};

function mapProduct(p: Record<string, unknown>): Product {
  return {
    name: p.name as string,
    slug: p.slug as string,
    price: p.price as number,
    stripePriceId: (p.stripePriceId as string) || "",
    stripeProductId: (p.stripeProductId as string) || undefined,
    category: (p.category as string) || "",
    shortDesc: (p.shortDesc as string) || "",
    image: resolveImage(p.image),
    specs: (p.specs as Product["specs"]) || [],
    features: (p.features as string[]) || [],
    options: (p.options as Product["options"]) || [],
    variants: (p.variants as Product["variants"]) || [],
    description: (p.description as string) || "",
  };
}

export async function getFilteredProducts(
  params: FilterParams
): Promise<{ items: Product[]; total: number }> {
  const { category = "", search = "", sort = "featured", limit = 8 } = params;
  const orderClause = PRODUCT_SORT_MAP[sort] || "_createdAt asc";

  const filter = `_type == "product"
    && ($category == "" || category->title == $category)
    && ($search == "" || name match $search + "*" || shortDesc match $search + "*")`;

  const query = `{
    "items": *[${filter}] | order(${orderClause}) [0...$limit] { ${PRODUCT_FIELDS} },
    "total": count(*[${filter}])
  }`;

  const result = await client.fetch(query, { category, search, limit });

  return {
    items: result.items.map(mapProduct),
    total: result.total as number,
  };
}

/* ─── product categories ──────────────────────────────────────────── */

export async function getProductCategories(): Promise<string[]> {
  const raw: { title: string }[] = await client.fetch(
    `*[_type == "category" && type == "product"] | order(title asc) { title }`
  );
  return raw.map((c) => c.title);
}

/* ─── tutorials ───────────────────────────────────────────────────── */

export async function getTutorials(): Promise<Tutorial[]> {
  const raw = await client.fetch(
    `*[_type == "tutorial"] | order(_createdAt asc) {
      title,
      "slug": slug.current,
      "category": category->title,
      format,
      description,
      image,
      _updatedAt
    }`
  );

  return raw.map(mapTutorial);
}

export async function getTutorialBySlug(
  slug: string
): Promise<Tutorial | null> {
  const raw = await client.fetch(
    `*[_type == "tutorial" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      "category": category->title,
      format,
      description,
      image,
      _updatedAt,
      content
    }`,
    { slug }
  );

  if (!raw) return null;

  return {
    title: raw.title,
    slug: raw.slug,
    category: raw.category || "",
    format: FORMAT_MAP[raw.format || "article"] || "Article",
    lastEdited: formatDate(raw._updatedAt),
    description: raw.description || "",
    image: resolveImage(raw.image),
    content: Array.isArray(raw.content) ? raw.content : undefined,
  };
}

/* ─── tutorials (filtered) ────────────────────────────────────────── */

const TUTORIAL_FIELDS = `
  title,
  "slug": slug.current,
  "category": category->title,
  format,
  description,
  image,
  _updatedAt
`;

const TUTORIAL_SORT_MAP: Record<string, string> = {
  newest: "_updatedAt desc",
  oldest: "_updatedAt asc",
  "title-asc": "title asc",
  "title-desc": "title desc",
};

function mapTutorial(t: Record<string, unknown>): Tutorial {
  return {
    title: t.title as string,
    slug: t.slug as string,
    category: (t.category as string) || "",
    format: FORMAT_MAP[(t.format as string) || "article"] || "Article",
    lastEdited: formatDate(t._updatedAt as string),
    description: (t.description as string) || "",
    image: resolveImage(t.image),
  };
}

export async function getFilteredTutorials(
  params: FilterParams
): Promise<{ items: Tutorial[]; total: number }> {
  const { category = "", search = "", sort = "newest", limit = 8 } = params;
  const orderClause = TUTORIAL_SORT_MAP[sort] || "_updatedAt desc";

  const filter = `_type == "tutorial"
    && ($category == "" || category->title == $category)
    && ($search == "" || title match $search + "*" || description match $search + "*")`;

  const query = `{
    "items": *[${filter}] | order(${orderClause}) [0...$limit] { ${TUTORIAL_FIELDS} },
    "total": count(*[${filter}])
  }`;

  const result = await client.fetch(query, { category, search, limit });

  return {
    items: result.items.map(mapTutorial),
    total: result.total as number,
  };
}

/* ─── categories ──────────────────────────────────────────────────── */

export async function getTutorialCategories(): Promise<TutorialCategory[]> {
  const raw = await client.fetch(
    `*[_type == "category" && type == "tutorial"] | order(title asc) {
      "slug": slug.current,
      "label": title
    }`
  );

  const tutorials: { category: string }[] = await client.fetch(
    `*[_type == "tutorial"]{ "category": category->title }`
  );

  return raw.map((c: { slug: string; label: string }) => ({
    slug: c.slug,
    label: c.label,
    count: tutorials.filter((t) => t.category === c.label).length,
  }));
}
