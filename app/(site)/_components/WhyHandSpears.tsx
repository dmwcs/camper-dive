import Image from "next/image";
import Link from "next/link";

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

export function WhyHandSpears() {
  return (
    <section className="bg-surface py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header — right-aligned for zigzag rhythm */}
        <div className="mb-8 sm:mb-10 md:mb-12 md:text-right" data-sr>
          <div className="mb-3 h-[3px] w-12 rounded-full bg-ocean md:ml-auto" />
          <h2 className="font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl md:text-4xl">
            Why hand spears?
          </h2>
        </div>

        <div
          className="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
          data-sr="50"
        >
          {/* Copy + benefits — left column on desktop */}
          <div className="md:order-1 order-2">
            <p className="text-sm leading-relaxed text-slate sm:text-base">
              One rubber sling. One shaft. One sharp tip. Pull back,
              aim, let go. Hand spears are the purest form of
              underwater hunting — no triggers, no mechanics, just
              elastic power and your instinct.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:mt-6 md:mt-8 md:grid-cols-1 md:gap-y-3">
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

          {/* Image — right column on desktop, shown first on mobile */}
          <div className="order-1 md:order-2 relative aspect-[16/10] overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:aspect-[4/3] sm:rounded-2xl">
            <Image
              src="/images/spearfishing-reef.jpg"
              alt="Hand spearfishing on the reef"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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
        </div>
      </div>
    </section>
  );
}
