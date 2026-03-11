import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getProductBySlug } from "@/lib/queries";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductActions } from "@/components/products/ProductActions";
import { ProductGallery } from "@/components/products/ProductGallery";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDesc,
    image: `https://camperdive.com${product.image}`,
    offers:
      product.variants && product.variants.length > 0
        ? {
            "@type": "AggregateOffer",
            lowPrice: Math.min(...product.variants.map((v) => v.price)),
            highPrice: Math.max(...product.variants.map((v) => v.price)),
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock",
            offerCount: product.variants.length,
            url: `https://camperdive.com/products/${product.slug}`,
          }
        : {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock",
            url: `https://camperdive.com/products/${product.slug}`,
          },
  };

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ── */}
        <header className="pt-8 pb-6 sm:pt-12 sm:pb-8" data-sr>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] text-slate-light">
            <Link
              href="/products"
              className="transition-colors hover:text-ocean"
            >
              Products
            </Link>
            <span className="text-slate-light">/</span>
            <span className="text-slate">{product.category}</span>
          </nav>

          {/* Category */}
          <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6">
            <span className="rounded-full bg-ocean/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ocean">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-tight text-charcoal sm:mt-5 sm:text-[2.25rem] lg:text-[2.75rem]">
            {product.name}
          </h1>

          {/* Description — hidden on mobile, shown below gallery instead */}
          <p className="mt-3 text-base leading-relaxed text-slate sm:mt-4 sm:text-lg">
            {product.description || product.shortDesc}
          </p>
        </header>

        {/* ── Product Layout ── */}
        <div className="grid gap-6 pb-8 sm:gap-10 sm:pb-12 md:grid-cols-2" data-sr="50">
          {/* Gallery */}
          <ProductGallery
            media={product.media ?? [{ type: "image", src: product.image }]}
            productName={product.name}
          />

          {/* Details */}
          <div className="flex flex-col justify-center">
            {/* Price + Options + Quantity + Add to Cart */}
            <ProductActions
              slug={product.slug}
              name={product.name}
              price={product.price}
              stripePriceId={product.stripePriceId}
              image={product.image}
              options={product.options}
              variants={product.variants}
            />

            {/* Specs */}
            {product.specs && (
              <div className="mt-6 border-t border-border pt-5 sm:mt-8 sm:pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                  Specifications
                </h2>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:mt-4 sm:gap-x-6 sm:gap-y-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="text-[11px] text-slate sm:text-xs">{spec.label}</dt>
                      <dd className="mt-0.5 text-[13px] font-medium text-charcoal sm:text-sm">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div className="mt-6 border-t border-border pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                  Key Features
                </h2>
                <ul className="mt-3 space-y-2">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-sand-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Related ── */}
      <section className="border-t border-border bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-light" data-sr>
            Keep browsing
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-charcoal">
            You might also like
          </h2>
          <div className="mt-5 grid gap-4 grid-cols-2 sm:mt-6 sm:grid-cols-3 sm:gap-5" data-sr="100">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} size="sm" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
