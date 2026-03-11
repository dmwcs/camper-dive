import { PageHeader } from "@/components/ui/PageHeader";
import { ProductsContent } from "@/components/products/ProductsContent";
import { getProducts } from "@/lib/queries";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export const metadata = {
  title: "Products",
  description:
    "Handheld spearguns and spearfishing gear built for Australian waters. Shop the Reef Hunter range.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-background">
      <PageHeader
        tagline="Our Gear"
        title="Products"
        description="Handheld spearguns and accessories designed for Australian reef conditions. Compact, powerful, and built to travel."
        backgroundImage="/images/spearfishing-reef.jpg"
      />
      <ProductsContent products={products} />
    </div>
  );
}
