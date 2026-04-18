import type { Linter } from 'eslint';

import { importX as importXPlugin } from 'eslint-plugin-import-x';

import rules from './rules.js';

const importX: Linter.Config = {
  plugins: {
    'import-x': importXPlugin
  },
  rules,
  settings: {
    'import-x/extensions': [
      '.ts',
      '.tsx',
      '.cts',
      '.mts',
      '.js',
      '.jsx',
      '.cjs',
      '.mjs'
    ],
    'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import-x/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
        '.cts',
        '.mts'
      ]
    },
    'import-x/resolver': {
      typescript: true
    }
  }
};

export default importX;
