import Link from "next/link";

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    title: "Compact & Portable",
    desc: "Fits in your dive bag. No bulky barrel or long gun to wrangle. Perfect for boat trips and shore dives.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "Precision in Tight Spaces",
    desc: "Excel in reef crevices, rock ledges, and kelp beds where longer guns can't reach. Ideal for targeted shots.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Easy to Learn",
    desc: "Simple mechanics, intuitive to use. Pick it up, load, aim, shoot. Free tutorials included with every purchase.",
  },
];

export function Education() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center" data-sr>
          <p className="text-sm font-semibold uppercase tracking-widest text-sand-dark">
            New to hand spearguns?
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-charcoal">
            What is a Hand Speargun?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate">
            A hand speargun is a compact, single-handed spearfishing tool — smaller than
            a traditional rubber-band speargun, but incredibly effective in Australian reef
            conditions. Think of it as the sniper rifle of spearfishing.
          </p>
        </div>

        {/* Comparison */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Hand Speargun - The Good */}
          <div className="rounded-2xl border border-sand/30 bg-gradient-to-b from-sand/5 to-transparent p-8" data-sr>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/15 text-sand-dark">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal">Hand Speargun</h3>
            </div>
            {/* Placeholder for product visual */}
            <div className="my-6 flex h-48 items-center justify-center rounded-xl bg-background">
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-light">
                  Product Image
                </p>
                <p className="mt-1 text-xs text-slate-light">
                  Compact hand speargun — 75cm
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-charcoal/80">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sand-dark">&#10003;</span>
                Under 1kg — one-handed operation
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sand-dark">&#10003;</span>
                Perfect for reef crevices and tight spots
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sand-dark">&#10003;</span>
                Fits in any dive bag — travel-friendly
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sand-dark">&#10003;</span>
                Quick to reload, fast follow-up shots
              </li>
            </ul>
          </div>

          {/* Traditional Speargun - The Comparison */}
          <div className="rounded-2xl border border-border bg-background p-8" data-sr="100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate/10 text-slate">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal">Traditional Rubber-Band Speargun</h3>
            </div>
            {/* Placeholder */}
            <div className="my-6 flex h-48 items-center justify-center rounded-xl bg-border/30">
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-light">
                  Comparison Image
                </p>
                <p className="mt-1 text-xs text-slate-light">
                  Full-size speargun — 120cm+
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-charcoal/60">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-light">&#8212;</span>
                2–4kg — requires two-handed grip
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-light">&#8212;</span>
                Better for open water, not reef diving
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-light">&#8212;</span>
                Bulky to transport, hard to travel with
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-light">&#8212;</span>
                Slower reload, less agile
              </li>
            </ul>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                {b.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-charcoal">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/tutorials/what-is-hand-speargun"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ocean transition-colors hover:text-ocean-light"
          >
            Learn more about hand spearguns
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0l-3-3m3 3l-3 3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
