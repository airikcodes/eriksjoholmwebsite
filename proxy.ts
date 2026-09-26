import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUBDOMAIN_ROUTES } from '@/lib/subdomain-routes';

const locales = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];
const defaultLocale = 'en';

// English is the default for everyone. No guessing from country or browser language: the only thing that
// changes it is a visitor's own choice in the language switcher (stored in the NEXT_LOCALE cookie).
function getLocale(request: NextRequest): string {
  const saved = request.cookies.get('NEXT_LOCALE')?.value;
  if (saved && locales.includes(saved)) return saved;
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? "").split(":")[0];
  const subdomainTarget = SUBDOMAIN_ROUTES[hostname];
  if (subdomainTarget && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${subdomainTarget}`;
    return NextResponse.rewrite(url);
  }

  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocalePrefix) {
    // Tell the root layout which language this URL is in, so <html lang> follows the address (not just the cookie).
    const headers = new Headers(request.headers);
    headers.set('x-locale', pathname.split('/')[1]);
    return NextResponse.next({ request: { headers } });
  }

  const locale = getLocale(request);

  if (locale === defaultLocale) {
    // Rewrite internally so app/[locale]/ receives 'en' as the segment
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    const headers = new Headers(request.headers);
    headers.set('x-locale', 'en');
    return NextResponse.rewrite(url, { request: { headers } });
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
