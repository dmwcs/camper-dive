import { Suspense } from "react";
import { getProducts, getTutorials } from "@/lib/queries";
import { HeroSection } from "./_components/HeroSection";
import { ProductsSection } from "./_components/ProductsSection";
import { ProductsSectionSkeleton } from "./_components/ProductsSectionSkeleton";
import { WhyHandSpears } from "./_components/WhyHandSpears";
import { TutorialShowcase } from "./_components/TutorialShowcase";
import { TutorialShowcaseSkeleton } from "./_components/TutorialShowcaseSkeleton";
import { LifestyleSection } from "./_components/LifestyleSection";
import { FinalCTA } from "@/components/FinalCTA";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

async function ProductsSectionAsync() {
  const products = await getProducts();
  return <ProductsSection products={products} />;
}

async function TutorialShowcaseAsync() {
  const tutorials = await getTutorials();
  return <TutorialShowcase tutorials={tutorials} />;
}

export default function Home() {
  return (
    <div className="bg-background">
      <HeroSection />
      <Suspense fallback={<ProductsSectionSkeleton />}>
        <ProductsSectionAsync />
      </Suspense>
      <WhyHandSpears />
      <Suspense fallback={<TutorialShowcaseSkeleton />}>
        <TutorialShowcaseAsync />
      </Suspense>
      <LifestyleSection />
      <FinalCTA />
    </div>
  );
}
