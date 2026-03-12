import Image from "next/image";
import Link from "next/link";

const advantages = [
  {
    title: "Pure Simplicity",
    desc: "No triggers, no mechanics. Just a rubber sling, a shaft, and your aim.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Packs Down Small",
    desc: "Breaks down to backpack size. Travel light, dive anywhere.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Silent & Selective",
    desc: "No noise, no bubbles. Pick your target and make it count.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Quick to Master",
    desc: "One session and you're hunting. Free tutorials from zero to confident.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
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
          {/* Benefits — left column on desktop */}
          <div className="order-2 md:order-1">
            <p className="text-sm leading-relaxed text-slate sm:text-base">
              Hand spears are the purest form of underwater hunting — no
              complex parts, nothing to break. Just elastic power and your
              instinct.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
              {advantages.map((a) => (
                <div
                  key={a.title}
                  className="group rounded-xl border border-border bg-background p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean/10 text-ocean transition-colors duration-200 group-hover:bg-ocean group-hover:text-white">
                    {a.icon}
                  </div>
                  <h3 className="mt-3 text-[13px] font-bold text-charcoal sm:text-sm">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate sm:text-xs">
                    {a.desc}
                  </p>
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
