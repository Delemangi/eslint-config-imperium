import type { Linter } from 'eslint';

const nRules = {
  'n/callback-return': 'error',
  'n/exports-style': [
    'error',
    'module.exports',
  ],
  'n/file-extension-in-import': 'off',
  'n/global-require': 'error',
  'n/handle-callback-err': 'error',
  'n/no-callback-literal': 'error',
  'n/no-deprecated-api': 'error',
  'n/no-exports-assign': 'error',
  'n/no-extraneous-import': 'error',
  'n/no-extraneous-require': 'error',
  'n/no-missing-import': 'off',
  'n/no-missing-require': 'off',
  'n/no-mixed-requires': 'off',
  'n/no-new-require': 'error',
  'n/no-path-concat': 'error',
  'n/no-process-env': 'error',
  'n/no-process-exit': 'error',
  'n/no-restricted-import': 'off',
  'n/no-restricted-require': 'off',
  'n/no-sync': 'off',
  'n/no-unpublished-bin': 'error',
  'n/no-unpublished-import': 'off',
  'n/no-unpublished-require': 'off',
  'n/no-unsupported-features/es-builtins': 'off',
  'n/no-unsupported-features/es-syntax': 'off',
  'n/no-unsupported-features/node-builtins': 'off',
  'n/prefer-global/buffer': 'error',
  'n/prefer-global/console': 'error',
  'n/prefer-global/process': 'error',
  'n/prefer-global/text-decoder': 'error',
  'n/prefer-global/text-encoder': 'error',
  'n/prefer-global/url': 'error',
  'n/prefer-global/url-search-params': 'error',
  'n/prefer-promises/dns': 'error',
  'n/prefer-promises/fs': 'error',
  'n/process-exit-as-throw': 'error',
  'n/shebang': [
    'error',
    {
      convertPath: {
        'src/**/*.js': [
          '^src/(.+?)\\.js$',
          'dist/$1.js',
        ],
      },
    },
  ],
} satisfies Linter.Config['rules'];

const unicornRules = {
  'unicorn/prefer-json-parse-buffer': ['off'],
  'unicorn/prefer-module': ['error'],
  'unicorn/prefer-node-protocol': ['error'],
} satisfies Linter.Config['rules'];

export default {
  ...nRules,
  ...unicornRules,
} satisfies Linter.Config['rules'];
