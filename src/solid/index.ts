import type { Linter } from 'eslint';

import solidPlugin from 'eslint-plugin-solid';
import globals from 'globals';

import rules from './rules.js';

const solid: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  languageOptions: {
    globals: {
      ...globals.browser
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    // @ts-expect-error missing types
    solid: solidPlugin
  },
  rules
};

export default solid;
