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
        color: '#C8922A',
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
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#E8E0D4',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.82rem',
          padding: '0.7rem 1rem',
          outline: 'none',
          borderRadius: 0,
        }}
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        style={{
          background: 'transparent',
          border: '1px solid rgba(200,146,42,0.5)',
          color: '#C8922A',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.45rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          padding: '0.7rem 1.5rem',
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
          opacity: state === 'loading' ? 0.5 : 1,
          transition: 'border-color 0.2s, color 0.2s',
          borderRadius: 0,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          if (state !== 'loading') {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#C8922A';
            (e.currentTarget as HTMLButtonElement).style.color = '#E8E0D4';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,146,42,0.5)';
          (e.currentTarget as HTMLButtonElement).style.color = '#C8922A';
        }}
      >
        {state === 'loading' ? '…' : subscribeLabel}
      </button>

      {state === 'error' && (
        <p style={{
          width: '100%',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.75rem',
          color: '#7A6F62',
          marginTop: '0.5rem',
        }}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
