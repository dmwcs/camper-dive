import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/app/(site)/products/_components/ProductCard";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import type { Product } from "@/lib/types";

export function ProductsSection({ products }: { products: Product[] }) {
  const popularProducts = products.slice(0, 3);
  const featuredProducts = products.slice(3, 7);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between" data-sr>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-dark">
              The Range
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
              Hand Spears & Gear
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden cursor-pointer text-sm font-medium text-ocean transition-colors duration-200 hover:text-ocean-light sm:block"
          >
            View all &rarr;
          </Link>
        </div>

        {/* Most Popular — carousel */}
        {popularProducts.length > 0 && (
          <div className="mt-8" data-sr>
            <ProductCarousel slideClass="basis-full">
              {popularProducts.map((product) => (
                <div
                  key={product.slug}
                  className="overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-square bg-background lg:aspect-auto lg:min-h-[420px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                        <span className="rounded-lg bg-coral px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                          Most Popular
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-sand-dark sm:text-xs">
                        {product.category}
                      </p>
                      <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl lg:text-4xl">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
                        {product.shortDesc}
                      </p>

                      {product.features && product.features.length > 0 && (
                        <div className="mt-5 space-y-2 sm:mt-6">
                          {product.features.slice(0, 4).map((f) => (
                            <div
                              key={f}
                              className="flex items-center gap-2.5"
                            >
                              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                                <svg
                                  width="8"
                                  height="8"
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
                              <span className="text-xs text-slate sm:text-sm">
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                        <span className="text-2xl font-bold text-charcoal sm:text-3xl">
                          {product.variants && product.variants.length > 0
                            ? "From "
                            : ""}
                          ${product.price}
                        </span>
                        <Link
                          href={`/products/${product.slug}`}
                          className="cursor-pointer rounded-lg bg-ocean px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ocean-light sm:text-base"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ProductCarousel>
          </div>
        )}

        {/* More products carousel */}
        {featuredProducts.length > 0 ? (
          <div className="mt-10" data-sr="50">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate">
              More to Explore
            </p>
            <ProductCarousel slideClass="basis-1/2 lg:basis-1/4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </ProductCarousel>
          </div>
        ) : (
          <div
            className="mt-8 rounded-2xl border border-border bg-surface p-12 text-center"
            data-sr="50"
          >
            <p className="text-sm text-slate">
              Products coming soon. Check back later.
            </p>
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/products"
            className="cursor-pointer text-sm font-medium text-ocean transition-colors duration-200 hover:text-ocean-light"
          >
            View all products &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
