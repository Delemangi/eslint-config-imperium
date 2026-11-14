import { ESLint, type Linter } from 'eslint';
import { importX as importXPlugin } from 'eslint-plugin-import-x';
import noBarrelFilesPlugin from 'eslint-plugin-no-barrel-files';
import {
  describe,
  expect,
  it
} from 'vitest';

import baseRules from '../base/rules.js';

const barrelRule = 'no-barrel-files/no-barrel-files';
const disabledRules = [
  'import-x/avoid-barrel-files',
  'import-x/avoid-importing-barrel-files',
  'import-x/avoid-namespace-import',
  'import-x/avoid-re-export-all'
] as const;
const barrelSource = `export { basename } from 'node:path';
export { dirname } from 'node:path';
export { join } from 'node:path';
export { resolve } from 'node:path';
`;
const namespaceSource = `import * as path from 'node:path';

export const separator = path.sep;
`;
const reExportAllSource = `export * from './module.js';
`;

const createLinter = (rules: NonNullable<Linter.Config['rules']>) => new ESLint({
  overrideConfig: [
    {
      files: ['**/*.ts'],
      plugins: {
        'import-x': importXPlugin,
        'no-barrel-files': noBarrelFilesPlugin as ESLint.Plugin
      },
      rules
    }
  ],
  overrideConfigFile: true
});

const lint = async (eslint: ESLint, source: string) => {
  const [result] = await eslint.lintText(source, {
    filePath: 'src/test/import-x-policy.ts'
  });
  if (!result) {
    throw new Error('Expected ESLint to return a lint result');
  }

  expect(result.fatalErrorCount).toBe(0);

  return result;
};

const getRuleIds = (result: ESLint.LintResult) => result.messages.map(({ ruleId }) => ruleId);

describe('import-x barrel and namespace rule policy', () => {
  it('disables rules superseded by the existing policies', () => {
    for (const ruleId of disabledRules) {
      expect(baseRules[ruleId]).toStrictEqual(['off']);
    }

    expect(baseRules[barrelRule]).toStrictEqual(['error']);
    expect(baseRules['no-barrel-files/prefer-source-imports']).toStrictEqual([
      'error',
      { fixStyle: 'preserve-alias' }
    ]);
  });

  it('keeps no-barrel-files authoritative for barrel authoring', async () => {
    const eslint = createLinter({
      [barrelRule]: baseRules[barrelRule],
      'import-x/avoid-barrel-files': baseRules['import-x/avoid-barrel-files']
    });
    const result = await lint(eslint, barrelSource);

    expect(getRuleIds(result)).toStrictEqual([
      barrelRule,
      barrelRule,
      barrelRule,
      barrelRule
    ]);
  });

  it('permits namespace imports', async () => {
    const eslint = createLinter({
      'import-x/avoid-namespace-import':
        baseRules['import-x/avoid-namespace-import']
    });
    const result = await lint(eslint, namespaceSource);

    expect(result.messages).toStrictEqual([]);
  });

  it('confirms the disabled barrel and namespace rules would report', async () => {
    const eslint = createLinter({
      'import-x/avoid-barrel-files': 'error',
      'import-x/avoid-namespace-import': 'error',
      'import-x/avoid-re-export-all': 'error'
    });

    const barrelResult = await lint(eslint, barrelSource);

    expect(getRuleIds(barrelResult)).toStrictEqual(['import-x/avoid-barrel-files']);

    const namespaceResult = await lint(eslint, namespaceSource);

    expect(getRuleIds(namespaceResult)).toStrictEqual(['import-x/avoid-namespace-import']);

    const reExportAllResult = await lint(eslint, reExportAllSource);

    expect(getRuleIds(reExportAllResult)).toStrictEqual(['import-x/avoid-re-export-all']);
  });
});
