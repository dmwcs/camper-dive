import { Navbar } from "@/components/layout/Navbar";
import { TrustBar } from "@/components/layout/TrustBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CartProvider } from "@/lib/cart-context";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <ScrollReveal />
      <Navbar />
      {/* Mobile/tablet — below navbar, scrolls away naturally */}
      <div className="lg:hidden">
        <TrustBar />
      </div>
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
