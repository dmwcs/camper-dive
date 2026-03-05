"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
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

const playOverlay = (
  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/30">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ocean/90 shadow-lg transition-transform hover:scale-110 sm:h-16 sm:w-16">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="ml-1 text-white"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  </div>
);

export function ProductGallery({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const active = media[activeIndex];

  // Build lightbox slides from video items only
  const videoSlides = media
    .map((item, i) => ({ item, originalIndex: i }))
    .filter(({ item }) => item.type === "video")
    .map(({ item }) => ({
      type: "video" as const,
      width: 1280,
      height: 720,
      sources: [{ src: item.src, type: "video/mp4" }],
    }));

  function openVideo(mediaSrc: string) {
    const idx = videoSlides.findIndex((s) =>
      s.sources.some((src) => src.src === mediaSrc)
    );
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  }

  return (
    <>
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
            <button
              onClick={() => openVideo(active.src)}
              className="group relative h-full w-full cursor-pointer"
            >
              <video
                key={active.src}
                src={`${active.src}#t=0.1`}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              {playOverlay}
            </button>
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
                  <div className="relative flex h-full w-full items-center justify-center">
                    <video
                      src={`${item.src}#t=0.1`}
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {playIcon}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Video Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={videoSlides}
        plugins={[Video]}
        video={{ autoPlay: true }}
        carousel={{ finite: videoSlides.length <= 1 }}
        render={{
          buttonPrev: videoSlides.length <= 1 ? () => null : undefined,
          buttonNext: videoSlides.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
}
