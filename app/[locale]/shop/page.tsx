import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/fourthwall';
import { hasLocale } from '@/lib/dictionaries';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Shop — Erik Sjøholm',
  description: 'Carry something of it. A tote bag from Erik Sjøholm.',
  alternates: { canonical: 'https://eriksjoholm.com/shop' },
  openGraph: {
    title: 'Shop — Erik Sjøholm',
    description: 'Carry something of it.',
    url: 'https://eriksjoholm.com/shop',
    images: [{ url: '/images/portrait.jpg', width: 800, height: 800, alt: 'Erik Sjøholm' }],
    type: 'website',
  },
};

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const products = await getProducts();
  const available = products.filter((p) => p.state.type === 'AVAILABLE');

  return (
    <main className="min-h-screen" style={{ background: '#0D0B09', color: '#E8E0D4' }}>

      {/* Fixed background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/bg/bg-03.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.05,
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.48rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#7A6F62',
              marginBottom: '1.25rem',
            }}>
              Shop
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 5rem)',
                color: '#E8E0D4',
                letterSpacing: '0.02em',
                lineHeight: 0.95,
                marginBottom: '1.5rem',
              }}
            >
              Carry something of it.
            </h1>
          </div>

          {/* ── Product grid ── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem', paddingBottom: '9rem' }}>
            {available.length === 0 ? (
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                color: '#7A6F62',
              }}>
                Nothing here yet — check back soon.
              </p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '3rem 2.5rem',
              }}>
                {available.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
