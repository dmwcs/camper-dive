import Link from "next/link";
import { TutorialCard } from "@/components/TutorialCard";
import type { Tutorial } from "@/lib/types";

export function TutorialShowcase({ tutorials }: { tutorials: Tutorial[] }) {
  const featuredTutorials = tutorials.slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between" data-sr>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-dark">
              Learn & Master
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
              Free tutorials to get you started
            </h2>
            <p className="mt-2 max-w-lg text-sm text-slate">
              From your first dive to advanced techniques — learn hand spear
              skills, abalone hunting, lobster catching and more.
            </p>
          </div>
          <Link
            href="/tutorials"
            className="hidden cursor-pointer text-sm font-medium text-ocean transition-colors duration-200 hover:text-ocean-light sm:block"
          >
            All tutorials &rarr;
          </Link>
        </div>

        {featuredTutorials.length > 0 ? (
          <div className="mt-8" data-sr="50">
            <TutorialCard tutorial={featuredTutorials[0]} size="lg" />
            {featuredTutorials.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                {featuredTutorials.slice(1).map((tutorial) => (
                  <TutorialCard
                    key={tutorial.slug}
                    tutorial={tutorial}
                    size="md"
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="mt-8 rounded-2xl border border-border bg-surface p-12 text-center"
            data-sr="50"
          >
            <p className="text-sm text-slate">
              Tutorials coming soon. Check back later.
            </p>
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/tutorials"
            className="cursor-pointer text-sm font-medium text-ocean transition-colors duration-200 hover:text-ocean-light"
          >
            Browse all tutorials &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
