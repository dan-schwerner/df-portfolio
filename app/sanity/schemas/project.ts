import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * "Proġett" (Project) document type — powers the "Il-Proġetti Tiegħi" carousel
 * on the home page. Unlike About/Values this is a normal (non-singleton) type:
 * editors create one document per project. Fields map exactly to what the
 * frontend queries (see PROJECTS_QUERY + mapToProject).
 *
 * The cards are graphic-heavy, so `image` is the focal point. `tagline` is the
 * short punch line shown in the brand colour; `description` is a one/two-line
 * supporting blurb. Keep both short — the design is built for impact, not prose.
 */
export const projectType = defineType({
  name: "project",
  title: "Proġett",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "localeString",
      validation: (rule) =>
        rule.custom((value) =>
          (value as { mt?: string } | undefined)?.mt ? true : "Il-Malti hu meħtieġ",
        ),
    }),
    defineField({
      name: "tagline",
      title: "Punch line",
      description: "Sentenza waħda, qasira u qawwija.",
      type: "localeString",
      validation: (rule) =>
        rule.custom((value) =>
          (value as { mt?: string } | undefined)?.mt ? true : "Il-Malti hu meħtieġ",
        ),
    }),
    defineField({
      name: "description",
      title: "Deskrizzjoni qasira",
      description: "Żomma qasira — żewġ sentenzi biżżejjed.",
      type: "localeText",
    }),
    defineField({
      name: "image",
      title: "Ritratt",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Test alternattiv", type: "string" }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Sa tlieta jidhru fuq il-card (eż. Backend, Cloud, Data).",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "url",
      title: "Link (mhux obbligatorju)",
      description: "Link għall-proġett live jew għar-repository.",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordni",
      description: "Numru iżgħar jidher l-ewwel. Ħallih vojt biex jordna bid-data.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title.mt", subtitle: "tagline.mt", media: "image" },
  },
});
