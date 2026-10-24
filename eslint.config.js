/* eslint-disable no-barrel-files/prefer-source-imports -- Exercise the built public entry point used by consumers. */
import {
  base,
  browser,
  node,
  perfectionist,
  react,
  stylistic,
  typescript,
  vitest
} from './lib/index.js';

const javascriptFiles = [
  'eslint.config.js',
  'commitlint.config.js',
  'release.config.js',
  'vitest.config.js',
  'scripts/test-consumer.js',
  'scripts/test-consumer-check.js'
];
const typescriptFiles = ['**/*.{ts,tsx,mts,cts}'];
const repositoryFiles = [...typescriptFiles, ...javascriptFiles];

const repositoryConfig = [
  { ignores: ['lib'] },
  ...base.map((config) => ({
    ...config,
    files: config.files.flatMap((pattern) => repositoryFiles.map((file) => [pattern, file]))
  })),
  {
    ...browser,
    files: browser.files.map((pattern) => [pattern, typescriptFiles[0]])
  },
  {
    ...node,
    files: repositoryFiles
  },
  {
    ...perfectionist,
    files: repositoryFiles
  },
  {
    ...react,
    files: react.files.map((pattern) => [pattern, typescriptFiles[0]])
  },
  {
    ...stylistic,
    files: repositoryFiles
  },
  typescript,
  {
    ...vitest,
    files: [
      ...vitest.files.map((pattern) => [pattern, typescriptFiles[0]]),
      '**/vitest.ts'
    ]
  }
];

export default repositoryConfig;
