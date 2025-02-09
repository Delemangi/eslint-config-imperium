import { ESLint } from 'eslint';
import {
  describe, expect, it
} from 'vitest';

const eslint = new ESLint();

const getErrorsCount = async (files: string[]) => {
  const results = await eslint.lintFiles(files);

  return results.reduce((count, result) => count + result.errorCount, 0);
};

describe('Configurations', () => {
  it('should lint base configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/base/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint browser configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/browser/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint Node configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/node/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint Perfectionist configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/perfectionist/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint Prettier configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/prettier/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint React configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/react/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint Stylistic configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/stylistic/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint TypeScript configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/typescript/*.ts']);

    expect(errors).toBe(0);
  });

  it('should lint Vitest configuration code without errors', async () => {
    const errors = await getErrorsCount(['src/vitest/*.ts']);

    expect(errors).toBe(0);
  });
});
