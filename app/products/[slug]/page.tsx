import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProducts } from "@/lib/mock-data";

export function generateStaticParams() {
  return featuredProducts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = featuredProducts.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found — CamperDive" };
  return {
    title: `${product.name} — CamperDive`,
    description: product.shortDesc,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = featuredProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = featuredProducts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ── */}
        <header className="pt-12 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] text-slate-light">
            <Link
              href="/products"
              className="transition-colors hover:text-ocean"
            >
              Products
            </Link>
            <span className="text-border">/</span>
            <span className="text-slate">{product.category}</span>
          </nav>

          {/* Category */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-ocean/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ocean">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-5 font-heading text-[2.25rem] font-bold leading-[1.15] tracking-tight text-charcoal lg:text-[2.75rem]">
            {product.name}
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg leading-relaxed text-slate">
            {product.description || product.shortDesc}
          </p>
        </header>

        {/* ── Product Layout ── */}
        <div className="grid gap-10 pb-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {/* Price */}
            <div className="text-3xl font-bold text-charcoal">
              ${product.price}
            </div>

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              <button className="rounded-lg bg-ocean px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-light">
                Add to Cart
              </button>
              <button className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-background">
                Save for Later
              </button>
            </div>

            {/* Specs */}
            {product.specs && (
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                  Specifications
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="text-xs text-slate">{spec.label}</dt>
                      <dd className="mt-0.5 text-sm font-medium text-charcoal">
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
                <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                  Key Features
                </h3>
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
      <section className="border-t border-border bg-background py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-light">
            Keep browsing
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-charcoal">
            You might also like
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-dark">
                    {p.category}
                  </span>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug text-charcoal group-hover:text-ocean">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-ocean">
                    ${p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
