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
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <span className="font-logo text-3xl tracking-wider text-white">
              CAMPERDIVE
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Premium handheld spearguns and spearfishing gear for Australian
              waters. Built by a freediving instructor who knows the reef.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {["Instagram", "YouTube", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-sand">
              Shop
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-sand">
              Learn
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-sand">
              Stay in the loop
            </h3>
            <p className="mt-4 text-sm text-white/60">
              Get spearfishing tips and new product drops. No spam.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-sand focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-sand px-4 py-2.5 text-sm font-semibold text-ocean transition-colors hover:bg-sand-light"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} CamperDive. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white/60"
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
