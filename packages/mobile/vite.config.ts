import * as path from "path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        "@shared": path.resolve(__dirname, "../shared/src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
      },
    },
    plugins: [
      react(),
      mode === "analyze"
        ? visualizer({
            filename: "./stat.html",
            open: true,
            brotliSize: true,
          })
        : [],
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '@shared/styles/mixin.scss';
            @import '@shared/styles/variables.scss';
            @import '@shared/styles/color.scss';
            @import '@shared/styles/main.scss';
            @import '@shared/styles/global.scss';
            @import 'src/styles/main.scss';
          `,
        },
      },
    },
  };
});
