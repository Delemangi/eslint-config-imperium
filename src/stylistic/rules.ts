import type { Linter } from 'eslint';

const stylisticRules = {
  '@stylistic/array-bracket-newline': [
    'error',
    {
      minItems: 3,
      multiline: true
    }
  ],
  '@stylistic/array-bracket-spacing': [
    'error',
    'never'
  ],
  '@stylistic/array-element-newline': [
    'error',
    {
      consistent: true,
      minItems: 3,
      multiline: true
    }
  ],
  '@stylistic/arrow-parens': ['error', 'always'],
  '@stylistic/arrow-spacing': [
    'error',
    {
      after: true,
      before: true
    }
  ],
  '@stylistic/block-spacing': ['error', 'always'],
  '@stylistic/brace-style': [
    'error',
    '1tbs',
    {
      allowSingleLine: true
    }
  ],
  '@stylistic/comma-dangle': ['error', 'never'],
  '@stylistic/comma-spacing': [
    'error',
    {
      after: true,
      before: false
    }
  ],
  '@stylistic/comma-style': [
    'error',
    'last'
  ],
  '@stylistic/computed-property-spacing': [
    'error',
    'never'
  ],
  '@stylistic/curly-newline': [
    'error',
    {
      consistent: true,
      minElements: 2,
      multiline: true
    }
  ],
  '@stylistic/dot-location': ['error', 'property'],
  '@stylistic/eol-last': ['error'],
  '@stylistic/function-call-argument-newline': ['error', 'consistent'],
  '@stylistic/function-call-spacing': [
    'error',
    'never'
  ],
  '@stylistic/function-paren-newline': [
    'error',
    {
      minItems: 3
    }
  ],
  '@stylistic/generator-star-spacing': [
    'error',
    {
      after: true,
      before: false
    }
  ],
  '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
  '@stylistic/indent': [
    'error',
    2,
    {
      SwitchCase: 1
    }
  ],
  '@stylistic/indent-binary-ops': [
    'error',
    2
  ],
  '@stylistic/jsx-child-element-spacing': ['error'],
  '@stylistic/jsx-closing-bracket-location': ['error'],
  '@stylistic/jsx-closing-tag-location': ['error'],
  '@stylistic/jsx-curly-brace-presence': ['error', 'never'],
  '@stylistic/jsx-curly-newline': ['error', 'never'],
  '@stylistic/jsx-curly-spacing': ['error', 'never'],
  '@stylistic/jsx-equals-spacing': ['error', 'never'],
  '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
  '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
  '@stylistic/jsx-indent-props': ['error', 2],
  '@stylistic/jsx-max-props-per-line': [
    'error',
    {
      maximum: 1,
      when: 'multiline'
    }
  ],
  '@stylistic/jsx-newline': [
    'error',
    {
      prevent: false
    }
  ],
  '@stylistic/jsx-one-expression-per-line': ['error'],
  '@stylistic/jsx-pascal-case': [
    'error',
    {
      allowNamespace: true
    }
  ],
  '@stylistic/jsx-props-no-multi-spaces': ['error'],
  '@stylistic/jsx-quotes': ['error', 'prefer-single'],
  '@stylistic/jsx-self-closing-comp': ['error'],
  '@stylistic/jsx-sort-props': ['error'],
  '@stylistic/jsx-tag-spacing': [
    'error',
    {
      afterOpening: 'never',
      beforeClosing: 'never',
      beforeSelfClosing: 'always',
      closingSlash: 'never'
    }
  ],
  '@stylistic/jsx-wrap-multilines': [
    'error',
    {
      arrow: 'parens-new-line',
      assignment: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
      return: 'parens-new-line'
    }
  ],
  '@stylistic/key-spacing': [
    'error',
    {
      afterColon: true,
      beforeColon: false
    }
  ],
  '@stylistic/keyword-spacing': [
    'error',
    {
      after: true,
      before: true
    }
  ],
  '@stylistic/line-comment-position': ['off'], // Should this be disabled?
  '@stylistic/linebreak-style': [
    'error',
    'unix'
  ],
  '@stylistic/lines-around-comment': ['off'], // Should this be disabled?
  '@stylistic/lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true
    }
  ],
  '@stylistic/max-len': [
    'error',
    {
      code: 120,
      ignoreComments: true,
      ignoreUrls: true
    }
  ],
  '@stylistic/max-statements-per-line': [
    'error',
    {
      max: 1
    }
  ],
  '@stylistic/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }
  ],
  '@stylistic/multiline-comment-style': ['error', 'starred-block'],
  '@stylistic/multiline-ternary': ['error', 'always-multiline'],
  '@stylistic/new-parens': ['error', 'always'],
  '@stylistic/newline-per-chained-call': [
    'error',
    {
      ignoreChainWithDepth: 2
    }
  ],
  '@stylistic/no-confusing-arrow': [
    'error',
    {
      allowParens: true,
      onlyOneSimpleParam: false
    }
  ],
  '@stylistic/no-extra-parens': ['error', 'all'],
  '@stylistic/no-extra-semi': ['error'],
  '@stylistic/no-floating-decimal': ['error'],
  '@stylistic/no-mixed-operators': [
    'error',
    {
      allowSamePrecedence: true
    }
  ],
  '@stylistic/no-mixed-spaces-and-tabs': ['error'],
  '@stylistic/no-multi-spaces': ['error'],
  '@stylistic/no-multiple-empty-lines': [
    'error',
    {
      max: 1
    }
  ],
  '@stylistic/no-tabs': ['error'],
  '@stylistic/no-trailing-spaces': ['error'],
  '@stylistic/no-whitespace-before-property': ['error'],
  '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
  '@stylistic/object-curly-newline': [
    'error',
    {
      consistent: true,
      minProperties: 3,
      multiline: true
    }
  ],
  '@stylistic/object-curly-spacing': ['error', 'always'],
  '@stylistic/object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: false
    }
  ],
  '@stylistic/one-var-declaration-per-line': ['error', 'always'],
  '@stylistic/operator-linebreak': [
    'error',
    'after',
    {
      overrides: {
        ':': 'before',
        '?': 'before'
      }
    }
  ],
  '@stylistic/padded-blocks': ['error', 'never'],
  '@stylistic/padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      next: 'return',
      prev: '*'
    }
  ],
  '@stylistic/quote-props': ['error', 'as-needed'],
  '@stylistic/quotes': [
    'error',
    'single',
    {
      avoidEscape: true
    }
  ],
  '@stylistic/rest-spread-spacing': ['error', 'never'],
  '@stylistic/semi': ['error', 'always'],
  '@stylistic/semi-spacing': [
    'error',
    {
      after: true,
      before: false
    }
  ],
  '@stylistic/semi-style': ['error', 'last'],
  '@stylistic/space-before-blocks': ['error', 'always'],
  '@stylistic/space-before-function-paren': [
    'error',
    {
      anonymous: 'never',
      asyncArrow: 'always',
      named: 'never'
    }
  ],
  '@stylistic/space-in-parens': ['error', 'never'],
  '@stylistic/space-infix-ops': ['error'],
  '@stylistic/space-unary-ops': [
    'error',
    {
      nonwords: false,
      words: true
    }
  ],
  '@stylistic/spaced-comment': [
    'error',
    'always',
    {
      block: {
        balanced: true,
        exceptions: ['-', '+'],
        markers: ['=', '!']
      },
      line: {
        exceptions: ['-', '+'],
        markers: ['=', '!']
      }
    }
  ],
  '@stylistic/switch-colon-spacing': [
    'error',
    {
      after: true,
      before: false
    }
  ],
  '@stylistic/template-curly-spacing': ['error', 'never'],
  '@stylistic/template-tag-spacing': [
    'error',
    'never'
  ],
  '@stylistic/type-annotation-spacing': [
    'error',
    {
      after: true,
      before: false
    }
  ],
  '@stylistic/type-generic-spacing': ['error'],
  '@stylistic/type-named-tuple-spacing': ['error'],
  '@stylistic/wrap-iife': [
    'error',
    'inside',
    {
      functionPrototypeMethods: true
    }
  ],
  '@stylistic/wrap-regex': ['error'],
  '@stylistic/yield-star-spacing': [
    'error',
    {
      after: true,
      before: false
    }
  ]
} satisfies Linter.Config['rules'];

const rules = {
  ...stylisticRules
} satisfies Linter.Config['rules'];

export default rules;
