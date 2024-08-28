import type { Linter } from 'eslint';

import base from './base/index.js';
import stylistic from './style/index.js';
import typescript from './typescript/index.js';

export const auto: Linter.Config[] = [
  base,
  typescript,
  ...stylistic,
];

export { default as base } from './base/index.js';
export { default as node } from './node/index.js';
export { default as stylistic } from './style/index.js';
export { default as typescript } from './typescript/index.js';
