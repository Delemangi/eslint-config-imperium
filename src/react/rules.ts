import type { Linter } from 'eslint';

const reactRules = {
  'react/boolean-prop-naming': ['error'],
  'react/button-has-type': ['error'],
  'react/checked-requires-onchange-or-readonly': ['off'],
  'react/default-props-match-prop-types': ['off'],
  'react/destructuring-assignment': [
    'error',
    'always',
    {
      destructureInSignature: 'always'
    }
  ],
  'react/display-name': [
    'error',
    {
      checkContextObjects: true
    }
  ],
  'react/forbid-component-props': ['off'],
  'react/forbid-dom-props': ['off'],
  'react/forbid-elements': ['off'],
  'react/forbid-foreign-prop-types': ['off'],
  'react/forbid-prop-types': ['off'],
  'react/forward-ref-uses-ref': ['error'],
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }
  ],
  'react/hook-use-state': ['error'],
  'react/iframe-missing-sandbox': ['error'],
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-child-element-spacing': ['off'],
  'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
  'react/jsx-closing-tag-location': ['error'],
  'react/jsx-curly-brace-presence': [
    'error',
    {
      children: 'never',
      props: 'never'
    }
  ],
  'react/jsx-curly-newline': ['error'],
  'react/jsx-curly-spacing': [
    'error',
    'never',
    {
      allowMultiline: true
    }
  ],
  'react/jsx-equals-spacing': ['error', 'never'],
  'react/jsx-filename-extension': ['off'],
  'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-handler-names': [
    'error',
    {
      checkInlineFunction: false,
      checkLocalVariables: false,
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on'
    }
  ],
  'react/jsx-indent': ['error', 2],
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-key': [
    'error',
    {
      checkFragmentShorthand: true,
      checkKeyMustBeforeSpread: true
    }
  ],
  'react/jsx-max-depth': ['off'],
  'react/jsx-max-props-per-line': [
    'error',
    {
      maximum: 3,
      when: 'multiline'
    }
  ],
  'react/jsx-newline': [
    'error',
    {
      prevent: true
    }
  ],
  'react/jsx-no-bind': [
    'error',
    {
      allowArrowFunctions: true,
      allowBind: false,
      ignoreRefs: true
    }
  ],
  'react/jsx-no-comment-textnodes': ['error'],
  'react/jsx-no-constructed-context-values': ['error'],
  'react/jsx-no-duplicate-props': ['error'],
  'react/jsx-no-leaked-render': ['error'],
  'react/jsx-no-literals': ['off'],
  'react/jsx-no-script-url': ['error'],
  'react/jsx-no-target-blank': ['error'],
  'react/jsx-no-undef': ['error'],
  'react/jsx-no-useless-fragment': ['error'],
  'react/jsx-one-expression-per-line': ['off'],
  'react/jsx-pascal-case': ['error'],
  'react/jsx-props-no-multi-spaces': ['error'],
  'react/jsx-props-no-spread-multi': ['error'],
  'react/jsx-props-no-spreading': ['off'],
  'react/jsx-sort-props': ['off'],
  'react/jsx-tag-spacing': [
    'error',
    {
      afterOpening: 'never',
      beforeSelfClosing: 'always',
      closingSlash: 'never'
    }
  ],
  'react/jsx-uses-react': ['error'],
  'react/jsx-uses-vars': ['error'],
  'react/jsx-wrap-multilines': ['off'],
  'react/no-access-state-in-setstate': ['error'],
  'react/no-adjacent-inline-elements': ['error'],
  'react/no-array-index-key': ['error'],
  'react/no-arrow-function-lifecycle': ['error'],
  'react/no-children-prop': ['error'],
  'react/no-danger': ['error'],
  'react/no-danger-with-children': ['error'],
  'react/no-deprecated': ['error'],
  'react/no-did-mount-set-state': ['error'],
  'react/no-did-update-set-state': ['error'],
  'react/no-direct-mutation-state': ['error'],
  'react/no-find-dom-node': ['error'],
  'react/no-invalid-html-attribute': ['error'],
  'react/no-is-mounted': ['error'],
  'react/no-multi-comp': ['off'],
  'react/no-namespace': ['error'],
  'react/no-object-type-as-default-prop': ['error'],
  'react/no-redundant-should-component-update': ['error'],
  'react/no-render-return-value': ['error'],
  'react/no-set-state': ['off'],
  'react/no-string-refs': ['error'],
  'react/no-this-in-sfc': ['error'],
  'react/no-typos': ['error'],
  'react/no-unescaped-entities': ['error'],
  'react/no-unknown-property': ['error'],
  'react/no-unsafe': ['error'],
  'react/no-unstable-nested-components': ['error'],
  'react/no-unused-class-component-methods': ['error'],
  'react/no-unused-prop-types': ['error'],
  'react/no-unused-state': ['error'],
  'react/no-will-update-set-state': ['error'],
  'react/prefer-es6-class': ['error'],
  'react/prefer-exact-props': ['error'],
  'react/prefer-read-only-props': ['error'],
  'react/prefer-stateless-function': [
    'error',
    {
      ignorePureComponents: true
    }
  ],
  'react/prop-types': ['error'],
  'react/react-in-jsx-scope': ['off'],
  'react/require-default-props': ['off'],
  'react/require-optimization': ['off'],
  'react/require-render-return': ['error'],
  'react/self-closing-comp': ['error'],
  'react/sort-comp': ['off'],
  'react/sort-default-props': ['off'],
  'react/sort-prop-types': ['off'],
  'react/state-in-constructor': ['error'],
  'react/static-property-placement': ['off'],
  'react/style-prop-object': ['error'],
  'react/void-dom-elements-no-children': ['error']
} satisfies Linter.Config['rules'];

const reactHooksRules = {
  'react-hooks/automatic-effect-dependencies': ['off'],
  'react-hooks/capitalized-calls': ['error'],
  'react-hooks/component-hook-factories': ['error'],
  'react-hooks/config': ['error'],
  'react-hooks/error-boundaries': ['error'],
  'react-hooks/exhaustive-deps': ['error'], // Should this throw warnings instead?
  'react-hooks/fbt': ['off'],
  'react-hooks/fire': ['off'],
  'react-hooks/gating': ['error'],
  'react-hooks/globals': ['error'],
  'react-hooks/hooks': ['error'],
  'react-hooks/immutability': ['error'],
  'react-hooks/incompatible-library': ['error'],
  'react-hooks/invariant': ['off'],
  'react-hooks/memoized-effect-dependencies': ['off'],
  'react-hooks/no-deriving-state-in-effects': ['off'],
  'react-hooks/preserve-manual-memoization': ['error'],
  'react-hooks/purity': ['error'],
  'react-hooks/refs': ['error'],
  'react-hooks/rule-suppression': ['off'],
  'react-hooks/rules-of-hooks': ['error'],
  'react-hooks/set-state-in-effect': ['error'],
  'react-hooks/set-state-in-render': ['error'],
  'react-hooks/static-components': ['error'],
  'react-hooks/syntax': ['error'],
  'react-hooks/todo': ['off'],
  'react-hooks/unsupported-syntax': ['error'],
  'react-hooks/use-memo': ['error'],
  'react-hooks/void-use-memo': ['error']
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
  ...reactRules,
  ...reactHooksRules,
  ...reactRefreshRules
} satisfies Linter.Config['rules'];

export default rules;
