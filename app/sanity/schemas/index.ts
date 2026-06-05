import { type SchemaTypeDefinition } from "sanity";
import { blogAboutType } from "./blogAbout";
import { blogValuesType } from "./blogValues";
import { postType } from "./post";
import { projectType } from "./project";
import {
  localeStringType,
  localeTextType,
  blockContentType,
} from "./localeTypes";

/**
 * Schema types registered with the Sanity Studio. Add new document/object
 * types here, then reference this array from your Studio's sanity.config.ts:
 *
 *   import { schemaTypes } from "./app/sanity/schemas";
 *   ...
 *   schema: { types: schemaTypes }
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Localization building blocks (referenced by the document types below).
  localeStringType,
  localeTextType,
  blockContentType,
  // Document types.
  postType,
  projectType,
  blogAboutType,
  blogValuesType,
];
