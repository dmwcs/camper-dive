"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { ProductOption } from "@/lib/types";

interface ProductActionsProps {
  slug: string;
  name: string;
  price: number;
  image: string;
  options?: ProductOption[];
}

export function ProductActions({
  slug,
  name,
  price,
  image,
  options,
}: ProductActionsProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    if (!options) return {};
    const defaults: Record<string, string> = {};
    options.forEach((opt) => {
      defaults[opt.name] = opt.values[0];
    });
    return defaults;
  });
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        slug,
        name,
        price,
        image,
        selectedOptions,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  }

  return (
    <div className="mt-6 space-y-5">
      {/* Option Selectors */}
      {options?.map((option) => (
        <div key={option.name}>
          <label className="text-sm font-semibold text-charcoal">
            {option.name}
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              return (
                <button
                  key={value}
                  onClick={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [option.name]: value,
                    }))
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-ocean text-white"
                      : "border border-border text-charcoal/60 hover:border-ocean/30 hover:text-charcoal"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-charcoal">Quantity</label>
        <div className="inline-flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="flex h-10 w-10 items-center justify-center text-lg text-slate transition-colors hover:text-charcoal disabled:opacity-30"
          >
            -
          </button>
          <span className="w-10 text-center text-sm font-semibold text-charcoal">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            className="flex h-10 w-10 items-center justify-center text-lg text-slate transition-colors hover:text-charcoal disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={added}
        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition-all ${
          added
            ? "bg-green-600"
            : "bg-ocean hover:bg-ocean-light"
        }`}
      >
        {added ? (
          <span className="inline-flex items-center gap-2">
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Added!
          </span>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
