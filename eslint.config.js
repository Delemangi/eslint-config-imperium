import { base, browser, node, react, typescript, vitest, perfectionist, stylistic } from './lib/index.js';

export default [
  { ignores: ["**/*.js", "lib"] },
  base,
  browser,
  node,
  perfectionist,
  react,
  stylistic,
  typescript,
  {
    ...vitest,
    // @ts-expect-error - the files property is an array
    files: [...vitest.files, '**/vitest.ts']
  },
];
