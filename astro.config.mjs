import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import purgecss from "astro-purgecss";
import react from "@astrojs/react";
import icon from "astro-icon";
import fable from "vite-plugin-fable";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const fsproj = path.join(currentDir, "src/src.fsproj");

function fsharpMiddlewarePlugin() {
  return {
    name: "nojaf",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const isFSharpUrl = /\.fs/.test(req.url);

        if (isFSharpUrl && req.url.indexOf("?import") === -1) {
          console.log(req.url);
          req.url += "?import";
          res.setHeader("Content-Type", "application/javascript");
        }
        return next();
      });
    },
    handleHotUpdate: async function ({ file, server, modules }) {
      if (/\.fs/.test(file) && modules && modules.length === 0) {
        const module = server.moduleGraph.getModuleById(file);
        if (module) {
          server.ws.send({
            type: "custom",
            event: "hot-update-dependents",
            data: [module.url],
          });
          return [module];
        }
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://amplifying-fsharp.github.io",
  markdown: {
    gfm: true,
  },
  integrations: [
    purgecss(),
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
    plugins: [fsharpMiddlewarePlugin(), fable({ fsproj, jsx: "automatic" })],
    // plugins: [fable({ fsproj, jsx: "automatic" })],
  },
});
