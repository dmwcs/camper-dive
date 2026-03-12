"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface ProductCarouselProps {
  children: React.ReactNode;
  /** Tailwind class for each slide's width, e.g. "basis-1/2 lg:basis-1/4" */
  slideClass?: string;
  /** Allow free-scroll momentum (default false — snaps to slides) */
  dragFree?: boolean;
  /** Enable slow auto-scroll (default false) */
  autoplay?: boolean;
  /** Bottom offset (px) for arrow centering — use to exclude card text area */
  arrowOffset?: number;
}

export function ProductCarousel({
  children,
  slideClass = "basis-1/2 lg:basis-1/4",
  dragFree = false,
  autoplay = false,
  arrowOffset = 0,
}: ProductCarouselProps) {
  const plugins = useMemo(
    () =>
      autoplay
        ? [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
        : [],
    [autoplay]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      dragFree,
      loop: autoplay,
    },
    plugins
  );

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

    // Initialize state immediately
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Nav arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous"
        style={{ bottom: arrowOffset }}
        className={`absolute -left-2 top-0 z-10 my-auto flex h-fit items-center justify-center rounded-full border border-border bg-surface p-3 shadow-lg transition-all duration-200 sm:-left-5 ${
          canPrev
            ? "cursor-pointer opacity-100 hover:bg-background"
            : "pointer-events-none opacity-0 shadow-none"
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
        style={{ bottom: arrowOffset }}
        className={`absolute -right-2 top-0 z-10 my-auto flex h-fit items-center justify-center rounded-full border border-border bg-surface p-3 shadow-lg transition-all duration-200 sm:-right-5 ${
          canNext
            ? "cursor-pointer opacity-100 hover:bg-background"
            : "pointer-events-none opacity-0 shadow-none"
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
      <div className="-mx-2 overflow-hidden px-2" ref={emblaRef}>
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
