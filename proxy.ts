import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];
const defaultLocale = 'en';

const countryToLocale: Record<string, string> = {
  DE: 'de', AT: 'de', CH: 'de',
  ES: 'es', MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es',
  VE: 'es', EC: 'es', BO: 'es', PY: 'es', UY: 'es',
  SE: 'sv',
  FI: 'fi',
  IT: 'it',
  FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr',
  PT: 'pt', BR: 'pt',
};

function getLocale(request: NextRequest): string {
  const saved = request.cookies.get('NEXT_LOCALE')?.value;
  if (saved && locales.includes(saved)) return saved;

  const country = request.headers.get('x-vercel-ip-country') ?? '';
  const geo = countryToLocale[country];
  if (geo) return geo;

  const accept = request.headers.get('accept-language') ?? '';
  const lang = accept.split(',')[0]?.split('-')[0]?.toLowerCase() ?? '';
  if (locales.includes(lang)) return lang;

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocalePrefix) return NextResponse.next();

  const locale = getLocale(request);

  if (locale === defaultLocale) {
    // Rewrite internally so app/[locale]/ receives 'en' as the segment
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Redirect to locale-prefixed URL and persist the preference
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images/|videos/|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)',
  ],
};
