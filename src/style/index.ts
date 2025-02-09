import type { Linter } from 'eslint';

import stylisticPlugin from '@stylistic/eslint-plugin';
import perfectionistPlugin from 'eslint-plugin-perfectionist';

import rules from './rules.js';

const stylistic: Linter.Config = {
  plugins: {
    // @ts-expect-error missing type
    '@stylistic': stylisticPlugin
  },
  rules: {
    ...rules
  }
};

const perfectionist = perfectionistPlugin.configs['recommended-natural'];

const style = [stylistic, perfectionist];

export default style;
