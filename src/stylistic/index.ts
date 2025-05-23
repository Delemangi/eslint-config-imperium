import type { Linter } from 'eslint';

import stylisticPlugin from '@stylistic/eslint-plugin';

import rules from './rules.js';

const stylistic: Linter.Config = {
  plugins: {
    '@stylistic': stylisticPlugin
  },
  rules: {
    ...rules
  }
};

export default stylistic;
