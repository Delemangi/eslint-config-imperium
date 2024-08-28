import type { Linter } from 'eslint';

const stylisticRules = {
  '@stylistic/array-bracket-newline': [
    'error',
    'consistent',
  ],
  '@stylistic/array-element-newline': [
    'error',
    'consistent',
  ], '@stylistic/function-call-argument-newline': [
    'error',
    'consistent',
  ],
  '@stylistic/function-call-spacing': [
    'error',
    'never',
  ],
  '@stylistic/function-paren-newline': [
    'error',
    'consistent',
  ],
  '@stylistic/generator-star-spacing': [
    'error',
    {
      after: false,
      before: true,
    },
  ],
  '@stylistic/implicit-arrow-linebreak': [
    'error',
    'beside',
  ],
  '@stylistic/jsx-child-element-spacing': ['error'],
} satisfies Linter.Config['rules'];

const rules = {
  ...stylisticRules,
} satisfies Linter.Config['rules'];

export default rules;
