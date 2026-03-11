import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorials, getTutorialBySlug } from "@/lib/queries";
import { TutorialCard } from "@/components/TutorialCard";
import { TutorialBody } from "@/app/(site)/tutorials/_components/TutorialBody";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export async function generateStaticParams() {
  const tutorials = await getTutorials();
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
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
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) notFound();

  const allTutorials = await getTutorials();
  const related = allTutorials
    .filter((t) => t.slug !== slug && t.category === tutorial.category)
    .slice(0, 2);

  const moreRelated =
    related.length < 2
      ? [
          ...related,
          ...allTutorials
            .filter(
              (t) =>
                t.slug !== slug && !related.find((r) => r.slug === t.slug)
            )
            .slice(0, 2 - related.length),
        ]
      : related;

  return (
    <div className="bg-surface">
      {/* ── Hero with cover image background ── */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Background image */}
          <Image
            src={tutorial.image}
            alt={tutorial.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/30" />

          {/* Content */}
          <div className="relative px-5 pb-8 pt-6 sm:px-8 sm:pb-12 sm:pt-10 lg:px-12 lg:pb-14 lg:pt-12" data-sr>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[13px] text-white/70">
              <Link href="/tutorials" className="transition-colors hover:text-white/90">
                Tutorials
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white/80">{tutorial.category}</span>
            </nav>

            {/* Category + meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {tutorial.category}
              </span>
              <span className="text-[12px] text-white/70 sm:text-[13px]">
                {tutorial.lastEdited}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-3 max-w-3xl font-heading text-[1.5rem] font-bold leading-[1.15] tracking-tight text-white sm:mt-5 sm:text-[2.25rem] lg:text-[2.75rem]">
              {tutorial.title}
            </h1>

            {/* Description */}
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-lg">
              {tutorial.description}
            </p>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Spacer ── */}
        <div className="my-6 h-px bg-border sm:my-10" />

        {/* ── Content ── */}
        <div className="pb-8 sm:pb-12" data-sr="50">
          {tutorial.content && tutorial.content.length > 0 && (
            <TutorialBody content={tutorial.content} />
          )}

          {/* CTA */}
          <div className="mt-10 rounded-xl bg-ocean px-5 py-6 text-center sm:mt-14 sm:rounded-2xl sm:px-8 sm:py-8" data-sr>
            <h2 className="font-heading text-base font-bold text-white sm:text-lg">
              Ready to get started?
            </h2>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-light" data-sr>
            Keep reading
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-charcoal">
            More tutorials
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4" data-sr="100">
            {moreRelated.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} size="sm" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
