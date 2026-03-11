"use client";

import { useEffect } from "react";
import { useCartData } from "@/lib/cart-context";

export function ClearCart() {
  const { clearCart } = useCartData();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
