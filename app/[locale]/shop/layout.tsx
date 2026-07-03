import { type ReactNode } from 'react';
import CartProvider from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import CartButton from '@/components/CartButton';
import { getCartData } from '@/app/actions/cart';

export default async function ShopLayout({ children }: { children: ReactNode }) {
  const initialCart = await getCartData();

  return (
    <CartProvider initialCart={initialCart}>
      {/* Cart button — sits left of the locale switcher (right: 5rem clears its ~50px width at right: 1.5rem) */}
      <div style={{
        position: 'fixed',
        top: '1.25rem',
        right: '5rem',
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
