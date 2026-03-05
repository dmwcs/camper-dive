import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Lifestyle } from "@/components/home/Lifestyle";
import { ValueProps } from "@/components/home/ValueProps";
import { TutorialPreview } from "@/components/home/TutorialPreview";
import { OurStory } from "@/components/home/OurStory";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Lifestyle />
      <ValueProps />
      <TutorialPreview />
      <OurStory />
    </>
  );
}
