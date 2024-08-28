import type { Linter } from 'eslint';

import unicornPlugin from 'eslint-plugin-unicorn';

import rules from './rules.js';

const base: Linter.Config = {
  files: ['**/*.{js,ts,jsx,tsx,mjs,cjs}'],
  plugins: {
    unicorn: unicornPlugin,
  },
  rules,
};

export default base;
