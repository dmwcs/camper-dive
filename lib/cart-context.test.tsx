import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { CartProvider, useCartData, type CartItem } from "@/lib/cart-context";
import { ClearCart } from "@/app/(site)/order-confirmation/_components/ClearCart";

// Mock next/dynamic — CartDrawer is not relevant to these tests
vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

/* ── Test helpers ── */

const STORAGE_KEY = "camperdive-cart";

const mockItem: Omit<CartItem, "quantity"> = {
  slug: "dive-mask-pro",
  name: "Dive Mask Pro",
  price: 120,
  stripePriceId: "price_test_123",
  image: "/images/product-mask.jpg",
  selectedOptions: { color: "Black" },
};

const mockItem2: Omit<CartItem, "quantity"> = {
  slug: "wetsuit-3mm",
  name: "Wetsuit 3mm",
  price: 250,
  stripePriceId: "price_test_456",
  image: "/images/product-wetsuit.jpg",
  selectedOptions: { size: "M" },
};

/**
 * A helper component that exposes cart actions via buttons
 * so we can trigger them from tests.
 */
function CartTestHarness() {
  const { items, totalItems, totalPrice, addItem, clearCart } = useCartData();

  return (
    <div>
      <span data-testid="total-items">{totalItems}</span>
      <span data-testid="total-price">{totalPrice}</span>
      <span data-testid="item-count">{items.length}</span>
      <button onClick={() => addItem(mockItem, 1)}>Add Item 1</button>
      <button onClick={() => addItem(mockItem2, 2)}>Add Item 2</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
      <ul data-testid="item-list">
        {items.map((item) => (
          <li key={item.slug + JSON.stringify(item.selectedOptions)}>
            {item.name} x{item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Tests ── */

describe("Cart integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with an empty cart", () => {
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>,
    );

    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0");
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
  });

  it("adds items and updates totals", async () => {
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>,
    );

    await act(() => screen.getByText("Add Item 1").click());

    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent("120");
    expect(screen.getByText("Dive Mask Pro x1")).toBeInTheDocument();

    await act(() => screen.getByText("Add Item 2").click());

    expect(screen.getByTestId("total-items")).toHaveTextContent("3"); // 1 + 2
    expect(screen.getByTestId("total-price")).toHaveTextContent("620"); // 120 + 250*2
  });

  it("clearCart empties items and removes localStorage", async () => {
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>,
    );

    // Add items
    await act(() => screen.getByText("Add Item 1").click());
    await act(() => screen.getByText("Add Item 2").click());
    expect(screen.getByTestId("total-items")).toHaveTextContent("3");

    // Clear
    await act(() => screen.getByText("Clear Cart").click());

    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0");
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored === null || stored === "[]").toBe(true);
  });

  it("persists cart to localStorage and hydrates on remount", async () => {
    const { unmount } = render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>,
    );

    await act(() => screen.getByText("Add Item 1").click());
    expect(screen.getByTestId("total-items")).toHaveTextContent("1");

    // Verify localStorage has data
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toHaveLength(1);

    // Unmount and remount — should hydrate from localStorage
    unmount();

    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>,
    );

    // After hydration effect runs
    await act(() => {});
    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    expect(screen.getByText("Dive Mask Pro x1")).toBeInTheDocument();
  });
});

describe("ClearCart component (order confirmation)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("clears cart and localStorage when mounted", async () => {
    // Pre-fill localStorage with cart data
    const prefilledItems: CartItem[] = [
      { ...mockItem, quantity: 1 },
      { ...mockItem2, quantity: 2 },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefilledItems));

    render(
      <CartProvider>
        <CartTestHarness />
        <ClearCart />
      </CartProvider>,
    );

    // ClearCart fires clearCart() on mount via useEffect
    await act(() => {});

    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored === null || stored === "[]").toBe(true);
  });
});
