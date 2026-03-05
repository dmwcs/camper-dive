import type { MetadataRoute } from "next";
import { featuredProducts, tutorialPreviews } from "@/lib/mock-data";

const BASE_URL = "https://camperdive.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tutorials`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productPages: MetadataRoute.Sitemap = featuredProducts.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tutorialPages: MetadataRoute.Sitemap = tutorialPreviews.map((t) => ({
    url: `${BASE_URL}/tutorials/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...tutorialPages];
}
