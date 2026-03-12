import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  size?: "md" | "sm";
}

export function ProductCard({ product, size = "md" }: ProductCardProps) {
  const isMd = size === "md";

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group overflow-hidden bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgb(0,0,0,0.06)] ${
        isMd ? "rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)]" : "rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-background ${
          isMd ? "aspect-[5/4]" : "aspect-square"
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            isMd
              ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              : "(max-width: 640px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.mostPopular && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-coral/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:text-[11px]">
            <svg className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Most Popular
          </span>
        )}
      </div>
      <div className={isMd ? "p-3 sm:p-4" : "p-2.5 sm:p-3"}>
        {isMd && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sand-dark sm:text-[11px]">
            {product.category}
          </p>
        )}
        <h3
          className={`font-heading font-bold text-charcoal transition-colors group-hover:text-ocean ${
            isMd ? "mt-0.5 text-sm sm:text-base" : "text-[12px] leading-tight sm:text-[13px]"
          }`}
        >
          {product.name}
        </h3>
        {isMd && (
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate sm:text-sm">
            {product.shortDesc}
          </p>
        )}
        <div className={`flex items-center justify-between ${isMd ? "mt-2 sm:mt-3" : "mt-1.5"}`}>
          <span
            className={`font-bold text-charcoal ${isMd ? "text-sm sm:text-base" : "text-[13px]"}`}
          >
            {product.variants && product.variants.length > 0 ? "From " : ""}${product.price}
          </span>
          {isMd && (
            <span className="text-[11px] font-medium text-ocean sm:text-xs">
              View Details
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
