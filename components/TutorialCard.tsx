import Image from "next/image";
import Link from "next/link";
import type { Tutorial } from "@/lib/types";

function FormatBadge({ format }: { format: Tutorial["format"] }) {
  const color =
    format === "Article"
      ? "bg-ocean/90"
      : format === "Video"
        ? "bg-coral/90"
        : "bg-sand-dark/90";
  return (
    <span
      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm ${color}`}
    >
      {format}
    </span>
  );
}

interface TutorialCardProps {
  tutorial: Tutorial;
  size?: "lg" | "md" | "sm";
}

export function TutorialCard({ tutorial, size = "md" }: TutorialCardProps) {
  if (size === "lg") {
    return (
      <Link
        href={`/tutorials/${tutorial.slug}`}
        className="group grid overflow-hidden rounded-xl bg-surface shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] sm:rounded-2xl md:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[220px]">
          <Image
            src={tutorial.image}
            alt={tutorial.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3">
            <FormatBadge format={tutorial.format} />
          </div>
        </div>
        <div className="flex flex-col justify-center p-4 sm:p-6 md:p-8">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-sand-dark sm:text-xs">
            {tutorial.category}
          </span>
          <h3 className="mt-1.5 font-heading text-base font-bold text-charcoal group-hover:text-ocean sm:mt-2 sm:text-xl">
            {tutorial.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate sm:mt-2 sm:text-sm">
            {tutorial.description}
          </p>
          <div className="mt-3 sm:mt-4">
            <span className="text-xs font-medium text-ocean sm:text-sm">
              Read more &rarr;
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="group overflow-hidden rounded-xl bg-surface shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={tutorial.image}
          alt={tutorial.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {tutorial.format.includes("Video") && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean/90 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
              <svg width="12" height="12" viewBox="0 0 18 18" fill="currentColor" className="sm:h-3.5 sm:w-3.5">
                <path d="M6.5 3.5v11l8-5.5-8-5.5z" />
              </svg>
            </div>
          </div>
        )}
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <FormatBadge format={tutorial.format} />
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-sand-dark sm:text-[11px]">
          {tutorial.category}
        </span>
        <h3 className="mt-0.5 text-[13px] font-bold leading-snug text-charcoal transition-colors group-hover:text-ocean sm:text-sm">
          {tutorial.title}
        </h3>
        {size === "md" && (
          <p className="mt-1 hidden text-xs leading-relaxed text-slate line-clamp-2 sm:block">
            {tutorial.description}
          </p>
        )}
      </div>
    </Link>
  );
}
