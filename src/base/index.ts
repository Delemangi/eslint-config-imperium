import type { Linter } from 'eslint';

// @ts-expect-error missing types
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

import rules from './rules.js';

const base: Linter.Config = {
  files: ['**/*.{js,ts,jsx,tsx,mjs,cjs}'],
  languageOptions: {
    globals: {
      ...globals['shared-node-browser'],
    },
  },
  plugins: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    promise: promisePlugin,
    regexp: regexpPlugin,
    unicorn: unicornPlugin,
  },
  rules,
};

export default base;
