import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata = {
  title: "About",
  description:
    "CamperDive started with a simple passion: exploring the coastline and providing for the table through ethical spearfishing and freediving.",
};

const values = [
  {
    title: "Simplicity",
    desc: "No complex mechanisms. Just a spear, a band, and your arm. Hand spearguns are the purest form of underwater hunting.",
  },
  {
    title: "Portability",
    desc: "Every product we make is designed to pack down and travel. Because the best dive spots aren't in the city.",
  },
  {
    title: "Sustainability",
    desc: "Take only what you need. Spearfishing is one of the most selective and sustainable ways to harvest from the ocean.",
  },
  {
    title: "Community",
    desc: "We share everything we know through free tutorials. A stronger community means healthier reefs and better diving for everyone.",
  },
];

const milestones = [
  { year: "2019", text: "First Reef Hunter prototype tested on the Gold Coast" },
  { year: "2020", text: "Launched the 75cm model — sold out in 3 weeks" },
  { year: "2021", text: "Added the 90cm and 110cm models to the range" },
  { year: "2022", text: "Started free tutorial series on YouTube" },
  { year: "2023", text: "Accessories line launched — tips, bags, knives" },
  { year: "2024", text: "Growing community of 5,000+ Aussie spearos" },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Born from a love of the ocean and the hunt"
        description="CamperDive started with a simple idea: what if you could pack a speargun in your backpack, camp by the coast, and dive for dinner wherever you roam?"
        backgroundImage="/images/hero-ocean.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* Founder Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2" data-sr>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/course-freediving.jpg"
                alt="Freediving at the reef"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-charcoal">
                From the reef to the campfire
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate">
                <p>
                  As a certified freediving instructor, I spent years diving
                  Australia's coastline — from the tropical reefs of Queensland
                  to the kelp forests of Tasmania. I saw a gap in the market for
                  hand spearguns designed specifically for local reef conditions.
                </p>
                <p>
                  The spearguns available were either cheap imports that rusted
                  in weeks, or expensive European models too long to travel with.
                  I wanted something compact, powerful, and built for the way
                  Australians actually dive — camping by the coast, exploring new
                  spots, and living off the ocean.
                </p>
                <p>
                  So I built one. Then my mates wanted one. Then their mates.
                  CamperDive grew from a workshop project into a community of
                  thousands of Aussie spearos who share the same philosophy:
                  pack light, dive deep, eat well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-charcoal" data-sr>
            What we stand for
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2" data-sr="50">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border p-6">
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-charcoal" data-sr>
            Our journey
          </h2>
          <div className="mt-8 space-y-0" data-sr="50">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 py-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean text-xs font-bold text-white">
                    {i + 1}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-4">
                  <span className="text-sm font-bold text-ocean">{m.year}</span>
                  <p className="mt-1 text-base text-slate">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FinalCTA />
    </div>
  );
}
