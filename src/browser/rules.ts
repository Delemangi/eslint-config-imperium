import type { Linter } from 'eslint';

const unicornRules = {
  'unicorn/prefer-dom-node-append': ['error'],
  'unicorn/prefer-dom-node-dataset': ['error'],
  'unicorn/prefer-dom-node-remove': ['error'],
  'unicorn/prefer-dom-node-text-content': ['error'],
  'unicorn/prefer-keyboard-event-key': ['error'],
  'unicorn/prefer-modern-dom-apis': ['error'],
  'unicorn/prefer-query-selector': ['error'],
  'unicorn/require-post-message-target-origin': ['off']
} satisfies Linter.Config['rules'];

export default {
  ...unicornRules
} satisfies Linter.Config['rules'];
