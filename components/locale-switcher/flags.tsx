import { FC } from 'react';

// Tiny inline SVG flags for the locale switcher. They fill their container and
// stretch to it (preserveAspectRatio="none") since they're rendered at ~24x16.

export const MaltaFlag: FC = () => (
  <svg viewBox="0 0 900 600" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
    <rect width="450" height="600" fill="#ffffff" />
    <rect x="450" width="450" height="600" fill="#cf142b" />
    {/* George Cross, simplified */}
    <g transform="translate(70,70)" fill="#c0c0c0">
      <rect x="42" y="0" width="36" height="120" />
      <rect x="0" y="42" width="120" height="36" />
    </g>
  </svg>
);

export const UkFlag: FC = () => (
  <svg viewBox="0 0 60 30" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
    <clipPath id="uk-flag-clip">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-clip)" stroke="#c8102e" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
  </svg>
);
