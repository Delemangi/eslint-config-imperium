import type { Linter } from 'eslint';

// @ts-expect-error -- untyped plugin
import tailwindPlugin from 'eslint-plugin-tailwindcss';

import rules from './rules.js';

const tailwind: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- untyped plugin
    tailwindcss: tailwindPlugin
  },
  rules
};

export default tailwind;
