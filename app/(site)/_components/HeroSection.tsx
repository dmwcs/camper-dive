import Image from "next/image";
import Link from "next/link";



export function HeroSection() {
  return (
    <>
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
        {/* Top spacer */}
        <div className="min-h-12 flex-[1] sm:min-h-16" />

        {/* Hero copy */}
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Headline */}
          <h1
            className="hero-fade hero-fade-d2 mt-3 font-logo leading-[0.9] tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:mt-4 md:mt-5"
            style={{ fontSize: "clamp(2.75rem, 10vw, 9rem)" }}
          >
            SIMPLE GEAR,
            <br />
            <span className="bg-gradient-to-r from-sand via-sand-light to-sand bg-clip-text text-transparent drop-shadow-md">REAL HUNT.</span>
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
              className="group cursor-pointer rounded-lg bg-sand px-5 py-3 text-[13px] font-semibold text-ocean transition-all duration-300 hover:scale-105 hover:bg-sand-light hover:shadow-lg hover:shadow-sand/20 sm:px-7 sm:py-3.5 sm:text-sm md:text-base"
            >
              Shop Hand Spears
            </Link>
            <Link
              href="/tutorials"
              className="group cursor-pointer rounded-lg border border-white/25 px-5 py-3 text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-sm md:text-base"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="min-h-12 flex-[1] sm:min-h-16" />
      </div>
    </section>
    </>
  );
}
