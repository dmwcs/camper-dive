import { Pulse } from "@/components/ui/Pulse";

export function ProductsListSkeleton() {
  return (
    <>
      {/* Filter bar */}
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 py-3 shadow-sm backdrop-blur-sm sm:py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:gap-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          {/* Category pills */}
          <div className="flex gap-1.5 sm:gap-2">
            {["All", "Spearguns", "Accessories", "Diving Gear"].map((cat) => (
              <Pulse key={cat} className="h-[30px] w-16 shrink-0 rounded-full sm:h-9 sm:w-24" />
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex w-full items-center gap-2 lg:w-auto">
            <Pulse className="h-[38px] min-w-0 flex-1 rounded-full lg:w-72 lg:flex-none" />
            <Pulse className="h-[38px] w-[140px] shrink-0 rounded-full sm:w-48" />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="min-h-[60vh] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Pulse className="mb-5 h-4 w-24 sm:mb-6" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
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
      </section>
    </>
  );
}
