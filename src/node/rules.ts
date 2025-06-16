import type { Linter } from 'eslint';

const nRules = {
  'n/callback-return': ['error'],
  'n/exports-style': ['error', 'module.exports'],
  'n/file-extension-in-import': ['off'],
  'n/global-require': ['error'],
  'n/handle-callback-err': ['error'],
  'n/hashbang': ['off'],
  'n/no-callback-literal': ['error'],
  'n/no-deprecated-api': ['error'],
  'n/no-exports-assign': ['error'],
  'n/no-extraneous-import': ['error'],
  'n/no-extraneous-require': ['error'],
  'n/no-missing-import': ['off'], // Doesn't work well with discord.js
  'n/no-missing-require': ['off'], // Doesn't work well with discord.js
  'n/no-mixed-requires': ['error'],
  'n/no-new-require': ['error'],
  'n/no-path-concat': ['error'],
  'n/no-process-env': ['off'],
  'n/no-process-exit': ['warn'],
  'n/no-restricted-import': ['off'],
  'n/no-restricted-require': ['off'],
  'n/no-sync': ['off'],
  'n/no-top-level-await': ['off'],
  'n/no-unpublished-bin': ['error'],
  'n/no-unpublished-import': ['off'],
  'n/no-unpublished-require': ['off'],
  'n/no-unsupported-features/es-builtins': ['off'],
  'n/no-unsupported-features/es-syntax': ['off'],
  'n/no-unsupported-features/node-builtins': ['off'],
  'n/prefer-global/buffer': ['error'],
  'n/prefer-global/console': ['error'],
  'n/prefer-global/process': ['error'],
  'n/prefer-global/text-decoder': ['error'],
  'n/prefer-global/text-encoder': ['error'],
  'n/prefer-global/url': ['error'],
  'n/prefer-global/url-search-params': ['error'],
  'n/prefer-node-protocol': ['error'],
  'n/prefer-promises/dns': ['error'],
  'n/prefer-promises/fs': ['error'],
  'n/process-exit-as-throw': ['error']
} satisfies Linter.Config['rules'];

const unicornRules = {
  'unicorn/no-process-exit': ['warn'],
  'unicorn/prefer-json-parse-buffer': ['off'],
  'unicorn/prefer-module': ['error'],
  'unicorn/prefer-node-protocol': ['error']
} satisfies Linter.Config['rules'];

export default {
  ...nRules,
  ...unicornRules
} satisfies Linter.Config['rules'];
