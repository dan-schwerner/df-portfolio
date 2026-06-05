import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isLocale } from './config';

// next-intl "without i18n routing": the active locale comes from the NEXT_LOCALE
// cookie (set by the flag switcher) rather than a URL segment. Reading the cookie
// here opts the rendered pages into dynamic rendering — acceptable for this site.
export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    formats: {
      dateTime: {
        medium: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYear: { year: 'numeric', month: 'long' },
      },
    },
  };
});
