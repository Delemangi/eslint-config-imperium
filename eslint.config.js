import { auto, react } from './lib/index.js';

export default [
  { ignores: ["**/*.js", "lib"] },
  ...auto,
  react
];
