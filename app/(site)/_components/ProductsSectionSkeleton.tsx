import { Pulse } from "@/components/ui/Pulse";

export function ProductsSectionSkeleton() {
  return (
    <section className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between">
          <div>
            <Pulse className="h-3 w-20" />
            <Pulse className="mt-2 h-7 w-52 sm:w-64" />
          </div>
          <Pulse className="h-4 w-16" />
        </div>

        {/* Popular product carousel skeleton */}
        <div className="mt-8 sm:mt-10">
          <div className="overflow-hidden rounded-2xl bg-surface shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <div className="grid md:grid-cols-2">
              <Pulse className="aspect-[16/9] rounded-none sm:aspect-[4/3] md:aspect-auto md:min-h-[360px] lg:min-h-[420px]" />
              <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-12">
                <Pulse className="h-3 w-20" />
                <Pulse className="mt-2 h-8 w-3/4" />
                <Pulse className="mt-3 h-4 w-full" />
                <Pulse className="mt-1.5 h-4 w-2/3" />
                <div className="mt-6 hidden space-y-2 sm:block">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Pulse key={i} className="h-4 w-48" />
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <Pulse className="h-8 w-20" />
                  <Pulse className="h-11 w-32 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More to Explore skeleton */}
        <div className="mt-10 sm:mt-12 md:mt-14">
          <Pulse className="mb-4 h-3 w-28 sm:mb-5" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
                <Pulse className="aspect-[4/3] rounded-none" />
                <div className="p-3 sm:p-4">
                  <Pulse className="h-2.5 w-16" />
                  <Pulse className="mt-2 h-5 w-full" />
                  <Pulse className="mt-1 h-4 w-2/3" />
                  <Pulse className="mt-3 h-5 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
