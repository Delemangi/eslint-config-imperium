/* eslint-disable @typescript-eslint/no-magic-numbers */

import { ESLint } from 'eslint';
import { expect, test } from 'vitest';

const eslint = new ESLint();

test('Base Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/base.ts']);

  expect(results[0]?.errorCount).toBe(3);

  expect(results[0]?.messages[0]?.ruleId).toBe('no-var');
  expect(results[0]?.messages[1]?.ruleId).toBe('no-console');
  expect(results[0]?.messages[2]?.ruleId).toBe('eqeqeq');
});

test('Browser Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/browser.ts']);

  expect(results[0]?.errorCount).toBe(3);

  expect(results[0]?.messages[0]?.ruleId).toBe('unicorn/prefer-dom-node-append');
  expect(results[0]?.messages[1]?.ruleId).toBe('unicorn/prefer-dom-node-text-content');
  expect(results[0]?.messages[2]?.ruleId).toBe('unicorn/prefer-query-selector');
});

test('Node Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/node.ts']);

  expect(results[0]?.errorCount).toBe(6);

  expect(results[0]?.messages[0]?.ruleId).toBe('n/no-exports-assign');
  expect(results[0]?.messages[1]?.ruleId).toBe('unicorn/prefer-module');
  expect(results[0]?.messages[2]?.ruleId).toBe('n/exports-style');
  expect(results[0]?.messages[3]?.ruleId).toBe('n/no-path-concat');
  expect(results[0]?.messages[4]?.ruleId).toBe('unicorn/prefer-module');
  expect(results[0]?.messages[5]?.ruleId).toBe('n/no-process-exit');
});

test('React Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/react.tsx']);

  expect(results[0]?.errorCount).toBe(3);

  expect(results[0]?.messages[0]?.ruleId).toBe('react/prefer-read-only-props');
  expect(results[0]?.messages[1]?.ruleId).toBe('react/self-closing-comp');
  expect(results[0]?.messages[2]?.ruleId).toBe('react/no-children-prop');
});

test('Style Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/style.ts']);

  expect(results[0]?.errorCount).toBe(7);

  expect(results[0]?.messages[0]?.ruleId).toBe('perfectionist/sort-maps');
  expect(results[0]?.messages[1]?.ruleId).toBe('perfectionist/sort-union-types');
  expect(results[0]?.messages[2]?.ruleId).toBe('perfectionist/sort-objects');
  expect(results[0]?.messages[3]?.ruleId).toBe('@stylistic/array-element-newline');
  expect(results[0]?.messages[4]?.ruleId).toBe('@stylistic/comma-dangle');
  expect(results[0]?.messages[5]?.ruleId).toBe('@stylistic/array-bracket-newline');
  expect(results[0]?.messages[6]?.ruleId).toBe('@stylistic/semi');
});

test('TypeScript Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/typescript.ts']);

  expect(results[0]?.errorCount).toBe(3);

  expect(results[0]?.messages[0]?.ruleId).toBe('@typescript-eslint/no-unused-expressions');
  expect(results[0]?.messages[1]?.ruleId).toBe('@typescript-eslint/dot-notation');
  expect(results[0]?.messages[2]?.ruleId).toBe('@typescript-eslint/only-throw-error');
});
