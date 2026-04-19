import type { Linter } from 'eslint';

import { fixupPluginRules } from '@eslint/compat';
// @ts-expect-error -- untyped plugin
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- untyped plugin
    'jsx-a11y': fixupPluginRules(jsxA11yPlugin)
  },
  rules
};

export default jsxA11y;
