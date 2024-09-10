import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
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
          if (id.includes("node_modules")) {
            const moduleName = id.split("node_modules/").pop()?.split("/")[0];
            return `vendor/${moduleName}`;
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
