import Image from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  tagline: string;
  title: string;
  description: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({
  tagline,
  title,
  description,
  backgroundImage,
  breadcrumbs,
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
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-1.5 text-[13px] text-white/60">
            {breadcrumbs.map((item, i) => (
              <span key={item.label} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/40">/</span>}
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-white/90">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
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
