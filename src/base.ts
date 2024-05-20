import { type Linter } from "eslint";
import globals from "globals";
import parser from "@typescript-eslint/parser";

const rules: Linter.RulesRecord = {
  "array-callback-return": [
    "error",
    {
      allowImplicit: true,
    },
  ],
};

const baseConfig: Linter.FlatConfig = {
  languageOptions: {
    parser,
    parserOptions: {
      project: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.es2021,
      ...globals.node,
      ...globals.browser,
    },
  },
  rules,
  files: ["**/*.{js,ts}"],
};

export default baseConfig;
