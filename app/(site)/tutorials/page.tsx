import { TutorialsContent } from "./TutorialsContent";
import { getTutorials, getTutorialCategories } from "@/lib/queries";

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
