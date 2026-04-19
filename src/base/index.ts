import type { ESLint, Linter } from 'eslint';

import e18ePlugin from '@e18e/eslint-plugin';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';
import { fixupPluginRules } from '@eslint/compat';
import { importX as importXPlugin } from 'eslint-plugin-import-x';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import noBarrelFilesPlugin from 'eslint-plugin-no-barrel-files';
// @ts-expect-error -- untyped plugin
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error -- untyped plugin
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
    e18e: e18ePlugin,
    'import-x': importXPlugin,
    jsdoc: jsdocPlugin,
    'no-barrel-files': noBarrelFilesPlugin as ESLint.Plugin,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- untyped plugin
    promise: fixupPluginRules(promisePlugin),
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

const jsdocJsOverrides: Linter.Config = {
  files: ['**/*.{js,jsx,mjs,cjs}'],
  rules: {
    'jsdoc/no-undefined-types': ['error'],
    'jsdoc/require-param-type': ['error'],
    'jsdoc/require-property-type': ['error'],
    'jsdoc/require-returns-type': ['error']
  }
};

const jsdocTsOverrides: Linter.Config = {
  files: ['**/*.{ts,tsx,mts,cts}'],
  rules: {
    'jsdoc/no-types': ['error']
  }
};

export default [
  base,
  jsdocJsOverrides,
  jsdocTsOverrides
] satisfies Linter.Config[];
