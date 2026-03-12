"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/app/(site)/products/_components/ProductCard";

const categories = ["All", "Spearguns", "Accessories", "Diving Gear"];

export function ProductsContent({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = products.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.shortDesc || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0; // "featured" usually means original order
  });

  return (
    <>
      {/* Filters & Search */}
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 py-3 shadow-sm backdrop-blur-sm sm:py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="scrollbar-hide flex gap-1.5 overflow-x-auto pb-1 sm:gap-2 lg:pb-0">
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

          <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
            <div className="relative w-full sm:w-64 lg:w-72">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-slate"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate hover:text-charcoal"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="relative w-full sm:w-48 lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full appearance-none rounded-full border border-border bg-background py-2 pl-4 pr-10 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="min-h-[60vh] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Result count */}
          <p className="mb-5 text-sm text-slate sm:mb-6" data-sr>
            {sortedAndFiltered.length} {sortedAndFiltered.length === 1 ? "product" : "products"}
            {activeCategory !== "All" && (
              <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
            )}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4" data-sr="50">
            {sortedAndFiltered.map((product) => (
              <ProductCard key={product.slug} product={product} size="md" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
