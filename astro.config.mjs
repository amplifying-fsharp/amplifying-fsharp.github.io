import { defineConfig } from "astro/config";
import remarkMermaid from "astro-diagram/remark-mermaid";
import purgecss from "astro-purgecss";
import image from "@astrojs/image";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://amplifying-fsharp.github.io",
  markdown: {
    gfm: false,
    remarkPlugins: [remarkMermaid],
  },
  integrations: [
    purgecss(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    react(),
  ],
});
