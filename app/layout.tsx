import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CamperDive — Handheld Spearguns for Australian Waters",
  description:
    "Premium handheld spearguns and spearfishing gear. Built for Aussie reefs. Expert tutorials on spearfishing, abalone hunting, and lobster catching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${dmSans.variable} ${bebasNeue.variable} antialiased`}>
        <CartProvider>
          <ScrollReveal />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
