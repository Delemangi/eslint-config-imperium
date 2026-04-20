import type { Linter } from 'eslint';

const eslintReactRules = {
  '@eslint-react/component-hook-factories': ['error'],
  '@eslint-react/error-boundaries': ['error'],
  '@eslint-react/exhaustive-deps': ['off'],
  '@eslint-react/immutability': ['off'],
  '@eslint-react/no-access-state-in-setstate': ['error'],
  '@eslint-react/no-array-index-key': ['error'],
  '@eslint-react/no-children-count': ['error'],
  '@eslint-react/no-children-for-each': ['error'],
  '@eslint-react/no-children-map': ['error'],
  '@eslint-react/no-children-only': ['error'],
  '@eslint-react/no-children-to-array': ['error'],
  '@eslint-react/no-class-component': ['error'],
  '@eslint-react/no-clone-element': ['error'],
  '@eslint-react/no-component-will-mount': ['error'],
  '@eslint-react/no-component-will-receive-props': ['error'],
  '@eslint-react/no-component-will-update': ['error'],
  '@eslint-react/no-context-provider': ['error'],
  '@eslint-react/no-create-ref': ['error'],
  '@eslint-react/no-direct-mutation-state': ['error'],
  '@eslint-react/no-duplicate-key': ['error'],
  '@eslint-react/no-forward-ref': ['error'],
  '@eslint-react/no-implicit-children': ['error'],
  '@eslint-react/no-implicit-key': ['error'],
  '@eslint-react/no-implicit-ref': ['error'],
  '@eslint-react/no-leaked-conditional-rendering': ['error'],
  '@eslint-react/no-missing-component-display-name': ['error'],
  '@eslint-react/no-missing-context-display-name': ['error'],
  '@eslint-react/no-missing-key': ['error'],
  '@eslint-react/no-misused-capture-owner-stack': ['error'],
  '@eslint-react/no-nested-component-definitions': ['error'],
  '@eslint-react/no-nested-lazy-component-declarations': ['error'],
  '@eslint-react/no-redundant-should-component-update': ['error'],
  '@eslint-react/no-set-state-in-component-did-mount': ['error'],
  '@eslint-react/no-set-state-in-component-did-update': ['error'],
  '@eslint-react/no-set-state-in-component-will-update': ['error'],
  '@eslint-react/no-unnecessary-use-callback': ['error'],
  '@eslint-react/no-unnecessary-use-memo': ['error'],
  '@eslint-react/no-unnecessary-use-prefix': ['error'],
  '@eslint-react/no-unsafe-component-will-mount': ['error'],
  '@eslint-react/no-unsafe-component-will-receive-props': ['error'],
  '@eslint-react/no-unsafe-component-will-update': ['error'],
  '@eslint-react/no-unstable-context-value': ['error'],
  '@eslint-react/no-unstable-default-props': ['error'],
  '@eslint-react/no-unused-class-component-members': ['error'],
  '@eslint-react/no-unused-props': ['off'],
  '@eslint-react/no-unused-state': ['error'],
  '@eslint-react/no-use-context': ['off'],
  '@eslint-react/prefer-destructuring-assignment': ['error'],
  '@eslint-react/prefer-namespace-import': ['off'],
  '@eslint-react/purity': ['off'],
  '@eslint-react/refs': ['off'],
  '@eslint-react/rules-of-hooks': ['off'],
  '@eslint-react/set-state-in-effect': ['off'],
  '@eslint-react/set-state-in-render': ['off'],
  '@eslint-react/unsupported-syntax': ['off'],
  '@eslint-react/use-memo': ['off'],
  '@eslint-react/use-state': ['error']
} satisfies Linter.Config['rules'];

const eslintReactJsxRules = {
  '@eslint-react/jsx-no-children-prop': ['error'],
  '@eslint-react/jsx-no-children-prop-with-children': ['error'],
  '@eslint-react/jsx-no-comment-textnodes': ['error'],
  '@eslint-react/jsx-no-key-after-spread': ['error'],
  '@eslint-react/jsx-no-leaked-dollar': ['error'],
  '@eslint-react/jsx-no-leaked-semicolon': ['error'],
  '@eslint-react/jsx-no-namespace': ['error'],
  '@eslint-react/jsx-no-useless-fragment': ['error']
} satisfies Linter.Config['rules'];

const eslintReactDomRules = {
  '@eslint-react/dom-no-dangerously-set-innerhtml': ['error'],
  '@eslint-react/dom-no-dangerously-set-innerhtml-with-children': ['error'],
  '@eslint-react/dom-no-find-dom-node': ['error'],
  '@eslint-react/dom-no-flush-sync': ['error'],
  '@eslint-react/dom-no-hydrate': ['error'],
  '@eslint-react/dom-no-missing-button-type': ['error'],
  '@eslint-react/dom-no-missing-iframe-sandbox': ['error'],
  '@eslint-react/dom-no-render': ['error'],
  '@eslint-react/dom-no-render-return-value': ['error'],
  '@eslint-react/dom-no-script-url': ['error'],
  '@eslint-react/dom-no-string-style-prop': ['error'],
  '@eslint-react/dom-no-unknown-property': ['error'],
  '@eslint-react/dom-no-unsafe-iframe-sandbox': ['error'],
  '@eslint-react/dom-no-unsafe-target-blank': ['error'],
  '@eslint-react/dom-no-use-form-state': ['error'],
  '@eslint-react/dom-no-void-elements-with-children': ['error'],
  '@eslint-react/dom-prefer-namespace-import': ['off']
} satisfies Linter.Config['rules'];

const eslintReactWebApiRules = {
  '@eslint-react/web-api-no-leaked-event-listener': ['error'],
  '@eslint-react/web-api-no-leaked-interval': ['error'],
  '@eslint-react/web-api-no-leaked-resize-observer': ['error'],
  '@eslint-react/web-api-no-leaked-timeout': ['error']
} satisfies Linter.Config['rules'];

const eslintReactRscRules = {
  '@eslint-react/rsc-function-definition': ['off']
} satisfies Linter.Config['rules'];

const eslintReactNamingConventionRules = {
  '@eslint-react/naming-convention-context-name': ['error'],
  '@eslint-react/naming-convention-id-name': ['error'],
  '@eslint-react/naming-convention-ref-name': ['error']
} satisfies Linter.Config['rules'];

const reactHooksRules = {
  'react-hooks/capitalized-calls': ['off'],
  'react-hooks/config': ['off'],
  'react-hooks/error-boundaries': ['off'],
  'react-hooks/exhaustive-deps': ['error'],
  'react-hooks/exhaustive-effect-dependencies': ['off'],
  'react-hooks/fbt': ['off'],
  'react-hooks/gating': ['off'],
  'react-hooks/globals': ['off'],
  'react-hooks/hooks': ['off'],
  'react-hooks/immutability': ['off'],
  'react-hooks/incompatible-library': ['off'],
  'react-hooks/invariant': ['off'],
  'react-hooks/memo-dependencies': ['off'],
  'react-hooks/memoized-effect-dependencies': ['off'],
  'react-hooks/no-deriving-state-in-effects': ['off'],
  'react-hooks/preserve-manual-memoization': ['off'],
  'react-hooks/purity': ['off'],
  'react-hooks/refs': ['off'],
  'react-hooks/rule-suppression': ['off'],
  'react-hooks/rules-of-hooks': ['error'],
  'react-hooks/set-state-in-effect': ['off'],
  'react-hooks/set-state-in-render': ['off'],
  'react-hooks/static-components': ['off'],
  'react-hooks/syntax': ['off'],
  'react-hooks/todo': ['off'],
  'react-hooks/unsupported-syntax': ['off'],
  'react-hooks/use-memo': ['off'],
  'react-hooks/void-use-memo': ['off']
} satisfies Linter.Config['rules'];

const reactRefreshRules = {
  'react-refresh/only-export-components': [
    'error',
    {
      allowConstantExport: true
    }
  ]
} satisfies Linter.Config['rules'];

const rules = {
  ...eslintReactRules,
  ...eslintReactJsxRules,
  ...eslintReactDomRules,
  ...eslintReactWebApiRules,
  ...eslintReactRscRules,
  ...eslintReactNamingConventionRules,
  ...reactHooksRules,
  ...reactRefreshRules
} satisfies Linter.Config['rules'];

export default rules;
