import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Lifestyle } from "@/components/home/Lifestyle";
import { ValueProps } from "@/components/home/ValueProps";
import { TutorialPreview } from "@/components/home/TutorialPreview";
import { OurStory } from "@/components/home/OurStory";
import { FeaturedProductsSkeleton } from "@/components/home/FeaturedProductsSkeleton";
import { TutorialPreviewSkeleton } from "@/components/home/TutorialPreviewSkeleton";

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
