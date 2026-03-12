"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface ProductCarouselProps {
  children: React.ReactNode;
  /** Tailwind class for each slide's width, e.g. "basis-1/2 lg:basis-1/4" */
  slideClass?: string;
  /** Allow free-scroll momentum (default false — snaps to slides) */
  dragFree?: boolean;
}

export function ProductCarousel({
  children,
  slideClass = "basis-1/2 lg:basis-1/4",
  dragFree = false,
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Nav arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous"
        className={`absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-surface p-3 shadow-lg transition-all duration-200 hover:bg-background lg:flex ${
          canPrev ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        aria-label="Next"
        className={`absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-surface p-3 shadow-lg transition-all duration-200 hover:bg-background lg:flex ${
          canNext ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Viewport */}
      <div className="-mx-2 overflow-hidden px-2 pb-2" ref={emblaRef}>
        <div className="-ml-4 flex">
          {Array.isArray(children)
            ? children.map((child, i) => (
                <div
                  key={i}
                  className={`flex min-w-0 shrink-0 grow-0 pl-4 [&>*]:w-full ${slideClass}`}
                >
                  {child}
                </div>
              ))
            : children}
        </div>
      </div>
    </div>
  );
}
