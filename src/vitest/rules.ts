import type { Linter } from 'eslint';

const vitestRules = {
  'vitest/consistent-test-filenames': ['off'],
  'vitest/consistent-test-it': ['error'],
  'vitest/expect-expect': ['error'],
  'vitest/max-expects': ['off'],
  'vitest/max-nested-describes': ['off'],
  'vitest/no-alias-methods': ['off'],
  'vitest/no-commented-out-tests': ['error'],
  'vitest/no-conditional-expects': ['off'],
  'vitest/no-conditional-in-tests': ['off'],
  'vitest/no-conditional-tests': ['off'],
  'vitest/no-disabled-tests': ['off'],
  'vitest/no-duplicate-hooks': ['error'],
  'vitest/no-focused-tests': ['off'],
  'vitest/no-hooks': ['off'],
  'vitest/no-identical-title': ['error'],
  'vitest/no-import-node-test': ['error'],
  'vitest/no-interpolation-in-snapshots': ['off'],
  'vitest/no-large-snapshots': ['off'],
  'vitest/no-mocks-import': ['off'],
  'vitest/no-restricted-matchers': ['off'],
  'vitest/no-restricted-vi-methods': ['off'],
  'vitest/no-standalone-expect': ['error'],
  'vitest/no-test-prefixes': ['off'],
  'vitest/no-test-return-statement': ['off'],
  'vitest/padding-around-after-all-blocks': ['error'],
  'vitest/padding-around-after-each-blocks': ['error'],
  'vitest/padding-around-all': ['error'],
  'vitest/padding-around-before-all-blocks': ['error'],
  'vitest/padding-around-before-each-blocks': ['error'],
  'vitest/padding-around-describe-blocks': ['error'],
  'vitest/padding-around-expect-groups': ['error'],
  'vitest/prefer-called-with': ['off'],
  'vitest/prefer-comparison-matcher': ['error'],
  'vitest/prefer-each': ['error'],
  'vitest/prefer-equality-matcher': ['error'],
  'vitest/prefer-expect-assertions': ['off'],
  'vitest/prefer-expect-resolves': ['error'],
  'vitest/prefer-hooks-in-order': ['off'],
  'vitest/prefer-hooks-on-top': ['error'],
  'vitest/prefer-lowercase-title': ['off'],
  'vitest/prefer-mock-promise-shorthand': ['error'],
  'vitest/prefer-snapshot-hint': ['off'],
  'vitest/prefer-spy-on': ['error'],
  'vitest/prefer-strict-boolean-matchers': ['error'],
  'vitest/prefer-strict-equal': ['error'],
  'vitest/prefer-to-be': ['off'],
  'vitest/prefer-to-be-falsy': ['off'],
  'vitest/prefer-to-be-object': ['error'],
  'vitest/prefer-to-be-truthy': ['off'],
  'vitest/prefer-to-contain': ['error'],
  'vitest/prefer-to-have-length': ['error'],
  'vitest/prefer-todo': ['warn'],
  'vitest/prefer-vi-mocked': ['error'],
  'vitest/require-hook': ['off'],
  'vitest/require-local-test-context-for-concurrent-snapshots': ['error'],
  'vitest/require-to-throw-message': ['off'],
  'vitest/require-top-level-describe': ['off'],
  'vitest/valid-describe-callback': ['error'],
  'vitest/valid-expect': ['error'],
  'vitest/valid-expect-in-promise': ['error'],
  'vitest/valid-title': ['error'],
} satisfies Linter.Config['rules'];

const rules = {
  ...vitestRules,
} satisfies Linter.Config['rules'];

export default rules;
