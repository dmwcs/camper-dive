import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/app/(site)/products/_components/ProductCard";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import type { Product } from "@/lib/types";

export function ProductsSection({ products }: { products: Product[] }) {
  const marked = products.filter((p) => p.mostPopular);
  const popularProducts = marked.length > 0 ? marked : products.slice(0, 2);
  const popularSlugs = new Set(popularProducts.map((p) => p.slug));
  const featuredProducts = products.filter((p) => !popularSlugs.has(p.slug)).slice(0, 10);

  return (
    <section className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div data-sr>
          <div className="mb-3 h-[3px] w-12 rounded-full bg-ocean" />
          <h2 className="font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl md:text-4xl">
            Top Picks
          </h2>
          <p className="mt-2 max-w-md text-[13px] text-slate sm:text-sm">
            Compact hand spears designed for Australian reef conditions.
          </p>
        </div>

        {/* Most Popular — carousel */}
        {popularProducts.length > 0 && (
          <div className="mt-6 sm:mt-8" data-sr>
            <ProductCarousel slideClass="basis-full" autoplay>
              {popularProducts.map((product) => (
                <div
                  key={product.slug}
                  className="overflow-hidden rounded-2xl bg-surface shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgb(0,0,0,0.06)]"
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
                      <h3 className="font-heading text-xl font-bold tracking-tight text-charcoal sm:text-2xl md:text-3xl lg:text-4xl">
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

        {/* More products */}
        {featuredProducts.length > 0 ? (
          <div className="mt-6 sm:mt-8" data-sr="50">
            <h3 className="mb-4 font-heading text-lg font-bold tracking-tight text-charcoal sm:text-xl">
              Explore More
            </h3>
            <ProductCarousel slideClass="basis-1/2 md:basis-1/3 lg:basis-1/4" arrowOffset={60}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} size="sm" />
              ))}
            </ProductCarousel>
          </div>
        ) : (
          <div
            className="mt-8 rounded-2xl bg-surface p-12 text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
            data-sr="50"
          >
            <p className="text-sm text-slate">
              Products coming soon. Check back later.
            </p>
          </div>
        )}

        <div className="mt-6 text-center sm:mt-8">
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
