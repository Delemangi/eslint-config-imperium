import type { Linter } from 'eslint';

import tanstackRouterPlugin from '@tanstack/eslint-plugin-router';

import rules from './rules.js';

const tanstackRouter: Linter.Config = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    // @ts-expect-error -- upstream rule context types still target ESLint 8
    '@tanstack/router': tanstackRouterPlugin
  },
  rules
};

export default tanstackRouter;
