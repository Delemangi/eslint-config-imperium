import type { ESLint, Linter } from 'eslint';

import tailwindPlugin from 'eslint-plugin-tailwindcss';

import rules from './rules.js';

const tailwind: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    tailwindcss: tailwindPlugin as unknown as ESLint.Plugin
  },
  rules
};

export default tailwind;
