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

  const filtered =
    activeCategory === "all"
      ? tutorials
      : tutorials.filter((t) => t.category === activeCategory);

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
      {/* Mobile category pills */}
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur-sm lg:hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1.5 overflow-x-auto py-3">
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
              {/* Active filter + count */}
              <p className="mb-4 text-sm text-slate sm:mb-6" data-sr>
                {filtered.length} {filtered.length === 1 ? "tutorial" : "tutorials"}
                {activeCategory !== "all" && (
                  <> in <span className="font-medium text-charcoal">{activeCategory}</span></>
                )}
              </p>

              {/* Featured (first item when showing all) */}
              {activeCategory === "all" && filtered[0] && (
                <div className="mb-4 sm:mb-6">
                  <TutorialCard tutorial={filtered[0]} size="lg" />
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4" data-sr="100">
                {(activeCategory === "all"
                  ? filtered.slice(1)
                  : filtered
                ).map((tutorial) => (
                  <TutorialCard key={tutorial.slug} tutorial={tutorial} size="md" />
                ))}
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
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

