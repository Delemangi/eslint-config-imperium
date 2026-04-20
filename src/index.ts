/* eslint-disable no-barrel-files/no-barrel-files -- package entry point, not a barrel file */
import type { Linter } from 'eslint';

import base from './base/index.js';
import perfectionist from './perfectionist/index.js';
import stylistic from './stylistic/index.js';
import typescript from './typescript/index.js';

export const auto: Linter.Config[] = [
  ...base,
  typescript,
  stylistic,
  perfectionist
];

export { default as base } from './base/index.js';
export { default as browser } from './browser/index.js';
export { default as jsxA11y } from './jsx-a11y/index.js';
export { default as next } from './next/index.js';
export { default as node } from './node/index.js';
export { default as perfectionist } from './perfectionist/index.js';
export { default as prettier } from './prettier/index.js';
export { default as react } from './react/index.js';
export { default as solid } from './solid/index.js';
export { default as stylistic } from './stylistic/index.js';
export { default as tailwind } from './tailwind/index.js';
export { default as tanstackQuery } from './tanstack-query/index.js';
export { default as typescript } from './typescript/index.js';
export { default as vitest } from './vitest/index.js';
export { default as vue } from './vue/index.js';
