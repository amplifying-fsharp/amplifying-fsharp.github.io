import { defineConfig } from "astro/config";
import purgecss from "astro-purgecss";
import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://amplifying-fsharp.github.io",
  markdown: {
    gfm: true,
  },
  integrations: [
    purgecss(),
    react(),
    icon({
      include: {
        bi: ["github", "linkedin", "twitter", "chevron-right"],
        cil: ["speech"],
        ic: ["round-live-tv"],
        mdi: ["bullseye-arrow"],
        "mdi-light": ["email"],
        ph: ["globe-light"],
      },
    }),
  ],
  vite: {
    server: {
      watch: {
        ignored: ["**/.idea/**"],
        usePolling: true,
      },
    },
  },
});
