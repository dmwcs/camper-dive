import Image from "next/image";

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

export function LifestyleSection() {
  return (
    <section className="bg-surface py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Lifestyle gallery — right-aligned header for zigzag rhythm */}
        <div className="md:text-right" data-sr>
          <div className="mb-3 h-[3px] w-12 rounded-full bg-ocean md:ml-auto" />
          <h2 className="font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl md:text-4xl">
            Dive. Catch. Cook. Repeat.
          </h2>
          <p className="mt-2 max-w-lg text-sm text-slate md:ml-auto">
            CamperDive isn&apos;t just gear — it&apos;s a way of life. Camp by
            the coast, dive for dinner, and share the experience.
          </p>
        </div>

        {/* Gallery — 3-col grid, mobile uses shorter aspect ratio */}
        <div
          className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 md:mt-10"
          data-sr="50"
        >
          {lifestyleImages.map((img) => (
            <div
              key={img.label}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-2 left-2 text-[11px] font-semibold text-white sm:bottom-4 sm:left-4 sm:text-sm">
                {img.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials — 3-col grid on all sizes */}
        <div
          className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-6 md:mt-10"
          data-sr="100"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-background p-4 sm:p-6"
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
  );
}
