"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("sr-ready");

    // Small delay to let the new page DOM render
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll("[data-sr]:not(.sr-visible)");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = parseInt(el.dataset.sr || "0", 10);
              if (delay > 0) {
                setTimeout(() => el.classList.add("sr-visible"), delay);
              } else {
                el.classList.add("sr-visible");
              }
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
