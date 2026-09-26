interface BackNavProps {
  href?: string;
  label?: string;
}

export default function BackNav({ href = '/', label = 'Erik Sjøholm' }: BackNavProps) {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <a
        href={href}
        className="hover:text-[color:var(--accent-ink)] transition-colors duration-200"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: 'var(--color-ink-body)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '1.5rem',
            height: '1px',
            background: 'currentColor',
            flexShrink: 0,
          }}
        />
        <span
          className="font-[family-name:var(--font-cormorant)] font-light"
          style={{ fontSize: '0.85rem', letterSpacing: '0.2em' }}
        >
          {label}
        </span>
      </a>
    </div>
  );
}
