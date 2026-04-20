import type { Linter } from 'eslint';

import vuePlugin from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

import rules from './rules.js';

const vue: Linter.Config = {
  files: ['**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      extraFileExtensions: ['.vue'],
      parser: tseslint.parser
    }
  },
  plugins: {
    vue: vuePlugin
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- processors type is not fully typed
  processor: vuePlugin.processors['.vue'],
  rules
};

export default vue;
