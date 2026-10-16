import { ESLint } from 'eslint';
import unicornPlugin from 'eslint-plugin-unicorn';
import {
  describe,
  expect,
  it
} from 'vitest';

import baseRules from '../base/rules.js';

const wrapperRule = 'unicorn/no-repeated-call-wrappers';
const defaultsRule = 'unicorn/no-unnecessary-default-arguments';
const policyRules = {
  [defaultsRule]: baseRules[defaultsRule],
  [wrapperRule]: baseRules[wrapperRule]
};

const eslint = new ESLint({
  overrideConfig: {
    plugins: { unicorn: unicornPlugin },
    rules: policyRules
  },
  overrideConfigFile: true
});

const lint = async (source: string) => {
  const [result] = await eslint.lintText(source, {
    filePath: 'unicorn-policy.js'
  });
  if (!result) {
    throw new Error('Expected ESLint to return a lint result');
  }

  expect(result.fatalErrorCount).toBe(0);

  return result;
};

describe('Unicorn rule policy', () => {
  it('configures each reviewed rule independently without options', () => {
    expect(baseRules[wrapperRule]).toStrictEqual(['off']);
    expect(baseRules[defaultsRule]).toStrictEqual(['error']);
    expect(unicornPlugin.rules?.['no-repeated-call-wrappers']?.meta?.schema).toStrictEqual([]);
    expect(unicornPlugin.rules?.['no-unnecessary-default-arguments']?.meta?.schema).toStrictEqual([]);
  });

  it('preserves caller conversions while proving the fixture triggers the enabled rule', async () => {
    const source = `
      const getWords = text => text.split(' ');
      const firstWords = new Set(getWords('first words'));
      const secondWords = new Set(getWords('second words'));
    `;
    const result = await lint(source);

    expect(result.messages).toStrictEqual([]);

    const enabledEslint = new ESLint({
      overrideConfig: {
        plugins: { unicorn: unicornPlugin },
        rules: {
          ...policyRules,
          [wrapperRule]: 'error'
        }
      },
      overrideConfigFile: true
    });
    const [enabledResult] = await enabledEslint.lintText(source, {
      filePath: 'unicorn-policy.js'
    });

    expect(enabledResult?.fatalErrorCount).toBe(0);
    expect(enabledResult?.messages).toHaveLength(1);
    expect(enabledResult?.messages[0]).toMatchObject({
      ruleId: wrapperRule,
      severity: 2
    });
  });

  it.each([
    {
      name: 'trailing default argument',
      output: 'function run(enabled = true) {} run();',
      source: 'function run(enabled = true) {} run(true);'
    },
    {
      name: 'matching object property',
      output:
        "function format({ unit = 'px', digits = 0 } = {}) {} format({   digits: 2 });",
      source:
        "function format({ unit = 'px', digits = 0 } = {}) {} format({ unit: 'px', digits: 2 });"
    },
    {
      name: 'object argument preserving its outer default',
      output:
        'function run({ enabled = true } = { enabled: false }) {} run({   });',
      source:
        'function run({ enabled = true } = { enabled: false }) {} run({ enabled: true });'
    }
  ])('removes the $name without changing the declaration', async ({ output, source }) => {
    const result = await lint(source);

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toMatchObject({
      ruleId: defaultsRule,
      severity: 2
    });

    const fixingEslint = new ESLint({
      fix: true,
      overrideConfig: {
        plugins: { unicorn: unicornPlugin },
        rules: policyRules
      },
      overrideConfigFile: true
    });
    const [fixed] = await fixingEslint.lintText(source, {
      filePath: 'unicorn-policy.js'
    });

    expect(fixed?.fatalErrorCount).toBe(0);
    expect(fixed?.messages).toStrictEqual([]);
    expect(fixed?.output).toBe(output);
  });

  it.each([
    'function run(enabled = true) {} run();',
    'function run(enabled = true) {} run(false);',
    'function run(enabled = true, count = 1) {} run(true, 2);',
    "function format({ unit = 'px' } = {}) {} format({ unit: 'em' });"
  ])('retains omitted, nondefault, and required middle arguments: %s', async (source) => {
    const result = await lint(source);

    expect(result.messages).toStrictEqual([]);
  });
});
