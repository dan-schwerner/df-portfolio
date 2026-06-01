import { defineCliConfig } from "sanity/cli";

/**
 * Sanity CLI config — gives `sanity` commands (dev/build/deploy/schema deploy)
 * a project root and target project/dataset.
 */
export default defineCliConfig({
  api: {
    projectId: "edr5pr75",
    dataset: "production",
  },
});
