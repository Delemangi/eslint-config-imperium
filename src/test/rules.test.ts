import { ESLint } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import { jsxA11y, prettier, solid } from '../index.js';

const eslint = new ESLint();

const filterMessages = (results: ESLint.LintResult[], prefix: string) =>
  results[0]?.messages.filter((m) => m.ruleId?.startsWith(prefix)) ?? [];

const filterCoreMessages = (results: ESLint.LintResult[]) =>
  results[0]?.messages.filter((m) => m.ruleId !== null && !m.ruleId.includes('/')) ?? [];

describe('Rules', () => {
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
    const messages = filterMessages(results, 'react/');

    expect(messages).toHaveLength(3);

    expect(messages[0]?.ruleId).toBe('react/prefer-read-only-props');
    expect(messages[1]?.ruleId).toBe('react/self-closing-comp');
    expect(messages[2]?.ruleId).toBe('react/no-children-prop');
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
});
