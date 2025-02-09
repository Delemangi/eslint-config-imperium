# Imperium ESLint Config

This is a strict configuration for [ESLint](https://github.com/eslint/eslint). It is meant for those who have never found a linter annoying before.

Currently supports ESLint v9 and the flat config only.

**NOTE**: Work in progress and things will break or might not work correctly.

## Installation

Make sure you have ESLint already installed. Afterwards, you may add it to your project: `npm i --save-dev eslint-config-imperium`

... unless you want to build it yourself, then:

1. Clone the repository: `git clone https://github.com/Delemangi/eslint-config-imperium.git`
2. Install the dependencies: `npm i`
3. Build the package: `npm run build`

After this, the build output will be placed in the `lib` folder. You may use it directly, pack it or whatever you'd like afterwards.

## Configurations

This package is modular and includes several configurations intended to be enabled for certain environments. If you don't know what you need, you should probably use [`auto`](./src/index.ts). Otherwise, pick a combination of the above configurations.

### Main

- [`auto`](./src/index.ts) - Special configuration in which some of the below configurations are enabled
- [`base`](./src/base/index.ts) - Base framework and environment agnostic configuration

### Frameworks / Environments

- [`browser`](./src/browser/index.ts) - Browser environment configuration
- [`node`](./src/node/index.ts) - Node environment configuration
- [`react`](./src/react/index.ts) - React configuration
- [`typescript`](./src/typescript/index.ts) - TypeScript configuration
- [`vitest`](./src/vitest/index.ts) - Vitest configuration

### Style

- [`perfectionist`](./src/perfectionist/index.ts) - Perfectionist configuration for objects order
- [`stylistic`](./src/stylistic/index.ts) - Stylistic configuration

## Usage

Here is an example on how to import the `auto` configuration:

```ts
// eslint.config.js
import { auto } from "eslint-config-imperium";

export default auto;
```

```ts
// eslint.config.js
import { base, node, stylistic, vitest } from "eslint-config-imperium";

export default [base, node, stylistic, vitest];
```

## Plugins

This is a list of the currently used ESLint plugins:

- [`@stylistic/eslint-plugin`](https://github.com/eslint-stylistic/eslint-stylistic)
- [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint)
- [`@vitest/eslint-plugin`](https://github.com/vitest-dev/eslint-plugin-vitest)
- [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)
- [`eslint-plugin-perfectionist`](https://github.com/azat-io/eslint-plugin-perfectionist)
- [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise)
- [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react)
- [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- [`eslint-plugin-regexp`](https://github.com/ota-meshi/eslint-plugin-regexp)
- [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)

## License

MIT
