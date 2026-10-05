import { ESLint } from 'eslint';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import {
  mkdtemp,
  rm,
  writeFile
} from 'node:fs/promises';
import { join, resolve } from 'node:path';
import typescriptPlugin from 'typescript-eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import baseRules from '../base/rules.js';

const policyRuleIds = [
  'sonarjs/no-empty-parameterized-test-dataset',
  'sonarjs/synchronous-exception-assertions',
  'sonarjs/composite-assertions',
  'sonarjs/no-debounce-throttle-in-render',
  'sonarjs/avoid-mutating-nested-properties-of-shallow-clones',
  'sonarjs/prefer-native-jquery-alternative',
  'sonarjs/no-vue-class-component',
  'sonarjs/prefer-cypress-should',
  'sonarjs/no-mutate-reactive-state-in-updated-hook',
  'sonarjs/no-networkidle-wait',
  'sonarjs/prefer-native-axios-alternative',
  'sonarjs/testing-library-query-assertion',
  'sonarjs/testing-library-prefer-query-by-disappearance',
  'sonarjs/vitest-mock-at-module-scope',
  'sonarjs/no-duplicate-parameterized-test-case',
  'sonarjs/no-vue-mixins'
] as const;

const policyRules = Object.fromEntries(policyRuleIds.map((ruleId) => [ruleId, baseRules[ruleId]]));

const lintPolicy = new ESLint({
  overrideConfig: [
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: true },
          ecmaVersion: 'latest',
          sourceType: 'module'
        }
      },
      plugins: {
        sonarjs: sonarjsPlugin
      },
      rules: policyRules
    }
  ],
  overrideConfigFile: true
});

const lintForRule = async (
  ruleId: (typeof policyRuleIds)[number],
  source: string,
  name: string
) => {
  const suffix = name.startsWith('cypress-') ? '.cy.js' : '.js';
  const filePath = resolve(`policy-${name}${suffix}`);
  const [result] = await lintPolicy.lintText(source, { filePath });
  if (!result) {
    throw new Error('Expected ESLint to return a lint result');
  }

  expect(result.fatalErrorCount).toBe(0);

  return result.messages.filter(({ ruleId: reportedRule }) => reportedRule === ruleId);
};

const lintForVue3Rule = async (
  ruleId: (typeof policyRuleIds)[number],
  source: string,
  name: string
) => {
  const directory = await mkdtemp(join(process.cwd(), '.policy-vue-'));
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- the directory is created with a fixed prefix under cwd
    await writeFile(join(directory, 'package.json'), JSON.stringify({
      dependencies: {
        vue: '^3.0.0'
      }
    }));
    const filePath = join(directory, `policy-${name}.js`);
    const [result] = await lintPolicy.lintText(source, { filePath });
    if (!result) {
      throw new Error('Expected ESLint to return a lint result');
    }

    expect(result.fatalErrorCount).toBe(0);

    return result.messages.filter(({ ruleId: reportedRule }) => reportedRule === ruleId);
  } finally {
    await rm(directory, {
      force: true,
      recursive: true
    });
  }
};

// eslint-disable-next-line max-lines-per-function -- keep reviewed policy rule checks focused in one suite
describe('reviewed SonarJS policy', () => {
  it('configures all reviewed rules with the intended severity', () => {
    const errorRules = policyRuleIds.slice(0, 11);
    const disabledRules = policyRuleIds.slice(11);

    for (const ruleId of errorRules) {
      expect(baseRules[ruleId][0]).toBe('error');
    }

    for (const ruleId of disabledRules) {
      expect(baseRules[ruleId][0]).toBe('off');
    }
  });

  it('reports empty datasets but accepts a populated parameterized dataset', async () => {
    const rule = policyRuleIds[0];

    await expect(lintForRule(
      rule,
      "import { test } from 'vitest'; test.each([])('case', () => {});",
      'empty-each'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      rule,
      "import { test } from 'vitest'; test.each([1])('case', () => {});",
      'filled-each'
    )).resolves.toHaveLength(0);
  });

  it('distinguishes synchronous exceptions from async and rejected assertions', async () => {
    const rule = policyRuleIds[1];
    const parserOptions = {
      projectService: { allowDefaultProject: ['policy-typed.ts'] },
      tsconfigRootDir: process.cwd()
    };
    const typedEslint = new ESLint({
      overrideConfig: [
        {
          files: ['**/*.ts'],
          languageOptions: {
            parser: typescriptPlugin.parser,
            parserOptions
          },
          plugins: { sonarjs: sonarjsPlugin },
          rules: { [rule]: baseRules[rule] }
        }
      ],
      overrideConfigFile: true
    });
    const lintTyped = async (source: string) => {
      const [result] = await typedEslint.lintText(source, {
        filePath: resolve('policy-typed.ts')
      });
      if (!result) {
        throw new Error('Expected ESLint to return a typed lint result');
      }

      expect(result.fatalErrorCount).toBe(0);

      return result.messages.filter(({ ruleId }) => ruleId === rule);
    };

    await expect(lintTyped(`
      import { expect, test } from 'vitest';
      test('sync exception', () => {
        expect(() => { throw new Error('failure'); }).toThrow();
      });
    `)).resolves.toHaveLength(0);
    await expect(lintForRule(
      rule,
      "import { expect } from 'vitest'; expect(async () => {}).toThrow();",
      'no-parser-services'
    )).resolves.toHaveLength(0);
    await expect(lintTyped(`
      import { expect, test } from 'vitest';
      test('non-callable exception', () => { expect(42).toThrow(); });
    `)).resolves.toHaveLength(1);
    await expect(lintTyped(`
      import { expect, test } from 'vitest';
      test('async exception', async () => {
        expect(async () => { throw new Error('failure'); }).toThrow();
      });
    `)).resolves.toHaveLength(1);
    await expect(lintTyped(`
      import { expect, test } from 'vitest';
      test('rejected exception', async () => {
        await expect(Promise.reject(new Error('failure'))).rejects.toThrow();
      });
    `)).resolves.toHaveLength(0);
  });

  it('allows cohesive existence and shape guards in composite assertions', async () => {
    const rule = policyRuleIds[2];

    await expect(lintForRule(
      rule,
      "import { expect } from 'vitest'; expect(left === 1 && right === 2).toBeTruthy();",
      'independent-assertions'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      rule,
      "import { expect } from 'vitest'; expect(result && result.ok).toBeTruthy();",
      'cohesive-guard'
    )).resolves.toHaveLength(0);
  });

  it('reports debounce in render and nested mutation of shallow clones', async () => {
    const debounce = policyRuleIds[3];
    const nestedMutation = policyRuleIds[4];

    await expect(lintForRule(
      debounce,
      `import { debounce } from 'lodash';
      function Widget() { debounce(() => {}, 10); }`,
      'debounce-render'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      debounce,
      `import { useMemo } from 'react';
      import { debounce } from 'lodash';
      function Widget() { useMemo(() => debounce(() => {}, 10), []); }`,
      'memo-render'
    )).resolves.toHaveLength(0);
    await expect(lintForRule(
      nestedMutation,
      `import { clone } from 'lodash';
      const original = { nested: { value: 1 } };
      const copy = clone(original);
      copy.nested.value = 2;`,
      'nested-mutation'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      nestedMutation,
      `import { clone } from 'lodash';
      const original = { nested: { value: 1 } };
      const copy = clone(original);
      copy.nested = { value: 2 };
      copy.nested.value = 3;`,
      'nested-replacement'
    )).resolves.toHaveLength(0);
  });

  it('targets jQuery utilities, Vue class components, and Cypress assertion callbacks', async () => {
    await expect(lintForRule(
      policyRuleIds[5],
      "import $ from 'jquery'; $.isArray(value);",
      'jquery-utility'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      policyRuleIds[5],
      'const $ = { isArray(value) { return Array.isArray(value); } }; $.isArray(value);',
      'local-dollar'
    )).resolves.toHaveLength(0);
    await expect(lintForVue3Rule(
      policyRuleIds[6],
      "import { Vue } from 'vue-class-component'; export default class Widget extends Vue {}",
      'vue-class'
    )).resolves.toHaveLength(1);
    await expect(lintForVue3Rule(
      policyRuleIds[6],
      'class Widget {}',
      'plain-class'
    )).resolves.toHaveLength(0);
    await expect(lintForRule(
      policyRuleIds[7],
      "cy.get('button').then((el) => { expect(el.text()).to.equal('Save'); });",
      'cypress-then'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      policyRuleIds[7],
      "cy.get('button').then((el) => { expect(el.text()).to.equal('Save'); sideEffect(); });",
      'cypress-side-effect'
    )).resolves.toHaveLength(0);
  });

  it('guards Vue reactive state and avoids Playwright networkidle waits', async () => {
    const rule = policyRuleIds[8];

    await expect(lintForRule(
      rule,
      `import { ref, onUpdated } from 'vue';
      const count = ref(0);
      onUpdated(() => { count.value++; });`,
      'vue-updated'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      rule,
      `import { ref, onUpdated } from 'vue';
      const count = ref(0);
      onUpdated(() => { if (count.value < 2) count.value++; });`,
      'vue-guarded-update'
    )).resolves.toHaveLength(0);
    await expect(lintForRule(
      policyRuleIds[9],
      `import { test } from '@playwright/test';
      test('page', async ({ page }) => { await page.waitForLoadState('networkidle'); });`,
      'networkidle'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      policyRuleIds[9],
      `import { test } from '@playwright/test';
      test('page', async ({ page }) => { await page.waitForLoadState('domcontentloaded'); });`,
      'domcontentloaded'
    )).resolves.toHaveLength(0);
  });

  it('prefers native Axios alternatives without banning normal HTTP methods', async () => {
    const rule = policyRuleIds[10];

    await expect(lintForRule(
      rule,
      "import axios from 'axios'; axios.all([axios.get('/a'), axios.get('/b')]);",
      'axios-all'
    )).resolves.toHaveLength(1);
    await expect(lintForRule(
      rule,
      "import axios from 'axios'; axios.get('/resource');",
      'axios-get'
    )).resolves.toHaveLength(0);
  });

  it('leaves specialist, unsafe-autofix, and unrelated Vue mixin findings disabled', async () => {
    await expect(lintForRule(
      policyRuleIds[11],
      `import { screen } from '@testing-library/dom';
      import { expect } from 'vitest';
      expect(screen.queryByText('x')).toBeInTheDocument();`,
      'query-assertion'
    )).resolves.toHaveLength(0);
    await expect(lintForRule(
      policyRuleIds[12],
      `import { screen, waitForElementToBeRemoved } from '@testing-library/dom';
      waitForElementToBeRemoved(() => screen.getByText('x'));`,
      'query-disappearance'
    )).resolves.toHaveLength(0);
    await expect(lintForRule(
      policyRuleIds[13],
      "import { vi } from 'vitest'; describe('suite', () => { vi.mock('./module'); });",
      'nested-mock'
    )).resolves.toHaveLength(0);
    await expect(lintForRule(
      policyRuleIds[14],
      "import { test } from 'vitest'; test.each([makeCase(), makeCase()])('case', () => {});",
      'dynamic-duplicate-cases'
    )).resolves.toHaveLength(0);
    await expect(lintForRule(
      policyRuleIds[15],
      'const component = { mixins: [] };',
      'unrelated-mixins'
    )).resolves.toHaveLength(0);
    expect(baseRules[policyRuleIds[11]][0]).toBe('off');
  });
});
