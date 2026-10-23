import type { ESLint, Linter } from 'eslint';

import solidPlugin from 'eslint-plugin-solid';

import rules from './rules.js';

const solid: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    solid: solidPlugin as ESLint.Plugin
  },
  rules
};

export default solid;
