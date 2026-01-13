import { ESLint } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import { prettier, solid } from '../index.js';

const eslint = new ESLint();

describe('Rules', () => {
  it('should verify base configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/base.ts']);

    expect(results[0]?.errorCount).toBe(3);

    expect(results[0]?.messages[0]?.ruleId).toBe('no-var');
    expect(results[0]?.messages[1]?.ruleId).toBe('no-console');
    expect(results[0]?.messages[2]?.ruleId).toBe('eqeqeq');
  });

  it('should verify browser configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/browser.ts']);

    expect(results[0]?.errorCount).toBe(3);

    expect(results[0]?.messages[0]?.ruleId).toBe('unicorn/prefer-dom-node-append');
    expect(results[0]?.messages[1]?.ruleId).toBe('unicorn/prefer-dom-node-text-content');
    expect(results[0]?.messages[2]?.ruleId).toBe('unicorn/prefer-query-selector');
  });

  it('should verify Node configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/node.ts']);

    expect(results[0]?.errorCount).toBe(6);

    expect(results[0]?.messages[0]?.ruleId).toBe('n/no-exports-assign');
    expect(results[0]?.messages[1]?.ruleId).toBe('unicorn/prefer-module');
    expect(results[0]?.messages[2]?.ruleId).toBe('n/exports-style');
    expect(results[0]?.messages[3]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(results[0]?.messages[4]?.ruleId).toBe('n/no-path-concat');
    expect(results[0]?.messages[5]?.ruleId).toBe('unicorn/prefer-module');
    expect(results[0]?.messages[6]?.ruleId).toBe('n/no-process-exit');
  });

  it('should verify Perfectionist configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/perfectionist.ts']);

    expect(results[0]?.errorCount).toBe(3);

    expect(results[0]?.messages[0]?.ruleId).toBe('perfectionist/sort-enums');
    expect(results[0]?.messages[1]?.ruleId).toBe('perfectionist/sort-enums');
    expect(results[0]?.messages[2]?.ruleId).toBe('perfectionist/sort-object-types');
  });

  it('should verify Prettier configuration rules', async () => {
    const prettierEslint = new ESLint({
      overrideConfig: [prettier]
    });
    const results = await prettierEslint.lintFiles(['src/test/cases/prettier.ts']);

    expect(results[0]?.errorCount).toBe(2);

    expect(results[0]?.messages[0]?.ruleId).toBe('prettier/prettier');
    expect(results[0]?.messages[1]?.ruleId).toBe('prettier/prettier');
  });

  it('should verify React configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/react.tsx']);

    expect(results[0]?.errorCount).toBe(4);

    expect(results[0]?.messages[0]?.ruleId).toBe('react/prefer-read-only-props');
    expect(results[0]?.messages[1]?.ruleId).toBe('react/self-closing-comp');
    expect(results[0]?.messages[2]?.ruleId).toBe('@stylistic/jsx-self-closing-comp');
    expect(results[0]?.messages[3]?.ruleId).toBe('react/no-children-prop');
  });

  it('should verify Solid configuration rules', async () => {
    const solidEslint = new ESLint({
      overrideConfig: [solid]
    });
    const results = await solidEslint.lintFiles(['src/test/cases/solid.tsx']);

    expect(results[0]?.errorCount).toBe(9);

    expect(results[0]?.messages[0]?.ruleId).toBe('react/prefer-read-only-props');
    expect(results[0]?.messages[1]?.ruleId).toBe('solid/no-destructure');
    expect(results[0]?.messages[2]?.ruleId).toBe('arrow-body-style');
    expect(results[0]?.messages[3]?.ruleId).toBe('solid/no-react-specific-props');
    expect(results[0]?.messages[4]?.ruleId).toBe('@stylistic/jsx-quotes');
    expect(results[0]?.messages[5]?.ruleId).toBe('react/button-has-type');
    expect(results[0]?.messages[6]?.ruleId).toBe('@typescript-eslint/no-unsafe-assignment');
    expect(results[0]?.messages[7]?.ruleId).toBe('@stylistic/jsx-one-expression-per-line');
    expect(results[0]?.messages[8]?.ruleId).toBe('@stylistic/eol-last');
  });

  it('should verify Stylistic configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/stylistic.ts']);

    expect(results[0]?.errorCount).toBe(10);

    expect(results[0]?.messages[0]?.ruleId).toBe('perfectionist/sort-maps');
    expect(results[0]?.messages[1]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(results[0]?.messages[2]?.ruleId).toBe('perfectionist/sort-union-types');
    expect(results[0]?.messages[3]?.ruleId).toBe('perfectionist/sort-objects');
    expect(results[0]?.messages[4]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(results[0]?.messages[5]?.ruleId).toBe('@stylistic/array-bracket-newline');
    expect(results[0]?.messages[6]?.ruleId).toBe('@stylistic/array-element-newline');
    expect(results[0]?.messages[7]?.ruleId).toBe('@stylistic/exp-list-style');
    expect(results[0]?.messages[8]?.ruleId).toBe('@stylistic/exp-list-style');
    expect(results[0]?.messages[9]?.ruleId).toBe('@stylistic/semi');
  });

  it('should verify TypeScript configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/typescript.ts']);

    expect(results[0]?.errorCount).toBe(4);

    expect(results[0]?.messages[0]?.ruleId).toBe('@typescript-eslint/no-unused-expressions');
    expect(results[0]?.messages[1]?.ruleId).toBe('@typescript-eslint/dot-notation');
    expect(results[0]?.messages[2]?.ruleId).toBe('@typescript-eslint/strict-void-return');
    expect(results[0]?.messages[3]?.ruleId).toBe('@typescript-eslint/only-throw-error');
  });

  it('should verify Vitest configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/vitest.ts']);

    expect(results[0]?.errorCount).toBe(13);

    expect(results[0]?.messages[0]?.ruleId).toBe('vitest/no-import-node-test');
    expect(results[0]?.messages[1]?.ruleId).toBe('@stylistic/object-curly-newline');
    expect(results[0]?.messages[2]?.ruleId).toBe('@stylistic/object-curly-newline');
    expect(results[0]?.messages[3]?.ruleId).toBe('vitest/prefer-importing-vitest-globals');
    expect(results[0]?.messages[4]?.ruleId).toBe('vitest/prefer-spy-on');
    expect(results[0]?.messages[5]?.ruleId).toBe('vitest/require-mock-type-parameters');
    expect(results[0]?.messages[6]?.ruleId).toBe('vitest/padding-around-all');
    expect(results[0]?.messages[7]?.ruleId).toBe('vitest/padding-around-before-all-blocks');
    expect(results[0]?.messages[8]?.ruleId).toBe('vitest/padding-around-test-blocks');
    expect(results[0]?.messages[9]?.ruleId).toBe('vitest/prefer-importing-vitest-globals');
    expect(results[0]?.messages[10]?.ruleId).toBe('vitest/no-standalone-expect');
    expect(results[0]?.messages[11]?.ruleId).toBe('@typescript-eslint/no-unnecessary-condition');
    expect(results[0]?.messages[12]?.ruleId).toBe('vitest/prefer-strict-boolean-matchers');
  });
});
