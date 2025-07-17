import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import injectCssByJs from "vite-plugin-css-injected-by-js";
import { optimizeDeclarationFile } from "./plugins/optimizeDeclarationFile.ts";

export default defineConfig({
  plugins: [
    vue(),
    injectCssByJs(),
    dts({
      tsconfigPath: resolve(__dirname, "../tsconfig.app.json"),
      rollupTypes: true,
    }),
    optimizeDeclarationFile(),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "../src/index.ts"),
      name: "SimpleExcel",
      formats: ["es", "cjs", "umd", "iife"],
      fileName: (format) => `simple-excel.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
    emptyOutDir: true,
  },
});
