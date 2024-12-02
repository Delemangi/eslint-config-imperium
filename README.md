# Imperium ESLint Config

This is a strict configuration for [ESLint](https://github.com/eslint/eslint). It is meant for those who have never found a linter annoying before.

Currently supports ESLint v9 and the flat config only.

**NOTE**: Work in progress and things will break or might not work correctly.

## Installation

You may add it to your project's dev dependencies: `npm i --save-dev eslint-config-imperium`

... unless you want to build it yourself, then:

1. Clone the repository: `git clone git@github.com:Delemangi/eslint-config-imperium.git` (or `https://github.com/Delemangi/eslint-config-imperium.git`)
2. Install dependencies: `npm i`
3. Build the package: `npm run build`

After this, the build output will be placed in the `lib` folder. You may use it directly, pack it or whatever you'd like afterwards.

## Configurations

This package is modular and includes several configurations intended to be enabled for certain environments:

- [`imperium/auto`](./src/index.ts) - Special configuration in which some of the below configurations are enabled
- [`imperium/base`](./src/base/index.ts) - Base framework and environment agnostic configuration
- [`imperium/browser`](./src/browser/index.ts) - Browser environment configuration
- [`imperium/node`](./src/node/index.ts) - Node environment configuration
- [`imperium/react`](./src/react/index.ts) - React configuration
- [`imperium/style`](./src/style/index.ts) - Style guide
- [`imperium/typescript`](./src/typescript/index.ts) - TypeScript configuration

If you don't know what you need, you should probably use [`imperium/auto`](./src/index.ts).

## Usage

Here is an example on how to import the `auto` configuration:

```ts
// eslint.config.js
import { auto } from 'eslint-config-imperium';

export default auto;
```

## License

MIT
