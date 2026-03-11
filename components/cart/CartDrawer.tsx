"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, type CartItem } from "@/lib/cart-context";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    totalItems,
    totalPrice,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isCartOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-charcoal/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-charcoal">
            Your Cart
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-slate">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition-colors hover:bg-background hover:text-charcoal"
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                className="text-slate-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p className="mt-4 text-sm font-medium text-charcoal">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-slate">
                Add some gear to get started.
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="mt-6 rounded-lg bg-ocean px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-light"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const optionsKey = Object.keys(item.selectedOptions)
                  .sort()
                  .map((k) => `${k}:${item.selectedOptions[k]}`)
                  .join("|");
                return (
                  <li
                    key={`${item.slug}::${optionsKey}`}
                    className="flex gap-4 rounded-xl border border-border bg-background p-3"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold leading-tight text-charcoal">
                            {item.name}
                          </p>
                          {Object.keys(item.selectedOptions).length > 0 && (
                            <p className="mt-0.5 text-[11px] text-slate">
                              {Object.entries(item.selectedOptions)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(" · ")}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.slug, item.selectedOptions)
                          }
                          className="shrink-0 text-slate-light transition-colors hover:text-coral"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity + Price */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.selectedOptions,
                                item.quantity - 1,
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-7 w-7 items-center justify-center text-sm text-slate transition-colors hover:text-charcoal disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.selectedOptions,
                                item.quantity + 1,
                              )
                            }
                            disabled={item.quantity >= 10}
                            className="flex h-7 w-7 items-center justify-center text-sm text-slate transition-colors hover:text-charcoal disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold text-charcoal">
                          ${(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate">Subtotal</span>
              <span className="text-lg font-bold text-charcoal">
                ${totalPrice.toFixed(0)}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-light">
              Shipping calculated at checkout
            </p>
            <CheckoutButton items={items} />
          </div>
        )}
      </aside>
    </>
  );
}

function CheckoutButton({ items }: { items: CartItem[] }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            stripePriceId: item.stripePriceId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="mt-4 w-full rounded-lg bg-ocean py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-light disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Checkout"}
    </button>
  );
}
