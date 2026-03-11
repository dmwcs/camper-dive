import { Pulse } from "@/components/ui/Pulse";

export function FeaturedProductsSkeleton() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div>
          <Pulse className="h-3 w-16" />
          <Pulse className="mt-3 h-8 w-52" />
        </div>

        {/* Hero card */}
        <div className="mt-8 grid overflow-hidden rounded-2xl border border-border bg-surface md:grid-cols-2">
          <Pulse className="aspect-[16/10] rounded-none md:aspect-auto md:min-h-[240px]" />
          <div className="flex flex-col justify-center p-5 md:p-8">
            <Pulse className="h-3 w-20" />
            <Pulse className="mt-2 h-7 w-3/4" />
            <Pulse className="mt-3 h-4 w-full" />
            <Pulse className="mt-2 h-4 w-2/3" />
            <Pulse className="mt-5 h-8 w-28" />
          </div>
        </div>

        {/* Compact grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-2.5 sm:p-3"
            >
              <Pulse className="aspect-square rounded-lg" />
              <div className="mt-2.5 px-0.5">
                <Pulse className="h-2.5 w-14" />
                <Pulse className="mt-1.5 h-4 w-full" />
                <Pulse className="mt-2 h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
