import { defineType, defineField, defineArrayMember } from "sanity";
import { BLOG_ABOUT_ID } from "../constants";

/**
 * Singleton document type for the "About Me" section ("Min Jien").
 *
 * Structure: a heading, a bold lead quote, the body content (one blank line
 * between paragraphs), and a set of expertise tags shown as chips. Keep it
 * punchy — the section is designed for impact, not long prose.
 *
 * Singleton = only ever one instance of this document should exist. The "only
 * one" guarantee is enforced in the Studio config via the custom structure
 * (app/sanity/structure.ts) plus the document-action / new-document filters.
 */
export const blogAboutType = defineType({
  name: BLOG_ABOUT_ID,
  title: "About Me",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "localeString",
      initialValue: { mt: "Min Jien" },
      validation: (rule) =>
        rule.custom((value) =>
          (value as { mt?: string } | undefined)?.mt ? true : "Il-Malti hu meħtieġ",
        ),
    }),
    defineField({
      name: "headerQuote",
      title: "Header quote",
      description: "Is-sentenza qawwija f'ras it-taqsima.",
      type: "localeText",
      initialValue: {
        mt: "Nibni sistemi li jikbru, jifilħu għall-piż, u jwasslu dak li jwiegħdu.",
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "Ħalli linja vojta bejn il-paragrafi.",
      type: "localeText",
      validation: (rule) =>
        rule.custom((value) =>
          (value as { mt?: string } | undefined)?.mt ? true : "Il-Malti hu meħtieġ",
        ),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Oqsma ta' speċjalizzazzjoni (jidhru bħala chips).",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title.mt", subtitle: "headerQuote.mt" },
  },
});
