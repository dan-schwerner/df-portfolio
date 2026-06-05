'use client';

import { FC, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Box, ButtonBase, Tooltip } from '@mui/material';
import { setLocale } from '@/i18n/setLocale';
import { locales, type Locale } from '@/i18n/config';
import { MaltaFlag, UkFlag } from './flags';

const FLAGS: Record<Locale, FC> = {
  mt: MaltaFlag,
  en: UkFlag,
};

// EN/MT flag toggle. Clicking a flag persists the locale in a cookie (server
// action) then refreshes the route so Server Components re-render in the new
// language — no URL change, choice survives reloads.
const LocaleSwitcher = () => {
  const active = useLocale() as Locale;
  const t = useTranslations('localeSwitcher');
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (next: Locale) => {
    if (next === active) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  };

  return (
    <Box
      role="group"
      aria-label={t('label')}
      sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
    >
      {locales.map((locale) => {
        const Flag = FLAGS[locale];
        const isActive = locale === active;
        return (
          <Tooltip key={locale} title={t(locale)}>
            <ButtonBase
              onClick={() => choose(locale)}
              disabled={pending}
              aria-label={t(locale)}
              aria-pressed={isActive}
              sx={{
                width: 26,
                height: 17,
                borderRadius: '3px',
                overflow: 'hidden',
                display: 'block',
                boxShadow: isActive ? '0 0 0 2px rgba(255,255,255,0.95)' : 'none',
                opacity: isActive ? 1 : 0.5,
                transition: 'opacity 0.15s ease, box-shadow 0.15s ease',
                '&:hover': { opacity: 1 },
              }}
            >
              <Flag />
            </ButtonBase>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default LocaleSwitcher;
