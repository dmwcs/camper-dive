"use client";

import Link from "next/link";

const footerLinks = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=spearguns", label: "Spearguns" },
    { href: "/products?category=accessories", label: "Accessories" },
    { href: "/products?category=diving-gear", label: "Diving Gear" },
  ],
  learn: [
    { href: "/tutorials", label: "All Tutorials" },
    { href: "/tutorials?category=hand-speargun", label: "Hand Speargun Guides" },
    { href: "/tutorials?category=abalone", label: "Abalone Hunting" },
    { href: "/tutorials?category=lobster", label: "Lobster Catching" },
  ],
  company: [
    { href: "/about", label: "About CamperDive" },
    { href: "/contact", label: "Contact Us" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-ocean">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <span className="font-logo text-2xl tracking-wider text-white sm:text-3xl">
              CAMPERDIVE
            </span>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/60 sm:mt-4 sm:text-sm">
              Premium handheld spearguns and spearfishing gear for Australian
              waters. Built by a freediving instructor who knows the reef.
            </p>
            {/* Social Icons */}
            <div className="mt-4 flex gap-3 sm:mt-6 sm:gap-4">
              {["Instagram", "YouTube", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[11px] font-medium text-white/70 transition-colors hover:bg-white/20 hover:text-white sm:h-9 sm:w-9 sm:text-xs"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-sand sm:text-xs">
              Shop
            </h3>
            <ul className="mt-3 flex flex-col gap-2.5 sm:mt-4 sm:gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/60 transition-colors hover:text-white sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-sand sm:text-xs">
              Learn
            </h3>
            <ul className="mt-3 flex flex-col gap-2.5 sm:mt-4 sm:gap-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/60 transition-colors hover:text-white sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-sand sm:text-xs">
              Stay in the loop
            </h3>
            <p className="mt-3 text-[13px] text-white/60 sm:mt-4 sm:text-sm">
              Get spearfishing tips and new product drops. No spam.
            </p>
            <form className="mt-3 flex gap-2 sm:mt-4 sm:max-w-md lg:max-w-none" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[13px] text-white placeholder:text-white/60 focus:border-sand focus:outline-none sm:px-4 sm:py-2.5 sm:text-sm"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-sand px-3.5 py-2 text-[13px] font-semibold text-ocean transition-colors hover:bg-sand-light sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/60 sm:mt-10 sm:gap-4 sm:pt-8 sm:text-xs md:flex-row lg:mt-12">
          <p>&copy; {new Date().getFullYear()} CamperDive. All rights reserved.</p>
          <div className="flex gap-5 sm:gap-6">
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
