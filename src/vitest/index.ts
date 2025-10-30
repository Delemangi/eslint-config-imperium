import type { Linter } from 'eslint';

import vitestPlugin from '@vitest/eslint-plugin';

import rules from './rules.js';

const vitest: Linter.Config = {
  files: [
    '**/*.test.{ts,tsx,js,jsx}',
    '**/*.spec.{ts,tsx,js,jsx}'
  ],
  plugins: {
    vitest: vitestPlugin
  },
  rules
};

export default vitest;
