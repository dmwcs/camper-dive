import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ocean py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0">
        <Image
          src="/images/coral-reef.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </div>
      <div
        className="relative mx-auto max-w-7xl px-6 text-center lg:px-8"
        data-sr
      >
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Ready to dive in?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:text-base">
          Grab a Reef Hunter, watch the tutorials, and hit the water this
          weekend. Your first catch is waiting.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
          <Link
            href="/products"
            className="cursor-pointer rounded-lg bg-sand px-5 py-3 text-[13px] font-semibold text-ocean transition-colors duration-200 hover:bg-sand-light sm:px-7 sm:py-3.5 sm:text-sm md:text-base"
          >
            Shop Hand Spears
          </Link>
          <Link
            href="/tutorials"
            className="cursor-pointer rounded-lg border border-white/25 px-5 py-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-sm md:text-base"
          >
            Watch Tutorials
          </Link>
        </div>
      </div>
    </section>
  );
}
