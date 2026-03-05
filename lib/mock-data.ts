/* ───────────────────────────── Products ───────────────────────────── */

export interface Product {
  name: string;
  price: number;
  category: string;
  slug: string;
  shortDesc: string;
  image: string;
  gallery?: string[];
  description?: string;
  specs?: { label: string; value: string }[];
  features?: string[];
}

export const featuredProducts: Product[] = [
  {
    name: "Reef Hunter 75",
    price: 189,
    category: "Spearguns",
    slug: "reef-hunter-75",
    shortDesc: "Compact hand speargun for reef diving. 75cm barrel.",
    image: "/images/product-speargun.jpg",
    description:
      "The Reef Hunter 75 is our most compact hand speargun — purpose-built for tight reef systems, rock ledges, and shallow water hunting. At just 75cm, it's the perfect travel companion for spearos who camp by the coast and dive wherever they roam.",
    specs: [
      { label: "Barrel Length", value: "75 cm" },
      { label: "Material", value: "Marine-grade stainless steel" },
      { label: "Band Type", value: "Latex power band" },
      { label: "Effective Range", value: "2–3 metres" },
      { label: "Weight", value: "0.8 kg" },
      { label: "Warranty", value: "2 years" },
    ],
    features: [
      "Compact enough to fit in a backpack",
      "Ideal for reef species — flathead, bream, snapper",
      "Corrosion-resistant for salt water",
      "Beginner-friendly with easy band loading",
    ],
  },
  {
    name: "Reef Hunter 90",
    price: 219,
    category: "Spearguns",
    slug: "reef-hunter-90",
    shortDesc: "Mid-range hand speargun. Ideal for open reef hunting.",
    image: "/images/spearfishing-reef.jpg",
    description:
      "The Reef Hunter 90 is the all-rounder. Longer reach than the 75 with the same portability — perfect for open reef edges and kelp beds where fish keep their distance. Our most popular model.",
    specs: [
      { label: "Barrel Length", value: "90 cm" },
      { label: "Material", value: "Marine-grade stainless steel" },
      { label: "Band Type", value: "Latex power band" },
      { label: "Effective Range", value: "2.5–3.5 metres" },
      { label: "Weight", value: "1.0 kg" },
      { label: "Warranty", value: "2 years" },
    ],
    features: [
      "Best balance of reach and manoeuvrability",
      "Great for reef edges and kelp beds",
      "Strong enough for larger reef fish",
      "Our most popular model",
    ],
  },
  {
    name: "Reef Hunter 110",
    price: 259,
    category: "Spearguns",
    slug: "reef-hunter-110",
    shortDesc: "Full-length hand speargun for experienced divers.",
    image: "/images/spearfishing-deep.jpg",
    description:
      "The Reef Hunter 110 is our longest hand speargun — built for experienced divers who want maximum range in deeper water. When you need to reach further, this is the tool for the job.",
    specs: [
      { label: "Barrel Length", value: "110 cm" },
      { label: "Material", value: "Marine-grade stainless steel" },
      { label: "Band Type", value: "Dual latex power band" },
      { label: "Effective Range", value: "3–4 metres" },
      { label: "Weight", value: "1.2 kg" },
      { label: "Warranty", value: "2 years" },
    ],
    features: [
      "Maximum range for deeper water",
      "Dual band for extra power",
      "Built for experienced spearos",
      "Ideal for larger species — kingfish, trevally",
    ],
  },
  {
    name: "Speargun Tip Set — 3 Pack",
    price: 49,
    category: "Accessories",
    slug: "speargun-tip-set",
    shortDesc: "Single barb, tri-tip, and paralyzer tips included.",
    image: "/images/product-mask.jpg",
    description:
      "Three tips for every situation. The single barb is your everyday reef tip. The tri-tip holds firm on flathead and flounder. The paralyzer stuns without damage — perfect for smaller fish you want to keep whole.",
    specs: [
      { label: "Included Tips", value: "Single barb, Tri-tip, Paralyzer" },
      { label: "Material", value: "Hardened stainless steel" },
      { label: "Compatible With", value: "All Reef Hunter models" },
      { label: "Thread", value: "M6 universal" },
    ],
    features: [
      "Three tips for different hunting situations",
      "Hardened stainless steel construction",
      "Universal M6 thread fits all Reef Hunter spearguns",
      "Comes in a neoprene roll-up pouch",
    ],
  },
  {
    name: "Neoprene Catch Bag",
    price: 65,
    category: "Accessories",
    slug: "neoprene-catch-bag",
    shortDesc: "Heavy-duty catch bag with clip. Fits on your belt.",
    image: "/images/product-wetsuit.jpg",
    description:
      "Keep your catch secure while you keep diving. Our neoprene catch bag clips onto any weight belt, drains water instantly, and holds enough for a solid session on the reef.",
    specs: [
      { label: "Material", value: "5mm neoprene" },
      { label: "Capacity", value: "15 litres" },
      { label: "Closure", value: "Drawstring + clip" },
      { label: "Attachment", value: "Stainless steel D-ring" },
    ],
    features: [
      "Clips to any weight belt or BCD",
      "Quick-drain mesh bottom",
      "Holds enough for a full session",
      "Won't attract sharks like mesh bags",
    ],
  },
  {
    name: "Dive Knife — Reef Series",
    price: 79,
    category: "Diving Gear",
    slug: "dive-knife-reef",
    shortDesc: "Stainless steel blade with leg strap. Built for salt water.",
    image: "/images/product-knife.jpg",
    description:
      "A proper dive knife built for Australian conditions. 420-grade stainless steel blade with a serrated edge for cutting line and kelp. Comes with a quick-release leg strap and sheath.",
    specs: [
      { label: "Blade Length", value: "11 cm" },
      { label: "Blade Material", value: "420 stainless steel" },
      { label: "Edge", value: "Combo — straight + serrated" },
      { label: "Sheath", value: "Thermoplastic with leg strap" },
    ],
    features: [
      "420 stainless steel — won't rust in salt water",
      "Serrated edge for cutting line and kelp",
      "Quick-release leg strap sheath",
      "Line cutter notch on the spine",
    ],
  },
];

export const heroProduct = {
  name: "Reef Hunter Hand Speargun",
  tagline: "Precision. Power. Portability.",
  subtitle:
    "The ultimate handheld speargun for Australian reef and rock diving",
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

/* ───────────────────────────── Tutorials ───────────────────────────── */

export interface Tutorial {
  title: string;
  category: string;
  format: "Article" | "Video" | "Article + Video";
  slug: string;
  readTime: string;
  lastEdited: string;
  description: string;
  image: string;
  content?: string;
}

export const tutorialCategories = [
  { slug: "hand-speargun", label: "Hand Speargun", count: 3 },
  { slug: "abalone-hunting", label: "Abalone Hunting", count: 2 },
  { slug: "lobster-catching", label: "Lobster Catching", count: 2 },
  { slug: "freediving", label: "Freediving", count: 2 },
  { slug: "safety", label: "Safety & Regulations", count: 2 },
];

export const tutorialPreviews: Tutorial[] = [
  // ── Hand Speargun (3) ──────────────────────────────────────────────
  {
    title: "What is a Hand Speargun? And Why You Should Try One",
    category: "Hand Speargun",
    format: "Article + Video",
    slug: "what-is-hand-speargun",
    readTime: "5 min read",
    lastEdited: "Feb 28, 2026",
    description:
      "Everything you need to know about choosing and using your first hand speargun in Australian waters.",
    image: "/images/product-speargun.jpg",
    content: `A hand speargun (also called a pole spear or Hawaiian sling) is the simplest form of underwater hunting tool. Unlike rubber-powered spearguns with trigger mechanisms, a hand speargun relies on your arm and a latex band to propel the shaft forward.

**Why choose a hand speargun?**

Hand spearguns are lighter, more portable, and far easier to maintain than mechanical spearguns. They pack down small enough to fit in a backpack — perfect for camping trips where you want to dive for dinner without hauling bulky gear.

**Who is it for?**

Whether you're a beginner looking for an affordable entry into spearfishing, or an experienced diver who appreciates the simplicity and sport of hand-powered hunting, there's a Reef Hunter model for you.

**How to choose the right size**

- **75cm** — Best for tight reef, rock ledges, and beginners. Easy to handle in confined spaces.
- **90cm** — The all-rounder. Enough reach for open reef edges while staying manoeuvrable.
- **110cm** — Maximum range for deeper water and larger species. Best for experienced divers.

**Getting started**

1. Choose your Reef Hunter size
2. Practice loading the band on dry land
3. Start in shallow, calm water
4. Focus on slow, quiet approaches
5. Aim behind the gill plate for a clean shot`,
  },
  {
    title: "Hand Speargun Maintenance: Keep Your Gear in Top Shape",
    category: "Hand Speargun",
    format: "Article",
    slug: "hand-speargun-maintenance",
    readTime: "4 min read",
    lastEdited: "Feb 20, 2026",
    description:
      "Simple maintenance tips to extend the life of your hand speargun — rinse routine, band care, and storage.",
    image: "/images/product-speargun.jpg",
    content: `Your hand speargun is a simple tool, but a little care goes a long way. Proper maintenance keeps it performing and prevents rust and band degradation.

**After every dive**

1. Rinse the entire speargun in fresh water — barrel, shaft, and band
2. Remove the shaft and dry separately
3. Check the tip for bends or damage
4. Hang to dry in shade — never in direct sun

**Band care**

Latex bands degrade with UV exposure and salt. To maximise band life:
- Rinse with fresh water after each session
- Store out of sunlight
- Apply a thin coat of silicone lubricant every few weeks
- Replace bands every 6–12 months depending on use

**Shaft and tip**

- Check the shaft for straightness by rolling it on a flat surface
- Sharpen tips with a fine diamond file
- Replace bent or damaged tips immediately — a dull tip means lost fish

**Storage**

Store your speargun disassembled in a cool, dry place. A padded bag protects it during transport and prevents tip damage to other gear.`,
  },
  {
    title: "5 Common Hand Speargun Mistakes (And How to Fix Them)",
    category: "Hand Speargun",
    format: "Video",
    slug: "hand-speargun-mistakes",
    readTime: "7 min watch",
    lastEdited: "Feb 15, 2026",
    description:
      "Avoid these beginner mistakes that cost you fish — from loading technique to shot placement.",
    image: "/images/spearfishing-reef.jpg",
    content: `Every spearo makes these mistakes early on. Here's how to fix them fast.

**Mistake 1: Loading the band too far back**

Loading the band to the very end of the shaft gives maximum power but kills accuracy. Start with a shorter pull (3/4 of the shaft) and focus on accuracy first. Power comes later.

**Mistake 2: Approaching fish too fast**

Fish sense vibration before they see you. A fast, aggressive approach triggers their flight response from metres away. Slow down, control your fins, and let the fish come to you.

**Mistake 3: Aiming at the middle of the fish**

The kill zone is behind the gill plate, not the centre of the body. A gut shot means a lost fish. Practice visualising the gill plate target on every approach.

**Mistake 4: Diving with a loaded speargun**

Never load your speargun at the surface. Load only when you're at depth and have a target in sight. A loaded speargun on the surface is dangerous to you and your dive buddy.

**Mistake 5: Neglecting your bands**

Old, UV-damaged bands lose 50% of their power. If your band feels soft or has white spots, replace it. Fresh bands make an immediate difference to range and accuracy.`,
  },

  // ── Abalone Hunting (2) ────────────────────────────────────────────
  {
    title: "Abalone Hunting: A Beginner's Guide to Australian Waters",
    category: "Abalone Hunting",
    format: "Video",
    slug: "abalone-hunting-beginners",
    readTime: "8 min watch",
    lastEdited: "Feb 10, 2026",
    description:
      "Learn habitat identification, sizing regulations, and sustainable harvesting techniques.",
    image: "/images/tutorial-abalone.jpg",
    content: `Abalone (or "abs") are one of Australia's most prized catches. Found clinging to rocks in shallow reef systems, they're delicious, sustainable, and a rite of passage for any Australian diver.

**Where to find abalone**

Abalone live on rocky reef in 1–10 metres of water. Look for them on the underside of ledges, in crevices, and on kelp-covered rocks. They prefer areas with good water flow.

**Legal requirements**

Each Australian state has different regulations for abalone:
- **Victoria** — Bag limit of 5 per person, minimum size 120mm
- **NSW** — Bag limit of 2 per person (blacklip), minimum size 117mm
- **Tasmania** — Bag limit of 10 per person, minimum size varies by species
- **SA / WA** — Check local regulations

Always carry a measuring gauge and your fishing licence.

**Harvesting technique**

1. Spot the abalone from the surface — look for the oval shell shape
2. Dive down calmly and approach slowly
3. Use an abalone iron (flat pry tool) to pop it off in one swift motion
4. Measure immediately — return undersized ones shell-down on the rock
5. Place legal catches in your catch bag

**Tips for beginners**

- Go during calm conditions and low tide for best visibility
- Start in shallow water (2–3m) to build confidence
- Never take more than your limit — sustainability matters
- Learn to identify the species in your area`,
  },
  {
    title: "How to Prepare and Cook Abalone at Camp",
    category: "Abalone Hunting",
    format: "Article + Video",
    slug: "cook-abalone-at-camp",
    readTime: "6 min read",
    lastEdited: "Jan 25, 2026",
    description:
      "From ocean to plate — how to clean, tenderise, and cook fresh abalone over a campfire.",
    image: "/images/tutorial-abalone.jpg",
    content: `Fresh abalone is one of the best things you'll ever eat. But it needs to be prepared properly or it'll be tougher than a boot.

**Cleaning**

1. Use a large spoon to scoop the abalone out of its shell
2. Remove the dark gut sac and trim the frilly edges
3. Rinse under fresh water

**Tenderising**

This is the critical step most people skip. Abalone muscle is incredibly tough raw.
- Place the cleaned abalone between two sheets of plastic
- Pound firmly with a meat mallet or flat rock until it's uniformly thin (about 5mm)
- You'll feel it soften — don't be shy with the pounding

**Cooking — campfire style**

The golden rule: high heat, very short time. Overcooked abalone is rubber.
1. Get your pan screaming hot over the coals
2. Add a knob of butter
3. Sear the abalone for 30–45 seconds per side — no more
4. Squeeze fresh lemon, season with salt and pepper
5. Eat immediately

**Alternative: crumbed and fried**

- Slice tenderised abalone into strips
- Dip in egg wash, then seasoned breadcrumbs
- Shallow fry in oil for 1 minute per side
- Serve with lemon and tartare sauce`,
  },

  // ── Lobster Catching (2) ───────────────────────────────────────────
  {
    title: "Rock Lobster Catching Techniques in Australia",
    category: "Lobster Catching",
    format: "Video",
    slug: "rock-lobster-techniques",
    readTime: "12 min watch",
    lastEdited: "Jan 18, 2026",
    description:
      "Master the art of spotting, catching, and legally harvesting rock lobster along the Aussie coast.",
    image: "/images/coral-reef.jpg",
    content: `Rock lobster (crayfish) are found all around Australia's coastline. Catching them by hand while freediving is one of the most exciting experiences in the ocean.

**Where to find rock lobster**

Look in rocky reef with lots of ledges and caves. Lobster hide during the day and come out to feed at night, so you'll be reaching into dark holes and under ledges.

**Technique**

1. Scan the reef for antennae poking out from ledges
2. Dive down and position yourself at the opening
3. Reach in smoothly and grab firmly behind the horns
4. Pull straight out — don't twist or you'll lose them
5. Check size against your gauge immediately

**Legal requirements**

- Most states require a recreational fishing licence
- Size limits vary: typically 76mm+ carapace length
- Females carrying eggs (berried) must be returned
- Bag limits apply — usually 2–6 per person per day

**Safety**

- Always dive with a buddy
- Wear gloves — lobster spines are sharp
- Be aware of moray eels in the same habitat
- Never put your hand somewhere you can't see`,
  },
  {
    title: "Best Spots for Rock Lobster in Southern Australia",
    category: "Lobster Catching",
    format: "Article",
    slug: "best-lobster-spots-southern-australia",
    readTime: "5 min read",
    lastEdited: "Jan 10, 2026",
    description:
      "A state-by-state guide to the best rock lobster diving locations across southern Australia.",
    image: "/images/coral-reef.jpg",
    content: `Southern Australia has some of the best rock lobster diving in the world. Here are the top spots by state.

**Victoria**

- **Portsea / Sorrento** — The Mornington Peninsula has excellent southern rock lobster. Dive the back beaches in 3–8m.
- **Kilcunda** — Rocky coastline with reliable lobster populations. Best in autumn/winter.
- **Apollo Bay** — Exposed coastline with big crays but requires calm conditions.

**South Australia**

- **Port Lincoln** — World-class lobster diving. Big southern rock lobster in 5–15m.
- **Kangaroo Island** — Remote but worth the trip. Minimal pressure means bigger crays.
- **Yorke Peninsula** — Accessible and consistent. Great for beginners.

**Tasmania**

- **East Coast** — Bicheno, Coles Bay, and Freycinet have excellent reef systems.
- **North Coast** — Devonport to Stanley. Less popular but productive.
- **Bruny Island** — Some of the biggest southern rock lobster in the country.

**Western Australia**

- **Rottnest Island** — Western rock lobster in shallow reef. Easy access from Perth.
- **Abrolhos Islands** — Remote but legendary. Some of the biggest crays in WA.

**General tips**

- Dive early in the season when crays haven't been pressured
- Early morning dives are best — lobster are more exposed before other divers arrive
- Always check local regulations before diving — they vary by state and change annually`,
  },

  // ── Freediving (2) ─────────────────────────────────────────────────
  {
    title: "Freediving Breathing: Essential Techniques for Spearos",
    category: "Freediving",
    format: "Article",
    slug: "freediving-breathing-techniques",
    readTime: "6 min read",
    lastEdited: "Dec 28, 2025",
    description:
      "Breathing exercises and mental preparation to extend your bottom time safely.",
    image: "/images/course-freediving.jpg",
    content: `Your bottom time as a spearo is limited by your breath hold. These techniques will help you extend your time underwater safely.

**Diaphragmatic breathing**

Before every dive, spend 2–3 minutes breathing deeply from your diaphragm (belly breathing). This maximises oxygen intake and lowers your heart rate.

1. Inhale for 4 seconds, letting your belly expand
2. Hold for 2 seconds
3. Exhale for 8 seconds — twice as long as the inhale
4. Repeat for 2–3 minutes before diving

**The final breath**

Your last breath before a dive should be a full, relaxed inhale — not a forced gasp. Pack breathing (taking small extra sips of air) can increase your capacity but should only be practiced with training.

**Relaxation is everything**

The biggest factor in breath hold isn't lung capacity — it's relaxation. A tense, excited diver burns oxygen 3x faster than a calm one. Focus on:

- Slow, efficient fin kicks
- Minimal movement while hunting
- Staying calm when you spot a fish
- Turning back before you feel desperate

**Safety rules**

- Never hyperventilate before diving — it can cause blackout
- Always dive with a buddy
- One up, one down — never dive at the same time
- Know your limits and build up gradually`,
  },
  {
    title: "Freediving Gear Essentials: What You Actually Need",
    category: "Freediving",
    format: "Article + Video",
    slug: "freediving-gear-essentials",
    readTime: "5 min read",
    lastEdited: "Dec 15, 2025",
    description:
      "A no-nonsense guide to the gear you need for freediving and spearfishing — and what you can skip.",
    image: "/images/course-freediving.jpg",
    content: `You don't need much to start freediving. Here's what actually matters and what's just marketing.

**Essential gear**

- **Mask** — Low-volume mask that fits your face. Cheap masks leak and fog. Spend $60–100.
- **Snorkel** — Simple J-snorkel. Skip the fancy purge valves — they leak at depth.
- **Fins** — Long-blade freediving fins. The single biggest performance upgrade you can make. $100–200.
- **Wetsuit** — 3mm for tropical, 5mm for temperate. A good wetsuit keeps you warm and buoyant.
- **Weight belt** — Rubber weight belt with quick-release buckle. Never use a nylon belt — they don't release fast enough.

**For spearfishing specifically**

- **Hand speargun** — The Reef Hunter range. Compact, powerful, and built for Aussie conditions.
- **Catch bag** — Neoprene or mesh. Clips to your weight belt.
- **Dive knife** — For safety and dispatching fish. Always carry one.
- **Gloves** — Protect your hands from reef, lobster spines, and fish spines.

**What you can skip (for now)**

- Dive computer — Useful later, but your phone timer works fine to start
- Spearfishing float — Not needed for shore dives in shallow water
- Rash guard — Your wetsuit covers this
- Expensive carbon fins — Start with fibreglass. Upgrade once you're hooked.`,
  },

  // ── Safety & Regulations (2) ───────────────────────────────────────
  {
    title: "Spearfishing Regulations by State: A Quick Reference",
    category: "Safety & Regulations",
    format: "Article",
    slug: "spearfishing-regulations-australia",
    readTime: "7 min read",
    lastEdited: "Dec 5, 2025",
    description:
      "Bag limits, size limits, protected species, and licence requirements for every Australian state.",
    image: "/images/hero-ocean.jpg",
    content: `Australian spearfishing regulations vary by state and are strictly enforced. Ignorance isn't an excuse — know the rules before you dive.

**Do you need a licence?**

- **NSW** — Recreational fishing licence required ($7/3 days, $35/year)
- **Victoria** — Recreational fishing licence required ($10/2 days, $36.50/year)
- **Queensland** — No licence for recreational line fishing, but rules still apply
- **South Australia** — No general licence, but some species require permits
- **Western Australia** — Recreational fishing from boat licence required for some areas
- **Tasmania** — Recreational sea fishing licence not required, but abalone/rock lobster have specific licences

**Universal rules**

- No spearfishing with SCUBA gear (snorkel only in most states)
- No spearfishing in marine protected areas
- No taking undersized fish — always carry a measuring device
- No taking females carrying eggs (lobster, crab)
- No selling your catch — recreational only

**Protected species (national)**

These species cannot be taken anywhere in Australia:
- Grey nurse shark
- Great white shark
- Whale species
- Blue groper (NSW)
- Weedy sea dragon

**Tips**

- Download your state's fishing app — they have up-to-date regulations
- Photograph your catch with a ruler before processing
- When in doubt, release it
- Report poaching to your state fisheries hotline`,
  },
  {
    title: "Dive Safety: The Buddy System and Emergency Procedures",
    category: "Safety & Regulations",
    format: "Video",
    slug: "dive-safety-buddy-system",
    readTime: "10 min watch",
    lastEdited: "Nov 20, 2025",
    description:
      "How to dive safely with a buddy, recognise blackout warning signs, and handle emergencies in the water.",
    image: "/images/hero-ocean.jpg",
    content: `Freediving and spearfishing are safe sports — but only if you follow the rules. The buddy system is non-negotiable.

**The buddy system**

- One up, one down. Never dive at the same time.
- The surface buddy watches the diver constantly
- Count the dive time — know your buddy's limits
- Stay within arm's reach when they surface

**Shallow water blackout**

This is the most dangerous risk in freediving. It happens when oxygen drops below consciousness level, usually in the last few metres of ascent.

Warning signs:
- Loss of motor control (wobbly swimming)
- Blue lips
- Glassy eyes
- Sudden change in behaviour

**What to do if your buddy blacks out**

1. Get to them immediately
2. Roll them face-up
3. Remove their mask and snorkel
4. Blow on their face and tap their cheek
5. Support them at the surface
6. If they don't respond in 10 seconds, begin rescue breathing
7. Get to shore / boat and call emergency services

**Prevention**

- Never hyperventilate before a dive
- Surface with air in reserve — don't push to empty
- Do recovery breaths after every dive (3 strong exhale-inhales)
- Increase depth and time gradually
- Never dive alone — no exceptions`,
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
