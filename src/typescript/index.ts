import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';

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
  rules: {
    'n/global-require': 'off',
    'n/no-missing-import': 'off',
    'no-duplicate-imports': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: [
          '/',
        ],
      },
    ],
  },
  settings: {
    node: {
      tryExtensions: [
        '.ts',
        '.tsx',
        '.js',
        '.json',
      ],
    },
  },
};

export default typescript;
