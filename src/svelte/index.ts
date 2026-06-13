import type { Linter } from 'eslint';

import sveltePlugin from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';

import rules from './rules.js';

const svelte: Linter.Config[] = [
  ...sveltePlugin.configs['flat/base'],
  {
    files: [
      '**/*.svelte',
      '**/*.svelte.js',
      '**/*.svelte.ts'
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules
  }
];

export default svelte;
