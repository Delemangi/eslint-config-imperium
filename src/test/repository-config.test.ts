import { ESLint } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

const eslint = new ESLint();
type RepositoryConfig = {
  languageOptions: {
    globals: Record<string, unknown>;
    parser: { meta?: { name?: string } };
    parserOptions: { projectService?: boolean };
  };
  rules: Record<string, [number, ...unknown[]]>;
};

const calculateConfig = async (path: string) => (await eslint.calculateConfigForFile(path)) as RepositoryConfig;
const specialistRulePattern =
  /^(?:@typescript-eslint|@eslint-react|react-hooks|react-refresh|vitest)\//u;
const javascriptFiles = [
  'eslint.config.js',
  'commitlint.config.js',
  'release.config.js',
  'vitest.config.js',
  'scripts/test-consumer.js',
  'scripts/test-consumer-check.js'
];

describe('Repository configuration', () => {
  it.each(javascriptFiles)('should lint %s with the Node JavaScript rules only', async (filePath) => {
    expect({ ignored: await eslint.isPathIgnored(filePath) }).toStrictEqual({
      ignored: false
    });

    const config = await calculateConfig(filePath);

    expect(config).toBeDefined();
    expect(config.rules['no-undef']?.[0]).toBe(2);
    expect(config.rules['n/no-process-exit']?.[0]).toBe(1);
    expect(config.rules['@stylistic/semi']?.[0]).toBe(2);
    expect(config.rules['perfectionist/sort-imports']?.[0]).toBe(2);
    expect(config.languageOptions.parserOptions.projectService).toBeUndefined();
    expect(config.languageOptions.parser.meta?.name).not.toBe('typescript-eslint/parser');
    expect(config.languageOptions.globals['process']).toBeDefined();
    expect(config.languageOptions.globals['window']).toBeUndefined();
    expect(config.languageOptions.globals['document']).toBeUndefined();

    const activeSpecialistRules = Object.entries(config.rules)
      .filter(([name]) => specialistRulePattern.test(name))
      .filter(([, options]) => options[0] !== 0);

    expect(activeSpecialistRules).toStrictEqual([]);

    const [result] = await eslint.lintText('process.stdout.write(repositoryUndefinedVariable);\n', { filePath });

    expect(result?.fatalErrorCount).toBe(0);
    expect(result?.messages.filter((message) => message.ruleId === 'no-undef')).toStrictEqual([
      expect.objectContaining({
        message: "'repositoryUndefinedVariable' is not defined."
      })
    ]);
  });

  it('should preserve typed TypeScript and framework configuration', async () => {
    const typescriptConfig = await calculateConfig('src/base/index.ts');
    const reactConfig = await calculateConfig('src/test/repository-component.tsx');
    const vitestConfig = await calculateConfig('src/test/configs.test.ts');

    expect(typescriptConfig.languageOptions.parserOptions).toMatchObject({
      projectService: true
    });
    expect(typescriptConfig.rules['@typescript-eslint/no-floating-promises']?.[0]).toBe(2);
    expect(typescriptConfig.languageOptions.globals['window']).toBeDefined();
    expect(reactConfig.rules['react-hooks/rules-of-hooks']?.[0]).toBe(2);
    expect(vitestConfig.rules['vitest/valid-expect']?.[0]).toBe(2);
  });

  it('should keep generated library files ignored', async () => {
    expect({
      ignored: await eslint.isPathIgnored('lib/index.js')
    }).toStrictEqual({ ignored: true });
    expect({
      ignored: await eslint.isPathIgnored('lib/test/configs.test.js')
    }).toStrictEqual({ ignored: true });
  });
});
