import { ESLint } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import {
  jsxA11y,
  next,
  prettier,
  solid,
  tanstackQuery,
  vue
} from '../index.js';

const eslint = new ESLint();

const filterMessages = function(results: ESLint.LintResult[], prefix: string) {
  return results[0]?.messages.filter((m) => m.ruleId?.startsWith(prefix)) ?? [];
};

const filterCoreMessages = function(results: ESLint.LintResult[]) {
  return results[0]?.messages.filter((m) => m.ruleId !== null && !m.ruleId.includes('/')) ?? [];
};

// eslint-disable-next-line max-lines-per-function -- test suite with 20+ plugin verifications
describe('Rules', () => {
  it('should verify e18e configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/e18e.ts']);
    const messages = filterMessages(results, 'e18e/');

    expect(messages).toHaveLength(2);

    expect(messages[0]?.ruleId).toBe('e18e/prefer-array-to-sorted');
    expect(messages[1]?.ruleId).toBe('e18e/prefer-array-to-reversed');
  });

  it('should verify base configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/base.ts']);
    const messages = filterCoreMessages(results);

    expect(messages).toHaveLength(3);

    expect(messages[0]?.ruleId).toBe('no-var');
    expect(messages[1]?.ruleId).toBe('no-console');
    expect(messages[2]?.ruleId).toBe('eqeqeq');
  });

  it('should verify eslint-comments configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/eslint-comments.ts']);
    const messages = filterMessages(results, '@eslint-community/eslint-comments/');

    expect(messages).toHaveLength(4);

    expect(messages[0]?.ruleId).toBe('@eslint-community/eslint-comments/require-description');
    expect(messages[1]?.ruleId).toBe('@eslint-community/eslint-comments/require-description');
    expect(messages[2]?.ruleId).toBe('@eslint-community/eslint-comments/disable-enable-pair');
    expect(messages[3]?.ruleId).toBe('@eslint-community/eslint-comments/no-unused-enable');
  });

  it('should verify unused-imports configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/unused-imports.ts']);
    const messages = filterMessages(results, 'unused-imports/');

    expect(messages).toHaveLength(1);

    expect(messages[0]?.ruleId).toBe('unused-imports/no-unused-imports');
  });

  it('should verify jsdoc configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/jsdoc.ts']);
    const messages = filterMessages(results, 'jsdoc/');

    expect(messages).toHaveLength(4);

    expect(messages[0]?.ruleId).toBe('jsdoc/require-param');
    expect(messages[1]?.ruleId).toBe('jsdoc/require-returns');
    expect(messages[2]?.ruleId).toBe('jsdoc/require-param-description');
    expect(messages[3]?.ruleId).toBe('jsdoc/require-returns');
  });

  it('should verify no-barrel-files configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/no-barrel-files.ts']);
    const messages = filterMessages(results, 'no-barrel-files/');

    expect(messages.length).toBeGreaterThanOrEqual(1);
    expect(messages[0]?.ruleId).toBe('no-barrel-files/no-barrel-files');
  });

  it('should verify browser configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/browser.ts']);
    const messages = filterMessages(results, 'unicorn/');

    expect(messages).toHaveLength(3);

    expect(messages[0]?.ruleId).toBe('unicorn/prefer-dom-node-append');
    expect(messages[1]?.ruleId).toBe('unicorn/prefer-dom-node-text-content');
    expect(messages[2]?.ruleId).toBe('unicorn/prefer-query-selector');
  });

  it('should verify import-x configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/import-x.ts']);
    const messages = filterMessages(results, 'import-x/');

    expect(messages).toHaveLength(8);

    expect(messages[0]?.ruleId).toBe('import-x/first');
    expect(messages[1]?.ruleId).toBe('import-x/no-duplicates');
    expect(messages[2]?.ruleId).toBe('import-x/first');
    expect(messages[3]?.ruleId).toBe('import-x/no-duplicates');
    expect(messages[4]?.ruleId).toBe('import-x/first');
    expect(messages[5]?.ruleId).toBe('import-x/newline-after-import');
    expect(messages[6]?.ruleId).toBe('import-x/no-empty-named-blocks');
    expect(messages[7]?.ruleId).toBe('import-x/no-mutable-exports');
  });

  it('should verify jsx-a11y configuration rules', async () => {
    const jsxA11yEslint = new ESLint({
      overrideConfig: [jsxA11y]
    });
    const results = await jsxA11yEslint.lintFiles(['src/test/cases/jsx-a11y.tsx']);
    const messages = filterMessages(results, 'jsx-a11y/');

    expect(messages).toHaveLength(5);

    expect(messages[0]?.ruleId).toBe('jsx-a11y/alt-text');
    expect(messages[1]?.ruleId).toBe('jsx-a11y/click-events-have-key-events');
    expect(messages[2]?.ruleId).toBe('jsx-a11y/no-static-element-interactions');
    expect(messages[3]?.ruleId).toBe('jsx-a11y/no-noninteractive-tabindex');
    expect(messages[4]?.ruleId).toBe('jsx-a11y/tabindex-no-positive');
  });

  it('should verify Node configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/node.ts']);
    const messages = filterMessages(results, 'n/');

    expect(messages).toHaveLength(4);

    expect(messages[0]?.ruleId).toBe('n/no-exports-assign');
    expect(messages[1]?.ruleId).toBe('n/exports-style');
    expect(messages[2]?.ruleId).toBe('n/no-path-concat');
    expect(messages[3]?.ruleId).toBe('n/no-process-exit');
  });

  it('should verify Perfectionist configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/perfectionist.ts']);
    const messages = filterMessages(results, 'perfectionist/');

    expect(messages).toHaveLength(3);

    expect(messages[0]?.ruleId).toBe('perfectionist/sort-enums');
    expect(messages[1]?.ruleId).toBe('perfectionist/sort-enums');
    expect(messages[2]?.ruleId).toBe('perfectionist/sort-object-types');
  });

  it('should verify Prettier configuration rules', async () => {
    const prettierEslint = new ESLint({
      overrideConfig: [prettier]
    });
    const results = await prettierEslint.lintFiles(['src/test/cases/prettier.ts']);
    const messages = filterMessages(results, 'prettier/');

    expect(messages).toHaveLength(2);

    expect(messages[0]?.ruleId).toBe('prettier/prettier');
    expect(messages[1]?.ruleId).toBe('prettier/prettier');
  });

  it('should verify React configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/react.tsx']);
    const messages = filterMessages(results, '@eslint-react/');

    expect(messages).toHaveLength(3);

    expect(messages[0]?.ruleId).toBe('@eslint-react/jsx-no-children-prop');
    expect(messages[1]?.ruleId).toBe('@eslint-react/component-hook-factories');
    expect(messages[2]?.ruleId).toBe('@eslint-react/no-nested-component-definitions');
  });

  it('should verify security configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/security.ts']);
    const messages = filterMessages(results, 'security/');

    expect(messages).toHaveLength(5);

    expect(messages[0]?.ruleId).toBe('security/detect-non-literal-require');
    expect(messages[1]?.ruleId).toBe('security/detect-child-process');
    expect(messages[2]?.ruleId).toBe('security/detect-eval-with-expression');
    expect(messages[3]?.ruleId).toBe('security/detect-non-literal-fs-filename');
    expect(messages[4]?.ruleId).toBe('security/detect-non-literal-regexp');
  });

  it('should verify sonarjs configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/sonarjs.ts']);
    const messages = filterMessages(results, 'sonarjs/');

    expect(messages).toHaveLength(7);

    expect(messages[0]?.ruleId).toBe('sonarjs/no-duplicated-branches');
    expect(messages[1]?.ruleId).toBe('sonarjs/no-collapsible-if'); // eslint-disable-line sonarjs/no-duplicate-string -- rule IDs are necessarily repeated
    expect(messages[2]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(messages[3]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(messages[4]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(messages[5]?.ruleId).toBe('sonarjs/nested-control-flow');
    expect(messages[6]?.ruleId).toBe('sonarjs/no-collapsible-if');
  });

  it('should verify Solid configuration rules', async () => {
    const solidEslint = new ESLint({
      overrideConfig: [solid]
    });
    const results = await solidEslint.lintFiles(['src/test/cases/solid.tsx']);
    const messages = filterMessages(results, 'solid/');

    expect(messages).toHaveLength(2);

    expect(messages[0]?.ruleId).toBe('solid/no-destructure');
    expect(messages[1]?.ruleId).toBe('solid/no-react-specific-props');
  });

  it('should verify Stylistic configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/stylistic.ts']);
    const messages = filterMessages(results, '@stylistic/');

    expect(messages).toHaveLength(7);

    expect(messages[0]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(messages[1]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(messages[2]?.ruleId).toBe('@stylistic/array-bracket-newline');
    expect(messages[3]?.ruleId).toBe('@stylistic/array-element-newline');
    expect(messages[4]?.ruleId).toBe('@stylistic/exp-list-style');
    expect(messages[5]?.ruleId).toBe('@stylistic/exp-list-style');
    expect(messages[6]?.ruleId).toBe('@stylistic/semi');
  });

  it('should verify TypeScript configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/typescript.ts']);
    const messages = filterMessages(results, '@typescript-eslint/');

    expect(messages).toHaveLength(3);

    expect(messages[0]?.ruleId).toBe('@typescript-eslint/no-unused-expressions');
    expect(messages[1]?.ruleId).toBe('@typescript-eslint/dot-notation');
    expect(messages[2]?.ruleId).toBe('@typescript-eslint/only-throw-error');
  });

  it('should verify Vitest configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/vitest.ts']);
    const messages = filterMessages(results, 'vitest/');

    expect(messages).toHaveLength(10);

    expect(messages[0]?.ruleId).toBe('vitest/no-import-node-test');
    expect(messages[1]?.ruleId).toBe('vitest/prefer-importing-vitest-globals');
    expect(messages[2]?.ruleId).toBe('vitest/prefer-spy-on');
    expect(messages[3]?.ruleId).toBe('vitest/require-mock-type-parameters');
    expect(messages[4]?.ruleId).toBe('vitest/padding-around-all');
    expect(messages[5]?.ruleId).toBe('vitest/padding-around-before-all-blocks');
    expect(messages[6]?.ruleId).toBe('vitest/padding-around-test-blocks');
    expect(messages[7]?.ruleId).toBe('vitest/prefer-importing-vitest-globals');
    expect(messages[8]?.ruleId).toBe('vitest/no-standalone-expect');
    expect(messages[9]?.ruleId).toBe('vitest/prefer-strict-boolean-matchers');
  });

  it('should verify Next.js configuration rules', async () => {
    const nextEslint = new ESLint({
      overrideConfig: [next]
    });
    const results = await nextEslint.lintFiles(['src/test/cases/next.tsx']);
    const messages = filterMessages(results, '@next/next/');

    expect(messages.length).toBeGreaterThanOrEqual(2);

    expect(messages[0]?.ruleId).toBe('@next/next/no-img-element');
    expect(messages[1]?.ruleId).toBe('@next/next/no-sync-scripts');
  });

  it('should verify TanStack Query configuration rules', async () => {
    const tanstackQueryEslint = new ESLint({
      overrideConfig: [tanstackQuery]
    });
    const results = await tanstackQueryEslint.lintFiles(['src/test/cases/tanstack-query.tsx']);
    const messages = filterMessages(results, '@tanstack/query/');

    expect(messages.length).toBeGreaterThanOrEqual(1);

    expect(messages[0]?.ruleId).toBe('@tanstack/query/stable-query-client');
  });

  it('should verify Vue configuration rules', async () => {
    const vueEslint = new ESLint({
      overrideConfig: [vue]
    });
    const results = await vueEslint.lintFiles(['src/test/cases/vue.vue']);
    const messages = filterMessages(results, 'vue/');

    expect(messages.length).toBeGreaterThanOrEqual(2);

    expect(messages[0]?.ruleId).toBe('vue/multi-word-component-names');
    expect(messages[1]?.ruleId).toBe('vue/html-button-has-type');
  });
});
