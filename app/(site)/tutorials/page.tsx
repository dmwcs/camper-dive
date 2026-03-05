import { TutorialsContent } from "./TutorialsContent";
import { getTutorials, getTutorialCategories } from "@/lib/queries";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export const metadata = {
  title: "Tutorials & Guides",
  description:
    "Free spearfishing tutorials, abalone hunting guides, and lobster catching techniques by a certified freediving instructor.",
};

export default async function TutorialsPage() {
  const [tutorials, categories] = await Promise.all([
    getTutorials(),
    getTutorialCategories(),
  ]);

  return <TutorialsContent tutorials={tutorials} categories={categories} />;
}
