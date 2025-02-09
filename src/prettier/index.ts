import type { Linter } from 'eslint';

import prettierPlugin from 'eslint-plugin-prettier';

import rules from './rules.js';

const prettier: Linter.Config = {
  plugins: {
    prettier: prettierPlugin
  },
  rules
};

export default prettier;
