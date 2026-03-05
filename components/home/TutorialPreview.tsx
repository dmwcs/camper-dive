import Image from "next/image";
import Link from "next/link";
import { tutorialPreviews } from "@/lib/mock-data";

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
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {tutorials.map((tutorial, i) => (
            <Link
              key={tutorial.slug}
              href={`/tutorials/${tutorial.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-background transition-all duration-300 hover:border-ocean/20 hover:shadow-lg"
              data-sr={String(i * 70)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={tutorial.image}
                  alt={tutorial.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {tutorial.format.includes("Video") && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/90 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
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
                  <span className="rounded-md bg-surface/90 px-2 py-0.5 text-[10px] font-semibold text-charcoal backdrop-blur-sm">
                    {tutorial.format === "Article" ? "Article" : tutorial.format === "Video" ? "Video" : "Article + Video"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-dark">
                  {tutorial.category}
                </span>
                <h3 className="mt-1 text-sm font-bold leading-snug text-charcoal group-hover:text-ocean transition-colors">
                  {tutorial.title}
                </h3>
              </div>
            </Link>
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
