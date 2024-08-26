import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import rules from './rules.js';

const typescript: Linter.Config = {
  files: [
    '**/*.{ts,tsx}',
  ],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: true,
    },
  },
  plugins: {
    // @ts-expect-error missing type
    '@typescript-eslint': typescriptPlugin,
  },
  rules,
};

export default typescript;
