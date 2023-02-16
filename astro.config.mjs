import { defineConfig } from "astro/config";
import remarkMermaid from "astro-diagram/remark-mermaid";

// https://astro.build/config
import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
  markdown: {
    gfm: false,
    remarkPlugins: [remarkMermaid]
  },
  integrations: [purgecss()]
});