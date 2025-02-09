import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const eslint = new ESLint();

describe('Linter', () => {
  it('should lint index.ts without errors', async () => {
    const results = await eslint.lintFiles(['src/index.ts']);

    expect(results[0]?.errorCount).toBe(0);
  });
});
