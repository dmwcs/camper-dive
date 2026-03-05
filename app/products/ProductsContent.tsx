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
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1.5 overflow-x-auto py-3 sm:gap-2 sm:py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  cat === activeCategory
                    ? "bg-ocean text-white shadow-sm"
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
      <section className="min-h-[60vh] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Result count */}
          <p className="mb-5 text-sm text-slate sm:mb-6">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {activeCategory !== "All" && (
              <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
            )}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} size="md" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
