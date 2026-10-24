import type { Linter } from 'eslint';

import playwrightPlugin from 'eslint-plugin-playwright';

import rules from './rules.js';

const playwright: Linter.Config = {
  files: [
    '**/e2e/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
    '**/playwright/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
    '**/*.e2e.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'
  ],
  languageOptions:
    playwrightPlugin.configs['flat/recommended'].languageOptions ?? {},
  plugins: {
    playwright: playwrightPlugin
  },
  rules
};

export default playwright;
