import { redirect } from 'next/navigation';

// The Library and the Artworks page are one page now — see /works.
export default async function LibraryRedirect({
  params,
  searchParams,
}: {
  params:       Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const { type }   = await searchParams;
  redirect(`/${locale}/works${type ? `?type=${encodeURIComponent(type)}` : ''}`);
}
