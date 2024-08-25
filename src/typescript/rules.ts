import type { Linter } from 'eslint';

const typescriptEslintRules = {
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/array-type': [
    'error',
    {
      default: 'array-simple',
    },
  ],
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-check': true,
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': false,
      'ts-nocheck': false,
    },
  ],
  '@typescript-eslint/ban-tslint-comment': 'error',
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/class-literal-property-style': [
    'error',
    'fields',
  ],
  '@typescript-eslint/consistent-indexed-object-style': 'off',
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow',
    },
  ],
  '@typescript-eslint/consistent-type-definitions': [
    'error',
    'type',
  ],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
    },
  ],
  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',

  '@typescript-eslint/member-ordering': 'off',
  '@typescript-eslint/method-signature-style': [
    'error',
    'property',
  ],
  '@typescript-eslint/naming-convention': [
    'error',
    {
      format: [
        'camelCase',
        'UPPER_CASE',
        'PascalCase',
      ],
      selector: 'variable',
    },
  ],
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',
  '@typescript-eslint/no-dynamic-delete': 'error',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-empty-interface': [
    'error',
    {
      allowSingleExtends: false,
    },
  ],
  '@typescript-eslint/no-explicit-any': [
    'error',
    {
      ignoreRestArgs: true,
    },
  ],
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/no-extraneous-class': 'error',
  '@typescript-eslint/no-inferrable-types': [
    'error',
    {
      ignoreParameters: true,
      ignoreProperties: true,
    },
  ],
  '@typescript-eslint/no-invalid-void-type': [
    'error',
    {
      allowAsThisParameter: true,
      allowInGenericTypeArguments: true,
    },
  ],
  '@typescript-eslint/no-misused-new': 'error',
  '@typescript-eslint/no-namespace': [
    'error',
    {
      allowDeclarations: true,
    },
  ],
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-parameter-properties': 'off',
  '@typescript-eslint/no-require-imports': 'error',
  '@typescript-eslint/no-restricted-imports': 'off',
  '@typescript-eslint/no-this-alias': [
    'error',
    {
      allowDestructuring: true,
      allowedNames: [
        'self',
      ],
    },
  ],
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  '@typescript-eslint/no-unnecessary-type-arguments': 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',
  '@typescript-eslint/no-unnecessary-type-constraint': 'error',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-var-requires': 'error',
  '@typescript-eslint/non-nullable-type-assertion-style': 'off',
  '@typescript-eslint/padding-line-between-statements': 'off',
  '@typescript-eslint/prefer-as-const': 'error',
  '@typescript-eslint/prefer-enum-initializers': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/prefer-literal-enum-member': 'error',
  '@typescript-eslint/prefer-namespace-keyword': 'error',
  '@typescript-eslint/prefer-readonly-parameter-types': 'off',
  '@typescript-eslint/prefer-ts-expect-error': 'error',
  '@typescript-eslint/restrict-plus-operands': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/strict-boolean-expressions': 'off',
  '@typescript-eslint/triple-slash-reference': [
    'error',
    {
      lib: 'never',
      path: 'never',
      types: 'never',
    },
  ],
  '@typescript-eslint/typedef': 'off',
  '@typescript-eslint/unified-signatures': 'error',
} satisfies Linter.Config['rules'];

const rules = {
  ...typescriptEslintRules,
} satisfies Linter.Config['rules'];

export default rules;
