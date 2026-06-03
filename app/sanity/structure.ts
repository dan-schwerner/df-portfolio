import { type StructureResolver } from "sanity/structure";
import {
  type DocumentActionsResolver,
  type NewDocumentOptionsResolver,
} from "sanity";
import { BLOG_ABOUT_ID, BLOG_VALUES_ID } from "./constants";

/**
 * Document types that must only ever have a single instance.
 * Add future singletons (e.g. site settings) to this set.
 */
export const singletonTypes = new Set<string>([BLOG_ABOUT_ID, BLOG_VALUES_ID]);

/** Actions that stay available on a singleton — i.e. everything except create/delete/duplicate. */
const allowedSingletonActions = new Set([
  "publish",
  "unpublish",
  "discardChanges",
  "restore",
]);

/**
 * Studio structure: open each singleton as a single editable document (its
 * fixed id) instead of a list, and list every other registered type normally.
 *
 * Wire into the Studio's sanity.config.ts:
 *
 *   import { structureTool } from "sanity/structure";
 *   import {
 *     structure,
 *     singletonActions,
 *     singletonNewDocumentOptions,
 *   } from "./app/sanity/structure";
 *   import { schemaTypes } from "./app/sanity/schemas";
 *
 *   export default defineConfig({
 *     projectId: "edr5pr75",
 *     dataset: "production",
 *     schema: { types: schemaTypes },
 *     plugins: [structureTool({ structure })],
 *     document: {
 *       actions: singletonActions,
 *       newDocumentOptions: singletonNewDocumentOptions,
 *     },
 *   });
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About Me")
        .id(BLOG_ABOUT_ID)
        .child(
          S.document().schemaType(BLOG_ABOUT_ID).documentId(BLOG_ABOUT_ID),
        ),
      S.listItem()
        .title("Il-Valuri Tiegħi (My Values)")
        .id(BLOG_VALUES_ID)
        .child(
          S.document().schemaType(BLOG_VALUES_ID).documentId(BLOG_VALUES_ID),
        ),
      S.divider(),
      // Everything that isn't a singleton, listed as a normal document type.
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() ?? ""),
      ),
    ]);

/** Remove create/delete/duplicate actions from singleton documents. */
export const singletonActions: DocumentActionsResolver = (actions, context) =>
  singletonTypes.has(context.schemaType)
    ? actions.filter(
        ({ action }) => action && allowedSingletonActions.has(action),
      )
    : actions;

/** Hide singleton types from the global “Create new document” menu. */
export const singletonNewDocumentOptions: NewDocumentOptionsResolver = (
  prev,
  { creationContext },
) =>
  creationContext.type === "global"
    ? prev.filter((template) => !singletonTypes.has(template.templateId))
    : prev;
