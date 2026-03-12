import Image from "next/image";
import Link from "next/link";

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

export function HeroSection() {
  return (
    <section className="relative min-h-[60dvh] overflow-hidden bg-ocean sm:min-h-[70dvh] md:min-h-[80dvh]">
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
      <div className="relative flex min-h-[60dvh] flex-col pt-16 sm:min-h-[70dvh] sm:pt-20 md:min-h-[80dvh] md:pt-24">
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
            className="hero-fade hero-fade-d2 mt-3 font-logo leading-[0.9] tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:mt-4 md:mt-5"
            style={{ fontSize: "clamp(2.75rem, 10vw, 9rem)" }}
          >
            SIMPLE GEAR,
            <br />
            <span className="text-sand">REAL HUNT.</span>
          </h1>

          {/* Sub-copy */}
          <p className="hero-fade hero-fade-d3 mt-3 max-w-[280px] text-[13px] leading-relaxed text-white/55 sm:mt-5 sm:max-w-sm sm:text-sm md:mt-6 md:max-w-md md:text-base">
            Hand spears crafted for freedivers and reef hunters.
            Every sling, every shaft, every detail — purpose-built
            for those who spearfish the simple way.
          </p>

          {/* CTAs */}
          <div className="hero-fade hero-fade-d4 mt-5 flex flex-wrap gap-3 sm:mt-8 md:mt-10">
            <Link
              href="/products"
              className="cursor-pointer rounded-lg bg-sand px-5 py-3 text-[13px] font-semibold text-ocean transition-colors duration-200 hover:bg-sand-light sm:px-7 sm:py-3.5 sm:text-sm md:text-base"
            >
              Shop Hand Spears
            </Link>
            <Link
              href="/tutorials"
              className="cursor-pointer rounded-lg border border-white/25 px-5 py-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-sm md:text-base"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Bottom spacer — smaller ratio to keep trust bar near bottom */}
        <div className="min-h-6 flex-[3] sm:flex-[4]" />

        {/* Trust Bar — flat info strip */}
        <div className="hero-fade hero-fade-d4 border-t border-white/10">
          <div className="mx-auto flex w-full max-w-7xl items-stretch divide-x divide-white/10 px-2 sm:px-6 lg:px-8">
            {trustBadges.map((b) => (
              <div
                key={b.label}
                className="flex flex-1 flex-col items-center justify-center gap-1 py-3.5 sm:flex-row sm:gap-3 sm:py-5 md:py-6"
              >
                <span className="text-sand [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-6 sm:[&_svg]:w-6">{b.icon}</span>
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/90 sm:text-xs md:text-sm">
                    {b.label}
                  </p>
                  <p className="mt-0.5 hidden text-xs text-white/40 md:block">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
