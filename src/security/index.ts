import type { ESLint, Linter } from 'eslint';

// @ts-expect-error missing types
import securityPlugin from 'eslint-plugin-security';

import rules from './rules.js';

const security: Linter.Config = {
  plugins: {
    security: securityPlugin as ESLint.Plugin
  },
  rules
};

export default security;
