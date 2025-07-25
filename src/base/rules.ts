import type { Linter } from 'eslint';

const eslintRules = {
  'array-callback-return': [
    'error',
    {
      allowImplicit: true,
      checkForEach: true
    }
  ],
  'constructor-super': ['error'],
  'for-direction': ['error'],
  'getter-return': ['error'],
  'no-async-promise-executor': ['error'],
  'no-await-in-loop': ['off'],
  'no-class-assign': ['error'],
  'no-compare-neg-zero': ['error'],
  'no-cond-assign': ['error', 'except-parens'],
  'no-const-assign': ['error'],
  'no-constant-binary-expression': ['error'],
  'no-constant-condition': [
    'error',
    {
      checkLoops: 'allExceptWhileTrue'
    }
  ],
  'no-constructor-return': ['error'],
  'no-control-regex': ['error'],
  'no-debugger': ['error'],
  'no-dupe-args': ['error'],
  'no-dupe-class-members': ['error'],
  'no-dupe-else-if': ['error'],
  'no-dupe-keys': ['error'],
  'no-duplicate-case': ['error'],
  'no-duplicate-imports': ['error'], // Does this have a version with autofix?
  'no-empty-character-class': ['error'],
  'no-empty-pattern': ['error'],
  'no-ex-assign': ['error'],
  'no-fallthrough': ['error'],
  'no-func-assign': ['error'],
  'no-import-assign': ['error'],
  'no-inner-declarations': ['error'],
  'no-invalid-regexp': ['error'],
  'no-irregular-whitespace': ['error'],
  'no-loss-of-precision': ['error'],
  'no-misleading-character-class': ['error'],
  'no-new-native-nonconstructor': ['error'],
  'no-obj-calls': ['error'],
  'no-promise-executor-return': ['error'],
  'no-prototype-builtins': ['error'],
  'no-self-assign': ['error'],
  'no-self-compare': ['error'],
  'no-setter-return': ['error'],
  'no-sparse-arrays': ['error'],
  'no-template-curly-in-string': ['error'],
  'no-this-before-super': ['error'],
  'no-unassigned-vars': ['error'],
  'no-undef': ['error'],
  'no-unexpected-multiline': ['error'],
  'no-unmodified-loop-condition': ['error'],
  'no-unreachable': ['error'],
  'no-unreachable-loop': ['error'],
  'no-unsafe-finally': ['error'],
  'no-unsafe-negation': [
    'error',
    {
      enforceForOrderingRelations: true
    }
  ],
  'no-unsafe-optional-chaining': [
    'error',
    {
      disallowArithmeticOperators: true
    }
  ],
  'no-unused-private-class-members': ['error'],
  'no-unused-vars': ['error', 'all'], // Should the option be 'all'?
  'no-use-before-define': [
    'error',
    {
      allowNamedExports: false,
      classes: true,
      functions: false,
      variables: true
    }
  ]
} satisfies Linter.Config['rules'];

const eslintSuggestionsRules = {
  'accessor-pairs': ['error'],
  'arrow-body-style': ['error', 'as-needed'],
  'block-scoped-var': ['error'],
  camelcase: ['error'], // Should this be enabled?
  'capitalized-comments': ['off'],
  'class-methods-use-this': ['error'],
  complexity: ['error', 30],
  'consistent-return': ['error'],
  'consistent-this': ['error', 'self'],
  curly: ['error'],
  'default-case': ['error'],
  'default-case-last': ['error'],
  'default-param-last': ['error'],
  'dot-notation': ['error'],
  eqeqeq: ['error'],
  'func-name-matching': ['error'],
  'func-names': ['error', 'never'],
  'func-style': ['error', 'expression'],
  'grouped-accessor-pairs': [2, 'getBeforeSet'],
  'guard-for-in': ['error'],
  'id-denylist': ['off'],
  'id-length': ['off'],
  'id-match': ['off'],
  'init-declarations': ['off'],
  'logical-assignment-operators': [
    'error',
    'always',
    {
      enforceForIfStatements: true
    }
  ],
  'max-classes-per-file': ['off'],
  'max-depth': ['warn', 5],
  'max-lines': ['warn', 1_000],
  'max-lines-per-function': ['warn', 200],
  'max-nested-callbacks': ['warn', 3],
  'max-params': ['warn', 3],
  'max-statements': ['off'],
  'new-cap': [
    'error',
    {
      capIsNew: false,
      capIsNewExceptions: ['Intl'],
      newIsCap: true
    }
  ],
  'no-alert': ['error'],
  'no-array-constructor': ['error'],
  'no-bitwise': ['error'],
  'no-caller': ['error'],
  'no-case-declarations': ['error'],
  'no-console': ['error'],
  'no-continue': ['off'],
  'no-delete-var': ['error'],
  'no-div-regex': ['error'],
  'no-else-return': ['off'],
  'no-empty': ['error'],
  'no-empty-function': ['error'],
  'no-empty-static-block': ['error'],
  'no-eq-null': ['error'],
  'no-eval': ['error'],
  'no-extend-native': ['error'],
  'no-extra-bind': ['error'],
  'no-extra-boolean-cast': ['error'],
  'no-extra-label': ['error'],
  'no-global-assign': ['error'],
  'no-implicit-coercion': ['error'],
  'no-implicit-globals': ['error'],
  'no-implied-eval': ['error'],
  'no-inline-comments': ['off'],
  'no-invalid-this': ['error'],
  'no-iterator': ['error'],
  'no-label-var': ['error'],
  'no-labels': ['off'],
  'no-lone-blocks': ['error'],
  'no-lonely-if': ['error'],
  'no-loop-func': ['error'],
  'no-magic-numbers': ['off'],
  'no-multi-assign': ['error'],
  'no-multi-str': ['off'],
  'no-negated-condition': ['off'], // Disabled in favor of 'unicorn/no-negated-condition'
  'no-nested-ternary': ['off'], // Disabled in favor of 'unicorn/no-nested-ternary'
  'no-new': ['error'],
  'no-new-func': ['error'],
  'no-new-wrappers': ['error'],
  'no-nonoctal-decimal-escape': ['error'],
  'no-object-constructor': ['error'],
  'no-octal': ['error'],
  'no-octal-escape': ['error'],
  'no-param-reassign': ['error'],
  'no-plusplus': ['off'],
  'no-proto': ['error'],
  'no-redeclare': ['error'],
  'no-regex-spaces': ['error'],
  'no-restricted-exports': ['off'],
  'no-restricted-globals': ['off'],
  'no-restricted-imports': ['off'],
  'no-restricted-properties': ['off'],
  'no-restricted-syntax': ['off'],
  'no-return-assign': ['error'],
  'no-script-url': ['error'],
  'no-sequences': ['error'],
  'no-shadow': [
    'error',
    {
      allow: [
        'event',
        'length',
        'name',
        'status'
      ],
      builtinGlobals: false,
      hoist: 'all'
    }
  ],
  'no-shadow-restricted-names': ['error'],
  'no-ternary': ['off'],
  'no-throw-literal': ['error'],
  'no-undef-init': ['error'],
  'no-undefined': ['off'],
  'no-underscore-dangle': ['off'],
  'no-unneeded-ternary': ['error'],
  'no-unused-expressions': ['error'],
  'no-unused-labels': ['error'],
  'no-useless-call': ['error'],
  'no-useless-catch': ['error'],
  'no-useless-computed-key': ['error'],
  'no-useless-concat': ['error'],
  'no-useless-constructor': ['error'],
  'no-useless-escape': ['error'],
  'no-useless-rename': ['error'],
  'no-useless-return': ['error'],
  'no-var': ['error'],
  'no-void': [
    'error',
    {
      allowAsStatement: true
    }
  ],
  'no-warning-comments': ['warn'], // Should this be enabled alongside 'unicorn/expiring-todo-comments'?
  'no-with': ['error'],
  'object-shorthand': ['error'],
  'one-var': ['error', 'never'],
  'operator-assignment': ['error'],
  'prefer-arrow-callback': ['error'],
  'prefer-const': ['error'],
  'prefer-destructuring': ['off'],
  'prefer-exponentiation-operator': ['error'],
  'prefer-named-capture-group': ['off'],
  'prefer-numeric-literals': ['error'],
  'prefer-object-has-own': ['error'],
  'prefer-object-spread': ['error'],
  'prefer-promise-reject-errors': ['error'],
  'prefer-regex-literals': [
    'error',
    {
      disallowRedundantWrapping: true
    }
  ],
  'prefer-rest-params': ['error'],
  'prefer-spread': ['error'],
  'prefer-template': ['error'],
  radix: ['error', 'as-needed'],
  'require-await': ['error'], // Should this be enabled?
  'require-unicode-regexp': ['error'],
  'require-yield': ['error'],
  'sort-imports': ['off'],
  'sort-keys': ['off'],
  'sort-vars': ['off'],
  strict: ['error', 'never'],
  'symbol-description': ['error'],
  'vars-on-top': ['error'],
  yoda: ['error']
} satisfies Linter.Config['rules'];

const eslintLayoutRules = {
  'unicode-bom': ['error']
} satisfies Linter.Config['rules'];

const unicornRules = {
  'unicorn/better-regex': ['error'],
  'unicorn/catch-error-name': ['error', { name: 'error' }],
  'unicorn/consistent-assert': ['off'],
  'unicorn/consistent-date-clone': ['error'],
  'unicorn/consistent-destructuring': ['error'],
  'unicorn/consistent-empty-array-spread': ['error'],
  'unicorn/consistent-existence-index-check': ['error'],
  'unicorn/consistent-function-scoping': ['error'],
  'unicorn/custom-error-definition': ['error'],
  'unicorn/empty-brace-spaces': ['error'],
  'unicorn/error-message': ['error'],
  'unicorn/escape-case': ['error'],
  'unicorn/expiring-todo-comments': ['warn'],
  'unicorn/explicit-length-check': ['error'],
  'unicorn/filename-case': [
    'error',
    {
      cases: {
        camelCase: true,
        kebabCase: true,
        pascalCase: true
      }
    }
  ],
  'unicorn/import-style': ['off'],
  'unicorn/new-for-builtins': ['error'],
  'unicorn/no-abusive-eslint-disable': ['error'],
  'unicorn/no-accessor-recursion': ['error'],
  'unicorn/no-anonymous-default-export': ['error'],
  'unicorn/no-array-callback-reference': ['off'],
  'unicorn/no-array-for-each': ['error'],
  'unicorn/no-array-method-this-argument': ['error'],
  'unicorn/no-array-reduce': [
    'error',
    {
      allowSimpleOperations: true
    }
  ],
  'unicorn/no-array-reverse': ['error'],
  'unicorn/no-await-expression-member': ['error'],
  'unicorn/no-await-in-promise-methods': ['error'],
  'unicorn/no-console-spaces': ['error'],
  'unicorn/no-document-cookie': ['error'],
  'unicorn/no-empty-file': ['error'],
  'unicorn/no-for-loop': ['error'],
  'unicorn/no-hex-escape': ['error'],
  'unicorn/no-instanceof-builtins': ['error'],
  'unicorn/no-invalid-fetch-options': ['error'],
  'unicorn/no-invalid-remove-event-listener': ['error'],
  'unicorn/no-keyword-prefix': ['off'],
  'unicorn/no-lonely-if': ['error'],
  'unicorn/no-magic-array-flat-depth': ['error'],
  'unicorn/no-named-default': ['error'],
  'unicorn/no-negated-condition': ['error'],
  'unicorn/no-negation-in-equality-check': ['error'],
  'unicorn/no-nested-ternary': ['error'],
  'unicorn/no-new-array': ['error'],
  'unicorn/no-new-buffer': ['error'],
  'unicorn/no-null': ['off'],
  'unicorn/no-object-as-default-parameter': ['error'],
  'unicorn/no-single-promise-in-promise-methods': ['error'],
  'unicorn/no-static-only-class': ['error'],
  'unicorn/no-thenable': ['error'],
  'unicorn/no-this-assignment': ['error'],
  'unicorn/no-typeof-undefined': ['error'],
  'unicorn/no-unnecessary-array-flat-depth': ['error'],
  'unicorn/no-unnecessary-array-splice-count': ['error'],
  'unicorn/no-unnecessary-await': ['error'],
  'unicorn/no-unnecessary-polyfills': ['error'],
  'unicorn/no-unnecessary-slice-end': ['error'],
  'unicorn/no-unreadable-array-destructuring': ['error'],
  'unicorn/no-unreadable-iife': ['error'],
  'unicorn/no-unused-properties': ['error'],
  'unicorn/no-useless-error-capture-stack-trace': ['error'],
  'unicorn/no-useless-fallback-in-spread': ['error'],
  'unicorn/no-useless-length-check': ['error'],
  'unicorn/no-useless-promise-resolve-reject': ['error'],
  'unicorn/no-useless-spread': ['error'],
  'unicorn/no-useless-switch-case': ['error'],
  'unicorn/no-useless-undefined': ['error'],
  'unicorn/no-zero-fractions': ['error'],
  'unicorn/number-literal-case': ['error'],
  'unicorn/numeric-separators-style': [
    2,
    {
      number: {
        groupLength: 3,
        minimumDigits: 0
      }
    }
  ],
  'unicorn/prefer-add-event-listener': ['error'], // Should this be enabled?
  'unicorn/prefer-array-find': ['error'],
  'unicorn/prefer-array-flat': ['error'],
  'unicorn/prefer-array-flat-map': ['error'],
  'unicorn/prefer-array-index-of': ['error'],
  'unicorn/prefer-array-some': ['error'],
  'unicorn/prefer-at': ['error'],
  'unicorn/prefer-blob-reading-methods': ['error'],
  'unicorn/prefer-class-fields': ['error'],
  'unicorn/prefer-code-point': ['error'],
  'unicorn/prefer-date-now': ['error'],
  'unicorn/prefer-default-parameters': ['error'],
  'unicorn/prefer-event-target': ['error'],
  'unicorn/prefer-export-from': ['error'],
  'unicorn/prefer-global-this': ['off'],
  'unicorn/prefer-import-meta-properties': ['error'],
  'unicorn/prefer-includes': ['error'],
  'unicorn/prefer-logical-operator-over-ternary': ['error'],
  'unicorn/prefer-math-min-max': ['error'],
  'unicorn/prefer-math-trunc': ['error'],
  'unicorn/prefer-modern-math-apis': ['error'],
  'unicorn/prefer-native-coercion-functions': ['error'],
  'unicorn/prefer-negative-index': ['error'],
  'unicorn/prefer-number-properties': ['error'],
  'unicorn/prefer-object-from-entries': ['error'],
  'unicorn/prefer-optional-catch-binding': ['error'],
  'unicorn/prefer-prototype-methods': ['error'],
  'unicorn/prefer-reflect-apply': ['error'],
  'unicorn/prefer-regexp-test': ['error'],
  'unicorn/prefer-set-has': ['error'],
  'unicorn/prefer-set-size': ['error'],
  'unicorn/prefer-single-call': ['error'],
  'unicorn/prefer-spread': ['off'], // Should this be disabled?
  'unicorn/prefer-string-raw': ['error'],
  'unicorn/prefer-string-replace-all': ['error'],
  'unicorn/prefer-string-slice': ['error'],
  'unicorn/prefer-string-starts-ends-with': ['error'],
  'unicorn/prefer-string-trim-start-end': ['error'],
  'unicorn/prefer-structured-clone': ['error'],
  'unicorn/prefer-switch': ['error'],
  'unicorn/prefer-ternary': ['error'],
  'unicorn/prefer-type-error': ['error'],
  'unicorn/prevent-abbreviations': ['off'], // Revisit this rule
  'unicorn/relative-url-style': ['error'],
  'unicorn/require-array-join-separator': ['error'],
  'unicorn/require-module-specifiers': ['off'],
  'unicorn/require-number-to-fixed-digits-argument': ['error'],
  'unicorn/string-content': ['off'],
  'unicorn/switch-case-braces': ['error', 'avoid'],
  'unicorn/template-indent': ['error'],
  'unicorn/text-encoding-identifier-case': ['error'],
  'unicorn/throw-new-error': ['error']
} satisfies Linter.Config['rules'];

const regexpRules = {
  'regexp/confusing-quantifier': ['error'],
  'regexp/control-character-escape': ['error'],
  'regexp/grapheme-string-literal': ['error'],
  'regexp/hexadecimal-escape': [
    'error',
    'never'
  ],
  'regexp/letter-case': [
    'error',
    {
      caseInsensitive: 'lowercase',
      controlEscape: 'uppercase',
      hexadecimalEscape: 'uppercase',
      unicodeEscape: 'uppercase'
    }
  ],
  'regexp/match-any': ['error'],
  'regexp/negation': ['error'],
  'regexp/no-contradiction-with-assertion': ['error'],
  'regexp/no-control-character': ['error'],
  'regexp/no-dupe-characters-character-class': ['error'],
  'regexp/no-dupe-disjunctions': ['error'],
  'regexp/no-empty-alternative': ['error'],
  'regexp/no-empty-capturing-group': ['error'],
  'regexp/no-empty-character-class': ['error'],
  'regexp/no-empty-group': ['error'],
  'regexp/no-empty-lookarounds-assertion': ['error'],
  'regexp/no-escape-backspace': ['error'],
  'regexp/no-extra-lookaround-assertions': ['error'],
  'regexp/no-invalid-regexp': ['error'],
  'regexp/no-invisible-character': ['error'],
  'regexp/no-lazy-ends': ['error'],
  'regexp/no-legacy-features': ['error'],
  'regexp/no-misleading-capturing-group': ['error'],
  'regexp/no-misleading-unicode-character': ['error'],
  'regexp/no-missing-g-flag': ['error'],
  'regexp/no-non-standard-flag': ['error'],
  'regexp/no-obscure-range': ['error'],
  'regexp/no-octal': ['error'],
  'regexp/no-optional-assertion': ['error'],
  'regexp/no-potentially-useless-backreference': ['error'],
  'regexp/no-standalone-backslash': ['error'],
  'regexp/no-super-linear-backtracking': ['error'],
  'regexp/no-super-linear-move': ['error'],
  'regexp/no-trivially-nested-assertion': ['error'],
  'regexp/no-trivially-nested-quantifier': ['error'],
  'regexp/no-unused-capturing-group': ['error'],
  'regexp/no-useless-assertions': ['error'],
  'regexp/no-useless-backreference': ['error'],
  'regexp/no-useless-character-class': ['error'],
  'regexp/no-useless-dollar-replacements': ['error'],
  'regexp/no-useless-escape': ['error'],
  'regexp/no-useless-flag': ['error'],
  'regexp/no-useless-lazy': ['error'],
  'regexp/no-useless-non-capturing-group': ['error'],
  'regexp/no-useless-quantifier': ['error'],
  'regexp/no-useless-range': ['error'],
  'regexp/no-useless-set-operand': ['error'],
  'regexp/no-useless-string-literal': ['error'],
  'regexp/no-useless-two-nums-quantifier': ['error'],
  'regexp/no-zero-quantifier': ['error'],
  'regexp/optimal-lookaround-quantifier': ['error'],
  'regexp/optimal-quantifier-concatenation': ['error'],
  'regexp/prefer-character-class': ['error'],
  'regexp/prefer-d': ['error'],
  'regexp/prefer-escape-replacement-dollar-char': ['error'],
  'regexp/prefer-lookaround': ['error'],
  'regexp/prefer-named-backreference': ['error'],
  'regexp/prefer-named-capture-group': ['error'],
  'regexp/prefer-named-replacement': ['error'],
  'regexp/prefer-plus-quantifier': ['error'],
  'regexp/prefer-predefined-assertion': ['error'],
  'regexp/prefer-quantifier': ['error'],
  'regexp/prefer-question-quantifier': ['error'],
  'regexp/prefer-range': ['error'],
  'regexp/prefer-regexp-exec': ['error'],
  'regexp/prefer-regexp-test': ['error'],
  'regexp/prefer-result-array-groups': ['error'],
  'regexp/prefer-set-operation': ['error'],
  'regexp/prefer-star-quantifier': ['error'],
  'regexp/prefer-unicode-codepoint-escapes': ['error'],
  'regexp/prefer-w': ['error'],
  'regexp/require-unicode-regexp': ['off'],
  'regexp/require-unicode-sets-regexp': ['off'],
  'regexp/simplify-set-operations': ['error'],
  'regexp/sort-alternatives': ['error'],
  'regexp/sort-character-class-elements': ['off'],
  'regexp/sort-flags': ['error'],
  'regexp/strict': ['error'],
  'regexp/unicode-escape': [
    'error',
    'unicodeEscape'
  ],
  'regexp/unicode-property': [
    'error',
    {
      generalCategory: 'never',
      key: 'long',
      property: 'long'
    }
  ],
  'regexp/use-ignore-case': ['error']
} satisfies Linter.Config['rules'];

const promiseRules = {
  'promise/always-return': ['error'],
  'promise/avoid-new': ['off'],
  'promise/catch-or-return': [
    'error',
    {
      allowFinally: true
    }
  ],
  'promise/no-callback-in-promise': ['error'],
  'promise/no-multiple-resolved': ['error'],
  'promise/no-native': ['off'],
  'promise/no-nesting': ['error'],
  'promise/no-new-statics': ['error'],
  'promise/no-promise-in-callback': ['error'],
  'promise/no-return-in-finally': ['error'],
  'promise/no-return-wrap': ['error'],
  'promise/param-names': ['error'],
  'promise/prefer-await-to-callbacks': ['off'],
  'promise/prefer-await-to-then': ['off'],
  'promise/prefer-catch': ['error'],
  'promise/spec-only': ['error'],
  'promise/valid-params': ['error']
} satisfies Linter.Config['rules'];

export default {
  ...eslintRules,
  ...eslintSuggestionsRules,
  ...eslintLayoutRules,
  ...unicornRules,
  ...regexpRules,
  ...promiseRules
} satisfies Linter.Config['rules'];
