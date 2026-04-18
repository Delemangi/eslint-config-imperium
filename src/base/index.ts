import type { ESLint, Linter } from 'eslint';

import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';
import { importX as importXPlugin } from 'eslint-plugin-import-x';
import jsdocPlugin from 'eslint-plugin-jsdoc';
// @ts-expect-error missing types
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error missing types
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';

import rules from './rules.js';

const base: Linter.Config = {
  files: ['**/*.{js,ts,jsx,tsx,mjs,cjs}'],
  languageOptions: {
    globals: {
      ...globals['shared-node-browser']
    }
  },
  plugins: {
    '@eslint-community/eslint-comments': eslintCommentsPlugin,
    'import-x': importXPlugin,
    jsdoc: jsdocPlugin,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- plugin lacks type definitions
    promise: promisePlugin,
    regexp: regexpPlugin,
    security: securityPlugin as ESLint.Plugin,
    sonarjs: sonarjsPlugin,
    unicorn: unicornPlugin,
    'unused-imports': unusedImportsPlugin
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
    },
    jsdoc: {
      mode: 'typescript'
    }
  }
};

export default base;
