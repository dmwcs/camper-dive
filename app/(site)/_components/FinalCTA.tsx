import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ocean py-16 sm:py-20">
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
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Ready to dive in?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:text-base">
          Grab a Reef Hunter, watch the tutorials, and hit the water this
          weekend. Your first catch is waiting.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="cursor-pointer rounded-lg bg-sand px-7 py-3.5 text-sm font-semibold text-ocean transition-colors duration-200 hover:bg-sand-light sm:text-base"
          >
            Shop Hand Spears
          </Link>
          <Link
            href="/tutorials"
            className="cursor-pointer rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:text-base"
          >
            Watch Tutorials
          </Link>
        </div>
      </div>
    </section>
  );
}
