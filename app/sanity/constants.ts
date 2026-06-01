/**
 * Runtime-safe Sanity constants.
 *
 * This file intentionally has NO imports from the `sanity` (Studio) package, so
 * it can be imported by both the schema definitions (Studio-only) and the
 * frontend query layer (bundled into the Next app) without pulling Studio code
 * into the client bundle.
 */

/** Fixed document id for the blog "About Me" singleton. */
export const BLOG_ABOUT_ID = "blogAbout";

/** Fixed document id for the "Il-Valuri Tiegħi" (My Values) singleton. */
export const BLOG_VALUES_ID = "blogValues";

/**
 * Curated icon keys an editor can pick per value. Each maps to a Material UI
 * icon on the frontend (see components/values/valueIcons.tsx). Kept here so the
 * schema dropdown and the frontend map never drift apart.
 */
export const VALUE_ICON_KEYS = [
  "lightbulb",
  "handshake",
  "code",
  "groups",
  "bolt",
  "favorite",
  "verified",
  "insights",
  "rocket",
  "school",
  "balance",
  "psychology",
] as const;

export type ValueIconKey = (typeof VALUE_ICON_KEYS)[number];
