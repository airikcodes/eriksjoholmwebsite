import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import AddToCart from '@/components/AddToCart';
import { getProducts, getProduct } from '@/lib/fourthwall';
import { hasLocale } from '@/lib/dictionaries';

export const revalidate = 3600;

const LOCALES = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];

export async function generateStaticParams() {
  const products = await getProducts();
  return LOCALES.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const title = `${product.name} — Erik Sjøholm`;
  const image = product.images[0]?.url ?? '/images/portrait.jpg';

  return {
    title,
    description: product.description || `${product.name} from the Erik Sjøholm shop.`,
    alternates: { canonical: `https://eriksjoholm.com/shop/${slug}` },
    openGraph: {
      title,
      description: product.description || title,
      url: `https://eriksjoholm.com/shop/${slug}`,
      images: [{ url: image, alt: product.name }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, images: [image] },
  };
}

function fmt(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const product = await getProduct(slug);
  if (!product) notFound();

  const images = product.images.length > 0 ? product.images : null;
  const primaryImage = images?.[0];
  const lowestPrice = product.variants.reduce(
    (min, v) => (v.unitPrice.value < min.value ? v.unitPrice : min),
    product.variants[0]?.unitPrice ?? { value: 0, currency: 'USD' }
  );

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
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Back to shop listing */}
          <div style={{ paddingTop: '5.5rem' }}>
            <BackNav href="/shop" label="Shop" />
          </div>

          <div style={{
            paddingTop: '2rem',
            paddingBottom: '9rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem 4rem',
            alignItems: 'start',
          }}>

            {/* ── Images ── */}
            <div>
              {primaryImage ? (
                <div style={{
                  aspectRatio: '1 / 1',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  marginBottom: images && images.length > 1 ? '1rem' : 0,
                }}>
                  <Image
                    src={primaryImage.url}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.03)' }} />
              )}

              {/* Thumbnail strip */}
              {images && images.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {images.slice(1).map((img) => (
                    <div key={img.id} style={{
                      width: '72px',
                      aspectRatio: '1/1',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.03)',
                    }}>
                      <Image
                        src={img.url}
                        alt={product.name}
                        fill
                        sizes="72px"
                        style={{ objectFit: 'cover', opacity: 0.75 }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Details ── */}
            <div>
              <h1
                className="font-[family-name:var(--font-cormorant)] font-light"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: '#E8E0D4',
                  letterSpacing: '0.02em',
                  lineHeight: 1.05,
                  marginBottom: '0.75rem',
                }}
              >
                {product.name}
              </h1>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                color: '#C8922A',
                marginBottom: '2rem',
                letterSpacing: '0.02em',
              }}>
                {fmt(lowestPrice.value, lowestPrice.currency)}
              </p>

              {product.description && (
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.875rem',
                  color: '#7A6F62',
                  lineHeight: 1.85,
                  marginBottom: '2.5rem',
                  maxWidth: '42ch',
                }}>
                  {product.description}
                </p>
              )}

              <AddToCart variants={product.variants} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
