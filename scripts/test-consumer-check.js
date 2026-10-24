import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [consumer, repo, peerRange, typescriptMode, typescript6Name] =
  process.argv.slice(2);
const local = (file) => pathToFileURL(path.join(consumer, file));
function assertLinted(result, context) {
  assert.ok(result, `${context} produced no lint result`);
  assert.equal(
    result.fatalErrorCount,
    0,
    `${context}: ${JSON.stringify(result.messages)}`,
  );
  assert.equal(
    result.warningCount,
    0,
    `${context}: ${JSON.stringify(result.messages)}`,
  );
}
function assertRule(messages, ruleId, count, context) {
  assert.equal(
    messages.filter((message) => message.ruleId === ruleId).length,
    count,
    context,
  );
}

const eslintManifest = await import(local("node_modules/eslint/package.json"), {
  with: { type: "json" },
});
const entry = await import(
  local("node_modules/eslint-config-imperium/lib/index.js")
);
const consumerRequire = createRequire(path.join(consumer, "package.json"));
const typescript6 = consumerRequire("typescript");
const typescript6Manifest = JSON.parse(
  await readFile(
    path.join(consumer, "node_modules/typescript/package.json"),
    "utf8",
  ),
);
assert.equal(
  typescript6Manifest.name,
  typescript6Name,
  "TypeScript 6 manifest identity mismatch",
);
assert.match(
  typescript6.version,
  /^6\./,
  "Imported TypeScript API must be major 6",
);
if (typescriptMode === "typescript6") {
  assert.throws(
    () => consumerRequire.resolve("@typescript/native"),
    "Standard TypeScript 6 consumer must not install TypeScript 7",
  );
}
const exports = [
  "auto",
  "astro",
  "base",
  "browser",
  "jsxA11y",
  "next",
  "node",
  "perfectionist",
  "playwright",
  "prettier",
  "react",
  "solid",
  "stylistic",
  "svelte",
  "tailwind",
  "tanstackQuery",
  "tanstackRouter",
  "testingLibrary",
  "typescript",
  "vitest",
  "vue",
];
for (const name of exports)
  assert.ok(name in entry, `Missing package-root export: ${name}`);

const semver = (
  await import(pathToFileURL(path.join(repo, "node_modules/semver/index.js")))
).default;
assert.ok(
  semver.satisfies(eslintManifest.default.version, peerRange),
  `ESLint ${eslintManifest.default.version} is outside peer ${peerRange}`,
);
const ESLint = (await import(local("node_modules/eslint/lib/api.js"))).ESLint;
await Promise.all(
  [
    [
      entry.tanstackRouter,
      "route.js",
      "import { createRoute } from '@tanstack/react-router';\n\ncreateRoute({ loader: () => null, beforeLoad: () => null });",
      "@tanstack/router/create-route-property-order",
      0,
    ],
    [
      entry.tanstackRouter,
      "route.js",
      "import { createRoute } from '@tanstack/react-router';\n\ncreateRoute({ beforeLoad: () => null, loader: () => null });",
      "@tanstack/router/create-route-property-order",
      0,
    ],
    [
      entry.tanstackRouter,
      "route.js",
      "import { createRoute } from '@tanstack/react-router';\n\nconst factory = () => ({ beforeLoad: () => null }); createRoute({ ...factory(), loader: () => null });",
      "@tanstack/router/create-route-property-order",
      0,
    ],
    [
      entry.tanstackRouter,
      "route.js",
      "import { createRoute } from '@tanstack/react-router';\n\ncreateRoute({ path: '/$user-id' });",
      "@tanstack/router/route-param-names",
      1,
    ],
    [
      entry.playwright,
      "e2e/example.spec.js",
      "import { test, expect } from '@playwright/test';\n\ntest('example', async ({ page }) => { expect(page).toHaveTitle('Example'); });",
      "playwright/missing-playwright-await",
      1,
    ],
    [
      entry.playwright,
      "e2e/example.spec.js",
      "import { test, expect } from '@playwright/test';\n\ntest('example', async ({ page }) => { await page.getByRole('button').click(); await expect(page).toHaveTitle('Example'); });",
      "playwright/missing-playwright-await",
      0,
    ],
    [
      entry.playwright,
      "e2e/example.spec.js",
      "import { test } from '@playwright/test';\n\ntest.only('example', async ({ page }) => { await page.getByRole('button').click(); });",
      "playwright/no-focused-test",
      1,
    ],
  ].map(async ([config, filePath, code, ruleId, count]) => {
    const checker = new ESLint({
      cwd: consumer,
      overrideConfigFile: true,
      overrideConfig: [config],
    });
    const [result] = await checker.lintText(code, { filePath });
    assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
    assertRule(result.messages, ruleId, count, filePath);
  }),
);
const jsx = new ESLint({
  cwd: consumer,
  overrideConfigFile: true,
  overrideConfig: [entry.jsxA11y],
});
const astro = new ESLint({
  cwd: consumer,
  overrideConfigFile: true,
  overrideConfig: [...entry.astro],
});
const svelte = new ESLint({
  cwd: consumer,
  overrideConfigFile: true,
  overrideConfig: [...entry.svelte],
});
const vue = new ESLint({
  cwd: consumer,
  overrideConfigFile: true,
  overrideConfig: [entry.vue],
});
const typed = new ESLint({
  cwd: consumer,
  overrideConfigFile: true,
  overrideConfig: [
    {
      ...entry.typescript,
      rules: { "@typescript-eslint/await-thenable": "error" },
    },
  ],
});

const [badJsx] = await jsx.lintFiles(["bad.jsx"]);
const [goodJsx] = await jsx.lintFiles(["good.jsx"]);
assertLinted(badJsx, "Invalid JSX");
assertLinted(goodJsx, "Valid JSX");
assertRule(
  badJsx.messages,
  "jsx-a11y-x/alt-text",
  1,
  "Bad JSX must trigger alt-text",
);
assertRule(
  goodJsx.messages,
  "jsx-a11y-x/alt-text",
  0,
  "Valid JSX must not trigger alt-text",
);
assert.ok(
  (await jsx.calculateConfigForFile("bad.jsx"))?.rules["jsx-a11y-x/alt-text"],
  "JSX rule is not accessible in JSX",
);
assert.ok(
  !(await jsx.calculateConfigForFile("component.svelte"))?.rules[
    "jsx-a11y-x/alt-text"
  ],
  "JSX rule leaked to Svelte",
);

const astroFiles = ["bad.astro", "good.astro"];
const astroResults = await astro.lintFiles(astroFiles);
for (const [index, expectedCount] of [1, 0].entries()) {
  const result = astroResults[index];
  const name = astroFiles[index];
  assertLinted(result, name);
  assertRule(
    result.messages,
    "astro/jsx-a11y/alt-text",
    expectedCount,
    `${name} Astro alt-text assertion`,
  );
  assert.equal(
    result.fatalErrorCount,
    0,
    `${name} Astro parser failed: ${JSON.stringify(result.messages)}`,
  );
}
const [[svelteResult], [vueResult]] = await Promise.all([
  svelte.lintFiles(["component.svelte"]),
  vue.lintFiles(["component.vue"]),
]);
for (const [result, filename] of [
  [svelteResult, "component.svelte"],
  [vueResult, "component.vue"],
]) {
  assertLinted(result, filename);
  assert.ok(result, `${filename} was ignored`);
  assert.equal(
    result.fatalErrorCount,
    0,
    `${filename} parser failed: ${JSON.stringify(result.messages)}`,
  );
}

const [badTyped] = await typed.lintFiles(["typed.ts"]);
assertLinted(badTyped, "Invalid typed fixture");
assert.equal(
  badTyped.fatalErrorCount,
  0,
  `Typed parser/projectService failed: ${JSON.stringify(badTyped.messages)}`,
);
assertRule(
  badTyped.messages,
  "@typescript-eslint/await-thenable",
  1,
  "Non-thenable await must trigger await-thenable",
);
const [goodTyped] = await typed.lintFiles(["clean.ts"]);
assertLinted(goodTyped, "Valid typed fixture");
assert.equal(
  goodTyped.fatalErrorCount,
  0,
  "Valid typed fixture failed parser/projectService",
);
assertRule(
  goodTyped.messages,
  "@typescript-eslint/await-thenable",
  0,
  "Awaiting a promise must be valid",
);
console.log(
  `Packed consumer passed with ESLint ${eslintManifest.default.version}, TypeScript ${typescript6.version} (${typescriptMode}, peer ${peerRange}).`,
);
