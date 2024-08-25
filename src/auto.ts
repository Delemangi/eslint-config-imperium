import type { Linter } from 'eslint';

import base from './base/index.js';
import node from './node.js';
import react from './react.js';
import style from './style.js';
import typescript from './typescript.js';

const auto: Linter.Config[] = [
  base,
  node,
  typescript,
  style,
  react,
];

export default auto;
