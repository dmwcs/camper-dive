import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TutorialsContent } from "@/app/(site)/tutorials/_components/TutorialsContent";
import { TutorialsListSkeleton } from "@/app/(site)/tutorials/_components/TutorialsListSkeleton";
import { getTutorials, getTutorialCategories } from "@/lib/queries";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export const metadata = {
  title: "Tutorials & Guides",
  description:
    "Free spearfishing tutorials, abalone hunting guides, and lobster catching techniques by a certified freediving instructor.",
};

async function TutorialsList() {
  const [tutorials, categories] = await Promise.all([
    getTutorials(),
    getTutorialCategories(),
  ]);
  return <TutorialsContent tutorials={tutorials} categories={categories} />;
}

export default function TutorialsPage() {
  return (
    <div className="bg-background">
      <PageHeader
        tagline="Learn"
        title="Tutorials & Guides"
        description="From speargun basics to abalone hunting — free tutorials by a certified freediving instructor. Watch, read, and get in the water."
        backgroundImage="/images/spearfishing-action.jpg"
      />
      <Suspense fallback={<TutorialsListSkeleton />}>
        <TutorialsList />
      </Suspense>
    </div>
  );
}
