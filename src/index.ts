import type { Linter } from 'eslint';

import base from './base/index.js';
import style from './style/index.js';
import typescript from './typescript/index.js';

export const auto: Linter.Config[] = [
  base,
  typescript,
  ...style,
];

export { default as base } from './base/index.js';
export { default as browser } from './browser/index.js';
export { default as node } from './node/index.js';
export { default as react } from './react/index.js';
export { default as style } from './style/index.js';
export { default as typescript } from './typescript/index.js';
