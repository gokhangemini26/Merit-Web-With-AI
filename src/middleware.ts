import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for static files/api
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Check if the pathname already has a locale
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // 3. Auto-detect language if no locale is present
    // Priority: 1. Cookie, 2. Header (Vercel IP), 3. Accept-Language, 4. Default
    let locale = request.cookies.get('NEXT_LOCALE')?.value;

    if (!locale) {
      const country = request.headers.get('x-vercel-ip-country')?.toUpperCase();
      if (country === 'TR') locale = 'tr';
      else if (['DE', 'AT', 'CH'].includes(country || '')) locale = 'de';
      else if (country === 'IT') locale = 'it';
      else if (['CN', 'HK', 'TW'].includes(country || '')) locale = 'zh';
      else {
        // Fallback to browser language
        const acceptLang = request.headers.get('accept-language');
        if (acceptLang?.includes('tr')) locale = 'tr';
        else if (acceptLang?.includes('de')) locale = 'de';
        else if (acceptLang?.includes('it')) locale = 'it';
        else if (acceptLang?.includes('zh')) locale = 'zh';
        else locale = routing.defaultLocale;
      }
    }

    // Redirect to the detected locale
    const url = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en|de|it|zh)/:path*']
};
