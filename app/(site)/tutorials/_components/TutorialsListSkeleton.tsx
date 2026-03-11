import { Pulse } from "@/components/ui/Pulse";

export function TutorialsListSkeleton() {
  return (
    <>
      {/* Mobile pills */}
      <section className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur-sm lg:hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1.5 overflow-x-auto py-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Pulse key={i} className="h-8 w-20 shrink-0 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="min-h-[60vh] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-10">
            {/* Sidebar skeleton (desktop) */}
            <aside className="hidden lg:col-span-1 lg:block">
              <nav className="sticky top-24">
                <Pulse className="h-3 w-20" />
                <div className="mt-3 space-y-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Pulse key={i} className="h-9 w-full rounded-lg" />
                  ))}
                </div>
              </nav>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-3">
              <Pulse className="mb-4 h-4 w-24 sm:mb-6" />

              {/* Featured skeleton */}
              <div className="mb-4 hidden overflow-hidden rounded-xl border border-border bg-surface sm:mb-6 lg:block">
                <Pulse className="aspect-[21/9] rounded-none" />
                <div className="p-5">
                  <Pulse className="h-3 w-20" />
                  <Pulse className="mt-2 h-7 w-3/4" />
                  <Pulse className="mt-2 h-4 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
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
          </div>
        </div>
      </section>
    </>
  );
}
