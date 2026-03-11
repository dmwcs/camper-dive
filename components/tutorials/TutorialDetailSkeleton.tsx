import { Pulse } from "@/components/ui/Pulse";

export function TutorialDetailSkeleton() {
  return (
    <div className="bg-surface">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl bg-charcoal/10 sm:rounded-3xl">
          <div className="px-5 pb-8 pt-6 sm:px-8 sm:pb-12 sm:pt-10 lg:px-12 lg:pb-14 lg:pt-12">
            <div className="flex items-center gap-1.5">
              <Pulse className="h-3.5 w-16 bg-white/10" />
              <Pulse className="h-3.5 w-4 bg-white/10" />
              <Pulse className="h-3.5 w-24 bg-white/10" />
            </div>
            <div className="mt-5 flex items-center gap-2.5">
              <Pulse className="h-6 w-20 rounded-full bg-white/10" />
              <Pulse className="h-4 w-24 bg-white/10" />
            </div>
            <Pulse className="mt-4 h-10 w-3/4 bg-white/10 sm:h-12" />
            <Pulse className="mt-3 h-5 w-full max-w-2xl bg-white/10" />
            <Pulse className="mt-2 h-5 w-2/3 max-w-xl bg-white/10" />
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="my-6 h-px bg-border sm:my-10" />
        <div className="pb-8 sm:pb-12">
          <div className="mx-auto max-w-3xl space-y-4">
            <Pulse className="h-5 w-full" />
            <Pulse className="h-5 w-full" />
            <Pulse className="h-5 w-4/5" />
            <Pulse className="mt-6 h-5 w-full" />
            <Pulse className="h-5 w-full" />
            <Pulse className="h-5 w-3/5" />
            <Pulse className="mt-6 h-5 w-full" />
            <Pulse className="h-5 w-full" />
            <Pulse className="h-5 w-2/3" />
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Pulse className="h-3 w-20" />
          <Pulse className="mt-2 h-6 w-40" />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
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
    </div>
  );
}
