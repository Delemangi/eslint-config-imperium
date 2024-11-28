import type { Linter } from 'eslint';

import stylisticPlugin from '@stylistic/eslint-plugin';
import perfectionistPlugin from 'eslint-plugin-perfectionist';

import rules from './rules.js';

const baseStylistic = stylisticPlugin.configs.customize({
  arrowParens: true,
  blockSpacing: true,
  braceStyle: '1tbs',
  commaDangle: 'always-multiline',
  flat: true,
  indent: 2,
  jsx: true,
  pluginName: '@stylistic',
  quoteProps: 'consistent-as-needed',
  quotes: 'single',
  semi: true,
});

const stylistic: Linter.Config = {
  ...baseStylistic,
  rules: {
    ...baseStylistic.rules,
    ...rules,
  },
};

const perfectionist = perfectionistPlugin.configs['recommended-natural'];

const style = [stylistic, perfectionist];

export default style;
