"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Tutorial, TutorialCategory } from "@/lib/types";
import { TutorialCard } from "@/components/TutorialCard";
import { CategoryAccordion } from "@/app/(site)/tutorials/_components/CategoryAccordion";

const PAGE_SIZE = 8;

interface TutorialsContentProps {
  tutorials: Tutorial[];
  total: number;
  categories: TutorialCategory[];
}

export function TutorialsContent({ tutorials, total, categories }: TutorialsContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Read current filter state from URL
  const activeCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "featured";
  const currentLimit = parseInt(searchParams.get("limit") || String(PAGE_SIZE), 10);

  // Accordion state (UI-only, not in URL)
  const [expandedCat, setExpandedCat] = useState<string | null>(activeCategory || null);

  // Local state for search input (debounced)
  const [localSearch, setLocalSearch] = useState(searchQuery);

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

  const categoryCount = (cat: string) =>
    categories.find((c) => c.label === cat)?.count || 0;

  const tutorialsForCategory = useCallback(
    (cat: string) =>
      tutorials
        .filter((t) => t.category === cat)
        .map((t) => ({ title: t.title, slug: t.slug, format: t.format })),
    [tutorials]
  );

  const handleCategoryClick = (catLabel: string) => {
    updateParams({ category: catLabel });
    setExpandedCat((prev) => (prev === catLabel ? null : catLabel));
  };

  // Featured card: show when no filters and featured sort
  const showFeatured = !activeCategory && !searchQuery && sortBy === "featured" && tutorials.length > 0;
  const gridItems = showFeatured ? tutorials.slice(1) : tutorials;
  const hasMore = currentLimit < total;

  return (
    <>
      {/* Mobile search & category pills */}
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 py-3 shadow-sm backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 sm:gap-3 sm:px-6">
          {/* Mobile Search & Sort */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tutorials..."
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

            <div className="relative w-[130px] shrink-0 sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => updateParams({ sort: e.target.value === "featured" ? "" : e.target.value })}
                className="block w-full appearance-none rounded-full border border-border bg-background py-2 pl-3 pr-8 text-xs transition-shadow sm:pl-4 sm:pr-10 sm:text-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title: A to Z</option>
                <option value="title-desc">Title: Z to A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate sm:pr-4">
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="scrollbar-hide flex gap-1.5 overflow-x-auto">
            <button
              onClick={() => {
                updateParams({ category: "" });
                setExpandedCat(null);
              }}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-3.5 sm:text-[13px] ${
                !activeCategory
                  ? "bg-ocean text-white shadow-sm"
                  : "text-charcoal/60 hover:bg-background hover:text-charcoal"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  updateParams({ category: cat.label });
                  setExpandedCat(null);
                }}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-3.5 sm:text-[13px] ${
                  activeCategory === cat.label
                    ? "bg-ocean text-white shadow-sm"
                    : "text-charcoal/60 hover:bg-background hover:text-charcoal"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="min-h-[60vh] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-10">
            {/* Sidebar — categories with accordion (desktop only) */}
            <aside className="hidden lg:col-span-1 lg:block">
              <nav className="sticky top-24">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate">
                  Categories
                </h3>
                <ul className="mt-3 space-y-1">
                  <li>
                    <button
                      onClick={() => {
                        updateParams({ category: "" });
                        setExpandedCat(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        !activeCategory && expandedCat === null
                          ? "bg-ocean text-white"
                          : "text-charcoal/70 hover:bg-background hover:text-charcoal"
                      }`}
                    >
                      <span>All Tutorials</span>
                      <span
                        className={`text-xs ${
                          !activeCategory && expandedCat === null
                            ? "text-white/60"
                            : "text-slate-light"
                        }`}
                      >
                        {total}
                      </span>
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <CategoryAccordion
                      key={cat.slug}
                      label={cat.label}
                      count={categoryCount(cat.label)}
                      isActive={expandedCat === cat.label}
                      onToggle={() => handleCategoryClick(cat.label)}
                      tutorials={tutorialsForCategory(cat.label)}
                    />
                  ))}
                </ul>

                {/* Tags legend */}
                <div className="mt-6 border-t border-border pt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate">
                    Tags
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs text-slate">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                      Featured
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-ocean" />
                      Article
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-coral" />
                      Video
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-sand-dark" />
                      Article + Video
                    </div>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Tutorial grid */}
            <div className="lg:col-span-3">
              {/* Desktop Search Header */}
              <div className="mb-6 hidden items-center justify-between lg:flex">
                <p className="text-sm text-slate">
                  {total} {total === 1 ? "tutorial" : "tutorials"}
                  {activeCategory && (
                    <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-72">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="h-4 w-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search tutorials..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="block w-full rounded-full border border-border bg-surface py-2.5 pl-9 pr-4 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
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
                  <div className="relative w-48">
                    <select
                      value={sortBy}
                      onChange={(e) => updateParams({ sort: e.target.value === "featured" ? "" : e.target.value })}
                      className="block w-full appearance-none rounded-full border border-border bg-surface py-2.5 pl-4 pr-10 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="title-asc">Title: A to Z</option>
                      <option value="title-desc">Title: Z to A</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile count */}
              <p className="mb-4 text-sm text-slate sm:mb-6 lg:hidden">
                {total} {total === 1 ? "tutorial" : "tutorials"}
                {activeCategory && (
                  <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
                )}
              </p>

              <div className={`transition-opacity duration-200 ${isPending ? "pointer-events-none opacity-60" : ""}`}>
                {/* Featured (first item when showing all, newest, no search) */}
                {showFeatured && (
                  <div className="mb-4 sm:mb-6">
                    <TutorialCard tutorial={tutorials[0]} size="lg" />
                  </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {gridItems.map((tutorial) => (
                    <TutorialCard key={tutorial.slug} tutorial={tutorial} size="md" />
                  ))}
                </div>
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

              {/* Empty state */}
              {tutorials.length === 0 && (
                <div className="rounded-xl border border-border bg-surface p-8 text-center sm:p-12">
                  <p className="text-sm text-slate">
                    No tutorials in this category yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
