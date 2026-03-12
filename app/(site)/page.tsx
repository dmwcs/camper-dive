import { getProducts, getTutorials } from "@/lib/queries";
import { HeroSection } from "./_components/HeroSection";
import { ProductsSection } from "./_components/ProductsSection";
import { WhyHandSpears } from "./_components/WhyHandSpears";
import { TutorialShowcase } from "./_components/TutorialShowcase";
import { LifestyleSection } from "./_components/LifestyleSection";
import { FinalCTA } from "./_components/FinalCTA";

// TODO: 上线前改成 3600（1小时），配合 Sanity webhook 做按需刷新
export const revalidate = 0;

const trustBadges = [
  {
    label: "Free Shipping Australia-wide",
    icon: (
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: "Lifetime Warranty",
    icon: (
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: "Free Tutorials",
    icon: (
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

export default async function Home() {
  const [products, tutorials] = await Promise.all([
    getProducts(),
    getTutorials(),
  ]);

  return (
    <div className="bg-background">
      {/* Top Announcement / Trust Bar (Home Page Only) */}
      <div className="hidden bg-ocean py-2 text-center text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-6 text-[11px] font-semibold uppercase tracking-widest sm:text-xs">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              <span className="text-sand">{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      <HeroSection />
      <ProductsSection products={products} />
      <WhyHandSpears />
      <TutorialShowcase tutorials={tutorials} />
      <LifestyleSection />
      <FinalCTA />
    </div>
  );
}
