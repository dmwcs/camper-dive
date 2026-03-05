import Image from "next/image";

interface PageHeaderProps {
  tagline: string;
  title: string;
  description: string;
  backgroundImage?: string;
}

export function PageHeader({
  tagline,
  title,
  description,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-ocean">
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-sand">
          {tagline}
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-white lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/60">{description}</p>
      </div>
    </section>
  );
}
