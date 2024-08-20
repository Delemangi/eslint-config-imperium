import type { Linter } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const base: Linter.Config = {
  files: ['**/*.{js,ts}'],
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: true,
        natural: false,
      },
    ],
  },
};

export default base;
