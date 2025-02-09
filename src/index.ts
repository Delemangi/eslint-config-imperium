import type { Linter } from 'eslint';

import base from './base/index.js';
import perfectionist from './perfectionist/index.js';
import stylistic from './stylistic/index.js';
import typescript from './typescript/index.js';

export const auto: Linter.Config[] = [
  base,
  typescript,
  stylistic,
  perfectionist
];

export { default as base } from './base/index.js';
export { default as browser } from './browser/index.js';
export { default as node } from './node/index.js';
export { default as perfectionist } from './perfectionist/index.js';
export { default as react } from './react/index.js';
export { default as stylistic } from './stylistic/index.js';
export { default as typescript } from './typescript/index.js';
export { default as vitest } from './vitest/index.js';
