'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { addToCart } from '@/app/actions/cart';
import type { FWVariant } from '@/lib/fourthwall';

function isAvailable(variant: FWVariant): boolean {
  const stock = variant.stock;
  if (!stock || stock.type === 'UNLIMITED') return true;
  if (stock.type === 'OUT_OF_STOCK') return false;
  return (stock.inStock ?? 0) > 0;
}

export default function AddToCart({ variants }: { variants: FWVariant[] }) {
  const { setCart, openCart } = useCart();
  const available = variants.filter(isAvailable);
  const [selectedId, setSelectedId] = useState(available[0]?.id ?? variants[0]?.id ?? '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'added'>('idle');

  const selectedVariant = variants.find((v) => v.id === selectedId);
  const canAdd = selectedVariant && isAvailable(selectedVariant);
  const showVariantPicker = variants.length > 1;

  async function handleAdd() {
    if (!selectedId || !canAdd) return;
    setStatus('loading');
    const cart = await addToCart(selectedId);
    if (cart) {
      setCart(cart);
      setStatus('added');
      openCart();
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      setStatus('idle');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {showVariantPicker && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7A6F62',
          }}>
            Option
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {variants.map((v) => {
              const active = v.id === selectedId;
              const avail = isAvailable(v);
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedId(v.id)}
                  disabled={!avail}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    padding: '0.45rem 1rem',
                    background: 'transparent',
                    border: active
                      ? '1px solid rgba(200,146,42,0.8)'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: active ? '#C8922A' : avail ? '#E8E0D4' : '#3A3730',
                    cursor: avail ? 'pointer' : 'not-allowed',
                    transition: 'border-color 200ms, color 200ms',
                    textDecoration: avail ? 'none' : 'line-through',
                  }}
                >
                  {v.attributes?.color?.name || v.attributes?.size?.name || v.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={!canAdd || status === 'loading'}
        style={{
          background: 'transparent',
          border: `1px solid ${canAdd ? 'rgba(200,146,42,0.6)' : 'rgba(255,255,255,0.08)'}`,
          color: canAdd ? '#C8922A' : '#3A3730',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.5rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          padding: '1rem 2rem',
          cursor: canAdd && status !== 'loading' ? 'pointer' : 'not-allowed',
          opacity: status === 'loading' ? 0.6 : 1,
          transition: 'border-color 200ms, color 200ms',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={(e) => {
          if (canAdd && status === 'idle') {
            e.currentTarget.style.borderColor = '#C8922A';
            e.currentTarget.style.color = '#E8E0D4';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = canAdd ? 'rgba(200,146,42,0.6)' : 'rgba(255,255,255,0.08)';
          e.currentTarget.style.color = canAdd ? '#C8922A' : '#3A3730';
        }}
      >
        {!canAdd
          ? 'Sold out'
          : status === 'loading'
          ? '…'
          : status === 'added'
          ? 'Added'
          : 'Add to bag'}
      </button>
    </div>
  );
}
