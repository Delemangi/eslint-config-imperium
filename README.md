# Imperium ESLint Config

This is a strict configuration for [ESLint](https://github.com/eslint/eslint). It is meant for those who have never found a linter annoying before.

Currently supports ESLint v10 with the flat config only.

## Quickstart

1. Install dependencies: `npm i --save-dev eslint eslint-config-imperium`
2. Create `eslint.config.js` (see [Example Configuration](#example-configuration))
3. Run your linter: `npm run lint` (or `npx eslint`)

## Example Configuration

```ts
// eslint.config.js
import { auto } from "eslint-config-imperium";

export default auto;
```

## Configurations

This package is modular and includes several configurations intended to be enabled for certain environments. If you don't know what you need, you should probably use [`auto`](./src/index.ts). Otherwise, pick a combination of the above configurations.

### Main

- [`auto`](./src/index.ts) - Special configuration in which some of the below configurations are enabled
- [`base`](./src/base/index.ts) - Base framework and environment agnostic configuration

### Frameworks / Environments

- [`browser`](./src/browser/index.ts) - Browser environment configuration
- [`next`](./src/next/index.ts) - Next.js configuration
- [`node`](./src/node/index.ts) - Node environment configuration
- [`react`](./src/react/index.ts) - React configuration
- [`solid`](./src/solid/index.ts) - Solid configuration
- [`tailwind`](./src/tailwind/index.ts) - Tailwind CSS configuration
- [`tanstackQuery`](./src/tanstack-query/index.ts) - TanStack Query configuration
- [`testingLibrary`](./src/testing-library/index.ts) - Testing Library configuration
- [`typescript`](./src/typescript/index.ts) - TypeScript configuration
- [`vitest`](./src/vitest/index.ts) - Vitest configuration
- [`vue`](./src/vue/index.ts) - Vue configuration

### Style

- [`perfectionist`](./src/perfectionist/index.ts) - Perfectionist configuration for objects order
- [`prettier`](./src/prettier/index.ts) - Prettier configuration
- [`stylistic`](./src/stylistic/index.ts) - Stylistic configuration

You should not enable `prettier` and `stylistic` at the same time.

### Accessibility

- [`jsxA11y`](./src/jsx-a11y/index.ts) - JSX accessibility rules

## Typed Linting

The `typescript` and `auto` configurations use [`parserOptions.projectService`](https://typescript-eslint.io/packages/parser/#projectservice) to enable type-aware linting. This automatically finds the closest `tsconfig.json` for each file.

If your editor or environment runs ESLint from a directory other than the project root, you may need to set `tsconfigRootDir` explicitly:

```ts
// eslint.config.js
import { auto } from "eslint-config-imperium";

export default [
  ...auto,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

## Plugins

This is a list of the currently used ESLint plugins:

- [`@e18e/eslint-plugin`](https://github.com/e18e/eslint-plugin)
- [`@eslint-community/eslint-plugin-eslint-comments`](https://github.com/eslint-community/eslint-plugin-eslint-comments)
- [`@eslint-react/eslint-plugin`](https://github.com/Rel1cx/eslint-react)
- [`@eslint/compat`](https://github.com/eslint/rewrite/tree/main/packages/compat)
- [`@next/eslint-plugin-next`](https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next)
- [`@stylistic/eslint-plugin`](https://github.com/eslint-stylistic/eslint-stylistic)
- [`@tanstack/eslint-plugin-query`](https://github.com/TanStack/query/tree/main/packages/eslint-plugin-query)
- [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint)
- [`@vitest/eslint-plugin`](https://github.com/vitest-dev/eslint-plugin-vitest)
- [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x)
- [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc)
- [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)
- [`eslint-plugin-no-barrel-files`](https://github.com/art0rz/eslint-plugin-no-barrel-files)
- [`eslint-plugin-perfectionist`](https://github.com/azat-io/eslint-plugin-perfectionist)
- [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)
- [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise)
- [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- [`eslint-plugin-react-refresh`](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)
- [`eslint-plugin-regexp`](https://github.com/ota-meshi/eslint-plugin-regexp)
- [`eslint-plugin-security`](https://github.com/eslint-community/eslint-plugin-security)
- [`eslint-plugin-solid`](https://github.com/solidjs-community/eslint-plugin-solid)
- [`eslint-plugin-sonarjs`](https://github.com/SonarSource/SonarJS)
- [`eslint-plugin-tailwindcss`](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library)
- [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [`eslint-plugin-unused-imports`](https://github.com/sweepline/eslint-plugin-unused-imports)
- [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue)

## Building

1. Clone the repository: `git clone https://github.com/Delemangi/eslint-config-imperium.git`
2. Install the dependencies: `npm i`
3. Build the package: `npm run build`

After this, the build output will be placed in the `lib` folder. You may use it directly, pack it or whatever you'd like afterwards.

## License

This project is licensed under the terms of the MIT license.
