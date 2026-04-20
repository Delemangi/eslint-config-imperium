import type { Linter } from 'eslint';

import nextPlugin from '@next/eslint-plugin-next';

import rules from './rules.js';

const next: Linter.Config = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    '@next/next': nextPlugin
  },
  rules
};

export default next;
