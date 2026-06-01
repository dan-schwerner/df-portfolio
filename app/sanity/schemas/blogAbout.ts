import { defineType, defineField } from "sanity";
import { BLOG_ABOUT_ID } from "../constants";

/**
 * Singleton document type for the blog's "About Me" intro section.
 *
 * Singleton = only ever one instance of this document should exist. The schema
 * itself is a normal document type; the "only one" guarantee is enforced in the
 * Studio config via the custom structure (app/sanity/structure.ts) plus the
 * document-action / new-document filters documented there.
 */
export const blogAboutType = defineType({
  name: BLOG_ABOUT_ID,
  title: "Blog — About Me",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      initialValue: "Min Jien",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "content" },
  },
});
