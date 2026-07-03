'use client';

import { useState, useTransition } from 'react';
import { useCart } from './CartProvider';
import { removeFromCart, checkoutUrl } from '@/app/actions/cart';

function fmt(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export default function CartDrawer() {
  const { cart, isOpen, closeCart, setCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [checkingOut, setCheckingOut] = useState(false);

  function handleRemove(variantId: string) {
    startTransition(async () => {
      const updated = await removeFromCart(variantId);
      if (updated !== null) setCart(updated);
    });
  }

  async function handleCheckout() {
    setCheckingOut(true);
    const url = await checkoutUrl();
    if (url) window.location.href = url;
    else setCheckingOut(false);
  }

  const isEmpty = !cart || cart.items.length === 0;

  // Calculate subtotal from items since the API doesn't return one
  const currency = cart?.items[0]?.variant.unitPrice.currency ?? 'USD';
  const subtotalValue = cart?.items.reduce(
    (sum, item) => sum + item.variant.unitPrice.value * item.quantity,
    0
  ) ?? 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(13,11,9,0.7)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease',
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(100vw, 400px)',
          zIndex: 50,
          background: '#131109',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.75rem 1.5rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.48rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#7A6F62',
          }}>
            Your cart
          </p>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#7A6F62',
              padding: '0.25rem',
              lineHeight: 1,
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E8E0D4')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#7A6F62')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {isEmpty ? (
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: '#7A6F62',
              paddingTop: '2rem',
            }}>
              Nothing here yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.items.map((item) => {
                const { variant } = item;
                const itemTotal = variant.unitPrice.value * item.quantity;
                const label = variant.attributes?.description || variant.name;
                return (
                  <div
                    key={variant.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      paddingBottom: '1.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Thumbnail */}
                    {variant.images[0] && (
                      <div style={{
                        width: '56px',
                        aspectRatio: '3/4',
                        flexShrink: 0,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={variant.images[0].url}
                          alt={variant.product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: 'var(--font-cormorant, Georgia, serif)',
                        fontSize: '1.05rem',
                        fontWeight: 300,
                        color: '#E8E0D4',
                        marginBottom: '0.2rem',
                        letterSpacing: '0.01em',
                      }}>
                        {variant.product.name}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.7rem',
                        color: '#7A6F62',
                        marginBottom: '0.5rem',
                      }}>
                        {label} · Qty {item.quantity}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.8rem',
                        color: '#C8922A',
                      }}>
                        {fmt(itemTotal, variant.unitPrice.currency)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(variant.id)}
                      disabled={isPending}
                      aria-label="Remove item"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: isPending ? 'not-allowed' : 'pointer',
                        color: '#7A6F62',
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-inter)',
                        padding: '0.25rem 0',
                        opacity: isPending ? 0.5 : 1,
                        transition: 'color 200ms',
                        flexShrink: 0,
                        marginTop: '0.15rem',
                      }}
                      onMouseEnter={(e) => { if (!isPending) e.currentTarget.style.color = '#E8E0D4'; }}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#7A6F62')}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '1.25rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#7A6F62',
              }}>
                Subtotal
              </span>
              <span style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: '1.35rem',
                fontWeight: 300,
                color: '#E8E0D4',
              }}>
                {fmt(subtotalValue, currency)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid rgba(200,146,42,0.6)',
                color: '#C8922A',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.5rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                padding: '1rem',
                cursor: checkingOut ? 'not-allowed' : 'pointer',
                opacity: checkingOut ? 0.6 : 1,
                transition: 'border-color 200ms, color 200ms',
              }}
              onMouseEnter={(e) => {
                if (!checkingOut) {
                  e.currentTarget.style.borderColor = '#C8922A';
                  e.currentTarget.style.color = '#E8E0D4';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,146,42,0.6)';
                e.currentTarget.style.color = '#C8922A';
              }}
            >
              {checkingOut ? '…' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
