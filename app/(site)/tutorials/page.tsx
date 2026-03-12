import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TutorialsContent } from "@/app/(site)/tutorials/_components/TutorialsContent";
import { TutorialsListSkeleton } from "@/app/(site)/tutorials/_components/TutorialsListSkeleton";
import { getFilteredTutorials, getTutorialCategories } from "@/lib/queries";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export const metadata = {
  title: "Tutorials & Guides",
  description:
    "Free spearfishing tutorials, abalone hunting guides, and lobster catching techniques by a certified freediving instructor.",
};

const PAGE_SIZE = 8;

async function TutorialsList({
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
    getFilteredTutorials({ category, search, sort, limit }),
    getTutorialCategories(),
  ]);
  return (
    <TutorialsContent
      tutorials={items}
      total={total}
      categories={categories}
    />
  );
}

export default async function TutorialsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const category = (params.category as string) || "";
  const search = (params.q as string) || "";
  const sort = (params.sort as string) || "featured";
  const limit = Math.min(
    parseInt((params.limit as string) || String(PAGE_SIZE), 10) || PAGE_SIZE,
    200
  );

  return (
    <div className="bg-background">
      <PageHeader
        title="Tutorials & Guides"
        description="From speargun basics to abalone hunting — free tutorials by a certified freediving instructor. Watch, read, and get in the water."
        backgroundImage="/images/spearfishing-action.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tutorials" },
        ]}
      />
      <Suspense fallback={<TutorialsListSkeleton />}>
        <TutorialsList
          category={category}
          search={search}
          sort={sort}
          limit={limit}
        />
      </Suspense>
    </div>
  );
}
