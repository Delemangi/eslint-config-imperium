import { ESLint, type Linter } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import base from '../base/index.js';
import typescript from '../typescript/index.js';

const jsExtensions = [
  'js',
  'jsx',
  'mjs',
  'cjs'
] as const;
const tsExtensions = ['ts', 'tsx'] as const;
const commentRuleIds = new Set([
  '@typescript-eslint/ban-ts-comment',
  'jsdoc/ts-ban-ts-comment'
]);
const filePaths: Record<string, string> = {
  ts: 'src/test/cases/typescript.ts',
  tsx: 'src/test/cases/testing-library.tsx'
};

const lintComments = async (
  config: Linter.Config[],
  extension: string,
  comment: string
) => {
  const eslint = new ESLint({
    overrideConfig: config,
    overrideConfigFile: true
  });
  const results = await eslint.lintText(`${comment}\nconst value = 1;`, {
    filePath: filePaths[extension] ?? `src/test/cases/pr657.${extension}`
  });
  const result = results[0];

  if (!result) {
    throw new Error('Expected ESLint to return a result');
  }

  expect(result.fatalErrorCount).toBe(0);

  const ignoredMessages = result.messages.filter((message) => message.message.includes('ignored'));

  expect(ignoredMessages).toHaveLength(0);

  return result.messages.filter((message) => commentRuleIds.has(message.ruleId ?? ''));
};

describe('jsdoc/ts-ban-ts-comment', () => {
  it('enforces the configured policy for every JavaScript extension', async () => {
    const cases = [
      {
        comment: '// @ts-expect-error',
        expectedMessages: 1
      },
      {
        comment: '// @ts-expect-error no',
        expectedMessages: 1
      },
      {
        comment: '// @ts-expect-error reason',
        expectedMessages: 0
      },
      {
        comment: '// @ts-check\n// @ts-ignore\n// @ts-nocheck',
        expectedMessages: 0
      },
      {
        comment: '/* @ts-expect-error */',
        expectedMessages: 1
      }
    ];

    for (const extension of jsExtensions) {
      for (const testCase of cases) {
        const messages = await lintComments(
          base,
          extension,
          testCase.comment
        );

        expect(messages).toHaveLength(testCase.expectedMessages);

        const expectedSeverities = testCase.expectedMessages === 1 ? [2] : [];
        const actualSeverities = messages.map((message) => message.severity);

        expect(actualSeverities).toStrictEqual(expectedSeverities);

        const unexpectedRules = messages.filter((message) => message.ruleId !== 'jsdoc/ts-ban-ts-comment');

        expect(unexpectedRules).toHaveLength(0);
      }
    }
  });

  it('leaves TypeScript comments to the TypeScript counterpart', async () => {
    for (const extension of tsExtensions) {
      const messages = await lintComments(
        [...base, typescript],
        extension,
        '// @ts-expect-error'
      );

      expect(messages).toHaveLength(1);
      expect(messages[0]?.ruleId).toBe('@typescript-eslint/ban-ts-comment');
    }
  });
});
