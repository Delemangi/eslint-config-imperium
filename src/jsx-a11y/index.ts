import type { ESLint, Linter } from 'eslint';

// @ts-expect-error missing types
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

import rules from './rules.js';

const jsxA11y: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    'jsx-a11y': jsxA11yPlugin as ESLint.Plugin
  },
  rules
};

export default jsxA11y;
