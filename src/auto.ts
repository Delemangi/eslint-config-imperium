import type { Linter } from 'eslint';

import base from './base/index.js';
import node from './node/index.js';
import react from './react.js';
import style from './style.js';
import typescript from './typescript/index.js';

const auto: Linter.Config[] = [
  base,
  node,
  typescript,
  style,
  react,
];

export default auto;
