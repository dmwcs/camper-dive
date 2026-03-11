import { Suspense } from "react";
import { Hero } from "@/app/(site)/_components/Hero";
import { FeaturedProducts } from "@/app/(site)/_components/FeaturedProducts";
import { Lifestyle } from "@/app/(site)/_components/Lifestyle";
import { ValueProps } from "@/app/(site)/_components/ValueProps";
import { TutorialPreview } from "@/app/(site)/_components/TutorialPreview";
import { OurStory } from "@/app/(site)/_components/OurStory";
import { FeaturedProductsSkeleton } from "@/app/(site)/_components/FeaturedProductsSkeleton";
import { TutorialPreviewSkeleton } from "@/app/(site)/_components/TutorialPreviewSkeleton";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Lifestyle />
      <ValueProps />
      <Suspense fallback={<TutorialPreviewSkeleton />}>
        <TutorialPreview />
      </Suspense>
      <OurStory />
    </>
  );
}
