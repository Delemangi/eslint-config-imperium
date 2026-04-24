import type { Linter } from 'eslint';

import testingLibraryPlugin from 'eslint-plugin-testing-library';

import rules from './rules.js';

const testingLibrary: Linter.Config = {
  files: [
    '**/*.test.{ts,tsx,js,jsx}',
    '**/*.spec.{ts,tsx,js,jsx}'
  ],
  plugins: {
    'testing-library': testingLibraryPlugin
  },
  rules
};

export default testingLibrary;
