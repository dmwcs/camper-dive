import { Pulse } from "@/components/ui/Pulse";

export function TutorialShowcaseSkeleton() {
  return (
    <section className="py-10 sm:py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between">
          <div>
            <Pulse className="h-3 w-24" />
            <Pulse className="mt-2 h-7 w-64 sm:w-80" />
            <Pulse className="mt-2 h-4 w-48 sm:w-72" />
          </div>
          <Pulse className="hidden h-4 w-24 sm:block" />
        </div>

        {/* Featured tutorial skeleton */}
        <div className="mt-6 sm:mt-8">
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <Pulse className="aspect-[21/9] rounded-none" />
            <div className="p-5">
              <Pulse className="h-3 w-20" />
              <Pulse className="mt-2 h-7 w-3/4" />
              <Pulse className="mt-2 h-4 w-full" />
            </div>
          </div>

          {/* Two smaller tutorials */}
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
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

        {/* Mobile "Browse all" link placeholder */}
        <div className="mt-6 text-center sm:hidden">
          <Pulse className="mx-auto h-4 w-36" />
        </div>
      </div>
    </section>
  );
}
