"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { ProductOption, ProductVariant } from "@/lib/types";

interface ProductActionsProps {
  slug: string;
  name: string;
  price: number;
  stripePriceId: string;
  image: string;
  options?: ProductOption[];
  variants?: ProductVariant[];
}

export function ProductActions({
  slug,
  name,
  price,
  stripePriceId,
  image,
  options,
  variants,
}: ProductActionsProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const hasOptions = options && options.length > 0;
  const hasVariants = variants && variants.length > 0;

  // Initialise each option dimension to its first value
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    if (!hasOptions) return {};
    const init: Record<string, string> = {};
    for (const opt of options) {
      init[opt.name] = opt.values[0];
    }
    return init;
  });

  // Build combo key from current selections (join in options order with " / ")
  function getComboKey(): string {
    if (!hasOptions) return "Default";
    return options.map((opt) => selections[opt.name]).join(" / ");
  }

  // Look up the matching variant
  const comboKey = getComboKey();
  const activeVariant = hasVariants
    ? variants.find((v) => v.label === comboKey) ?? variants[0]
    : null;
  const activePrice = activeVariant ? activeVariant.price : price;
  const activeStripePriceId = activeVariant
    ? activeVariant.stripePriceId
    : stripePriceId;

  // Build selectedOptions for cart context (e.g. { "Band Type": "Latex", "Tip": "Single Barb" })
  const cartOptions: Record<string, string> = hasOptions
    ? { ...selections }
    : {};

  function handleSelect(optionName: string, value: string) {
    setSelections((prev) => ({ ...prev, [optionName]: value }));
  }

  function handleAdd() {
    addItem(
      {
        slug,
        name,
        price: activePrice,
        stripePriceId: activeStripePriceId,
        image,
        selectedOptions: cartOptions,
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
      {/* Price */}
      <div className="text-3xl font-bold text-charcoal">${activePrice}</div>

      {/* Option Selectors — one row per dimension */}
      {hasOptions &&
        options.map((opt) => (
          <div key={opt.name}>
            <label className="text-sm font-semibold text-charcoal">
              {opt.name}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {opt.values.map((val) => {
                const isSelected = selections[opt.name] === val;
                return (
                  <button
                    key={val}
                    onClick={() => handleSelect(opt.name, val)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-ocean text-white"
                        : "border border-border text-charcoal/60 hover:border-ocean/30 hover:text-charcoal"
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      {/* Single-dimension variants without options field (fallback) */}
      {!hasOptions && hasVariants && variants.length > 1 && (
        <div>
          <label className="text-sm font-semibold text-charcoal">
            Select Option
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isSelected = activeVariant?.label === variant.label;
              return (
                <button
                  key={variant.label}
                  onClick={() =>
                    setSelections({ Default: variant.label })
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-ocean text-white"
                      : "border border-border text-charcoal/60 hover:border-ocean/30 hover:text-charcoal"
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
