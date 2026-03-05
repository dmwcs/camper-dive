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
          isMd ? "aspect-[4/3] sm:aspect-[3/2]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            isMd
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              : "(max-width: 640px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={isMd ? "p-4 sm:p-5" : "p-4"}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sand-dark sm:text-xs">
          {product.category}
        </p>
        <h3
          className={`mt-1 font-heading font-bold text-charcoal transition-colors group-hover:text-ocean ${
            isMd ? "text-base sm:text-lg" : "text-sm sm:text-base"
          }`}
        >
          {product.name}
        </h3>
        {isMd && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate">
            {product.shortDesc}
          </p>
        )}
        <div className={`flex items-center justify-between ${isMd ? "mt-3 sm:mt-4" : "mt-3"}`}>
          <span
            className={`font-bold text-charcoal ${isMd ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}
          >
            ${product.price}
          </span>
          <span className="text-xs font-medium text-ocean sm:text-sm">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
