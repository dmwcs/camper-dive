import { Navbar } from "@/components/layout/Navbar";
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
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
