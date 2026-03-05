const testimonials = [
  {
    name: "Jake M.",
    location: "Gold Coast, QLD",
    quote:
      "First time using a hand speargun and I'm hooked. Took it out on the reef last weekend and landed three flathead. Way more fun than a rubber band gun.",
    rating: 5,
  },
  {
    name: "Sarah L.",
    location: "Perth, WA",
    quote:
      "The Reef Hunter 90 is exactly what I needed. Compact enough to travel with, powerful enough for reef fish. The tutorials helped me get started fast.",
    rating: 5,
  },
  {
    name: "Tom R.",
    location: "Sydney, NSW",
    quote:
      "Great quality gear and the video tutorials are brilliant. Learned proper speargun technique in a weekend. Highly recommend for anyone getting into spearfishing.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-sand">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1l2.47 4.56L16 6.48l-4 3.54L13 16 8 13.18 3 16l1-5.98-4-3.54 5.53-.92L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center" data-sr>
          <p className="text-sm font-semibold uppercase tracking-widest text-sand-dark">
            What divers are saying
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-charcoal">
            Trusted by Aussie Spearfishers
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-surface p-7"
              data-sr={String(i * 80)}
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-charcoal/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-sm font-bold text-ocean">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-slate">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
