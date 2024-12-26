import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import simpleImportSort from 'eslint-plugin-simple-import-sort'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.ts"],
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      semi: ["error", "never"],
      quotes: ["error", "single"],
      "simple-import-sort/imports": "error",
      "@typescript-eslint/no-explicit-any": false
    }
  },
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
