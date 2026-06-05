// Supported UI locales. `mt` (Maltese) is the default and matches the site's
// original, untranslated behaviour; `en` (English) is the second locale exposed
// via the EN/MT flag toggle. Locale is stored in a cookie (no URL prefixes).
export const locales = ['mt', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'mt';

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value);
