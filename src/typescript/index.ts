import type { Linter } from 'eslint';

import typescriptPlugin from 'typescript-eslint';

import rules from './rules.js';

const typescript: Linter.Config = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parserOptions: {
      project: true
    }
  },
  plugins: {
    // @ts-expect-error missing type
    '@typescript-eslint': typescriptPlugin
  },
  rules
};

export default typescript;
