import { PageHeader } from "@/components/ui/PageHeader";
import { ProductsContent } from "./ProductsContent";

export const metadata = {
  title: "Products — CamperDive",
  description:
    "Handheld spearguns and spearfishing gear built for Australian waters. Shop the Reef Hunter range.",
};

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <PageHeader
        tagline="Our Gear"
        title="Products"
        description="Handheld spearguns and accessories designed for Australian reef conditions. Compact, powerful, and built to travel."
        backgroundImage="/images/spearfishing-reef.jpg"
      />
      <ProductsContent />
    </div>
  );
}
