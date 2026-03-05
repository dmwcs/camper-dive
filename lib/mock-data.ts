export const featuredProducts = [
  {
    name: "Reef Hunter 75",
    price: 189,
    category: "Spearguns",
    slug: "reef-hunter-75",
    shortDesc: "Compact hand speargun for reef diving. 75cm barrel.",
    image: "/images/product-speargun.jpg",
  },
  {
    name: "Reef Hunter 90",
    price: 219,
    category: "Spearguns",
    slug: "reef-hunter-90",
    shortDesc: "Mid-range hand speargun. Ideal for open reef hunting.",
    image: "/images/spearfishing-reef.jpg",
  },
  {
    name: "Reef Hunter 110",
    price: 259,
    category: "Spearguns",
    slug: "reef-hunter-110",
    shortDesc: "Full-length hand speargun for experienced divers.",
    image: "/images/spearfishing-deep.jpg",
  },
  {
    name: "Speargun Tip Set — 3 Pack",
    price: 49,
    category: "Accessories",
    slug: "speargun-tip-set",
    shortDesc: "Single barb, tri-tip, and paralyzer tips included.",
    image: "/images/product-mask.jpg",
  },
  {
    name: "Neoprene Catch Bag",
    price: 65,
    category: "Accessories",
    slug: "neoprene-catch-bag",
    shortDesc: "Heavy-duty catch bag with clip. Fits on your belt.",
    image: "/images/product-wetsuit.jpg",
  },
  {
    name: "Dive Knife — Reef Series",
    price: 79,
    category: "Diving Gear",
    slug: "dive-knife-reef",
    shortDesc: "Stainless steel blade with leg strap. Built for salt water.",
    image: "/images/product-knife.jpg",
  },
];

export const heroProduct = {
  name: "Reef Hunter Hand Speargun",
  tagline: "Precision. Power. Portability.",
  subtitle: "The ultimate handheld speargun for Australian reef and rock diving",
  price: 189,
  specs: [
    { label: "Barrel Length", value: "75 / 90 / 110 cm" },
    { label: "Material", value: "Marine-grade stainless steel" },
    { label: "Band Type", value: "Latex power band" },
    { label: "Effective Range", value: "2–4 metres" },
    { label: "Weight", value: "0.8 – 1.2 kg" },
    { label: "Warranty", value: "2 years" },
  ],
  benefits: [
    "Compact & travel-friendly",
    "Built for Australian reef species",
    "Corrosion-resistant stainless steel",
    "Perfect for beginners & experienced divers",
  ],
};

export const tutorialPreviews = [
  {
    title: "What is a Hand Speargun? And Why You Should Try One",
    category: "Hand Speargun",
    format: "Article + Video" as const,
    slug: "what-is-hand-speargun",
    readTime: "5 min read",
    description:
      "Everything you need to know about choosing and using your first hand speargun in Australian waters.",
    image: "/images/product-speargun.jpg",
  },
  {
    title: "Abalone Hunting: A Beginner's Guide to Australian Waters",
    category: "Abalone Hunting",
    format: "Video" as const,
    slug: "abalone-hunting-beginners",
    readTime: "8 min watch",
    description:
      "Learn habitat identification, sizing regulations, and sustainable harvesting techniques.",
    image: "/images/tutorial-abalone.jpg",
  },
  {
    title: "Rock Lobster Catching Techniques in Australia",
    category: "Lobster Catching",
    format: "Video" as const,
    slug: "rock-lobster-techniques",
    readTime: "12 min watch",
    description:
      "Master the art of spotting, catching, and legally harvesting rock lobster along the Aussie coast.",
    image: "/images/coral-reef.jpg",
  },
  {
    title: "Freediving Breathing: Essential Techniques for Spearos",
    category: "Freediving",
    format: "Article" as const,
    slug: "freediving-breathing-techniques",
    readTime: "6 min read",
    description:
      "Breathing exercises and mental preparation to extend your bottom time safely.",
    image: "/images/course-freediving.jpg",
  },
];

export const testimonials = [
  {
    name: "Jake M.",
    location: "Gold Coast, QLD",
    quote:
      "First time using a hand speargun and I'm hooked. Took it out on the reef last weekend and landed three flathead. Way more fun than a rubber band gun.",
    rating: 5,
  },
  {
    name: "Sarah L.",
    location: "Perth, WA",
    quote:
      "The Reef Hunter 90 is exactly what I needed. Compact enough to travel with, powerful enough for reef fish. The tutorials helped me get started fast.",
    rating: 5,
  },
  {
    name: "Tom R.",
    location: "Sydney, NSW",
    quote:
      "Great quality gear and the video tutorials are brilliant. Learned proper speargun technique in a weekend. Highly recommend for anyone getting into spearfishing.",
    rating: 5,
  },
];
