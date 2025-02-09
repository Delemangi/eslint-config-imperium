import type { ESLint, Linter } from 'eslint';

import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error missing type
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import rules from './rules.js';

const react: Linter.Config = {
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
    react: reactPlugin as ESLint.Plugin,
    'react-hooks': reactHooksPlugin as ESLint.Plugin
  },
  rules,
  settings: {
    react: {
      version: 'detect'
    }
  }
};

export default react;
