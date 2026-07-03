'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { FWCart, FWCartItem } from '@/lib/fourthwall';

interface CartCtx {
  cart: FWCart | null;
  itemCount: number;
  isOpen: boolean;
  setCart: (cart: FWCart | null) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartCtx | null>(null);

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}

function countItems(items: FWCartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export default function CartProvider({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart: FWCart | null;
}) {
  const [cart, setCartState] = useState<FWCart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);

  const setCart = useCallback((c: FWCart | null) => setCartState(c), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount: cart ? countItems(cart.items) : 0,
        isOpen,
        setCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
