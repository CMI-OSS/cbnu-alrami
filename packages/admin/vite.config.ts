import * as path from "path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";

const env = loadEnv('analyze', process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared/src"),
    },
  },
  plugins: [ react(), env.VITE_ANALYZE? visualizer({
    filename: "./stat.html",
    open: true,
    brotliSize: true,
  }): [] ],
});
