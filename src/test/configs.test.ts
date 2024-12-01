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

test('React Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/react.tsx']);

  expect(results[0]?.errorCount).toBe(3);

  expect(results[0]?.messages[0]?.ruleId).toBe('react/prefer-read-only-props');
  expect(results[0]?.messages[1]?.ruleId).toBe('react/self-closing-comp');
  expect(results[0]?.messages[2]?.ruleId).toBe('react/no-children-prop');
});
