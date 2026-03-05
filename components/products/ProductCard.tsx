import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  size?: "md" | "sm";
}

export function ProductCard({ product, size = "md" }: ProductCardProps) {
  const isMd = size === "md";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-ocean/20 hover:shadow-lg"
    >
      <div
        className={`relative overflow-hidden bg-background ${
          isMd ? "aspect-[5/4]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            isMd
              ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              : "(max-width: 640px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={isMd ? "p-3 sm:p-4" : "p-3"}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-sand-dark sm:text-[11px]">
          {product.category}
        </p>
        <h3
          className={`mt-0.5 font-heading font-bold text-charcoal transition-colors group-hover:text-ocean ${
            isMd ? "text-sm sm:text-base" : "text-[13px] sm:text-sm"
          }`}
        >
          {product.name}
        </h3>
        {isMd && (
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate sm:text-sm">
            {product.shortDesc}
          </p>
        )}
        <div className={`flex items-center justify-between ${isMd ? "mt-2 sm:mt-3" : "mt-2"}`}>
          <span
            className={`font-bold text-charcoal ${isMd ? "text-sm sm:text-base" : "text-sm"}`}
          >
            ${product.price}
          </span>
          <span className="text-[11px] font-medium text-ocean sm:text-xs">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
