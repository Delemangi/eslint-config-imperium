import type { Linter } from 'eslint';
import unicornPlugin from 'eslint-plugin-unicorn';
import rules from './rules.js';
import globals from 'globals';

const browser: Linter.Config = {
  files: ['**/*.{js,ts,jsx,tsx,mjs,cjs}'],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  plugins: {
    unicorn: unicornPlugin,
  },
  rules,
};

export default browser;
