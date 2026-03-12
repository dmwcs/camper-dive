import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductsContent } from "@/app/(site)/products/_components/ProductsContent";
import { ProductsListSkeleton } from "@/app/(site)/products/_components/ProductsListSkeleton";
import { getFilteredProducts, getProductCategories } from "@/lib/queries";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export const metadata = {
  title: "Products",
  description:
    "Handheld spearguns and spearfishing gear built for Australian waters. Shop the Reef Hunter range.",
};

const PAGE_SIZE = 8;

async function ProductsList({
  category,
  search,
  sort,
  limit,
}: {
  category: string;
  search: string;
  sort: string;
  limit: number;
}) {
  const [{ items, total }, categories] = await Promise.all([
    getFilteredProducts({ category, search, sort, limit }),
    getProductCategories(),
  ]);
  return (
    <ProductsContent
      products={items}
      total={total}
      categories={categories}
    />
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const category = (params.category as string) || "";
  const search = (params.q as string) || "";
  const sort = (params.sort as string) || "popular";
  const limit = Math.min(
    parseInt((params.limit as string) || String(PAGE_SIZE), 10) || PAGE_SIZE,
    200
  );

  return (
    <div className="bg-background">
      <PageHeader
        tagline="Our Gear"
        title="Products"
        description="Handheld spearguns and accessories designed for Australian reef conditions. Compact, powerful, and built to travel."
        backgroundImage="/images/spearfishing-reef.jpg"
      />
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductsList
          category={category}
          search={search}
          sort={sort}
          limit={limit}
        />
      </Suspense>
    </div>
  );
}
