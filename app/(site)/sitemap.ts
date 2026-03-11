import type { MetadataRoute } from "next";
import { getProducts, getTutorials } from "@/lib/queries";

const BASE_URL = "https://camperdive.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, tutorials] = await Promise.all([
    getProducts(),
    getTutorials(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tutorials`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tutorialPages: MetadataRoute.Sitemap = tutorials.map((t) => ({
    url: `${BASE_URL}/tutorials/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...tutorialPages];
}
