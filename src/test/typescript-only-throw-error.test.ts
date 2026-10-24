import { ESLint } from 'eslint';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ts from 'typescript';
import typescriptPlugin from 'typescript-eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import typescriptRules from '../typescript/rules.js';

const rule = '@typescript-eslint/only-throw-error';

/*
 * Hermetic identity test, not a Router runtime regression. Alias/intersection and guard shapes
 * follow @tanstack/router-core@1.171.39/dist/esm/redirect.d.ts; navigation types are reduced.
 */
const declarations = `
type NavigateOptions<TFrom extends string, TTo extends string | undefined> = {
  from?: TFrom;
  to?: TTo;
  href?: string;
};
export type Redirect<TFrom extends string = string, TTo extends string | undefined = undefined> = Response & {
  options: NavigateOptions<TFrom, TTo>;
};
export type AnyRedirect = Redirect<any, any>;
export type ResolvedRedirect<TFrom extends string = string, TTo extends string = ''> = Redirect<TFrom, TTo>;
export declare function isRedirect(obj: any): obj is AnyRedirect;
export type NotFoundError = { isNotFound: true; data?: unknown };
`;

const source = `
import { isRedirect } from '@tanstack/router-core';
import type { Redirect, AnyRedirect, ResolvedRedirect, NotFoundError } from '@tanstack/router-core';
declare const redirect: Redirect;
declare const notFound: NotFoundError;
throw redirect;
throw notFound;
throw new Error('valid');
throw { statusCode: 302, href: '/' };
throw 'invalid';
namespace Local {
  export type Redirect = { statusCode: number; href: string };
  export type NotFoundError = { isNotFound: true };
}
declare const localRedirect: Local.Redirect;
declare const localNotFound: Local.NotFoundError;
throw localRedirect;
throw localNotFound;
declare const anyRedirect: AnyRedirect;
declare const resolvedRedirect: ResolvedRedirect;
throw anyRedirect;
throw resolvedRedirect;
declare const unknownValue: unknown;
if (isRedirect(unknownValue)) {
  throw unknownValue;
}
namespace Local {
  export type AnyRedirect = Response & { options: { href?: string } };
  export type ResolvedRedirect = AnyRedirect;
}
declare const localAnyRedirect: Local.AnyRedirect;
declare const localResolvedRedirect: Local.ResolvedRedirect;
throw localAnyRedirect;
throw localResolvedRedirect;
`;

describe('TypeScript only-throw-error policy', () => {
  it('should allow only package-defined Router control-flow types alongside ordinary Errors', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'imperium-router-types-'));
    try {
      const packageDirectory = join(directory, 'node_modules/@tanstack/router-core');
      // eslint-disable-next-line security/detect-non-literal-fs-filename -- fixed package path inside an owned temporary project
      await mkdir(packageDirectory, { recursive: true });
      const fixtures = [
        [
          'package.json',
          JSON.stringify({
            private: true,
            type: 'module'
          })
        ],
        [
          'tsconfig.json',
          JSON.stringify({
            compilerOptions: {
              module: 'NodeNext',
              strict: true
            },
            files: ['fixture.ts']
          })
        ],
        [
          'node_modules/@tanstack/router-core/package.json',
          JSON.stringify({
            name: '@tanstack/router-core',
            types: 'index.d.ts',
            version: '0.0.0'
          })
        ],
        ['node_modules/@tanstack/router-core/index.d.ts', declarations],
        ['fixture.ts', source]
      ] as const;
      await Promise.all(fixtures.map(async ([file, contents]) => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename -- fixed fixture names inside an owned temporary project
        await writeFile(join(directory, file), contents);
      }));
      const configPath = join(directory, 'tsconfig.json');
      const config = ts.readConfigFile(configPath, (file) => ts.sys.readFile(file));

      expect(config.error).toBeUndefined();

      const parsed = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        directory
      );

      expect(parsed.errors).toStrictEqual([]);

      const program = ts.createProgram(parsed.fileNames, parsed.options);

      expect(program.getSemanticDiagnostics()).toStrictEqual([]);

      const eslint = new ESLint({
        cwd: directory,
        overrideConfig: [
          {
            files: ['**/*.ts'],
            languageOptions: {
              parser: typescriptPlugin.parser,
              parserOptions: {
                projectService: true,
                tsconfigRootDir: directory
              }
            },
            plugins: { '@typescript-eslint': typescriptPlugin.plugin },
            rules: { [rule]: typescriptRules[rule] }
          }
        ],
        overrideConfigFile: true
      });
      const [result] = await eslint.lintFiles(['fixture.ts']);

      expect(result).toBeDefined();
      expect(result?.fatalErrorCount).toBe(0);
      expect(result?.warningCount).toBe(0);
      expect(result?.messages.map(({ line, ruleId }) => ({
        line,
        ruleId
      }))).toStrictEqual([
        {
          line: 9,
          ruleId: rule
        },
        {
          line: 10,
          ruleId: rule
        },
        {
          line: 17,
          ruleId: rule
        },
        {
          line: 18,
          ruleId: rule
        },
        {
          line: 33,
          ruleId: rule
        },
        {
          line: 34,
          ruleId: rule
        }
      ]);
    } finally {
      await rm(directory, {
        force: true,
        recursive: true
      });
    }
  });
});
