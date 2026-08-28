import type { Linter } from 'eslint';

const solidRules = {
  'solid/components-return-once': ['error'],
  'solid/event-handlers': ['error'],
  'solid/imports': ['error'],
  'solid/jsx-no-duplicate-props': ['error'],
  'solid/jsx-no-script-url': ['error'],
  'solid/jsx-no-undef': ['error'],
  'solid/jsx-uses-vars': ['error'],
  'solid/no-accessor-as-prop': ['error'],
  'solid/no-array-handlers': ['error'],
  'solid/no-destructure': ['error'],
  'solid/no-innerhtml': ['error'],
  'solid/no-module-scope-reactive-primitive': ['off'],
  'solid/no-proxy-apis': ['error'],
  'solid/no-react-deps': ['error'],
  'solid/no-react-specific-props': ['error'],
  'solid/no-restated-default-options': ['off'],
  'solid/no-single-arg-create-effect': ['off'],
  'solid/no-unknown-namespaces': ['error'],
  'solid/prefer-for': ['error'],
  'solid/prefer-onSettled-for-side-effects': ['off'],
  'solid/prefer-show': ['off'],
  'solid/prefer-structured-class': ['off'],
  'solid/reactivity': ['error'],
  'solid/removed-api': ['off'],
  'solid/self-closing-comp': ['error'],
  'solid/style-prop': ['error']
} satisfies Linter.Config['rules'];

export default {
  ...solidRules
} satisfies Linter.Config['rules'];
