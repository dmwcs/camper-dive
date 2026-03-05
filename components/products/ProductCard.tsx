import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  size?: "md" | "sm";
}

export function ProductCard({ product, size = "md" }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-ocean/20 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-sand-dark">
          {product.category}
        </p>
        <h3 className="mt-1 font-heading text-lg font-bold text-charcoal transition-colors group-hover:text-ocean">
          {product.name}
        </h3>
        {size === "md" && (
          <p className="mt-1 text-sm text-slate">{product.shortDesc}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-charcoal">
            ${product.price}
          </span>
          <span className="text-sm font-medium text-ocean">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
