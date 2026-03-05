import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorialPreviews } from "@/lib/mock-data";
import { TutorialCard } from "@/components/tutorials/TutorialCard";

export function generateStaticParams() {
  return tutorialPreviews.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = tutorialPreviews.find((t) => t.slug === slug);
  if (!tutorial) return { title: "Tutorial Not Found — CamperDive" };
  return {
    title: `${tutorial.title} — CamperDive`,
    description: tutorial.description,
  };
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = tutorialPreviews.find((t) => t.slug === slug);
  if (!tutorial) notFound();

  const related = tutorialPreviews
    .filter((t) => t.slug !== slug && t.category === tutorial.category)
    .slice(0, 2);

  const moreRelated =
    related.length < 2
      ? [
          ...related,
          ...tutorialPreviews
            .filter(
              (t) =>
                t.slug !== slug && !related.find((r) => r.slug === t.slug)
            )
            .slice(0, 2 - related.length),
        ]
      : related;

  return (
    <div className="bg-surface">
      <article className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ── */}
        <header className="pt-8 pb-6 sm:pt-12 sm:pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] text-slate-light">
            <Link href="/tutorials" className="transition-colors hover:text-ocean">
              Tutorials
            </Link>
            <span className="text-border">/</span>
            <span className="text-slate">{tutorial.category}</span>
          </nav>

          {/* Category + meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
            <span className="rounded-full bg-ocean/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ocean">
              {tutorial.category}
            </span>
            <span className="text-[12px] text-slate-light sm:text-[13px]">
              {tutorial.lastEdited}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-3 font-heading text-[1.5rem] font-bold leading-[1.15] tracking-tight text-charcoal sm:mt-5 sm:text-[2.25rem] lg:text-[2.75rem]">
            {tutorial.title}
          </h1>

          {/* Description */}
          <p className="mt-2.5 text-sm leading-relaxed text-slate sm:mt-4 sm:text-lg">
            {tutorial.description}
          </p>
        </header>

        {/* ── Featured Image ── */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl sm:aspect-[2/1] sm:rounded-2xl">
          <Image
            src={tutorial.image}
            alt={tutorial.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        {/* ── Divider ── */}
        <div className="my-6 h-px bg-border sm:my-10" />

        {/* ── Content ── */}
        <div className="pb-8 sm:pb-12">
          {tutorial.content && (
            <div>
              {tutorial.content.split("\n\n").map((block, i) => {
                if (block.startsWith("**") && block.endsWith("**")) {
                  return (
                    <h2
                      key={i}
                      className="mt-8 mb-3 font-heading text-lg font-bold leading-snug text-charcoal first:mt-0 sm:mt-10 sm:mb-4 sm:text-[1.35rem]"
                    >
                      {block.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                if (block.startsWith("- ")) {
                  return (
                    <ul key={i} className="my-3 space-y-1.5 pl-4 sm:my-4 sm:space-y-2 sm:pl-5">
                      {block.split("\n").map((line, j) => {
                        const text = line.replace(/^- /, "");
                        const parts = text.split(/(\*\*.*?\*\*)/g);
                        return (
                          <li
                            key={j}
                            className="list-disc text-sm leading-[1.7] text-slate marker:text-border sm:text-[16.5px]"
                          >
                            {parts.map((part, k) =>
                              part.startsWith("**") && part.endsWith("**") ? (
                                <strong
                                  key={k}
                                  className="font-semibold text-charcoal"
                                >
                                  {part.replace(/\*\*/g, "")}
                                </strong>
                              ) : (
                                <span key={k}>{part}</span>
                              )
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                if (block.match(/^\d\. /)) {
                  return (
                    <ol key={i} className="my-3 space-y-1.5 pl-4 sm:my-4 sm:space-y-2 sm:pl-5">
                      {block.split("\n").map((line, j) => (
                        <li
                          key={j}
                          className="list-decimal text-sm leading-[1.7] text-slate marker:text-slate-light sm:text-[16.5px]"
                        >
                          {line.replace(/^\d+\. /, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }
                const parts = block.split(/(\*\*.*?\*\*)/g);
                return (
                  <p
                    key={i}
                    className="mt-3 text-sm leading-[1.7] text-slate sm:mt-4 sm:text-[16.5px]"
                  >
                    {parts.map((part, j) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong
                          key={j}
                          className="font-semibold text-charcoal"
                        >
                          {part.replace(/\*\*/g, "")}
                        </strong>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </p>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 rounded-xl bg-ocean px-5 py-6 text-center sm:mt-14 sm:rounded-2xl sm:px-8 sm:py-8">
            <h3 className="font-heading text-base font-bold text-white sm:text-lg">
              Ready to get started?
            </h3>
            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-white/60 sm:mt-2 sm:text-sm">
              Check out the Reef Hunter range — compact spearguns built for
              Australian waters.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-lg bg-sand px-5 py-2 text-sm font-semibold text-ocean transition-colors hover:bg-sand-light sm:mt-5 sm:px-6 sm:py-2.5"
            >
              Shop Spearguns
            </Link>
          </div>
        </div>
      </article>

      {/* ── Related ── */}
      <section className="border-t border-border bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-light">
            Keep reading
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-charcoal">
            More tutorials
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
            {moreRelated.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} size="sm" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
