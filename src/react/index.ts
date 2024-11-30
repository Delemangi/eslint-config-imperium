import type { Linter } from 'eslint';

import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

import rules from './rules.js';

const react: Linter.Config = {
  files: [
    '**/*.{jsx,tsx}',
  ],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    // @ts-expect-error missing type
    react: reactPlugin,
  },
  rules,
  settings: {
    react: {
      version: 'detect',
    },
  },
};

export default react;
