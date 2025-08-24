import type { Linter } from 'eslint';

import typescriptPlugin from 'typescript-eslint';

import rules from './rules.js';

const typescript: Linter.Config = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: typescriptPlugin.parser,
    parserOptions: {
      project: true
    }
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin.plugin
  },
  rules
};

export default typescript;
