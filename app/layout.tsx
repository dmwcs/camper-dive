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

const siteUrl = "https://camperdive.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CamperDive — Handheld Spearguns for Australian Waters",
    template: "%s — CamperDive",
  },
  description:
    "Premium handheld spearguns and spearfishing gear. Built for Aussie reefs. Expert tutorials on spearfishing, abalone hunting, and lobster catching.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "CamperDive",
    title: "CamperDive — Handheld Spearguns for Australian Waters",
    description:
      "Premium handheld spearguns and spearfishing gear built for Australian waters.",
    url: siteUrl,
    images: [{ url: "/images/hero-ocean.jpg", width: 1200, height: 630, alt: "CamperDive — Spearfishing Gear" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CamperDive — Handheld Spearguns for Australian Waters",
    description:
      "Premium handheld spearguns and spearfishing gear built for Australian waters.",
    images: ["/images/hero-ocean.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
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
