import { defineType, defineField, defineArrayMember } from "sanity";
import { BLOG_VALUES_ID, VALUE_ICON_KEYS } from "../constants";

/**
 * Singleton document type for the "Il-Valuri Tiegħi" (My Values) section that
 * sits under the About Me section. Holds up to four values, each with a title,
 * a short text, and an icon chosen from a curated list.
 */
export const blogValuesType = defineType({
  name: BLOG_VALUES_ID,
  title: "Il-Valuri Tiegħi (My Values)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      initialValue: { mt: "Il-Valuri Tiegħi" },
      validation: (rule) =>
        rule.custom((value) =>
          (value as { mt?: string } | undefined)?.mt ? true : "Il-Malti hu meħtieġ",
        ),
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      description: "Up to four values.",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({
              name: "title",
              type: "localeString",
              validation: (rule) =>
                rule.custom((value) =>
                  (value as { mt?: string } | undefined)?.mt ? true : "Il-Malti hu meħtieġ",
                ),
            }),
            defineField({
              name: "text",
              type: "localeText",
              validation: (rule) =>
                rule.custom((value) =>
                  (value as { mt?: string } | undefined)?.mt ? true : "Il-Malti hu meħtieġ",
                ),
            }),
            defineField({
              name: "icon",
              type: "string",
              options: {
                list: VALUE_ICON_KEYS.map((key) => ({ title: key, value: key })),
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title.mt", subtitle: "icon" },
          },
        }),
      ],
    }),
  ],
});
