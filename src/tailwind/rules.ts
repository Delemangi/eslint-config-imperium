import type { Linter } from 'eslint';

const tailwindRules = {
  'tailwindcss/classnames-order': ['error'],
  'tailwindcss/enforces-negative-arbitrary-values': ['error'],
  'tailwindcss/enforces-shorthand': ['error'],
  'tailwindcss/migration-from-tailwind-2': ['off'],
  'tailwindcss/no-arbitrary-value': ['off'],
  'tailwindcss/no-contradicting-classname': ['error'],
  'tailwindcss/no-custom-classname': ['error'],
  'tailwindcss/no-unnecessary-arbitrary-value': ['error']
} satisfies Linter.Config['rules'];

export default tailwindRules;
