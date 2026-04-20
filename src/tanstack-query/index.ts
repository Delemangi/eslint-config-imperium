import type { Linter } from 'eslint';

import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';

import rules from './rules.js';

const tanstackQuery: Linter.Config = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    // @ts-expect-error -- plugin uses readonly defaultOptions incompatible with ESLint's Plugin type
    '@tanstack/query': tanstackQueryPlugin
  },
  rules
};

export default tanstackQuery;
