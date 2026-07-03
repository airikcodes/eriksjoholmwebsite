'use client';

import { useCart } from './CartProvider';

export default function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label="Open cart"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#7A6F62',
        padding: '0.5rem',
        transition: 'color 200ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#E8E0D4')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#7A6F62')}
    >
      {/* Bag icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {itemCount > 0 && (
        <span style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          color: '#C8922A',
          minWidth: '1rem',
          textAlign: 'center',
        }}>
          {itemCount}
        </span>
      )}
    </button>
  );
}
