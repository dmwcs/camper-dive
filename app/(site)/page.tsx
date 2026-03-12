import Image from "next/image";
import Link from "next/link";
import { getProducts, getTutorials } from "@/lib/queries";
import { ProductCard } from "@/app/(site)/products/_components/ProductCard";
import { TutorialCard } from "@/components/TutorialCard";
import { ProductCarousel } from "@/components/ui/ProductCarousel";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

/* ─── trust badges data ──────────────────────────────────────────── */
const trustBadges = [
  {
    label: "Free Shipping",
    desc: "Australia-wide",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: "Lifetime Warranty",
    desc: "We stand behind it",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: "Free Tutorials",
    desc: "Zero to confident",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

/* ─── why hand spears ────────────────────────────────────────────── */
const advantages = [
  {
    title: "Dead Simple",
    desc: "A shaft, a rubber sling, and a tip. Pull back, aim, release. Nothing else to think about.",
  },
  {
    title: "Compact & Portable",
    desc: "Breaks down to backpack size. Camp by the coast, dive for dinner wherever you roam.",
  },
  {
    title: "Silent & Selective",
    desc: "No noise, no bubbles. Get close, pick your target, and make the shot count.",
  },
  {
    title: "Easy to Learn",
    desc: "One session and you're hunting. Our free tutorials take you from zero to confident.",
  },
];

/* ─── testimonials ───────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Perfect for reef diving up north. Compact, powerful, and packs down into nothing. Best hand spear I've owned.",
    name: "Jake M.",
    location: "Cairns, QLD",
  },
  {
    quote:
      "The tutorials alone are worth it. Went from zero to confident in a weekend. Caught my first flathead on day two.",
    name: "Sarah L.",
    location: "Sydney, NSW",
  },
  {
    quote:
      "I travel for work and dive on weekends. This is the only hand spear that fits in my carry-on. Game changer.",
    name: "Tom R.",
    location: "Perth, WA",
  },
];

/* ─── lifestyle gallery ──────────────────────────────────────────── */
const lifestyleImages = [
  {
    src: "/images/spearfishing-catch.jpg",
    alt: "Fresh catch from spearfishing",
    label: "The Catch",
  },
  {
    src: "/images/lifestyle-cooking.jpg",
    alt: "Cooking fresh catch at camp",
    label: "Camp Kitchen",
  },
  {
    src: "/images/lifestyle-campfire.jpg",
    alt: "Campfire by the coast",
    label: "The Experience",
  },
];

/* ─── page ───────────────────────────────────────────────────────── */
export default async function Home() {
  const [products, tutorials] = await Promise.all([
    getProducts(),
    getTutorials(),
  ]);

  const popularProducts = products.slice(0, 3);
  const featuredProducts = products.slice(3, 7);
  const featuredTutorials = tutorials.slice(0, 3);

  return (
    <div className="bg-background">
      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[75dvh] overflow-hidden bg-ocean sm:min-h-[80dvh]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/spearfishing-action.jpg"
            alt="Spearfishing underwater"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/50 to-ocean/20" />
        </div>

        {/* Content — vertical layout: [spacer] [copy] [trust bar] */}
        <div className="relative flex min-h-[75dvh] flex-col pt-20 sm:min-h-[80dvh] sm:pt-24">
          {/* Top spacer — controlled ratio so copy lands ~40% down */}
          <div className="min-h-8 flex-[2] sm:flex-[3]" />

          {/* Hero copy */}
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            {/* Tagline */}
            <p className="hero-fade hero-fade-d1 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-sand sm:text-xs">
              <span className="hidden h-px w-8 bg-sand/60 sm:block" />
              Reef Hunters &mdash; Hand Spears
            </p>

            {/* Headline */}
            <h1
              className="hero-fade hero-fade-d2 mt-3 font-logo leading-[0.9] tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:mt-5"
              style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
            >
              SIMPLE GEAR,
              <br />
              <span className="text-sand">REAL HUNT.</span>
            </h1>

            {/* Sub-copy */}
            <p className="hero-fade hero-fade-d3 mt-4 max-w-sm text-sm leading-relaxed text-white/55 sm:mt-6 sm:max-w-md sm:text-base">
              Hand spears crafted for freedivers and reef hunters.
              Every sling, every shaft, every detail — purpose-built
              for those who spearfish the simple way.
            </p>

            {/* CTAs */}
            <div className="hero-fade hero-fade-d4 mt-6 flex flex-wrap gap-3 sm:mt-10">
              <Link
                href="/products"
                className="cursor-pointer rounded-lg bg-sand px-7 py-3.5 text-sm font-semibold text-ocean transition-colors duration-200 hover:bg-sand-light sm:text-base"
              >
                Shop Hand Spears
              </Link>
              <Link
                href="/tutorials"
                className="cursor-pointer rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:text-base"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Bottom spacer — smaller ratio to keep trust bar near bottom */}
          <div className="min-h-6 flex-[3] sm:flex-[4]" />

          {/* Trust Bar — flat info strip */}
          <div className="hero-fade hero-fade-d4 border-t border-white/10">
            <div className="mx-auto flex w-full max-w-7xl items-stretch divide-x divide-white/10 px-4 sm:px-6 lg:px-8">
              {trustBadges.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-1 flex-col items-center justify-center gap-1.5 py-5 sm:flex-row sm:gap-3 sm:py-6"
                >
                  <span className="text-sand">{b.icon}</span>
                  <div className="text-center sm:text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
                      {b.label}
                    </p>
                    <p className="mt-0.5 hidden text-xs text-white/40 sm:block">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Products — Most Popular + The Range ────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between" data-sr>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sand-dark">
                The Range
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
                Hand Spears & Gear
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden cursor-pointer text-sm font-medium text-ocean transition-colors duration-200 hover:text-ocean-light sm:block"
            >
              View all &rarr;
            </Link>
          </div>

          {/* Most Popular — carousel */}
          {popularProducts.length > 0 && (
            <div className="mt-8" data-sr>
              <ProductCarousel slideClass="basis-full">
                {popularProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="overflow-hidden rounded-2xl border border-border bg-surface"
                  >
                    <div className="grid lg:grid-cols-2">
                      <div className="relative aspect-square bg-background lg:aspect-auto lg:min-h-[420px]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                          <span className="rounded-lg bg-coral px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                            Most Popular
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-sand-dark sm:text-xs">
                          {product.category}
                        </p>
                        <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
                          {product.name}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
                          {product.shortDesc}
                        </p>

                        {product.features && product.features.length > 0 && (
                          <div className="mt-5 space-y-2 sm:mt-6">
                            {product.features.slice(0, 4).map((f) => (
                              <div
                                key={f}
                                className="flex items-center gap-2.5"
                              >
                                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                                  <svg
                                    width="8"
                                    height="8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m4.5 12.75 6 6 9-13.5"
                                    />
                                  </svg>
                                </div>
                                <span className="text-xs text-slate sm:text-sm">
                                  {f}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                          <span className="text-2xl font-bold text-charcoal sm:text-3xl">
                            {product.variants && product.variants.length > 0
                              ? "From "
                              : ""}
                            ${product.price}
                          </span>
                          <Link
                            href={`/products/${product.slug}`}
                            className="cursor-pointer rounded-lg bg-ocean px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ocean-light sm:text-base"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ProductCarousel>
            </div>
          )}

          {/* More products carousel */}
          {featuredProducts.length > 0 ? (
            <div className="mt-10" data-sr="50">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate">
                More to Explore
              </p>
              <ProductCarousel slideClass="basis-1/2 lg:basis-1/4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </ProductCarousel>
            </div>
          ) : (
            <div
              className="mt-8 rounded-2xl border border-border bg-surface p-12 text-center"
              data-sr="50"
            >
              <p className="text-sm text-slate">
                Products coming soon. Check back later.
              </p>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/products"
              className="cursor-pointer text-sm font-medium text-ocean transition-colors duration-200 hover:text-ocean-light"
            >
              View all products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Why Hand Spearguns (Education → Conversion) ─────────── */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            data-sr
          >
            {/* Image with embedded video CTA */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/spearfishing-reef.jpg"
                alt="Hand spearfishing on the reef"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
                <Link
                  href="/tutorials"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/95 px-4 py-2.5 text-xs font-semibold text-ocean shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-white sm:text-sm"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="currentColor"
                  >
                    <path d="M6.5 3.5v11l8-5.5-8-5.5z" />
                  </svg>
                  Watch How It Works
                </Link>
              </div>
            </div>

            {/* Copy + benefits */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sand-dark">
                Why Hand Spears?
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
                The purest form of underwater hunting
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate sm:text-base">
                One rubber sling. One shaft. One sharp tip. Pull back,
                aim, let go. Hand spears are the most stripped-back way
                to hunt — no triggers, no mechanics, just elastic power
                and your instinct.
              </p>

              <div className="mt-6 space-y-3 sm:mt-8">
                {advantages.map((a) => (
                  <div key={a.title} className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean text-white">
                      <svg
                        width="10"
                        height="10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-charcoal">
                        {a.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate sm:text-sm">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Tutorial Showcase (Tutorials serve speargun sales) ──── */}
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

      {/* ── 7. Lifestyle + Social Proof ────────────────────────────── */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Lifestyle gallery */}
          <div className="text-center" data-sr>
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-dark">
              The Lifestyle
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
              Dive. Catch. Cook. Repeat.
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate">
              CamperDive isn&apos;t just gear — it&apos;s a way of life. Camp by
              the coast, dive for dinner, and share the experience.
            </p>
          </div>

          <div
            className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4"
            data-sr="50"
          >
            {lifestyleImages.map((img) => (
              <div
                key={img.label}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[3/4]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-semibold text-white sm:bottom-4 sm:left-4 sm:text-sm">
                  {img.label}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div
            className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6"
            data-sr="100"
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border bg-background p-5 sm:p-6"
              >
                <div className="flex gap-0.5 text-sand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate sm:text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-3">
                  <p className="text-xs font-bold text-charcoal sm:text-sm">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-slate">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Final CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ocean py-16 sm:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/coral-reef.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
        <div
          className="relative mx-auto max-w-7xl px-6 text-center lg:px-8"
          data-sr
        >
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to dive in?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:text-base">
            Grab a Reef Hunter, watch the tutorials, and hit the water this
            weekend. Your first catch is waiting.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="cursor-pointer rounded-lg bg-sand px-7 py-3.5 text-sm font-semibold text-ocean transition-colors duration-200 hover:bg-sand-light sm:text-base"
            >
              Shop Hand Spears
            </Link>
            <Link
              href="/tutorials"
              className="cursor-pointer rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:text-base"
            >
              Watch Tutorials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
