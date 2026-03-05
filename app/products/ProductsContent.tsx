"use client";

import { useState } from "react";
import { featuredProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/ProductCard";

const categories = ["All", "Spearguns", "Accessories", "Diving Gear"];

export function ProductsContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === activeCategory
                    ? "bg-ocean text-white"
                    : "text-charcoal/60 hover:bg-background hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="min-h-[60vh] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} size="md" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
