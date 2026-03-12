"use client";

import Image from "next/image";
import Link from "next/link";

const shopLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=spearguns", label: "Spearguns" },
  { href: "/products?category=accessories", label: "Accessories" },
  { href: "/products?category=diving-gear", label: "Diving Gear" },
];

const learnLinks = [
  { href: "/tutorials", label: "All Tutorials" },
  { href: "/tutorials?category=hand-speargun", label: "Speargun Guides" },
  { href: "/tutorials?category=abalone", label: "Abalone Hunting" },
  { href: "/tutorials?category=lobster", label: "Lobster Catching" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ocean">
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-6 sm:pt-10 sm:pb-8 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-8 lg:grid-cols-12">
          {/* Brand + socials */}
          <div className="col-span-2 flex items-center justify-between lg:col-span-4 lg:block">
            <Link href="/" className="inline-flex shrink-0 items-center gap-2">
              <Image
                src="/images/logo.svg"
                alt=""
                width={3063}
                height={2639}
                className="h-6 w-auto brightness-0 invert sm:h-7"
              />
              <span className="font-logo text-lg tracking-wider text-white sm:text-2xl">
                CAMPERDIVE
              </span>
            </Link>
            <p className="hidden max-w-[260px] text-[13px] leading-relaxed text-white/50 lg:mt-3 lg:block">
              Premium handheld spearguns for Australian waters. Built by a
              freediving instructor who knows the reef.
            </p>
            {/* Socials — inline on mobile, stacked on lg */}
            <div className="flex gap-2 lg:mt-4">
              <a href="#" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="#" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.8.5-5.8s-.2-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
              </a>
              <a href="#" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z" /></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <nav className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-sand">Shop</h3>
            <ul className="mt-2 flex flex-col gap-1 sm:mt-3 sm:gap-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] text-white/55 transition-colors hover:text-white sm:text-[13px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Learn */}
          <nav className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-sand">Learn</h3>
            <ul className="mt-2 flex flex-col gap-1 sm:mt-3 sm:gap-2">
              {learnLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] text-white/55 transition-colors hover:text-white sm:text-[13px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-sand">
              Stay in the loop
            </h3>
            <p className="mt-2 text-[12px] text-white/45 sm:text-[13px]">
              Spearfishing tips & new product drops. No spam.
            </p>
            <form
              className="mt-2 flex gap-2 sm:mt-3 sm:max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/8 px-3 py-2 text-[12px] text-white placeholder:text-white/40 focus:border-sand focus:outline-none sm:px-3.5 sm:py-2.5 sm:text-[13px]"
              />
              <button
                type="submit"
                className="shrink-0 cursor-pointer rounded-lg bg-sand px-4 py-2 text-[12px] font-semibold text-ocean transition-colors hover:bg-sand-light sm:py-2.5 sm:text-[13px]"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-[11px] text-white/40 sm:mt-8 sm:pt-6">
          <p>&copy; {new Date().getFullYear()} CamperDive. All rights reserved.</p>
          <div className="flex gap-5">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
