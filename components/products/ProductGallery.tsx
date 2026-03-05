"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/types";

const playIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white drop-shadow-md"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

export function ProductGallery({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {/* Main View */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background sm:aspect-square sm:rounded-2xl">
        {active.type === "image" ? (
          <Image
            src={active.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={activeIndex === 0}
          />
        ) : (
          <video
            key={active.src}
            src={active.src}
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:gap-2">
          {media.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              onClick={() => setActiveIndex(i)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:h-16 sm:w-16 sm:rounded-lg ${
                i === activeIndex
                  ? "border-ocean"
                  : "border-transparent hover:border-border"
              }`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-charcoal/80">
                  {playIcon}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
