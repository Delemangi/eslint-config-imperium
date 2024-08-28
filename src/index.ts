import type { Linter } from 'eslint';
import base from './base/index.js';

import style from './style.js';
import typescript from './typescript/index.js';

export const auto: Linter.Config[] = [
  base,
  typescript,
  style,
];

export { default as node } from './node/index.js';
export { default as base } from './base/index.js';
export { default as style } from './style.js';
export { default as typescript } from './typescript/index.js';
