import type { Linter } from 'eslint';

const tanstackRouterRules = {
  // Plugin 1.162.0 crashes on valid ...factory() spreads.
  '@tanstack/router/create-route-property-order': ['off'],
  '@tanstack/router/route-param-names': ['error']
} satisfies Linter.Config['rules'];

export default tanstackRouterRules;
