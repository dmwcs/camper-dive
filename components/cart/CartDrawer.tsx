"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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

  const drawerRef = useRef<HTMLElement>(null);

  // Close on Escape + lock body scroll
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isCartOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      // Focus trap — focus the drawer
      drawerRef.current?.focus();
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
        className={`fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-surface shadow-2xl outline-none transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className="text-ocean"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <h2 className="font-heading text-lg font-bold text-charcoal">
              Cart
            </h2>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ocean/10 px-1.5 text-[11px] font-semibold text-ocean">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate transition-colors hover:bg-background hover:text-charcoal"
            aria-label="Close cart"
          >
            <svg
              width="18"
              height="18"
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

        {/* Divider */}
        <div className="mx-5 border-t border-border" />

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            /* ── Empty State ── */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background">
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  className="text-slate-light"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold text-charcoal">
                Your cart is empty
              </p>
              <p className="mt-1 text-[13px] text-slate">
                Add some gear to get started.
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="mt-5 rounded-lg bg-ocean px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-light"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            /* ── Item List ── */
            <ul className="space-y-3">
              {items.map((item) => {
                const optionsKey = Object.keys(item.selectedOptions)
                  .sort()
                  .map((k) => `${k}:${item.selectedOptions[k]}`)
                  .join("|");
                const hasOptions = Object.keys(item.selectedOptions).length > 0;
                return (
                  <li
                    key={`${item.slug}::${optionsKey}`}
                    className="flex gap-3.5 rounded-xl border border-border p-3 transition-colors hover:border-border/80"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-background">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13px] font-semibold leading-snug text-charcoal">
                            {item.name}
                          </p>
                          <button
                            onClick={() =>
                              removeItem(item.slug, item.selectedOptions)
                            }
                            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded text-slate-light transition-colors hover:bg-coral/10 hover:text-coral"
                            aria-label={`Remove ${item.name}`}
                          >
                            <svg
                              width="14"
                              height="14"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        {hasOptions && (
                          <p className="mt-0.5 text-[11px] text-slate">
                            {Object.entries(item.selectedOptions)
                              .map(([, v]) => v)
                              .join(" / ")}
                          </p>
                        )}
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
                            className="flex h-7 w-7 cursor-pointer items-center justify-center text-sm text-slate transition-colors hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-[12px] font-semibold text-charcoal">
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
                            className="flex h-7 w-7 cursor-pointer items-center justify-center text-sm text-slate transition-colors hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-30"
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

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate">Subtotal</span>
              <span className="text-lg font-bold text-charcoal">
                ${totalPrice.toFixed(0)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-light">
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout */}
            <CheckoutButton items={items} />

            {/* Continue shopping */}
            <Link
              href="/products"
              onClick={closeCart}
              className="mt-2 block text-center text-[13px] font-medium text-ocean transition-colors hover:text-ocean-light"
            >
              Continue Shopping
            </Link>
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
      className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-ocean py-3 text-sm font-semibold text-white transition-all hover:bg-ocean-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Redirecting...
        </>
      ) : (
        <>
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          Checkout
        </>
      )}
    </button>
  );
}
