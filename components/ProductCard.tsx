import Image from 'next/image';
import Link from 'next/link';
import type { FWProduct } from '@/lib/fourthwall';

function fmt(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export default function ProductCard({ product, locale }: { product: FWProduct; locale: string }) {
  const image = product.images[0];
  const lowestPrice = product.variants.reduce(
    (min, v) => (v.unitPrice.value < min.value ? v.unitPrice : min),
    product.variants[0]?.unitPrice ?? { value: 0, currency: 'USD' }
  );
  const href = `/${locale}/shop/${product.slug}`;

  return (
    <Link
      href={href}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        marginBottom: '1.25rem',
        position: 'relative',
      }}>
        {image ? (
          <Image
            src={image.url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover', transition: 'transform 500ms ease' }}
            className="product-img"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.04)' }} />
        )}
      </div>

      {/* Info */}
      <div>
        <p
          className="font-[family-name:var(--font-cormorant)]"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
            fontWeight: 300,
            color: '#E8E0D4',
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            marginBottom: '0.4rem',
          }}
        >
          {product.name}
        </p>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.8rem',
          color: '#7A6F62',
          letterSpacing: '0.05em',
        }}>
          {fmt(lowestPrice.value, lowestPrice.currency)}
        </p>
      </div>
    </Link>
  );
}
