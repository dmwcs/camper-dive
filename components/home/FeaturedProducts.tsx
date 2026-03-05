import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "@/lib/mock-data";

export function FeaturedProducts() {
  const [hero, ...rest] = featuredProducts;

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between" data-sr>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sand-dark">
              Our Gear
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-charcoal">
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-sm font-semibold text-ocean transition-colors hover:text-ocean-light md:flex"
          >
            View all products
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

        {/* Hero Product — full width horizontal card */}
        <Link
          href={`/products/${hero.slug}`}
          className="group mt-8 grid overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-ocean/20 hover:shadow-lg md:grid-cols-2"
          data-sr
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[320px]">
            <Image
              src={hero.image}
              alt={hero.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-dark">
              {hero.category}
            </span>
            <h3 className="mt-2 font-heading text-2xl font-bold text-charcoal group-hover:text-ocean transition-colors">
              {hero.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {hero.shortDesc}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-bold text-charcoal">
                ${hero.price}
              </span>
              <span className="rounded-lg bg-ocean/10 px-3 py-1.5 text-xs font-semibold text-ocean transition-colors group-hover:bg-ocean group-hover:text-white">
                View Product
              </span>
            </div>
          </div>
        </Link>

        {/* Rest — compact grid */}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {rest.map((product, i) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group rounded-xl border border-border bg-surface p-2.5 transition-all duration-300 hover:border-ocean/20 hover:shadow-lg"
              data-sr={String((i + 1) * 50)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-2.5 px-0.5">
                <span className="text-[10px] font-medium uppercase tracking-wider text-sand-dark">
                  {product.category}
                </span>
                <h3 className="mt-0.5 text-[13px] font-bold leading-snug text-charcoal group-hover:text-ocean transition-colors">
                  {product.name}
                </h3>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-sm font-bold text-charcoal">
                    ${product.price}
                  </span>
                  <span className="text-[10px] font-semibold text-ocean md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                    View &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ocean"
          >
            View all products
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
    </section>
  );
}
