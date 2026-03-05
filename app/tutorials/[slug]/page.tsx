import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorialPreviews } from "@/lib/mock-data";

export function generateStaticParams() {
  return tutorialPreviews.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tutorial = tutorialPreviews.find((t) => t.slug === params.slug);
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
        <header className="pt-12 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] text-slate-light">
            <Link href="/tutorials" className="transition-colors hover:text-ocean">
              Tutorials
            </Link>
            <span className="text-border">/</span>
            <span className="text-slate">{tutorial.category}</span>
          </nav>

          {/* Category + meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-ocean/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ocean">
              {tutorial.category}
            </span>
            <span className="text-[13px] text-slate-light">
              {tutorial.lastEdited}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-5 font-heading text-[2.25rem] font-bold leading-[1.15] tracking-tight text-charcoal lg:text-[2.75rem]">
            {tutorial.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg leading-relaxed text-slate">
            {tutorial.description}
          </p>
        </header>

        {/* ── Featured Image ── */}
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl">
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
        <div className="my-10 h-px bg-border" />

        {/* ── Content ── */}
        <div className="pb-12">
          {tutorial.content && (
            <div>
              {tutorial.content.split("\n\n").map((block, i) => {
                if (block.startsWith("**") && block.endsWith("**")) {
                  return (
                    <h2
                      key={i}
                      className="mt-10 mb-4 font-heading text-[1.35rem] font-bold leading-snug text-charcoal first:mt-0"
                    >
                      {block.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                if (block.startsWith("- ")) {
                  return (
                    <ul key={i} className="my-4 space-y-2 pl-5">
                      {block.split("\n").map((line, j) => {
                        const text = line.replace(/^- /, "");
                        const parts = text.split(/(\*\*.*?\*\*)/g);
                        return (
                          <li
                            key={j}
                            className="list-disc text-[16.5px] leading-[1.7] text-slate marker:text-border"
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
                    <ol key={i} className="my-4 space-y-2 pl-5">
                      {block.split("\n").map((line, j) => (
                        <li
                          key={j}
                          className="list-decimal text-[16.5px] leading-[1.7] text-slate marker:text-slate-light"
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
                    className="mt-4 text-[16.5px] leading-[1.7] text-slate"
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
          <div className="mt-14 rounded-2xl bg-ocean px-8 py-8 text-center">
            <h3 className="font-heading text-lg font-bold text-white">
              Ready to get started?
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/60">
              Check out the Reef Hunter range — compact spearguns built for
              Australian waters.
            </p>
            <Link
              href="/products"
              className="mt-5 inline-block rounded-lg bg-sand px-6 py-2.5 text-sm font-semibold text-ocean transition-colors hover:bg-sand-light"
            >
              Shop Spearguns
            </Link>
          </div>
        </div>
      </article>

      {/* ── Related ── */}
      <section className="border-t border-border bg-background py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-light">
            Keep reading
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-charcoal">
            More tutorials
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {moreRelated.map((t) => (
              <Link
                key={t.slug}
                href={`/tutorials/${t.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-dark">
                    {t.category}
                  </span>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug text-charcoal group-hover:text-ocean">
                    {t.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
