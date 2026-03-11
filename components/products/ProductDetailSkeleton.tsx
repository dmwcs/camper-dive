import { Pulse } from "@/components/ui/Pulse";

export function ProductDetailSkeleton() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <header className="pt-8 pb-6 sm:pt-12 sm:pb-8">
          <div className="flex items-center gap-1.5">
            <Pulse className="h-3.5 w-16" />
            <Pulse className="h-3.5 w-4" />
            <Pulse className="h-3.5 w-20" />
          </div>
          <Pulse className="mt-5 h-6 w-24 rounded-full" />
          <Pulse className="mt-4 h-10 w-3/4 sm:h-12" />
          <Pulse className="mt-4 h-5 w-full" />
          <Pulse className="mt-2 h-5 w-2/3" />
        </header>

        {/* Product layout */}
        <div className="grid gap-6 pb-8 sm:gap-10 sm:pb-12 md:grid-cols-2">
          {/* Gallery */}
          <Pulse className="aspect-square rounded-2xl" />

          {/* Details */}
          <div className="flex flex-col justify-center">
            <Pulse className="h-9 w-28" />
            <Pulse className="mt-6 h-12 w-full rounded-xl" />
            <Pulse className="mt-4 h-12 w-full rounded-xl" />

            {/* Specs */}
            <div className="mt-8 border-t border-border pt-6">
              <Pulse className="h-4 w-28" />
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <Pulse className="h-3 w-16" />
                    <Pulse className="mt-1 h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 border-t border-border pt-6">
              <Pulse className="h-4 w-28" />
              <div className="mt-3 space-y-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Pulse key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-border bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Pulse className="h-3 w-24" />
          <Pulse className="mt-2 h-6 w-48" />
          <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-6 sm:grid-cols-3 sm:gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                <Pulse className="aspect-[4/3] rounded-none" />
                <div className="p-3">
                  <Pulse className="h-2.5 w-14" />
                  <Pulse className="mt-1.5 h-4 w-full" />
                  <Pulse className="mt-2 h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
