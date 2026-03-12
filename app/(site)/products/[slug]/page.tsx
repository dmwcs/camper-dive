import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getProducts, getProductBySlug } from "@/lib/queries";
import { ProductCard } from "@/app/(site)/products/_components/ProductCard";
import { ProductActions } from "@/app/(site)/products/_components/ProductActions";
import { ProductGallery } from "@/app/(site)/products/_components/ProductGallery";

const descriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-3 text-sm leading-[1.8] text-slate first:mt-0 sm:text-[15px]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h3 className="mt-6 mb-2 font-heading text-base font-bold text-charcoal first:mt-0 sm:text-lg">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-5 mb-2 font-heading text-sm font-bold text-charcoal first:mt-0 sm:text-base">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-3 border-ocean/30 pl-4 text-sm italic leading-[1.8] text-slate">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-3 space-y-1.5 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-3 space-y-1.5 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc text-sm leading-[1.8] text-slate marker:text-ocean/40 sm:text-[15px]">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="list-decimal text-sm leading-[1.8] text-slate marker:text-ocean/40 sm:text-[15px]">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-ocean underline decoration-ocean/30 underline-offset-2 transition-colors hover:text-ocean-light"
      >
        {children}
      </a>
    ),
  },
};

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
    description: product.shortDesc,
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

  const hasDescription = product.description && product.description.length > 0;
  const hasSpecs = product.specs && product.specs.length > 0;
  const hasFeatures = product.features && product.features.length > 0;
  const hasDetailSection = hasDescription || hasSpecs || hasFeatures;

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 pt-6 text-[13px] text-slate-light sm:pt-8">
          <Link href="/" className="transition-colors hover:text-ocean">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="transition-colors hover:text-ocean">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate">{product.name}</span>
        </nav>
      </div>

      {/* ── Main Product Section ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 py-6 sm:py-10 lg:grid-cols-12 lg:gap-12">
          {/* Gallery — takes 7 of 12 columns on large screens */}
          <div className="lg:col-span-7">
            <ProductGallery
              media={product.media ?? [{ type: "image", src: product.image }]}
              productName={product.name}
            />
          </div>

          {/* Purchase Panel — sticky on scroll, 5 of 12 columns */}
          <div className="lg:col-span-5">
            <div>
              {/* Category badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-full bg-ocean/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ocean">
                  {product.category}
                </span>
                {product.mostPopular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-coral/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Most Popular
                  </span>
                )}
              </div>

              {/* Product name */}
              <h1 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-charcoal sm:text-3xl">
                {product.name}
              </h1>

              {/* Short description */}
              <p className="mt-2 text-sm leading-relaxed text-slate sm:text-[15px]">
                {product.shortDesc}
              </p>

              {/* Divider */}
              <div className="mt-5 border-t border-border" />

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

              {/* Trust signals */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-1.5 rounded-lg bg-background px-2 py-3 text-center">
                  <svg className="h-5 w-5 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V11.25m17.25 0V6.375c0-.621-.504-1.125-1.125-1.125H4.125C3.504 5.25 3 5.754 3 6.375v4.875" />
                  </svg>
                  <span className="text-[11px] font-medium text-slate">Free ship $150+</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-lg bg-background px-2 py-3 text-center">
                  <svg className="h-5 w-5 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <span className="text-[11px] font-medium text-slate">Secure checkout</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-lg bg-background px-2 py-3 text-center">
                  <svg className="h-5 w-5 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                  </svg>
                  <span className="text-[11px] font-medium text-slate">30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Description / Specs / Features — stacked ── */}
      {hasDetailSection && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
            {/* Description — full width */}
            {hasDescription && (
              <div>
                <h2 className="font-heading text-lg font-bold text-charcoal sm:text-xl">
                  Description
                </h2>
                <div className="mt-4">
                  <PortableText value={product.description!} components={descriptionComponents} />
                </div>
              </div>
            )}

            {/* Specs & Features — side by side on desktop */}
            {(hasSpecs || hasFeatures) && (
              <div className={`grid gap-8 lg:gap-12 ${hasDescription ? "mt-10 border-t border-border pt-10 sm:mt-12 sm:pt-12" : ""} ${hasSpecs && hasFeatures ? "lg:grid-cols-2" : ""}`}>
                {hasSpecs && (
                  <div>
                    <h2 className="font-heading text-lg font-bold text-charcoal sm:text-xl">
                      Specifications
                    </h2>
                    <dl className="mt-4 divide-y divide-border">
                      {product.specs!.map((spec) => (
                        <div key={spec.label} className="flex items-center justify-between py-3 text-sm">
                          <dt className="text-slate">{spec.label}</dt>
                          <dd className="font-medium text-charcoal">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
                {hasFeatures && (
                  <div>
                    <h2 className="font-heading text-lg font-bold text-charcoal sm:text-xl">
                      Features
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {product.features!.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-slate">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean/10">
                            <svg className="h-3 w-3 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Related ── */}
      <section className="border-t border-border bg-surface py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-xl font-bold text-charcoal">
            You might also like
          </h2>
          <div className="mt-5 grid gap-4 grid-cols-2 sm:mt-6 sm:grid-cols-3 sm:gap-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} size="sm" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
