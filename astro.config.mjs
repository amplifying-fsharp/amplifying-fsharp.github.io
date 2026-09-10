import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import fable from "vite-plugin-fable";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const fsproj = path.join(currentDir, "src/src.fsproj");

// https://astro.build/config
export default defineConfig({
  site: "https://amplifying-fsharp.github.io",
  // Astro 7 changed the default to "jsx", which drops whitespace between inline elements.
  // Keep the HTML-aware behaviour Astro 5 had.
  compressHTML: true,
  integrations: [
    // Include fs extension for react-refresh
    react({ include: /\.(fs|js|jsx|ts|tsx)$/ }),
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
    plugins: [fable({ fsproj, jsx: "automatic" })],
  },
});
