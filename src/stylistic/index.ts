import type { Linter } from 'eslint';

import stylisticPlugin from '@stylistic/eslint-plugin';

import rules from './rules.js';

const stylistic: Linter.Config = {
  plugins: {
    '@stylistic': stylisticPlugin
  },
  rules
};

export default stylistic;
