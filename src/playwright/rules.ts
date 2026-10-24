import type { Linter } from 'eslint';

const playwrightRules = {
  // Empty fixture parameters are valid; empty variable bindings remain errors.
  'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: true }],
  'playwright/consistent-spacing-between-blocks': ['error'],
  'playwright/expect-expect': ['error'],
  'playwright/max-expects': ['off'],
  'playwright/max-nested-describe': ['off'],
  'playwright/missing-playwright-await': ['error'],
  'playwright/no-action-timeout': ['off'],
  'playwright/no-commented-out-tests': ['error'],
  'playwright/no-conditional-expect': ['error'],
  'playwright/no-conditional-in-test': ['off'],
  'playwright/no-duplicate-hooks': ['error'],
  'playwright/no-duplicate-slow': ['error'],
  'playwright/no-element-handle': ['error'],
  'playwright/no-eval': ['error'],
  'playwright/no-export': ['off'],
  'playwright/no-focused-test': ['error'],
  'playwright/no-force-option': ['error'],
  'playwright/no-get-by-title': ['off'],
  'playwright/no-hooks': ['off'],
  'playwright/no-identical-title': ['error'],
  'playwright/no-magic-timeouts': ['off'],
  'playwright/no-nested-step': ['off'],
  'playwright/no-networkidle': ['error'],
  'playwright/no-nth-methods': ['off'],
  'playwright/no-page-pause': ['error'],
  'playwright/no-raw-locators': ['off'],
  'playwright/no-restricted-locators': ['off'],
  'playwright/no-restricted-matchers': ['off'],
  'playwright/no-restricted-roles': ['off'],
  'playwright/no-skipped-test': [
    'warn',
    {
      allowConditional: true,
      disallowFixme: true
    }
  ],
  'playwright/no-slowed-test': ['off'],
  'playwright/no-standalone-expect': ['error'],
  'playwright/no-template-literal-title': ['off'],
  'playwright/no-test-return-statement': ['off'],
  'playwright/no-unnecessary-assertions': ['error'],
  'playwright/no-unsafe-references': ['error'],
  'playwright/no-unused-locators': ['error'],
  'playwright/no-useless-await': ['error'],
  'playwright/no-useless-not': ['error'],
  'playwright/no-wait-for-navigation': ['error'],
  'playwright/no-wait-for-selector': ['error'],
  'playwright/no-wait-for-timeout': ['error'],
  'playwright/prefer-comparison-matcher': ['error'],
  'playwright/prefer-ending-with-an-expect': ['off'],
  'playwright/prefer-equality-matcher': ['error'],
  'playwright/prefer-hooks-in-order': ['error'],
  'playwright/prefer-hooks-on-top': ['error'],
  'playwright/prefer-locator': ['error'],
  'playwright/prefer-lowercase-title': ['off'],
  'playwright/prefer-native-locators': ['error'],
  'playwright/prefer-strict-equal': ['error'],
  'playwright/prefer-to-be': ['error'],
  'playwright/prefer-to-contain': ['error'],
  'playwright/prefer-to-have-count': ['error'],
  'playwright/prefer-to-have-length': ['error'],
  'playwright/prefer-web-first-assertions': ['error'],
  'playwright/require-annotation-reason': [
    'error',
    { annotations: ['skip', 'fixme'] }
  ],
  'playwright/require-hook': ['off'],
  'playwright/require-soft-assertions': ['off'],
  'playwright/require-tags': ['off'],
  'playwright/require-to-pass-timeout': ['off'],
  'playwright/require-to-throw-message': ['error'],
  'playwright/require-top-level-describe': ['off'],
  'playwright/valid-describe-callback': ['error'],
  'playwright/valid-expect': [
    'error',
    {
      maxArgs: 2,
      minArgs: 1
    }
  ],
  'playwright/valid-expect-in-promise': ['error'],
  'playwright/valid-test-tags': ['error'],
  'playwright/valid-title': ['error']
} satisfies Linter.Config['rules'];

export default playwrightRules;
