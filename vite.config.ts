import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // if (id.includes("node_modules")) {
          //   const moduleName = id.split("node_modules/").pop()?.split("/")[0];
          //   return `vendor/${moduleName}`;
          // }

          if (id.includes("date-fns")) {
            return "vender/date-fns";
          }
          if (id.includes("lodash")) {
            return "vender/lodash";
          }
          if (id.includes("hls")) {
            return "vender/hls";
          }
          if (id.includes("crypto-js")) {
            return "vender/cryto-js";
          }
          if (id.includes("framer-motion")) {
            return "vender/framer-motion";
          }
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router")
          ) {
            return "vender/react";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
