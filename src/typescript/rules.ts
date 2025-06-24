import type { Linter } from 'eslint';

const typescriptEslintRules = {
  '@typescript-eslint/adjacent-overload-signatures': ['error'],
  '@typescript-eslint/array-type': [
    'error',
    {
      default: 'array-simple'
    }
  ],
  '@typescript-eslint/await-thenable': ['error'],
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-check': false,
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': false,
      'ts-nocheck': false
    }
  ],
  '@typescript-eslint/ban-tslint-comment': ['error'],
  '@typescript-eslint/class-literal-property-style': [
    'error',
    'fields'
  ],
  '@typescript-eslint/class-methods-use-this': ['off'],
  '@typescript-eslint/consistent-generic-constructors': ['error'],
  '@typescript-eslint/consistent-indexed-object-style': ['off'],
  '@typescript-eslint/consistent-return': ['off'],
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow'
    }
  ],
  '@typescript-eslint/consistent-type-definitions': [
    'error',
    'type'
  ],
  '@typescript-eslint/consistent-type-exports': [
    'error',
    {
      fixMixedExportsWithInlineTypeSpecifier: true
    }
  ],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports'
    }
  ],
  '@typescript-eslint/default-param-last': ['error'],
  '@typescript-eslint/dot-notation': ['error'],
  '@typescript-eslint/explicit-function-return-type': ['off'], // Should this be disabled?
  '@typescript-eslint/explicit-member-accessibility': ['off'],
  '@typescript-eslint/explicit-module-boundary-types': ['off'], // Should this be disabled?
  '@typescript-eslint/init-declarations': ['off'],
  '@typescript-eslint/max-params': ['warn', { max: 3 }],
  '@typescript-eslint/member-ordering': ['off'],
  '@typescript-eslint/method-signature-style': [
    'error',
    'property'
  ],
  '@typescript-eslint/naming-convention': ['off'], // Should this be disabled?
  '@typescript-eslint/no-array-constructor': ['error'],
  '@typescript-eslint/no-array-delete': ['error'],
  '@typescript-eslint/no-base-to-string': [
    'error',
    {
      checkUnknown: false,
      ignoredTypeNames: ['RegExp']
    }
  ],
  '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
  '@typescript-eslint/no-confusing-void-expression': [
    'error',
    {
      ignoreArrowShorthand: false,
      ignoreVoidOperator: false
    }
  ],
  '@typescript-eslint/no-deprecated': ['warn'],
  '@typescript-eslint/no-dupe-class-members': ['off'],
  '@typescript-eslint/no-duplicate-enum-values': ['error'],
  '@typescript-eslint/no-duplicate-type-constituents': ['error'],
  '@typescript-eslint/no-dynamic-delete': ['error'],
  '@typescript-eslint/no-empty-function': ['off'],
  '@typescript-eslint/no-empty-object-type': ['error'],
  '@typescript-eslint/no-explicit-any': ['error'],
  '@typescript-eslint/no-extra-non-null-assertion': ['error'],
  '@typescript-eslint/no-extraneous-class': ['error'],
  '@typescript-eslint/no-floating-promises': [
    'error',
    {
      allowForKnownSafeCalls: [
        'describe',
        'it',
        'expect',
        'test'
      ],
      ignoreIIFE: true,
      ignoreVoid: true
    }
  ],
  '@typescript-eslint/no-for-in-array': ['error'],
  '@typescript-eslint/no-implied-eval': ['error'],
  '@typescript-eslint/no-import-type-side-effects': ['off'],
  '@typescript-eslint/no-inferrable-types': ['error'],
  '@typescript-eslint/no-invalid-this': ['off'],
  '@typescript-eslint/no-invalid-void-type': ['error'],
  '@typescript-eslint/no-loop-func': ['error'],
  '@typescript-eslint/no-magic-numbers': ['off'],
  '@typescript-eslint/no-meaningless-void-operator': ['error'],
  '@typescript-eslint/no-misused-new': ['error'],
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksVoidReturn: {
        arguments: false,
        attributes: false
      }
    }
  ],
  '@typescript-eslint/no-misused-spread': ['error'],
  '@typescript-eslint/no-mixed-enums': ['error'],
  '@typescript-eslint/no-namespace': [
    'error',
    {
      allowDeclarations: true
    }
  ],
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],
  '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
  '@typescript-eslint/no-non-null-assertion': ['error'],
  '@typescript-eslint/no-redeclare': ['off'],
  '@typescript-eslint/no-redundant-type-constituents': ['error'],
  '@typescript-eslint/no-require-imports': ['error'],
  '@typescript-eslint/no-restricted-imports': ['off'],
  '@typescript-eslint/no-restricted-types': ['off'],
  '@typescript-eslint/no-shadow': [
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
  '@typescript-eslint/no-this-alias': [
    'error',
    {
      allowedNames: ['self']
    }
  ],
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
  '@typescript-eslint/no-unnecessary-condition': [
    'error',
    {
      allowConstantLoopConditions: true
    }
  ],
  '@typescript-eslint/no-unnecessary-parameter-property-assignment': ['error'],
  '@typescript-eslint/no-unnecessary-qualifier': ['error'],
  '@typescript-eslint/no-unnecessary-template-expression': ['error'],
  '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
  '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
  '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
  '@typescript-eslint/no-unnecessary-type-conversion': ['error'],
  '@typescript-eslint/no-unnecessary-type-parameters': ['error'],
  '@typescript-eslint/no-unsafe-argument': ['error'],
  '@typescript-eslint/no-unsafe-assignment': ['error'],
  '@typescript-eslint/no-unsafe-call': ['error'],
  '@typescript-eslint/no-unsafe-declaration-merging': ['error'],
  '@typescript-eslint/no-unsafe-enum-comparison': ['error'],
  '@typescript-eslint/no-unsafe-function-type': ['error'],
  '@typescript-eslint/no-unsafe-member-access': ['error'],
  '@typescript-eslint/no-unsafe-return': ['error'],
  '@typescript-eslint/no-unsafe-type-assertion': ['off'],
  '@typescript-eslint/no-unsafe-unary-minus': ['error'],
  '@typescript-eslint/no-unused-expressions': ['error'],
  '@typescript-eslint/no-unused-vars': ['error', 'all'],
  '@typescript-eslint/no-use-before-define': [
    'error',
    {
      allowNamedExports: false,
      classes: true,
      functions: false,
      variables: true
    }
  ],
  '@typescript-eslint/no-useless-constructor': ['error'],
  '@typescript-eslint/no-useless-empty-export': ['error'],
  '@typescript-eslint/no-wrapper-object-types': ['error'],
  '@typescript-eslint/non-nullable-type-assertion-style': ['error'],
  '@typescript-eslint/only-throw-error': ['error'],
  '@typescript-eslint/parameter-properties': ['off'],
  '@typescript-eslint/prefer-as-const': ['error'],
  '@typescript-eslint/prefer-destructuring': ['off'],
  '@typescript-eslint/prefer-enum-initializers': ['error'],
  '@typescript-eslint/prefer-find': ['error'],
  '@typescript-eslint/prefer-for-of': ['error'],
  '@typescript-eslint/prefer-function-type': ['error'],
  '@typescript-eslint/prefer-includes': ['error'],
  '@typescript-eslint/prefer-literal-enum-member': ['error'],
  '@typescript-eslint/prefer-namespace-keyword': ['error'],
  '@typescript-eslint/prefer-nullish-coalescing': ['error'],
  '@typescript-eslint/prefer-optional-chain': ['error'],
  '@typescript-eslint/prefer-promise-reject-errors': ['error'],
  '@typescript-eslint/prefer-readonly': ['error'],
  '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
  '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
  '@typescript-eslint/prefer-regexp-exec': ['error'],
  '@typescript-eslint/prefer-return-this-type': ['error'],
  '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
  '@typescript-eslint/promise-function-async': ['off'],
  '@typescript-eslint/related-getter-setter-pairs': ['error'],
  '@typescript-eslint/require-array-sort-compare': ['error'],
  '@typescript-eslint/require-await': ['error'],
  '@typescript-eslint/restrict-plus-operands': ['error'],
  '@typescript-eslint/restrict-template-expressions': ['error'],
  '@typescript-eslint/return-await': ['off'], // Interesting read: https://typescript-eslint.io/rules/return-await/
  '@typescript-eslint/strict-boolean-expressions': ['off'],
  '@typescript-eslint/switch-exhaustiveness-check': ['off'],
  '@typescript-eslint/triple-slash-reference': [
    'error',
    {
      lib: 'never',
      path: 'never',
      types: 'never'
    }
  ],
  '@typescript-eslint/typedef': ['off'],
  '@typescript-eslint/unbound-method': ['error'],
  '@typescript-eslint/unified-signatures': ['error'],
  '@typescript-eslint/use-unknown-in-catch-callback-variable': ['error']
} satisfies Linter.Config['rules'];

const eslintDisabledRules = {
  'default-param-last': ['off'],
  'dot-notation': ['off'],
  'max-params': ['off'],
  'no-array-constructor': ['off'],
  'no-empty-function': ['off'],
  'no-implied-eval': ['off'],
  'no-loop-func': ['off'],
  'no-shadow': ['off'],
  'no-throw-literal': ['off'],
  'no-unused-expressions': ['off'],
  'no-unused-vars': ['off'],
  'no-use-before-define': ['off'],
  'no-useless-constructor': ['off'],
  'prefer-promise-reject-errors': ['off'],
  'require-await': ['off']
} satisfies Linter.Config['rules'];

const rules = {
  ...typescriptEslintRules,
  ...eslintDisabledRules
} satisfies Linter.Config['rules'];

export default rules;
