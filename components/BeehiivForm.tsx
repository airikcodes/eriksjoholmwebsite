'use client';

import { useState } from 'react';

interface Props {
  subscribeLabel?: string;
  successMsg?: string;
  errorMsg?: string;
}

export default function BeehiivForm({
  subscribeLabel = 'Subscribe',
  successMsg = "You're in. Watch for the first letter.",
  errorMsg = 'Something went wrong — try again or write to sjoholm.e@gmail.com.',
}: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setState('success');
        setEmail('');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <p style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '0.8rem',
        color: 'var(--accent-ink)',
        letterSpacing: '0.05em',
      }}>
        {successMsg}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'stretch' }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={state === 'loading'}
        style={{
          flex: '1 1 220px',
          minWidth: 0,
          background: 'var(--field-bg)',
          border: '1px solid var(--field-border)',
          color: 'var(--color-ink-primary)',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.95rem',
          padding: '0.85rem 1.1rem',
          outline: 'none',
          borderRadius: 'var(--radius-s)',
        }}
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        style={{
          background: 'rgba(200,146,42,0.06)',
          border: '1px solid rgba(200,146,42,0.5)',
          color: 'var(--accent-ink)',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '0.85rem 1.6rem',
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
          opacity: state === 'loading' ? 0.5 : 1,
          transition: 'border-color 0.2s, color 0.2s',
          borderRadius: 'var(--radius-s)',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          if (state !== 'loading') {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-ink)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-ink-primary)';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,146,42,0.5)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-ink)';
        }}
      >
        {state === 'loading' ? '…' : subscribeLabel}
      </button>

      {state === 'error' && (
        <p style={{
          width: '100%',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.85rem',
          color: 'var(--color-ink-body)',
          marginTop: '0.5rem',
        }}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
