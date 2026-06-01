import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./app/sanity/schemas";
import {
  structure,
  singletonActions,
  singletonNewDocumentOptions,
} from "./app/sanity/structure";

/**
 * Sanity Studio configuration for the portfolio's content.
 *
 * This makes the repo a valid Studio root so the `sanity` CLI works here
 * (`sanity dev`, `sanity build`, `sanity deploy`, `sanity schema deploy`).
 *
 * The "Blog About Me" type is a singleton: the custom `structure` opens the
 * single document directly, and the document action / new-document filters
 * prevent creating or deleting more than one.
 */
export default defineConfig({
  name: "default",
  title: "Dan Falzon Portfolio",
  projectId: "edr5pr75",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ structure })],
  document: {
    actions: singletonActions,
    newDocumentOptions: singletonNewDocumentOptions,
  },
});
