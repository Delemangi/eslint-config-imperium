import type { Linter } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicornPlugin from 'eslint-plugin-unicorn';

import rules from './rules.js';

const base: Linter.Config = {
  files: ['**/*.{js,ts,jsx,tsx,mjs,cjs}'],
  plugins: {
    'simple-import-sort': simpleImportSort,
    'unicorn': unicornPlugin,
  },
  rules,
};

export default base;