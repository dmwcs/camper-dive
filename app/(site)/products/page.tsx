import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductsContent } from "@/components/products/ProductsContent";
import { ProductsListSkeleton } from "@/components/products/ProductsListSkeleton";
import { getProducts } from "@/lib/queries";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export const metadata = {
  title: "Products",
  description:
    "Handheld spearguns and spearfishing gear built for Australian waters. Shop the Reef Hunter range.",
};

async function ProductsList() {
  const products = await getProducts();
  return <ProductsContent products={products} />;
}

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <PageHeader
        tagline="Our Gear"
        title="Products"
        description="Handheld spearguns and accessories designed for Australian reef conditions. Compact, powerful, and built to travel."
        backgroundImage="/images/spearfishing-reef.jpg"
      />
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
