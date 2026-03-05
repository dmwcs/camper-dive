"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";

/* ── Types ── */

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
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
  | { type: "CLEAR" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };

    case "ADD_ITEM": {
      const key = cartItemKey(action.item.slug, action.item.selectedOptions);
      const idx = state.items.findIndex(
        (i) => cartItemKey(i.slug, i.selectedOptions) === key,
      );
      let items: CartItem[];
      if (idx >= 0) {
        items = state.items.map((item, i) =>
          i === idx
            ? { ...item, quantity: Math.min(item.quantity + action.quantity, 10) }
            : item,
        );
      } else {
        items = [
          ...state.items,
          { ...action.item, quantity: Math.min(action.quantity, 10) },
        ];
      }
      return { ...state, items };
    }

    case "REMOVE_ITEM": {
      const key = cartItemKey(action.slug, action.selectedOptions);
      return {
        ...state,
        items: state.items.filter(
          (i) => cartItemKey(i.slug, i.selectedOptions) !== key,
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const key = cartItemKey(action.slug, action.selectedOptions);
      const clamped = Math.max(1, Math.min(action.quantity, 10));
      return {
        ...state,
        items: state.items.map((item) =>
          cartItemKey(item.slug, item.selectedOptions) === key
            ? { ...item, quantity: clamped }
            : item,
        ),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isCartOpen: true };

    case "CLOSE_CART":
      return { ...state, isCartOpen: false };

    default:
      return state;
  }
}

/* ── Context ── */

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* ── Provider ── */

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isCartOpen: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    dispatch({ type: "HYDRATE", items: loadCart() });
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items],
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
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      isCartOpen: state.isCartOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      state.items,
      state.isCartOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}
