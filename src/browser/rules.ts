import type { Linter } from 'eslint';

const unicornRules = {
  'unicorn/better-dom-traversing': ['error'],
  'unicorn/dom-node-dataset': ['error'],
  'unicorn/no-canvas-to-image': ['error'],
  'unicorn/no-incorrect-query-selector': ['error'],
  'unicorn/no-invalid-file-input-accept': ['error'],
  'unicorn/no-late-current-target-access': ['error'],
  'unicorn/no-unsafe-dom-html': ['error'],
  'unicorn/prefer-add-event-listener-options': ['error'],
  'unicorn/prefer-dom-node-append': ['error'],
  'unicorn/prefer-dom-node-html-methods': ['error'],
  'unicorn/prefer-dom-node-remove': ['error'],
  'unicorn/prefer-dom-node-text-content': ['error'],
  'unicorn/prefer-keyboard-event-key': ['error'],
  'unicorn/prefer-location-assign': ['error'],
  'unicorn/prefer-modern-dom-apis': ['error'],
  'unicorn/prefer-path2d': ['error'],
  'unicorn/prefer-query-selector': ['error'],
  'unicorn/prefer-scoped-selector': ['error'],
  'unicorn/require-css-escape': ['error'],
  'unicorn/require-passive-events': ['error'],
  'unicorn/require-post-message-target-origin': ['off']
} satisfies Linter.Config['rules'];

export default unicornRules;
