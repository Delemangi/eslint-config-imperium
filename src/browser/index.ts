import type { Linter } from 'eslint';

import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

import rules from './rules.js';

const browser: Linter.Config = {
  files: ['**/*.{js,ts,jsx,tsx,mjs,cjs}'],
  languageOptions: {
    globals: {
      ...globals.browser
    }
  },
  plugins: {
    unicorn: unicornPlugin
  },
  rules
};

export default browser;
