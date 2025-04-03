import type { ESLint, Linter } from 'eslint';

import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
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
    'react-hooks': reactHooksPlugin as ESLint.Plugin,
    'react-refresh': reactRefreshPlugin
  },
  rules,
  settings: {
    react: {
      version: 'detect'
    }
  }
};

export default react;
