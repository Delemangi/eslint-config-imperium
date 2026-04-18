import type { Linter } from 'eslint';

import sonarjsPlugin from 'eslint-plugin-sonarjs';

import rules from './rules.js';

const sonarjs: Linter.Config = {
  plugins: {
    sonarjs: sonarjsPlugin
  },
  rules
};

export default sonarjs;
