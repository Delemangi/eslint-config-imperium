import { type Linter } from "eslint";
import globals from "globals";

const baseConfig: Linter.FlatConfig = {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.es2021,
      ...globals.node,
      ...globals.browser,
    },
  },
  files: ['**/*.{js,jsx,cjs,mjs,ts,tsx}'],
};

export default baseConfig;
