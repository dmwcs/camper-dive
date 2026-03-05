import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Lifestyle } from "@/components/home/Lifestyle";
import { ValueProps } from "@/components/home/ValueProps";
import { TutorialPreview } from "@/components/home/TutorialPreview";
import { OurStory } from "@/components/home/OurStory";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

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
