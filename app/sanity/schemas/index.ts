import { type SchemaTypeDefinition } from "sanity";
import { blogAboutType } from "./blogAbout";
import { blogValuesType } from "./blogValues";
import { postType } from "./post";

/**
 * Schema types registered with the Sanity Studio. Add new document/object
 * types here, then reference this array from your Studio's sanity.config.ts:
 *
 *   import { schemaTypes } from "./app/sanity/schemas";
 *   ...
 *   schema: { types: schemaTypes }
 */
export const schemaTypes: SchemaTypeDefinition[] = [postType, blogAboutType, blogValuesType];
