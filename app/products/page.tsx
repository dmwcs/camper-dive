import { featuredProducts } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";

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
        backgroundImage="/images/spearfishing-reef.jpg"
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
              <ProductCard key={product.slug} product={product} size="md" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
