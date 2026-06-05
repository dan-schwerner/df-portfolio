import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Field-level localization building blocks.
 *
 * Translatable fields hold one value per language as a small object, e.g.
 * `title: { mt: "…", en: "…" }`. Queries coalesce to the active language
 * (see app/sanity/queries.ts), with Maltese as the fallback, so the frontend
 * still receives plain strings/arrays and nothing downstream changes.
 *
 * Maltese (`mt`) is the primary language; English (`en`) is optional and the
 * site falls back to Maltese when it's empty.
 */
const SUPPORTED = [
  { id: "mt", title: "Malti" },
  { id: "en", title: "English" },
] as const;

export const localeStringType = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: SUPPORTED.map((lang) =>
    defineField({ name: lang.id, title: lang.title, type: "string" }),
  ),
});

export const localeTextType = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: SUPPORTED.map((lang) =>
    defineField({ name: lang.id, title: lang.title, type: "text", rows: 5 }),
  ),
});

/**
 * Reusable Portable Text array (text blocks + inline image sections), lifted
 * verbatim from the original inline `post.body`. Blog posts are single-language,
 * so the post body uses this directly (not wrapped in a locale object).
 */
export const blockContentType = defineType({
  name: "blockContent",
  title: "Block content",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({
      type: "image",
      title: "Image section",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
  ],
});
