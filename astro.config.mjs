import { defineConfig } from "astro/config";
import purgecss from "astro-purgecss";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://amplifying-fsharp.github.io",
  markdown: {
    gfm: true,
  },
  integrations: [purgecss(), react()],
  vite: {
    server: {
      watch: {
        ignored: ["**/.idea/**"],
        usePolling: true,
      },
    },
  },
});
