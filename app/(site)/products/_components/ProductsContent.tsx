"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/app/(site)/products/_components/ProductCard";

const PAGE_SIZE = 8;

interface ProductsContentProps {
  products: Product[];
  total: number;
  categories: string[];
}

export function ProductsContent({ products, total, categories }: ProductsContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Read current filter state from URL
  const activeCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "popular";
  const currentLimit = parseInt(searchParams.get("limit") || String(PAGE_SIZE), 10);

  // Local state for search input (debounced)
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync local search when URL changes externally
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Update URL params
  const updateParams = useCallback(
    (updates: Record<string, string>, resetLimit = true) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      if (resetLimit) params.delete("limit");
      const qs = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  // Debounce search input
  useEffect(() => {
    if (localSearch === searchQuery) return;
    const timer = setTimeout(() => {
      updateParams({ q: localSearch });
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, updateParams]);

  const hasMore = currentLimit < total;

  return (
    <>
      {/* Filters & Search */}
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 py-3 shadow-sm backdrop-blur-sm sm:py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:gap-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          {/* Category pills */}
          <div className="scrollbar-hide flex gap-1.5 overflow-x-auto sm:gap-2">
            <button
              onClick={() => updateParams({ category: "" })}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                !activeCategory
                  ? "bg-ocean text-white shadow-sm"
                  : "text-charcoal/60 hover:bg-background hover:text-charcoal"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateParams({ category: cat })}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  cat === activeCategory
                    ? "bg-ocean text-white shadow-sm"
                    : "text-charcoal/60 hover:bg-background hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex w-full shrink-0 items-center gap-2 lg:w-auto">
            <div className="relative min-w-0 flex-1 lg:w-72 lg:flex-none">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="block w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch("");
                    updateParams({ q: "" });
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate hover:text-charcoal"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="relative w-[140px] shrink-0 sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => updateParams({ sort: e.target.value === "popular" ? "" : e.target.value })}
                className="block w-full appearance-none rounded-full border border-border bg-background py-2 pl-3 pr-8 text-xs transition-shadow sm:pl-4 sm:pr-10 sm:text-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate sm:pr-4">
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="min-h-[60vh] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Result count */}
          <p className="mb-5 text-sm text-slate sm:mb-6">
            {total} {total === 1 ? "product" : "products"}
            {activeCategory && (
              <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
            )}
          </p>
          <div
            className={`grid grid-cols-2 gap-3 transition-opacity duration-200 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 ${
              isPending ? "pointer-events-none opacity-60" : ""
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} size="md" />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center sm:mt-10">
              <button
                onClick={() => updateParams({ limit: String(currentLimit + PAGE_SIZE) }, false)}
                disabled={isPending}
                className="cursor-pointer rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-charcoal/70 transition-colors hover:border-ocean hover:text-ocean disabled:opacity-50"
              >
                {isPending ? "Loading..." : `Load More (${total - currentLimit} remaining)`}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
