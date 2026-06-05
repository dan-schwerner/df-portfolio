import createNextIntlPlugin from 'next-intl/plugin';

// Wires up next-intl's request config (./i18n/request.ts) so server/client
// components and metadata can read the cookie-selected locale.
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve next/image output in modern formats (AVIF first, then WebP) for the
  // smallest possible payloads. Local hero assets (profilepic.png,
  // Valletta-BANNER.webp) already go through next/image; remote Sanity images
  // are optimised by Sanity's own CDN (auto('format') + width()).
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
