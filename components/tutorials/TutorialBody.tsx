import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-3 text-sm leading-[1.7] text-slate sm:mt-4 sm:text-[16.5px]">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="mt-8 mb-3 font-heading text-2xl font-bold leading-snug text-charcoal first:mt-0 sm:mt-10 sm:mb-4 sm:text-3xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 font-heading text-lg font-bold leading-snug text-charcoal first:mt-0 sm:mt-10 sm:mb-4 sm:text-[1.35rem]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 font-heading text-base font-bold leading-snug text-charcoal first:mt-0 sm:mt-8 sm:mb-3 sm:text-lg">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 font-heading text-sm font-bold text-charcoal first:mt-0 sm:mt-6 sm:text-base">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-ocean/30 pl-4 text-sm italic leading-[1.7] text-slate sm:my-6 sm:pl-5 sm:text-[16.5px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-3 space-y-1.5 pl-4 sm:my-4 sm:space-y-2 sm:pl-5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-3 space-y-1.5 pl-4 sm:my-4 sm:space-y-2 sm:pl-5">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc text-sm leading-[1.7] text-slate marker:text-border sm:text-[16.5px]">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="list-decimal text-sm leading-[1.7] text-slate marker:text-slate-light sm:text-[16.5px]">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-ocean underline decoration-ocean/30 underline-offset-2 transition-colors hover:text-ocean-light hover:decoration-ocean/50"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).url();
      return (
        <figure className="my-6 sm:my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={value.alt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-center text-xs text-slate-light">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    video: ({ value }) => {
      if (!value?.file?.asset?._ref) return null;
      const ref = value.file.asset._ref;
      const [, id, ext] = ref.split("-");
      const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${ext}`;
      return (
        <figure className="my-6 sm:my-8">
          <video
            controls
            preload="metadata"
            className="w-full rounded-xl"
          >
            <source src={url} />
          </video>
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-slate-light">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function TutorialBody({ content }: { content: PortableTextBlock[] }) {
  return (
    <div>
      <PortableText value={content} components={components} />
    </div>
  );
}
