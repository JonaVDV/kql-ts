import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";
/**
 * @type {Awaited<import('typescript-eslint').Config>}
 */
export default [
  {
    ...svelte.configs["flat/recommended"],
    ...svelte.configs["flat/prettier"],
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
];
