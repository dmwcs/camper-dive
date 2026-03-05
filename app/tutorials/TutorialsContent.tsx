"use client";

import { useState } from "react";
import { tutorialPreviews, tutorialCategories } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";
import { TutorialCard } from "@/components/tutorials/TutorialCard";


export function TutorialsContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? tutorialPreviews
      : tutorialPreviews.filter((t) => t.category === activeCategory);

  const categoryCount = (cat: string) =>
    tutorialPreviews.filter((t) => t.category === cat).length;

  return (
    <div className="bg-background">
      <PageHeader
        tagline="Learn"
        title="Tutorials & Guides"
        description="From speargun basics to abalone hunting — free tutorials by a certified freediving instructor. Watch, read, and get in the water."
        backgroundImage="/images/spearfishing-action.jpg"
      />

      {/* Main content */}
      <section className="min-h-[60vh] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-10">
            {/* Sidebar — categories */}
            <aside className="mb-8 lg:col-span-1 lg:mb-0">
              <nav className="lg:sticky lg:top-24">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate">
                  Categories
                </h3>
                <ul className="mt-3 space-y-1">
                  {/* All */}
                  <li>
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        activeCategory === "all"
                          ? "bg-ocean text-white"
                          : "text-charcoal/70 hover:bg-background hover:text-charcoal"
                      }`}
                    >
                      <span>All Tutorials</span>
                      <span
                        className={`text-xs ${
                          activeCategory === "all"
                            ? "text-white/60"
                            : "text-slate-light"
                        }`}
                      >
                        {tutorialPreviews.length}
                      </span>
                    </button>
                  </li>
                  {tutorialCategories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() => setActiveCategory(cat.label)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          activeCategory === cat.label
                            ? "bg-ocean text-white"
                            : "text-charcoal/70 hover:bg-background hover:text-charcoal"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={`text-xs ${
                            activeCategory === cat.label
                              ? "text-white/60"
                              : "text-slate-light"
                          }`}
                        >
                          {categoryCount(cat.label)}
                        </span>
                      </button>
                    </li>
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
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate">
                  Showing{" "}
                  <span className="font-semibold text-charcoal">
                    {filtered.length}
                  </span>{" "}
                  {filtered.length === 1 ? "tutorial" : "tutorials"}
                  {activeCategory !== "all" && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-charcoal">
                        {activeCategory}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Featured (first item when showing all) */}
              {activeCategory === "all" && (
                <div className="mb-6">
                  <TutorialCard tutorial={filtered[0]} size="lg" />
                </div>
              )}

              {/* Grid */}
              <div className="grid gap-5 sm:grid-cols-2">
                {(activeCategory === "all"
                  ? filtered.slice(1)
                  : filtered
                ).map((tutorial) => (
                  <TutorialCard key={tutorial.slug} tutorial={tutorial} size="md" />
                ))}
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="rounded-xl border border-border bg-surface p-12 text-center">
                  <p className="text-sm text-slate">
                    No tutorials in this category yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

