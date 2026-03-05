import Image from "next/image";
import Link from "next/link";
import type { Tutorial } from "@/lib/mock-data";

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
        className="group grid overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg md:grid-cols-2"
      >
        <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[280px]">
          <Image
            src={tutorial.image}
            alt={tutorial.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <FormatBadge format={tutorial.format} />
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-dark">
            {tutorial.category}
          </span>
          <h3 className="mt-2 font-heading text-xl font-bold text-charcoal group-hover:text-ocean">
            {tutorial.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            {tutorial.description}
          </p>
          <div className="mt-4">
            <span className="text-sm font-medium text-ocean">
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
      className="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-ocean/20 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={tutorial.image}
          alt={tutorial.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {tutorial.format.includes("Video") && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/90 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="currentColor">
                <path d="M6.5 3.5v11l8-5.5-8-5.5z" />
              </svg>
            </div>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <FormatBadge format={tutorial.format} />
        </div>
      </div>
      <div className="p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-dark">
          {tutorial.category}
        </span>
        <h3 className="mt-1 text-sm font-bold leading-snug text-charcoal transition-colors group-hover:text-ocean">
          {tutorial.title}
        </h3>
        {size === "md" && (
          <p className="mt-1.5 text-xs leading-relaxed text-slate line-clamp-2">
            {tutorial.description}
          </p>
        )}
      </div>
    </Link>
  );
}
