import { ESLint } from 'eslint';
import { expect, test } from 'vitest';

const eslint = new ESLint();

test('TypeScript Configuration', async () => {
  const results = await eslint.lintFiles(['src/test/react.tsx']);

  expect(results[0]?.errorCount).toBe(2);
  expect(results[0]?.messages[0]?.ruleId).toBe('arrow-body-style');
  expect(results[0]?.messages[1]?.ruleId).toBe('@stylistic/semi');
});
