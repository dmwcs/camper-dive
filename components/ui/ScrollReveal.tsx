"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("sr-ready");

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

    // Observe all existing [data-sr] elements
    function observeNew(root: ParentNode = document) {
      root.querySelectorAll<HTMLElement>("[data-sr]:not(.sr-visible)").forEach(
        (el) => observer.observe(el)
      );
    }

    observeNew();

    // Watch for new [data-sr] elements added by Suspense streaming
    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.hasAttribute("data-sr")) observer.observe(node);
            observeNew(node);
          }
        }
      }
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [pathname]);

  return null;
}
