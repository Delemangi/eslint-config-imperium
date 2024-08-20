import stylisticPlugin from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';

const baseStyle = stylisticPlugin.configs.customize({
  arrowParens: true,
  blockSpacing: true,
  braceStyle: '1tbs',
  commaDangle: 'always-multiline',
  flat: true,
  indent: 2,
  jsx: true,
  pluginName: '@stylistic',
  quoteProps: 'consistent-as-needed',
  quotes: 'single',
  semi: true,
});

const style: Linter.Config = {
  ...baseStyle,
  rules: {
    ...baseStyle.rules,
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
  },
};

export default style;
