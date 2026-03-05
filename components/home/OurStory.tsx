import Image from "next/image";
import Link from "next/link";

export function OurStory() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo Collage */}
          <div className="grid grid-cols-2 gap-4" data-sr>
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/spearfishing-action.jpg"
                  alt="Spearfishing in action"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/lifestyle-campfire.jpg"
                  alt="Campfire by the shore"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/course-freediving.jpg"
                  alt="Freediving course"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/coral-reef.jpg"
                  alt="Vibrant coral reef"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="flex flex-col justify-center" data-sr="100">
            <p className="text-sm font-semibold uppercase tracking-widest text-sand-dark">
              Our Story
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal">
              Born from a love of the ocean and the hunt
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate">
              <p>
                CamperDive started with a simple passion: exploring the
                coastline and providing for the table through ethical
                spearfishing and freediving.
              </p>
              <p>
                As a certified freediving instructor, I saw a gap in the
                market — hand spearguns designed specifically for reef
                conditions. Compact, powerful, and perfect for unique reef
                systems.
              </p>
              <p>
                Today, we offer premium spearfishing gear alongside free
                tutorials that make this incredible sport accessible to
                everyone.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  title: "Ethically Sourced",
                  desc: "Sustainable harvesting practices and eco-conscious gear.",
                },
                {
                  title: "Expert Led",
                  desc: "Built on real-world diving experience.",
                },
                {
                  title: "Community First",
                  desc: "Mentorship and shared ocean knowledge.",
                },
                {
                  title: "Safety Always",
                  desc: "Proper training is non-negotiable.",
                },
              ].map((v) => (
                <div key={v.title}>
                  <h4 className="text-sm font-bold text-charcoal">
                    {v.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-light">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-ocean px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-ocean-light"
              >
                Learn More About Us
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
        </div>
      </div>
    </section>
  );
}
