import { notFound } from 'next/navigation';

const locales = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return <>{children}</>;
}
