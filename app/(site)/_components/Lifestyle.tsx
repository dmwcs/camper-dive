import Image from "next/image";

const scenes = [
  {
    image: "/images/lifestyle-campfire.jpg",
    title: "Camp by the shore",
    desc: "Pack your gear, pitch your tent, and wake up to the sound of waves.",
  },
  {
    image: "/images/spearfishing-catch.jpg",
    title: "Dive for dinner",
    desc: "A compact speargun is all you need to bring home the catch.",
  },
  {
    image: "/images/lifestyle-cooking.jpg",
    title: "Eat from the ocean",
    desc: "From reef to fire — nothing beats a fresh catch cooked at camp.",
  },
];

export function Lifestyle() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-sr>
          <p className="text-sm font-semibold uppercase tracking-widest text-sand-dark">
            From campsite to coastline
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-charcoal">
            One tool, every adventure
          </h2>
        </div>

        {/* Equal 3-column grid */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {scenes.map((scene, i) => (
            <div
              key={scene.title}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl sm:aspect-[2/3] sm:rounded-2xl lg:aspect-[3/4]"
              data-sr={String(i * 70)}
            >
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/60 via-ocean-dark/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-6">
                <h3 className="font-heading text-xs font-bold text-white sm:text-base lg:text-lg">
                  {scene.title}
                </h3>
                <p className="mt-0.5 hidden text-sm leading-relaxed text-white/70 sm:block">
                  {scene.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
