import { getProducts, getTutorials } from "@/lib/queries";
import { HeroSection } from "./_components/HeroSection";
import { ProductsSection } from "./_components/ProductsSection";
import { WhyHandSpears } from "./_components/WhyHandSpears";
import { TutorialShowcase } from "./_components/TutorialShowcase";
import { LifestyleSection } from "./_components/LifestyleSection";
import { FinalCTA } from "./_components/FinalCTA";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

export default async function Home() {
  const [products, tutorials] = await Promise.all([
    getProducts(),
    getTutorials(),
  ]);

  return (
    <div className="bg-background">
      <HeroSection />
      <ProductsSection products={products} />
      <WhyHandSpears />
      <TutorialShowcase tutorials={tutorials} />
      <LifestyleSection />
      <FinalCTA />
    </div>
  );
}
