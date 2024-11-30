import { ESLint } from 'eslint';
import { expect, test } from 'vitest';

const eslint = new ESLint();

test('Lint index.ts', async () => {
  const results = await eslint.lintFiles(['src/index.ts']);

  expect(results[0]?.errorCount).toBe(0);
});
