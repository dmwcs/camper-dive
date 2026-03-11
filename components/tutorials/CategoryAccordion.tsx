"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface CategoryAccordionProps {
  label: string;
  count: number;
  isActive: boolean;
  onToggle: () => void;
  tutorials: { title: string; slug: string; format: string }[];
}

const formatDot = (format: string) => {
  if (format === "Video") return "bg-coral";
  if (format === "Article + Video") return "bg-sand-dark";
  return "bg-ocean";
};

export function CategoryAccordion({
  label,
  count,
  isActive,
  onToggle,
  tutorials,
}: CategoryAccordionProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (panelRef.current) {
      setHeight(isActive ? panelRef.current.scrollHeight : 0);
    }
  }, [isActive, tutorials.length]);

  return (
    <li>
      <button
        onClick={onToggle}
        aria-expanded={isActive}
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-ocean text-white"
            : "text-charcoal/70 hover:bg-background hover:text-charcoal"
        }`}
      >
        <span className="flex items-center gap-2">
          <svg
            className={`h-3 w-3 shrink-0 transition-transform duration-200 ease-out ${isActive ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {label}
        </span>
        <span className={`text-xs ${isActive ? "text-white/60" : "text-slate-light"}`}>
          {count}
        </span>
      </button>

      {/* Expandable tutorial list */}
      <div
        ref={panelRef}
        className="overflow-hidden transition-[height] duration-250 ease-out motion-reduce:transition-none"
        style={{ height }}
      >
        <ul className="space-y-0.5 pb-1 pl-3 pt-1">
          {tutorials.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tutorials/${t.slug}`}
                className="group flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] text-charcoal/60 transition-colors hover:bg-background hover:text-charcoal"
              >
                <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${formatDot(t.format)}`} />
                <span className="truncate">{t.title}</span>
              </Link>
            </li>
          ))}
          {tutorials.length === 0 && (
            <li className="px-3 py-1.5 text-[12px] text-slate-light italic">
              No tutorials yet
            </li>
          )}
        </ul>
      </div>
    </li>
  );
}
