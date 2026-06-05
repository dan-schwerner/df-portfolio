'use server';

import { cookies } from 'next/headers';
import type { Locale } from './config';

// Server action invoked by the flag switcher. It persists the chosen locale in a
// cookie; the client then calls router.refresh() so Server Components re-render
// with the new locale (see components/locale-switcher/LocaleSwitcher.tsx).
export async function setLocale(locale: Locale) {
  (await cookies()).set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // one year
    sameSite: 'lax',
  });
}
