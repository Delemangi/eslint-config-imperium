import { auto, browser, react } from './lib/index.js';

export default [
  { ignores: ["**/*.js", "lib"] },
  ...auto,
  browser,
  react
];
