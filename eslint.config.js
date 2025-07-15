import tsEslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";

export default tsEslint.config(
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    ignores: ["dist/**", "node_modules/**", ".husky/**", "coverage/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "no-console": "error",
      "no-debugger": "error",
    },
  },
  {
    // 专门为 Vue 文件指定 TS 解析器
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tsEslint.parser,
      },
    },
  },
);
