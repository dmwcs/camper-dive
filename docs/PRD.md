# CamperDive — Product Requirements Document (PRD)

> Version: 1.3
> Date: 2026-03-05
> Status: Draft

---

## 1. Product Overview

**CamperDive** is a personal e-commerce showcase website focused on selling handheld spearguns and spearfishing gear to the Australian market. The founder is a certified freediving instructor who actively spearfishes, catches abalone and lobster in Australian waters. The site combines product sales with a rich library of educational content — both product-specific tutorials (how to use a hand speargun) and general spearfishing/freediving tutorials (catching lobster, abalone, freediving techniques, etc.). This positions the brand as both a retailer and a trusted authority in the spearfishing community.

### 1.1 Business Goals

- **Primary**: Sell handheld spearguns as the hero product
- **Secondary**: Cross-sell related spearfishing/diving gear (masks, wetsuits, catch bags, dive knives, etc.)
- **Education & Market Creation**: Most Australians are unfamiliar with hand spearguns — the site must educate visitors on what a hand speargun is, why it's a great option, and convert curious newcomers into buyers. This is the core marketing challenge.
- **Content Marketing**: Build trust and organic traffic through a well-categorized library of spearfishing & freediving tutorials. Tutorials serve two purposes: (1) support hand speargun sales with product-related content, and (2) attract a wider audience through general spearfishing/freediving content, funneling them toward the product.
- **Brand Positioning**: Personal, authentic, Australian — a freediving instructor who actually dives and knows the gear, not a faceless Shopify store
- **Design Differentiation**: Stand out from the boring, template-heavy look of existing Australian dive retailers (Adreno, etc.). The site should feel modern, premium, and visually distinctive.

### 1.2 Target Audience

| Attribute | Detail |
|-----------|--------|
| Geography | Australia (primarily coastal regions — QLD, NSW, WA, SA, VIC) |
| Demographics | Males & females, 18–45, outdoor/adventure enthusiasts |
| Experience level | Beginners to intermediate spearfishers |
| Language | English |
| Devices | Desktop-first for end users, mobile responsive as secondary. Admin (site owner) also uses desktop. |

---

## 2. Sitemap & Page Structure

```
CamperDive.com

Public-facing pages:
├── / (Home / Landing Page)
├── /products (Product Catalog)
│   └── /products/[slug] (Individual Product Page)
├── /tutorials (Tutorial Hub)
│   └── /tutorials/[slug] (Individual Tutorial)
├── /about (About — Personal Story)
└── /contact (Contact / Inquiry Form)

Admin dashboard (owner only, login-protected):
├── /admin (Dashboard Overview)
├── /admin/products (Manage Products — CRUD)
│   ├── /admin/products/new (Add New Product)
│   └── /admin/products/[id]/edit (Edit Product)
├── /admin/tutorials (Manage Tutorials — CRUD)
│   ├── /admin/tutorials/new (Create New Tutorial)
│   └── /admin/tutorials/[id]/edit (Edit Tutorial)
└── /admin/inquiries (View Contact Form Submissions)
```

### 2.1 Page Descriptions

#### Home Page `/`
The primary conversion page. Must immediately communicate:
- **What**: Handheld spearguns for Australian waters
- **Why CamperDive**: Personal expertise, quality gear, local knowledge
- **CTA**: Shop the speargun → link to product page

**Sections (top to bottom):**
1. **Hero Section** — Full-width hero image/video of spearfishing in Australian waters. Headline + CTA button
2. **"What is a Hand Speargun?" Education Section** — Since most Australians don't know about hand spearguns, this section visually explains what it is, why it's different from a regular speargun, and why it's worth trying. Use comparison visually (compact vs bulky), key benefits, and a "Learn More" CTA. This is a critical conversion section for newcomers.
3. **Hero Product Showcase** — The flagship handheld speargun with key specs, beauty shots, and "Shop Now" CTA
4. **Value Propositions** — 3–4 icons/cards (e.g., "Built for Australian Waters", "Free Shipping AU-wide", "Expert Tested by a Freediving Instructor", "Tutorial Support")
5. **Featured Products** — Grid of 3–6 top products
6. **Tutorial Preview** — 2–3 featured tutorial cards from different categories, linking to /tutorials
7. **Testimonials / Social Proof** — Customer reviews or Instagram feed
8. **Footer** — Nav links, social icons, newsletter signup, ABN/legal

#### Product Catalog `/products`
- Filterable grid of all products
- Categories: Spearguns, Accessories, Diving Gear
- Each card: Product image, name, price, "View" button
- Sort by: Price, Newest, Popular

#### Product Detail `/products/[slug]`
- Media gallery (supports both images and videos — e.g., product photos from multiple angles + a short usage/demo video. Admin uploads media in any order; users swipe/click through all media in a unified gallery.)
- Product name, price, description
- Specifications table (length, material, band type, range, etc.)

**Product Options / Variant Selector (Key Feature)**

Similar to Apple's product configurator. Each product can have multiple option groups (admin-defined), and the user selects one value from each group to build their desired configuration before adding to cart.

Example for a handheld speargun:

```
Option Group: "Size"        → [Small / Medium / Large]
Option Group: "Tip Type"    → [Single Barb / Tri-Tip / Paralyzer]
Option Group: "Band Color"  → [Black / Blue / Red]
```

Example for an accessory bundle:

```
Option Group: "Color"       → [Black / Camo / Ocean Blue]
Option Group: "Include Bag" → [Yes / No]
```

**UX behavior:**
- Each option group displays as a labeled row with selectable buttons/chips (like Apple's size/color selector)
- Selecting an option visually highlights it
- Price may update based on selection (if variants have different prices)
- Product image may change based on selection (e.g., different color → different photo)
- "Add to Cart" button becomes active once all required options are selected
- Clear display of current selection summary before adding to cart

- Related products section
- Related tutorials section (e.g., "How to use this speargun")

#### Tutorial Hub `/tutorials`

The tutorial system is a core differentiator. Content falls into two groups:
1. **Product tutorials** — Directly related to the hand speargun (how to use, maintain, choose). These drive product sales.
2. **General spearfishing & freediving tutorials** — Broader topics (catching lobster, abalone, freediving techniques, regulations). These attract organic traffic and position the brand as an authority. Visitors who come for general content discover the hand speargun.

**UX Requirements:**
- Clear category-based navigation (tabs, sidebar filters, or tag system) so users can quickly find what they need
- Support for both video-based tutorials (YouTube embeds) and text/image articles
- Visual distinction between video tutorials and written guides (e.g., play icon overlay on video cards)
- Category filter must be prominent and easy to use, not buried

**Categories:**
| Category | Description | Type |
|----------|-------------|------|
| Hand Speargun | How to use, choose, and master a hand speargun | Product-related |
| Speargun Maintenance | Care, storage, repairs | Product-related |
| Abalone Hunting | Techniques, regulations, spots | General |
| Lobster Catching | Rock lobster techniques in Australian waters | General |
| Freediving | Breath-hold techniques, safety, training | General |
| Regulations & Safety | Australian state-by-state rules, licenses, safety tips | General |

- Each card: Thumbnail (with play icon if video), title, category tag, format indicator (Video / Article)

#### Tutorial Detail `/tutorials/[slug]`
- Rich content: text, images, embedded videos (YouTube)
- Author info (personal brand — freediving instructor)
- Related products sidebar/section ("Gear used in this tutorial") — especially important for general tutorials, as this is the funnel from content → product
- Share buttons
- Previous/Next tutorial navigation
- Category breadcrumb for easy navigation back to filtered view

#### About Page `/about`
- Personal story: who you are, why spearfishing, why CamperDive
- Photo(s) of the founder
- Mission / values
- Optional: certifications, partnerships

#### Contact Page `/contact`
- Contact form (Name, Email, Subject, Message)
- Email address
- Social media links
- Optional: FAQ accordion

#### Admin Dashboard `/admin` (Login-protected)

The site owner (freediving instructor) needs a simple admin panel to independently manage content without touching code.

**Admin Overview `/admin`**
- Quick stats: total products, total tutorials, recent inquiries
- Quick links to common actions (add product, new tutorial)

**Product Management `/admin/products`**
- Table/list of all products with status (active/draft)
- Add / Edit / Delete products
- Product form: name, price, description, specifications, category, media upload (images + videos)
- Toggle product visibility (draft / published)
- Manage stock/inventory status (in stock / out of stock)

**Product Option Groups (Variant System)**
- Admin can add/remove option groups per product (e.g., "Size", "Color", "Tip Type")
- For each option group, admin defines the label (group name) and the available values
- Admin can reorder option groups and values
- Each option value can optionally have: a price modifier (e.g., +$10), a linked image
- Flexible: the system does not hardcode any option types — admin creates whatever labels and values they need

**Tutorial Management `/admin/tutorials`**
- Table/list of all tutorials with status (published/draft)
- Add / Edit / Delete tutorials
- Tutorial editor: title, category, format (video/article), content (rich text or markdown), YouTube URL, thumbnail upload
- Toggle tutorial visibility (draft / published)

**Inquiry Management `/admin/inquiries`**
- View list of contact form submissions
- Mark as read / replied
- Simple status tracking

**Admin Auth**
- Simple login (email + password), single admin user
- No public registration — admin account is pre-configured
- Session-based or JWT authentication

---

## 3. Design Direction

### 3.1 Brand Identity

| Element | Direction |
|---------|-----------|
| **Mood** | Rugged, adventurous, oceanic, authentic Australian |
| **Feel** | Personal and trustworthy, not corporate. A freediving instructor who shares real experience. |
| **Tone of Voice** | Friendly, knowledgeable, approachable — personal but professional. Not corporate, not slangy. |

### 3.1.1 Design Differentiation (Key Requirement)

The Australian dive/spearfishing retail market is dominated by generic, template-heavy Shopify stores (e.g., Adreno, Melbourne Diving Supplies). These sites are functional but visually uninspiring — same grids, same layouts, same corporate feel.

**CamperDive must look and feel different:**
- Clean, minimal, modern design — not boxy or rigid like template stores, but also not flashy or over-designed
- No parallax, no waterfall/masonry layouts, no excessive animations — keep it simple and elegant
- Generous whitespace, clean typography, well-structured layouts
- Product pages that feel premium but straightforward
- The overall impression should be: "Clean, modern, and easy to use — clearly not a generic template"

### 3.2 Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Deep Ocean Blue | `#0A3D62` | Headers, primary buttons, nav |
| Secondary | Sandy Gold | `#D4A84B` | Accents, highlights, CTAs |
| Accent | Coral/Warm Red | `#E55039` | Sale tags, urgent CTAs |
| Background | Off-White | `#F7F7F2` | Page backgrounds |
| Surface | White | `#FFFFFF` | Cards, content areas |
| Text Primary | Charcoal | `#1A1A2E` | Body text |
| Text Secondary | Slate Gray | `#6B7280` | Captions, secondary text |

### 3.3 Typography

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| Headings | **Inter** or **Plus Jakarta Sans** | sans-serif | 600–800 |
| Body | **Inter** | sans-serif | 400–500 |
| Accent / Logo | **Bebas Neue** or custom | sans-serif | 700 |

### 3.4 Design Principles

1. **Desktop-first** — Primary users browse on desktop; mobile responsive as secondary
2. **Clean & minimal** — Simple, elegant layouts. No flashy effects (parallax, waterfall, heavy animations). Modern but not over-designed.
3. **Image-heavy** — Spearfishing is visual; let the photos do the selling
4. **Fast loading** — Optimize images (WebP/AVIF), lazy load below-fold content
5. **Clear CTAs** — Every page must guide toward product inquiry or purchase
6. **Whitespace** — Generous spacing, uncluttered layouts that let products breathe

---

## 4. Functional Requirements

### Phase 1 (MVP — Current Scope)

| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| F1 | Product catalog | P0 | Display products with images, prices, descriptions |
| F2 | Product detail with variant selector | P0 | Full product info, media gallery (images + videos), option group selector (size/color/etc.), add to cart |
| F3 | Tutorial articles | P0 | Markdown/MDX-based tutorial content |
| F4 | Contact form | P0 | Simple form with email delivery (e.g., Resend, Formspree) |
| F5 | Responsive design | P0 | Desktop-first, mobile responsive |
| F6 | Admin: Product management | P0 | CRUD for products (add, edit, delete, draft/publish, image upload, option groups/variants) |
| F7 | Admin: Tutorial management | P0 | CRUD for tutorials (add, edit, delete, category, format, draft/publish) |
| F8 | Admin: Authentication | P0 | Simple login for single admin user |
| F9 | SEO optimization | P1 | Meta tags, Open Graph, structured data for products |
| F10 | Image optimization | P1 | Next.js Image component, WebP/AVIF |
| F11 | About page | P1 | Brand story |
| F12 | Admin: Inquiry management | P1 | View and manage contact form submissions |
| F13 | Analytics | P2 | Google Analytics or Plausible |

### Phase 2 (Future)

| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| F20 | Shopping cart & checkout | P0 | Stripe or Shopify integration |
| F21 | Product search | P1 | Search across products and tutorials |
| F22 | Newsletter | P1 | Email collection and automated campaigns |
| F23 | Blog/News | P2 | General spearfishing news and updates |
| F24 | User reviews | P2 | Product review system |
| F25 | Internationalization | P3 | Multi-language support if expanding |

---

## 5. Content Requirements

### 5.1 Product Content (per product)

- Product name
- Base price (AUD)
- Multiple product media items: photos (white background + in-use lifestyle) and/or videos (demo, usage clips)
- Short description (1–2 sentences for cards)
- Full description (2–3 paragraphs)
- Specifications table
- Category / tags
- Option groups (admin-defined per product): each group has a label + list of selectable values, with optional price modifier and linked image

### 5.2 Hero Product: Handheld Speargun

This is the star product. Its product page should be premium-level:

**Suggested copy structure:**
- **Headline**: Bold, benefit-driven (e.g., "Precision. Power. Portability.")
- **Subheadline**: What it is (e.g., "The ultimate handheld speargun for Australian reef and rock diving")
- **Key selling points** (3–4 bullet points with icons):
  - Compact & travel-friendly
  - Built for Australian reef species
  - Stainless steel construction / corrosion resistant
  - Perfect for beginners and experienced divers
- **Detailed description**: Material, design philosophy, use cases
- **Specs**: Length, weight, band type, effective range, material, warranty

### 5.3 Tutorial Content (initial set)

**Product-related tutorials** (drive hand speargun sales):

| # | Title | Category | Format |
|---|-------|----------|--------|
| 1 | What is a Hand Speargun? And Why You Should Try One | Hand Speargun | Article + Video |
| 2 | Hand Speargun vs Rubber-Band Speargun: Which is Right for You? | Hand Speargun | Article |
| 3 | Getting Started with Your First Hand Speargun | Hand Speargun | Video |
| 4 | How to Maintain and Store Your Hand Speargun | Maintenance | Article |

**General spearfishing & freediving tutorials** (attract traffic, build authority):

| # | Title | Category | Format |
|---|-------|----------|--------|
| 5 | Abalone Hunting: A Beginner's Guide to Australian Waters | Abalone Hunting | Article + Video |
| 6 | Rock Lobster Catching Techniques in Australia | Lobster Catching | Video |
| 7 | Freediving Basics: Breath-Hold Training for Spearfishing | Freediving | Article |
| 8 | Australian Spearfishing Regulations: State-by-State Guide | Regulations & Safety | Article |
| 9 | Best Spearfishing Spots in [State] | General | Article |

> **Content funnel**: General tutorials should always include a natural mention or sidebar linking to the hand speargun product. For example, a lobster-catching tutorial can mention "I use a hand speargun for quick shots in tight reef spaces — check it out here." This creates a soft upsell path without being pushy.

---

## 6. Technical Architecture

### 6.1 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Language | TypeScript |
| Database | SQLite (via Prisma) or PostgreSQL (Supabase/Neon) — for products, tutorials, inquiries |
| Auth | NextAuth.js or simple JWT — single admin user |
| Content | Database-driven (admin can create/edit via dashboard) |
| Deployment | Vercel |
| Forms | Server Actions (Next.js) → save to database |
| Analytics | Plausible or GA4 |
| Images | Next.js Image, upload to Cloudinary or Vercel Blob |

### 6.2 Project Structure (Proposed)

```
app/
├── layout.tsx                 # Root layout with nav + footer
├── page.tsx                   # Home page
├── products/
│   ├── page.tsx               # Product catalog
│   └── [slug]/page.tsx        # Product detail
├── tutorials/
│   ├── page.tsx               # Tutorial hub
│   └── [slug]/page.tsx        # Tutorial detail
├── about/page.tsx             # About page
├── contact/page.tsx           # Contact page
├── admin/
│   ├── layout.tsx             # Admin layout (sidebar nav, auth guard)
│   ├── page.tsx               # Admin dashboard overview
│   ├── products/
│   │   ├── page.tsx           # Product list & management
│   │   ├── new/page.tsx       # Add new product
│   │   └── [id]/edit/page.tsx # Edit product
│   ├── tutorials/
│   │   ├── page.tsx           # Tutorial list & management
│   │   ├── new/page.tsx       # Create new tutorial
│   │   └── [id]/edit/page.tsx # Edit tutorial
│   └── inquiries/page.tsx     # View contact submissions
├── api/
│   ├── auth/                  # Auth endpoints
│   ├── products/              # Product CRUD API
│   ├── tutorials/             # Tutorial CRUD API
│   ├── inquiries/             # Inquiry API
│   └── upload/                # Image upload API
├── globals.css
│
components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MobileMenu.tsx
├── home/
│   ├── Hero.tsx
│   ├── FeaturedProducts.tsx
│   ├── ValueProps.tsx
│   └── TutorialPreview.tsx
├── products/
│   ├── ProductCard.tsx
│   ├── MediaGallery.tsx        # Unified gallery for images + videos
│   ├── ProductSpecs.tsx
│   └── VariantSelector.tsx    # Option group selector (size/color/etc.)
├── tutorials/
│   ├── TutorialCard.tsx
│   └── TutorialContent.tsx
├── admin/
│   ├── AdminSidebar.tsx
│   ├── ProductForm.tsx         # Includes option group editor
│   ├── OptionGroupEditor.tsx  # Add/edit option groups & values
│   ├── TutorialEditor.tsx
│   ├── DataTable.tsx
│   └── ImageUploader.tsx
├── ui/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   └── Input.tsx
│
lib/
├── db.ts                      # Database client (Prisma)
├── auth.ts                    # Auth helpers
└── upload.ts                  # Image upload helpers
│
prisma/
├── schema.prisma              # Database schema
│
public/
├── images/
│   ├── products/
│   ├── tutorials/
│   ├── hero/
│   └── brand/
```

---

## 7. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Mobile responsive | All screens 320px+ |
| Browser support | Chrome, Safari, Firefox, Edge (latest 2 versions) |
| Image formats | WebP with JPEG fallback |

---

## 8. Milestones

| Milestone | Scope | Status |
|-----------|-------|--------|
| M1: PRD & Design Brief | This document | ✅ Complete |
| M2: Database & Auth | Prisma schema, admin auth, API routes | Pending |
| M3: Admin Dashboard | Product CRUD, tutorial CRUD, image upload, inquiry viewer | Pending |
| M4: Design System & UI Components | Color, typography, reusable components | Pending |
| M5: Home Page | Hero, education section, featured products, value props | Pending |
| M6: Product Pages | Catalog + detail pages (data from DB) | Pending |
| M7: Tutorial System | Tutorial hub + article pages (data from DB) | Pending |
| M8: About & Contact | Static pages + contact form (saves to DB) | Pending |
| M9: SEO & Performance | Meta tags, image optimization, Lighthouse audit | Pending |
| M10: Launch | Deploy to production domain | Pending |

---

## 9. Open Questions

1. **Domain**: Is the domain camperdive.com.au or camperdive.com?
2. **Product photos**: Do you have product photography ready, or do we need placeholder images for now?
3. **How many products**: How many products total for Phase 1 launch?
4. **Video content**: Do you have YouTube videos for tutorials, or will they be text-only initially?
5. **Logo**: Do you have a logo, or does one need to be designed?

---

## 10. Appendix: Design Brief for Frontend Designer / AI

### Prompt-ready description:

> Design a modern, clean e-commerce website for **CamperDive**, an Australian personal brand selling handheld spearguns and spearfishing gear. The founder is a certified freediving instructor.
>
> **Visual style**: Clean, minimal, modern. NOT a generic Shopify template, but also NOT flashy or over-designed. No parallax, no waterfall layouts, no heavy animations. Think: simple, elegant, well-structured. Generous whitespace, clean typography. Ocean blues and sandy golds. Use lifestyle photography of spearfishing in Australian waters.
>
> **Key pages**: Home (hero + hand speargun education section + products + tutorials preview), Product catalog, Product detail, Tutorial hub, Tutorial article, About, Contact. Plus an admin dashboard for the site owner to manage products, tutorials, and inquiries.
>
> **Hero product**: A handheld speargun — most Australians don't know what this is. The site must educate visitors: what is a hand speargun, why it's great, and make newcomers think "I want to try this." Product pages feature an Apple-style variant selector: admin-defined option groups (e.g., Size, Color, Tip Type) where users pick their configuration before adding to cart.
>
> **Content strategy**: Two types of tutorials: (1) Product-related — how to use/maintain a hand speargun, driving sales. (2) General spearfishing/freediving — catching lobster, abalone, freediving techniques, regulations. These attract organic traffic and funnel visitors toward the product. Tutorials must have clear category-based navigation (tabs/filters) so users can easily find content by topic. Support both video (YouTube) and article formats.
>
> **Admin dashboard**: The site owner (freediving instructor) needs a simple, clean backend to manage products (CRUD, image upload, inventory, custom option groups/variants), publish tutorials (rich text editor, category, video embed), and view contact form submissions. Single admin user with login.
>
> **Tone**: Friendly, personal, trustworthy. Not corporate, but not heavy on slang either. Like buying from a knowledgeable freediving instructor who genuinely cares about the gear.
>
> **Tech**: Next.js 16, Tailwind CSS 4, TypeScript, Prisma (database). Desktop-first responsive design. Performance-optimized (Lighthouse 90+).
>
> **Market**: Australian spearfishing community. English only.
>
> **Phase 1**: Showcase site with product display, tutorials, contact form, and admin dashboard. No cart/checkout yet.
