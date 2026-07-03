import { type ReactNode } from 'react';
import CartProvider from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import CartButton from '@/components/CartButton';
import BackNav from '@/components/BackNav';
import { getCartData } from '@/app/actions/cart';

export default async function ShopLayout({ children }: { children: ReactNode }) {
  const initialCart = await getCartData();

  return (
    <CartProvider initialCart={initialCart}>
      {/* Fixed top bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem',
        pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <BackNav />
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <CartButton />
        </div>
      </div>

      {children}
      <CartDrawer />
    </CartProvider>
  );
}
