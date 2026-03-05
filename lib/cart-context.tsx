"use client";

import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false },
);

/* ── Types ── */

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: Record<string, string>;
}

interface CartDataValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (slug: string, selectedOptions: Record<string, string>) => void;
  updateQuantity: (
    slug: string,
    selectedOptions: Record<string, string>,
    quantity: number,
  ) => void;
  clearCart: () => void;
}

interface CartUIValue {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

/* ── Helpers ── */

function cartItemKey(slug: string, options: Record<string, string>): string {
  const sorted = Object.keys(options)
    .sort()
    .map((k) => `${k}:${options[k]}`)
    .join("|");
  return `${slug}::${sorted}`;
}

const STORAGE_KEY = "camperdive-cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

/* ── Reducer ── */

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity">; quantity: number }
  | {
      type: "REMOVE_ITEM";
      slug: string;
      selectedOptions: Record<string, string>;
    }
  | {
      type: "UPDATE_QUANTITY";
      slug: string;
      selectedOptions: Record<string, string>;
      quantity: number;
    }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "HYDRATE":
      return action.items;

    case "ADD_ITEM": {
      const key = cartItemKey(action.item.slug, action.item.selectedOptions);
      const idx = state.findIndex(
        (i) => cartItemKey(i.slug, i.selectedOptions) === key,
      );
      if (idx >= 0) {
        return state.map((item, i) =>
          i === idx
            ? { ...item, quantity: Math.min(item.quantity + action.quantity, 10) }
            : item,
        );
      }
      return [
        ...state,
        { ...action.item, quantity: Math.min(action.quantity, 10) },
      ];
    }

    case "REMOVE_ITEM": {
      const key = cartItemKey(action.slug, action.selectedOptions);
      return state.filter(
        (i) => cartItemKey(i.slug, i.selectedOptions) !== key,
      );
    }

    case "UPDATE_QUANTITY": {
      const key = cartItemKey(action.slug, action.selectedOptions);
      const clamped = Math.max(1, Math.min(action.quantity, 10));
      return state.map((item) =>
        cartItemKey(item.slug, item.selectedOptions) === key
          ? { ...item, quantity: clamped }
          : item,
      );
    }

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

/* ── Contexts ── */

const CartDataContext = createContext<CartDataValue | null>(null);
const CartUIContext = createContext<CartUIValue | null>(null);

export function useCartData(): CartDataValue {
  const ctx = useContext(CartDataContext);
  if (!ctx) throw new Error("useCartData must be used within CartProvider");
  return ctx;
}

export function useCartUI(): CartUIValue {
  const ctx = useContext(CartUIContext);
  if (!ctx) throw new Error("useCartUI must be used within CartProvider");
  return ctx;
}

/** Convenience hook that combines both contexts */
export function useCart(): CartDataValue & CartUIValue {
  return { ...useCartData(), ...useCartUI() };
}

/* ── Provider ── */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    dispatch({ type: "HYDRATE", items: loadCart() });
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number) => {
      dispatch({ type: "ADD_ITEM", item, quantity });
    },
    [],
  );

  const removeItem = useCallback(
    (slug: string, selectedOptions: Record<string, string>) => {
      dispatch({ type: "REMOVE_ITEM", slug, selectedOptions });
    },
    [],
  );

  const updateQuantity = useCallback(
    (slug: string, selectedOptions: Record<string, string>, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", slug, selectedOptions, quantity });
    },
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const dataValue = useMemo<CartDataValue>(
    () => ({
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart],
  );

  const uiValue = useMemo<CartUIValue>(
    () => ({ isCartOpen, openCart, closeCart }),
    [isCartOpen, openCart, closeCart],
  );

  return (
    <CartDataContext.Provider value={dataValue}>
      <CartUIContext.Provider value={uiValue}>
        {children}
        <CartDrawer />
      </CartUIContext.Provider>
    </CartDataContext.Provider>
  );
}
