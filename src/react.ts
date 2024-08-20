import type { Linter } from 'eslint';
// @ts-expect-error missing type
import reactPlugin from 'eslint-plugin-react';

const react: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: reactPlugin,
  },
  rules: {
    '@stylistic/jsx-newline': 'off',
    'react/jsx-child-element-spacing': 'off',
  },
};

export default react;
