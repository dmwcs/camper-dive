"use client";

import { useEffect, useState, useCallback } from "react";

const trustBadges = [
  {
    label: "Free Shipping Australia-wide",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: "Lifetime Warranty",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: "Free Tutorials",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

const AUTO_PLAY_MS = 4000;

export function TrustBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((direction: "prev" | "next") => {
    setActiveIndex((prev) =>
      direction === "prev"
        ? (prev - 1 + trustBadges.length) % trustBadges.length
        : (prev + 1) % trustBadges.length,
    );
    // Pause auto-play briefly after manual interaction
    setPaused(true);
  }, []);

  // Auto-play
  useEffect(() => {
    if (paused) {
      const resume = setTimeout(() => setPaused(false), AUTO_PLAY_MS * 2);
      return () => clearTimeout(resume);
    }
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trustBadges.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="bg-ocean text-white">
      {/* ── Desktop (lg+): static row ── */}
      <div className="mx-auto hidden max-w-7xl items-center justify-center gap-x-16 px-6 py-3.5 text-sm font-bold uppercase tracking-widest lg:flex lg:gap-x-20">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2">
            <span className="text-sand">{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>

      {/* ── Mobile + Tablet (<lg): carousel ── */}
      <div className="relative flex items-center py-2.5 lg:hidden">
        {/* Left arrow */}
        <button
          onClick={() => go("prev")}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-white/50 transition-colors hover:text-white active:text-white"
          aria-label="Previous"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Sliding content */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex w-full shrink-0 items-center justify-center gap-2 px-2 text-xs font-bold uppercase tracking-widest sm:text-sm"
              >
                <span className="shrink-0 text-sand">{badge.icon}</span>
                <span className="whitespace-nowrap">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => go("next")}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-white/50 transition-colors hover:text-white active:text-white"
          aria-label="Next"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>
    </div>
  );
}
