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

  // Build selectedOptions for cart context
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
    <div className="mt-5 space-y-5">
      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-charcoal sm:text-3xl">
          ${activePrice}
        </span>
        <span className="text-sm text-slate">AUD</span>
      </div>

      {/* Option Selectors — one row per dimension */}
      {hasOptions &&
        options.map((opt) => (
          <fieldset key={opt.name}>
            <legend className="text-[13px] font-semibold text-charcoal">
              {opt.name}
              <span className="ml-2 font-normal text-slate">
                {selections[opt.name]}
              </span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {opt.values.map((val) => {
                const isSelected = selections[opt.name] === val;
                return (
                  <button
                    key={val}
                    onClick={() => handleSelect(opt.name, val)}
                    className={`cursor-pointer rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-all ${
                      isSelected
                        ? "border-ocean bg-ocean/5 text-ocean ring-1 ring-ocean/20"
                        : "border-border text-charcoal/70 hover:border-ocean/30 hover:text-charcoal"
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

      {/* Single-dimension variants without options field (fallback) */}
      {!hasOptions && hasVariants && variants.length > 1 && (
        <fieldset>
          <legend className="text-[13px] font-semibold text-charcoal">
            Select Option
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isSelected = activeVariant?.label === variant.label;
              return (
                <button
                  key={variant.label}
                  onClick={() =>
                    setSelections({ Default: variant.label })
                  }
                  className={`cursor-pointer rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-all ${
                    isSelected
                      ? "border-ocean bg-ocean/5 text-ocean ring-1 ring-ocean/20"
                      : "border-border text-charcoal/70 hover:border-ocean/30 hover:text-charcoal"
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Quantity + Add to Cart — side by side */}
      <div className="flex items-stretch gap-3">
        {/* Quantity Selector */}
        <div className="inline-flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="flex h-11 w-10 cursor-pointer items-center justify-center text-lg text-slate transition-colors hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-30"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-semibold text-charcoal">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            className="flex h-11 w-10 cursor-pointer items-center justify-center text-lg text-slate transition-colors hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-30"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={added}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-all ${
            added
              ? "bg-green-600"
              : "bg-ocean hover:bg-ocean-light active:scale-[0.98]"
          }`}
        >
          {added ? (
            <>
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
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
