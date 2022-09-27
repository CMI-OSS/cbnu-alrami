import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared/src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  plugins: [ react() ],
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
});
