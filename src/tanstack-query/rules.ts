import type { Linter } from 'eslint';

const tanstackQueryRules = {
  '@tanstack/query/exhaustive-deps': ['error'],
  '@tanstack/query/infinite-query-property-order': ['error'],
  '@tanstack/query/mutation-property-order': ['error'],
  '@tanstack/query/no-rest-destructuring': ['error'],
  '@tanstack/query/no-unstable-deps': ['error'],
  '@tanstack/query/no-void-query-fn': ['error'],
  '@tanstack/query/prefer-query-options': ['error'],
  '@tanstack/query/stable-query-client': ['error']
} satisfies Linter.Config['rules'];

export default tanstackQueryRules;
