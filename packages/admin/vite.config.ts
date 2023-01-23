import * as path from "path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 8000,
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        "@shared": path.resolve(__dirname, "../shared/src"),
      },
    },
    plugins: [ react(), mode === 'analyze'? visualizer({
      filename: "./stat.html",
      open: true,
      brotliSize: true,
    }): [] ],
  }
});
