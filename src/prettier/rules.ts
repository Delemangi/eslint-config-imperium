import type { Linter } from 'eslint';

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

export default {
  ...prettierRules
} satisfies Linter.Config['rules'];
