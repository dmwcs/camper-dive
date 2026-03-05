import Link from "next/link";
import { tutorialPreviews } from "@/lib/mock-data";
import { TutorialCard } from "@/components/tutorials/TutorialCard";

export function TutorialPreview() {
  const tutorials = tutorialPreviews.slice(0, 3);

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between" data-sr>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sand-dark">
              Learn
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-charcoal">
              Tutorials & Guides
            </h2>
            <p className="mt-2 max-w-lg text-sm text-slate">
              From speargun basics to abalone hunting — free tutorials by a
              certified freediving instructor.
            </p>
          </div>
          <Link
            href="/tutorials"
            className="hidden items-center gap-2 text-sm font-semibold text-ocean transition-colors hover:text-ocean-light md:flex"
          >
            View all tutorials
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8h10m0 0l-3-3m3 3l-3 3"
              />
            </svg>
          </Link>
        </div>

        {/* Tutorial Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.slug} tutorial={tutorial} size="sm" />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ocean"
          >
            View all tutorials
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8h10m0 0l-3-3m3 3l-3 3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
