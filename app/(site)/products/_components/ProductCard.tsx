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
          <span className="absolute left-2 top-2 rounded-full bg-ocean px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm sm:left-3 sm:top-3 sm:text-[11px]">
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
