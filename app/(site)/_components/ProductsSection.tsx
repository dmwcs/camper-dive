import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/app/(site)/products/_components/ProductCard";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import type { Product } from "@/lib/types";

export function ProductsSection({ products }: { products: Product[] }) {
  const popularProducts = products.slice(0, 3);
  const featuredProducts = products.slice(3, 7);

  return (
    <section className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between" data-sr>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-dark">
              The Range
            </p>
            <h2 className="mt-1 font-heading text-xl font-bold tracking-tight text-charcoal sm:text-2xl md:text-3xl">
              Hand Spears & Gear
            </h2>
          </div>
          <Link
            href="/products"
            className="cursor-pointer text-xs font-medium text-ocean transition-colors duration-200 hover:text-ocean-light sm:text-sm"
          >
            View all &rarr;
          </Link>
        </div>

        {/* Most Popular — carousel */}
        {popularProducts.length > 0 && (
          <div className="mt-8 sm:mt-10" data-sr>
            <ProductCarousel slideClass="basis-full">
              {popularProducts.map((product) => (
                <div
                  key={product.slug}
                  className="overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-[16/9] bg-background sm:aspect-[4/3] md:aspect-auto md:min-h-[360px] lg:min-h-[420px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                        <span className="rounded-lg bg-coral px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                          Most Popular
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-12">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-sand-dark sm:text-xs">
                        {product.category}
                      </p>
                      <h3 className="mt-1.5 font-heading text-xl font-bold tracking-tight text-charcoal sm:text-2xl md:text-3xl lg:text-4xl">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate sm:mt-3 sm:text-sm md:text-base">
                        {product.shortDesc}
                      </p>

                      {product.features && product.features.length > 0 && (
                        <div className="mt-4 hidden space-y-1.5 sm:mt-5 sm:block sm:space-y-2 md:mt-6">
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

                      <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4 md:mt-8">
                        <span className="text-xl font-bold text-charcoal sm:text-2xl md:text-3xl">
                          {product.variants && product.variants.length > 0
                            ? "From "
                            : ""}
                          ${product.price}
                        </span>
                        <Link
                          href={`/products/${product.slug}`}
                          className="cursor-pointer rounded-lg bg-ocean px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-ocean-light sm:px-6 sm:py-3 sm:text-sm md:text-base"
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

        {/* More products — compact grid, clearly subordinate */}
        {featuredProducts.length > 0 ? (
          <div className="mt-10 sm:mt-12 md:mt-14" data-sr="50">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate sm:mb-5">
              More to Explore
            </p>
            <ProductCarousel slideClass="basis-1/2 md:basis-1/3 lg:basis-1/4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} size="sm" />
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

      </div>
    </section>
  );
}
