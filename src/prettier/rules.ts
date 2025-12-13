import type { Linter } from 'eslint';

import prettierConfig from 'eslint-config-prettier';

const prettierRules = {
  'prettier/prettier': [
    'error',
    {
      arrowParens: 'always',
      bracketSameLine: false,
      bracketSpacing: true,
      endOfLine: 'lf',
      printWidth: 80,
      proseWrap: 'preserve',
      quoteProps: 'as-needed',
      semi: true,
      singleAttributePerLine: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'all',
      useTabs: false,
      vueIndentScriptAndStyle: false
    },
    {
      usePrettierrc: false
    }
  ]
} satisfies Linter.Config['rules'];

// Filter out deprecated TypeScript ESLint formatting rules
const deprecatedTypeScriptRules = new Set([
  '@typescript-eslint/block-spacing',
  '@typescript-eslint/brace-style',
  '@typescript-eslint/comma-dangle',
  '@typescript-eslint/comma-spacing',
  '@typescript-eslint/func-call-spacing',
  '@typescript-eslint/indent',
  '@typescript-eslint/key-spacing',
  '@typescript-eslint/keyword-spacing',
  '@typescript-eslint/lines-around-comment',
  '@typescript-eslint/member-delimiter-style',
  '@typescript-eslint/no-extra-parens',
  '@typescript-eslint/no-extra-semi',
  '@typescript-eslint/object-curly-spacing',
  '@typescript-eslint/quotes',
  '@typescript-eslint/semi',
  '@typescript-eslint/space-before-blocks',
  '@typescript-eslint/space-before-function-paren',
  '@typescript-eslint/space-infix-ops',
  '@typescript-eslint/type-annotation-spacing'
]);

// Filter out deprecated React rules
const deprecatedReactRules = new Set(['react/jsx-space-before-closing']);

// Filter out deprecated stylistic rules that no longer exist
const deprecatedStylisticRules = new Set([
  '@stylistic/func-call-spacing', // Use function-call-spacing instead
  '@stylistic/jsx-indent', // Use jsx-indent-props instead
  '@stylistic/jsx-props-no-multi-spaces' // This rule doesn't exist in stylistic plugin
]);

// Filter out stylistic rules with js/ts/jsx prefixes since we use unprefixed versions
// eslint-config-prettier may include prefixed versions to turn them off, but we don't need them
const isStylisticPrefixedRule = (key: string): boolean => {
  if (!key.startsWith('@stylistic/')) {
    return false;
  }
  const ruleName = key.replace('@stylistic/', '');

  return ruleName.startsWith('js/') || ruleName.startsWith('ts/') || ruleName.startsWith('jsx/');
};

const isDeprecatedRule = (key: string): boolean => {
  const isTypeScriptDeprecated = deprecatedTypeScriptRules.has(key);
  const isReactDeprecated = deprecatedReactRules.has(key);
  const isStylisticDeprecated = deprecatedStylisticRules.has(key);
  const isStylisticPrefixed = isStylisticPrefixedRule(key);

  return isTypeScriptDeprecated || isReactDeprecated || isStylisticDeprecated || isStylisticPrefixed;
};

const prettierConfigEntries = Object.entries(prettierConfig.rules);
const filteredPrettierConfigRules = Object.fromEntries(prettierConfigEntries.filter(([key]) => !isDeprecatedRule(key)));

// Explicitly disable experimental stylistic rules that aren't covered by eslint-config-prettier
const experimentalStylisticRules = {
  '@stylistic/exp-list-style': 'off'
} satisfies Linter.Config['rules'];

export default {
  ...filteredPrettierConfigRules,
  ...prettierRules,
  ...experimentalStylisticRules
} satisfies Linter.Config['rules'];
