import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";

const categories = ["All", "Spearguns", "Accessories", "Diving Gear"];

export const metadata = {
  title: "Products — CamperDive",
  description:
    "Handheld spearguns and spearfishing gear built for Australian waters. Shop the Reef Hunter range.",
};

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <PageHeader
        tagline="Our Gear"
        title="Products"
        description="Handheld spearguns and accessories designed for Australian reef conditions. Compact, powerful, and built to travel."
      />

      {/* Category Filter */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === "All"
                    ? "bg-ocean text-white"
                    : "text-charcoal/60 hover:bg-background hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-background">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sand-dark">
                    {product.category}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-bold text-charcoal">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate">
                    {product.shortDesc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-charcoal">
                      ${product.price}
                    </span>
                    <span className="text-sm font-medium text-ocean group-hover:underline">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
