# Imperium ESLint Config

This is a strict configuration for [ESLint](https://github.com/eslint/eslint). It is meant for those who have never found a linter annoying before.

Currently supports ESLint v10.4.0 and newer v10 releases with the flat config only.

Requires Node.js 24.x or 26.x.

## Quickstart

1. Install dependencies: `npm i --save-dev eslint eslint-config-imperium typescript@~6.0.3`
2. Create `eslint.config.js` (see [Example Configuration](#example-configuration))
3. Ensure your project has a suitable `tsconfig.json` (see [Typed Linting](#typed-linting)).
4. Run your linter: `npx eslint .`

Optionally, add a script to your `package.json` and run it with `npm run lint`:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

## Example Configuration

```ts
// eslint.config.js
import { auto } from "eslint-config-imperium";

export default auto;
```

`auto` is the strict core preset of this package. It currently includes `base`, `typescript`, `stylistic`, and `perfectionist`. It does not detect frameworks or environments automatically.

## Configurations

This package is modular and includes several configurations intended to be enabled for certain environments. If you don't know what you need, you should probably use [`auto`](./src/index.ts). Otherwise, pick a combination of the configurations below.

### Main

- [`auto`](./src/index.ts) - Special configuration in which some of the below configurations are enabled
- [`base`](./src/base/index.ts) - Base framework and environment agnostic configuration

### Frameworks / Environments

- [`astro`](./src/astro/index.ts) - Astro configuration
- [`browser`](./src/browser/index.ts) - Browser environment configuration
- [`next`](./src/next/index.ts) - Next.js configuration
- [`node`](./src/node/index.ts) - Node environment configuration
- [`playwright`](./src/playwright/index.ts) - Playwright E2E test configuration (`e2e/`, `playwright/`, and `*.e2e.*`; override `files` for other paths)
- [`react`](./src/react/index.ts) - React configuration
- [`solid`](./src/solid/index.ts) - Solid configuration
- [`svelte`](./src/svelte/index.ts) - Svelte configuration
- [`tailwind`](./src/tailwind/index.ts) - Tailwind CSS v4 configuration
- [`tanstackQuery`](./src/tanstack-query/index.ts) - TanStack Query configuration
- [`tanstackRouter`](./src/tanstack-router/index.ts) - TanStack Router configuration
- [`testingLibrary`](./src/testing-library/index.ts) - Testing Library configuration
- [`typescript`](./src/typescript/index.ts) - TypeScript configuration
- [`vitest`](./src/vitest/index.ts) - Vitest configuration
- [`vue`](./src/vue/index.ts) - Vue configuration

When combining Vitest and Playwright, explicitly exclude Playwright paths from the Vitest preset with `ignores: ['**/e2e/**', '**/playwright/**', '**/*.e2e.*']`; preset order does not prevent overlapping `*.spec.*` scopes.

Framework modules are intentionally kept separate from runtime modules. Use `browser` or `node` when you want runtime globals and environment-specific rules, and then layer framework or library modules on top.

### Style

- [`perfectionist`](./src/perfectionist/index.ts) - Perfectionist configuration for objects order
- [`prettier`](./src/prettier/index.ts) - Prettier configuration
- [`stylistic`](./src/stylistic/index.ts) - Stylistic configuration

You should not enable `prettier` and `stylistic` at the same time.

Since `auto` includes `stylistic`, compose the core presets explicitly when using
`prettier` instead:

```ts
import {
  base,
  perfectionist,
  prettier,
  typescript,
} from "eslint-config-imperium";

export default [...base, typescript, perfectionist, prettier];
```

### Accessibility

- [`jsxA11y`](./src/jsx-a11y/index.ts) - JSX accessibility rules

## Recommended Composition

The package is designed to be composed explicitly. A few common combinations:

### Browser TypeScript App

```ts
import { auto, browser } from "eslint-config-imperium";

export default [...auto, browser];
```

### React App

```ts
import { auto, browser, jsxA11y, react } from "eslint-config-imperium";

export default [...auto, browser, react, jsxA11y];
```

The `jsxA11y` preset uses `eslint-plugin-jsx-a11y-x`. When upgrading from the
previous plugin, rename custom rule overrides and inline disable comments from
`jsx-a11y/*` to `jsx-a11y-x/*`, and rename `settings['jsx-a11y']` to
`settings['jsx-a11y-x']`. The `jsxA11y` export and Astro's `astro/jsx-a11y/*`
rule names remain unchanged.

### Next.js App

```ts
import { auto, browser, jsxA11y, next, react } from "eslint-config-imperium";

export default [...auto, browser, react, next, jsxA11y];
```

### Node.js Library

```ts
import { auto, node } from "eslint-config-imperium";

export default [...auto, node];
```

### Vitest + Testing Library

```ts
import {
  auto,
  browser,
  react,
  testingLibrary,
  vitest,
} from "eslint-config-imperium";

export default [...auto, browser, react, vitest, testingLibrary];
```

### Svelte App

`svelte` is exported as an array of configs (it sets up the Svelte parser and processor), so spread it like `auto`:

```ts
import { auto, browser, svelte } from "eslint-config-imperium";

export default [...auto, browser, ...svelte];
```

### Astro App

`astro` is also exported as an array of configs (it sets up the Astro parser, processor, and `<script>` handling), so spread it like `auto`:

```ts
import { astro, auto } from "eslint-config-imperium";

export default [...auto, ...astro];
```

### Tailwind App

`tailwind` targets `.jsx`/`.tsx` files and requires [Tailwind CSS v4](https://tailwindcss.com) (v3 is no longer supported). The plugin resolves your Tailwind theme from a CSS entry at lint time, so set `settings.tailwindcss.cssConfigPath` to your Tailwind CSS file (it defaults to `src/style.css`). Without a resolvable entry, the class-aware rules will error.

```ts
import { auto, browser, react, tailwind } from "eslint-config-imperium";

export default [
  ...auto,
  browser,
  react,
  tailwind,
  {
    settings: {
      tailwindcss: {
        cssConfigPath: "src/styles/globals.css",
      },
    },
  },
];
```

## Typed Linting

The `typescript` and `auto` configurations use [`parserOptions.projectService`](https://typescript-eslint.io/packages/parser/#projectservice) to enable type-aware linting. This automatically finds the closest `tsconfig.json` for each file.

Install a supported TypeScript 6.0 version as a development dependency and provide
a `tsconfig.json` that covers the TypeScript files you lint. Files outside the TypeScript project can
produce project-service parsing errors; include them in the appropriate project
or exclude them from typed linting.

For TypeScript 7 compilation, use Microsoft's [side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).
Typed linting still requires the TypeScript 6 API.

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
- [`@next/eslint-plugin-next`](https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next)
- [`@stylistic/eslint-plugin`](https://github.com/eslint-stylistic/eslint-stylistic)
- [`@tanstack/eslint-plugin-query`](https://github.com/TanStack/query/tree/main/packages/eslint-plugin-query)
- [`@tanstack/eslint-plugin-router`](https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router)
- [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint)
- [`@vitest/eslint-plugin`](https://github.com/vitest-dev/eslint-plugin-vitest)
- [`eslint-plugin-astro`](https://github.com/ota-meshi/eslint-plugin-astro)
- [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x)
- [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc)
- [`eslint-plugin-jsx-a11y-x`](https://github.com/eslint-community/eslint-plugin-jsx-a11y-x)
- [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)
- [`eslint-plugin-no-barrel-files`](https://github.com/art0rz/eslint-plugin-no-barrel-files)
- [`eslint-plugin-perfectionist`](https://github.com/azat-io/eslint-plugin-perfectionist)
- [`eslint-plugin-playwright`](https://github.com/mskelton/eslint-plugin-playwright)
- [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)
- [`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise)
- [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- [`eslint-plugin-react-refresh`](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)
- [`eslint-plugin-regexp`](https://github.com/ota-meshi/eslint-plugin-regexp)
- [`eslint-plugin-security`](https://github.com/eslint-community/eslint-plugin-security)
- [`eslint-plugin-solid`](https://github.com/solidjs-community/eslint-plugin-solid)
- [`eslint-plugin-sonarjs`](https://github.com/SonarSource/SonarJS)
- [`eslint-plugin-svelte`](https://github.com/sveltejs/eslint-plugin-svelte)
- [`eslint-plugin-tailwindcss`](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library)
- [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [`eslint-plugin-unused-imports`](https://github.com/sweepline/eslint-plugin-unused-imports)
- [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue)

## Testing

Build first, then run the checks:

```sh
npm run build
npm run check
npm run lint
npm test
npm run test:consumer
```

## Building

1. Clone the repository: `git clone https://github.com/Delemangi/eslint-config-imperium.git`
2. Install the dependencies: `npm i`
3. Build the package: `npm run build`

After this, the build output will be placed in the `lib` folder. You may use it directly, pack it or whatever you'd like afterwards.

## License

This project is licensed under the terms of the MIT license.
