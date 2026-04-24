import type { ESLint, Linter } from 'eslint';

import eslintReact from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

import rules from './rules.js';

const react: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    ...eslintReact.configs['recommended-type-checked'].plugins,
    'react-hooks': reactHooksPlugin as unknown as ESLint.Plugin,
    'react-refresh': reactRefreshPlugin
  },
  rules,
  settings: eslintReact.configs['recommended-type-checked'].settings ?? {}
};

export default react;
