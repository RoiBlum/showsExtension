// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: "public/index.html",
        content: "src/content.js",
        background: "src/background.js",
      },
      output: {
        entryFileNames: "assets/[name].js",  // ✅ force exact names
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
