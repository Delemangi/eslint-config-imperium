import { auto, browser, node, react } from './lib/index.js';

export default [
  { ignores: ["**/*.js", "lib"] },
  ...auto,
  browser,
  node,
  react,
];
