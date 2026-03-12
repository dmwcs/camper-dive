"use client";

import { useState, useCallback } from "react";
import type { Tutorial, TutorialCategory } from "@/lib/types";
import { TutorialCard } from "@/components/TutorialCard";
import { CategoryAccordion } from "@/app/(site)/tutorials/_components/CategoryAccordion";

interface TutorialsContentProps {
  tutorials: Tutorial[];
  categories: TutorialCategory[];
}

export function TutorialsContent({ tutorials, categories }: TutorialsContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = tutorials.filter((t) => {
    const matchesCat = activeCategory === "all" || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortBy === "oldest") {
      return new Date(a.lastEdited || 0).getTime() - new Date(b.lastEdited || 0).getTime();
    }
    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return new Date(b.lastEdited || 0).getTime() - new Date(a.lastEdited || 0).getTime();
  });

  const categoryCount = (cat: string) =>
    tutorials.filter((t) => t.category === cat).length;

  const tutorialsForCategory = useCallback(
    (cat: string) =>
      tutorials
        .filter((t) => t.category === cat)
        .map((t) => ({ title: t.title, slug: t.slug, format: t.format })),
    [tutorials]
  );

  const handleCategoryClick = (catLabel: string) => {
    setActiveCategory(catLabel);
    setExpandedCat((prev) => (prev === catLabel ? null : catLabel));
  };

  return (
    <>
      {/* Mobile search & category pills */}
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 py-3 shadow-sm backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6">
          {/* Mobile Search & Sort */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate hover:text-charcoal">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full appearance-none rounded-full border border-border bg-background py-2 pl-4 pr-10 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
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
          
          <div className="scrollbar-hide flex gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => {
                setActiveCategory("all");
                setExpandedCat(null);
              }}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                activeCategory === "all"
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
                  setActiveCategory(cat.label);
                  setExpandedCat(null);
                }}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                        setActiveCategory("all");
                        setExpandedCat(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        activeCategory === "all" && expandedCat === null
                          ? "bg-ocean text-white"
                          : "text-charcoal/70 hover:bg-background hover:text-charcoal"
                      }`}
                    >
                      <span>All Tutorials</span>
                      <span
                        className={`text-xs ${
                          activeCategory === "all" && expandedCat === null
                            ? "text-white/60"
                            : "text-slate-light"
                        }`}
                      >
                        {tutorials.length}
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

                {/* Format legend */}
                <div className="mt-6 border-t border-border pt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate">
                    Format
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs text-slate">
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
                <p className="text-sm text-slate" data-sr>
                  {sortedAndFiltered.length} {sortedAndFiltered.length === 1 ? "tutorial" : "tutorials"}
                  {activeCategory !== "all" && (
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full rounded-full border border-border bg-surface py-2.5 pl-9 pr-4 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate hover:text-charcoal">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>
                  <div className="relative w-48">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full appearance-none rounded-full border border-border bg-surface py-2.5 pl-4 pr-10 text-sm transition-shadow focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    >
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

              {/* Mobile count (hidden on desktop since search header has it) */}
              <p className="mb-4 text-sm text-slate sm:mb-6 lg:hidden" data-sr>
                {sortedAndFiltered.length} {sortedAndFiltered.length === 1 ? "tutorial" : "tutorials"}
                {activeCategory !== "all" && (
                  <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
                )}
              </p>

              {/* Featured (first item when showing all and no search query) */}
              {activeCategory === "all" && !searchQuery && sortBy === "newest" && sortedAndFiltered[0] && (
                <div className="mb-4 sm:mb-6">
                  <TutorialCard tutorial={sortedAndFiltered[0]} size="lg" />
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4" data-sr="100">
                {(activeCategory === "all" && !searchQuery && sortBy === "newest"
                  ? sortedAndFiltered.slice(1)
                  : sortedAndFiltered
                ).map((tutorial) => (
                  <TutorialCard key={tutorial.slug} tutorial={tutorial} size="md" />
                ))}
              </div>

              {/* Empty state */}
              {sortedAndFiltered.length === 0 && (
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

