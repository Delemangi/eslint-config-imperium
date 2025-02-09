import { type Linter } from 'eslint';
import nPlugin from 'eslint-plugin-n';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

import rules from './rules.js';

const node: Linter.Config = {
  languageOptions: {
    globals: {
      ...globals.node
    }
  },
  plugins: {
    n: nPlugin,
    unicorn: unicornPlugin
  },
  rules
};

export default node;
