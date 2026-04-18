import type { Linter } from 'eslint';

const importXRules = {
  'import-x/consistent-type-specifier-style': ['off'], // Handled by @typescript-eslint/consistent-type-imports
  'import-x/default': ['error'],
  'import-x/dynamic-import-chunkname': ['off'], // Webpack-specific
  'import-x/export': ['error'],
  'import-x/exports-last': ['off'], // Too restrictive for inline export patterns
  'import-x/extensions': ['off'], // Highly project-dependent (TS omits, ESM requires)
  'import-x/first': ['error'],
  'import-x/group-exports': ['off'], // Too restrictive, forces single export block
  'import-x/max-dependencies': ['off'], // Arbitrary limit, better handled by code review
  'import-x/named': ['off'], // TypeScript compiler validates named imports
  'import-x/namespace': ['error'],
  'import-x/newline-after-import': ['error'],
  'import-x/no-absolute-path': ['error'],
  'import-x/no-amd': ['error'],
  'import-x/no-anonymous-default-export': ['error'],
  'import-x/no-commonjs': ['off'], // Valid in config files and Node.js CJS projects
  'import-x/no-cycle': ['error'],
  'import-x/no-default-export': ['off'], // Many frameworks require default exports (React, Next.js)
  'import-x/no-deprecated': ['off'], // Handled by @typescript-eslint/no-deprecated
  'import-x/no-duplicates': ['error'],
  'import-x/no-dynamic-require': ['error'],
  'import-x/no-empty-named-blocks': ['error'],
  'import-x/no-extraneous-dependencies': ['error'],
  'import-x/no-import-module-exports': ['error'],
  'import-x/no-internal-modules': ['off'], // Many packages expose submodule imports intentionally
  'import-x/no-mutable-exports': ['error'],
  'import-x/no-named-as-default': ['error'],
  'import-x/no-named-as-default-member': ['error'],
  'import-x/no-named-default': ['error'],
  'import-x/no-named-export': ['off'], // Named exports are the preferred pattern
  'import-x/no-namespace': ['off'], // Namespace imports are a valid TypeScript pattern
  'import-x/no-nodejs-modules': ['off'], // Node.js projects need builtin modules
  'import-x/no-relative-packages': ['off'], // Only relevant for monorepos
  'import-x/no-relative-parent-imports': ['off'], // Relative parent imports are normal
  'import-x/no-rename-default': ['error'],
  'import-x/no-restricted-paths': ['off'], // Requires project-specific configuration
  'import-x/no-self-import': ['error'],
  'import-x/no-unassigned-import': ['off'], // Side-effect imports (polyfills, CSS) are valid
  'import-x/no-unresolved': ['error', { commonjs: true }],
  'import-x/no-unused-modules': ['off'], // Heavy performance cost, TypeScript handles unused exports
  'import-x/no-useless-path-segments': ['error', { noUselessIndex: true }],
  'import-x/no-webpack-loader-syntax': ['error'],
  'import-x/order': ['off'], // Handled by perfectionist/sort-imports
  'import-x/prefer-default-export': ['off'], // Named exports are generally preferred
  'import-x/prefer-namespace-import': ['off'], // Too restrictive, not always appropriate
  'import-x/unambiguous': ['off'] // TypeScript files are always modules
} satisfies Linter.Config['rules'];

export default importXRules;
