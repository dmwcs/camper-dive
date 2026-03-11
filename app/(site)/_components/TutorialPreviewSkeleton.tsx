import { Pulse } from "@/components/ui/Pulse";

export function TutorialPreviewSkeleton() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div>
          <Pulse className="h-3 w-12" />
          <Pulse className="mt-3 h-8 w-56" />
          <Pulse className="mt-3 h-4 w-80 max-w-full" />
        </div>

        {/* 3-card grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-surface"
            >
              <Pulse className="aspect-[16/10] rounded-none" />
              <div className="p-3 sm:p-4">
                <Pulse className="h-2.5 w-16" />
                <Pulse className="mt-2 h-5 w-full" />
                <Pulse className="mt-2 h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
