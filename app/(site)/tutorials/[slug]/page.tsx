import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorials, getTutorialBySlug } from "@/lib/queries";
import { TutorialCard } from "@/components/TutorialCard";
import { TutorialBody } from "@/app/(site)/tutorials/_components/TutorialBody";
import { FinalCTA } from "@/components/FinalCTA";

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
              <Link href="/" className="transition-colors hover:text-white/90">
                Home
              </Link>
              <span className="text-white/50">/</span>
              <Link href="/tutorials" className="transition-colors hover:text-white/90">
                Tutorials
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white/80">{tutorial.title}</span>
            </nav>

            {/* Category + meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {tutorial.category}
              </span>
              {tutorial.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              )}
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

        </div>
      </article>

      {/* CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
          <FinalCTA />
        </div>
      </div>

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
