import type { Linter } from 'eslint';

import astroPlugin from 'eslint-plugin-astro';

import rules from './rules.js';

const astro: Linter.Config[] = [
  ...astroPlugin.configs['flat/base'],
  {
    files: ['**/*.astro'],
    rules
  }
];

export default astro;
