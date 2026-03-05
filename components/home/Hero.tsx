import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ocean">
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-ocean.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/95 via-ocean/80 to-ocean/50" />
        {/* Subtle light caustic pattern using radial gradients */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 300px 200px at 20% 50%, rgba(212,168,75,0.6), transparent),
              radial-gradient(ellipse 400px 300px at 70% 30%, rgba(255,255,255,0.3), transparent),
              radial-gradient(ellipse 200px 400px at 90% 80%, rgba(212,168,75,0.4), transparent)
            `,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="hero-fade hero-fade-d1 text-sm font-semibold uppercase tracking-widest text-sand">
            Handheld spearguns for the outdoor diver
          </p>

          {/* Heading */}
          <h1 className="hero-fade mt-6 font-heading text-5xl font-bold leading-[1.1] tracking-tight text-white lg:text-6xl">
            Camp by the shore.
            <br />
            Dive for dinner.
          </h1>

          {/* Subheadline */}
          <p className="hero-fade hero-fade-d2 mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Handheld spearguns that travel with you — from campsite to
            coastline. Pack light, dive deep, eat well.
          </p>

          {/* CTAs */}
          <div className="hero-fade hero-fade-d3 mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-sand px-7 py-3.5 text-sm font-bold text-ocean transition-colors hover:bg-sand-light"
            >
              Shop Spearguns
            </Link>
            <Link
              href="/tutorials"
              className="rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              Watch Tutorials
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
