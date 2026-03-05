"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { tutorialPreviews, tutorialCategories } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";

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
      />

      {/* Main content */}
      <section className="py-12">
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
                <Link
                  href={`/tutorials/${filtered[0].slug}`}
                  className="group mb-6 grid overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg md:grid-cols-2"
                >
                  <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[280px]">
                    <Image
                      src={filtered[0].image}
                      alt={filtered[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <FormatBadge format={filtered[0].format} />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sand-dark">
                      {filtered[0].category}
                    </span>
                    <h3 className="mt-2 font-heading text-xl font-bold text-charcoal group-hover:text-ocean">
                      {filtered[0].title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {filtered[0].description}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-slate-light">
                        {filtered[0].readTime}
                      </span>
                      <span className="text-sm font-medium text-ocean">
                        Read more &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className="grid gap-5 sm:grid-cols-2">
                {(activeCategory === "all"
                  ? filtered.slice(1)
                  : filtered
                ).map((tutorial) => (
                  <Link
                    key={tutorial.slug}
                    href={`/tutorials/${tutorial.slug}`}
                    className="group overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-video overflow-hidden bg-background">
                      <Image
                        src={tutorial.image}
                        alt={tutorial.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {tutorial.format.includes("Video") && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/90 text-white shadow-lg transition-transform group-hover:scale-110">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 18 18"
                              fill="currentColor"
                            >
                              <path d="M6.5 3.5v11l8-5.5-8-5.5z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <div className="absolute left-3 top-3">
                        <FormatBadge format={tutorial.format} />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-dark">
                          {tutorial.category}
                        </span>
                        <span className="text-[11px] text-slate-light">
                          {tutorial.readTime}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-sm font-bold leading-snug text-charcoal group-hover:text-ocean">
                        {tutorial.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate line-clamp-2">
                        {tutorial.description}
                      </p>
                    </div>
                  </Link>
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

function FormatBadge({
  format,
}: {
  format: "Article" | "Video" | "Article + Video";
}) {
  const color =
    format === "Article"
      ? "bg-ocean/90"
      : format === "Video"
        ? "bg-coral/90"
        : "bg-sand-dark/90";
  return (
    <span
      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm ${color}`}
    >
      {format}
    </span>
  );
}
