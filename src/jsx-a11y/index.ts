import type { Linter } from 'eslint';

import jsxA11yPlugin from 'eslint-plugin-jsx-a11y-x';

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
    'jsx-a11y-x': jsxA11yPlugin
  },
  rules
};

export default jsxA11y;
