# CamperDive

Premium handheld spearguns and spearfishing gear for Australian waters. Built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Language:** TypeScript

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
app/                  # Pages & layouts (App Router)
  products/           # Product listing & detail pages
  tutorials/          # Tutorial listing & detail pages
  about/              # About page
  contact/            # Contact page
components/
  layout/             # Navbar, Footer
  home/               # Homepage sections
  products/           # ProductCard, ProductGallery, ProductActions
  cart/               # CartDrawer
  tutorials/          # Tutorial components
  ui/                 # Shared UI (PageHeader, ScrollReveal)
lib/
  mock-data.ts        # Product & tutorial data
  cart-context.tsx    # Cart state management (React Context + useReducer)
```

## Features

- Product catalog with category filtering
- Multi-image & video product gallery
- Shopping cart with variant/option selection and quantity picker
- Tutorial content with categories
- Fully responsive design
