import { auto, browser, node, react, vitest } from './lib/index.js';

export default [
  { ignores: ["**/*.js", "lib"] },
  ...auto,
  browser,
  node,
  react,
  {
    ...vitest,
    // @ts-expect-error - the files property is an array
    files: [...vitest.files, '**/vitest.ts']
  },
];
