import { type ReactNode } from 'react';
import CartProvider from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import CartButton from '@/components/CartButton';
import { getCartData } from '@/app/actions/cart';

export default async function ShopLayout({ children }: { children: ReactNode }) {
  const initialCart = await getCartData();

  return (
    <CartProvider initialCart={initialCart}>
      {/* Cart button — sits left of the folio + MENU toggle cluster (right: 9rem clears ~126px of combined width at right: 1.5rem) */}
      <div style={{
        position: 'fixed',
        top: 'max(1.1rem, calc(env(safe-area-inset-top, 0px) + 0.6rem))',
        right: '9rem',
        zIndex: 20,
        pointerEvents: 'auto',
      }}>
        <CartButton />
      </div>

      {children}
      <CartDrawer />
    </CartProvider>
  );
}
