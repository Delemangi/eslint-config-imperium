import stylisticPlugin from '@stylistic/eslint-plugin';
import vitestPlugin from '@vitest/eslint-plugin';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
// @ts-expect-error missing types
import promisePlugin from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import regexpPlugin from 'eslint-plugin-regexp';
import unicornPlugin from 'eslint-plugin-unicorn';
import typescriptPlugin from 'typescript-eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import baseRules from '../base/rules.js';
import browserRules from '../browser/rules.js';
import nodeRules from '../node/rules.js';
import prettierRules from '../prettier/rules.js';
import reactRules from '../react/rules.js';
import stylisticRules from '../stylistic/rules.js';
import typescriptRules from '../typescript/rules.js';
import vitestRules from '../vitest/rules.js';

type PluginRules = Record<string, { meta?: { deprecated?: unknown } }>;

const allConfiguredRules: Record<string, unknown> = {
  ...baseRules,
  ...browserRules,
  ...nodeRules,
  ...prettierRules,
  ...reactRules,
  ...stylisticRules,
  ...typescriptRules,
  ...vitestRules
};

type PluginTestCase = {
  name: string;
  prefix: string;
  rules: PluginRules;
};

const plugins: PluginTestCase[] = [
  {
    name: 'promise',
    prefix: 'promise',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    rules: promisePlugin.rules as PluginRules
  },
  {
    name: 'regexp',
    prefix: 'regexp',
    rules: regexpPlugin.rules as PluginRules
  },
  {
    name: 'unicorn',
    prefix: 'unicorn',
    rules: unicornPlugin.rules as PluginRules
  },
  {
    name: 'n',
    prefix: 'n',
    rules: nPlugin.rules as PluginRules
  },
  {
    name: 'prettier',
    prefix: 'prettier',
    rules: prettierPlugin.rules as PluginRules
  },
  {
    name: 'react',
    prefix: 'react',
    rules: reactPlugin.rules as PluginRules
  },
  {
    name: 'react-hooks',
    prefix: 'react-hooks',
    rules: reactHooksPlugin.rules as PluginRules
  },
  {
    name: 'react-refresh',
    prefix: 'react-refresh',
    rules: reactRefreshPlugin.rules as PluginRules
  },
  {
    name: 'stylistic',
    prefix: '@stylistic',
    rules: stylisticPlugin.rules as PluginRules
  },
  {
    name: 'typescript',
    prefix: '@typescript-eslint',
    // @ts-expect-error rules exist on the plugin
    rules: typescriptPlugin.plugin.rules as PluginRules
  },
  {
    name: 'vitest',
    prefix: 'vitest',
    rules: vitestPlugin.rules as PluginRules
  }
];

describe('Rules Completeness', () => {
  it.each(plugins)('should configure all available $name rules', ({ prefix, rules }) => {
    const availableRules: string[] = [];
    for (const [name, rule] of Object.entries(rules)) {
      if (!rule.meta?.deprecated) {
        availableRules.push(`${prefix}/${name}`);
      }
    }

    const configuredRuleNames = Object.keys(allConfiguredRules);
    const missingRules = availableRules.filter((rule) => !configuredRuleNames.includes(rule));

    expect(missingRules, `The following rules are not configured: ${missingRules.join(', ')}`).toStrictEqual([]);
  });

  it.each(plugins)('should not have extraneous or deprecated $name rules', ({
    name,
    prefix,
    rules
  }) => {
    const validRules = new Set<string>();
    for (const [ruleName, rule] of Object.entries(rules)) {
      if (!rule.meta?.deprecated) {
        validRules.add(`${prefix}/${ruleName}`);
        // For stylistic plugin, also add unprefixed version since rules can be used without js/ts/jsx prefix
        if (name === 'stylistic' && ruleName.includes('/')) {
          const unprefixedName = ruleName.split('/').slice(1)
            .join('/');
          validRules.add(`${prefix}/${unprefixedName}`);
        }
      }
    }

    const configuredRuleNames = Object.keys(allConfiguredRules).filter((rule) => rule.startsWith(`${prefix}/`));

    const invalidRules = configuredRuleNames.filter((rule) => !validRules.has(rule));

    expect(invalidRules, `The following rules are extraneous or deprecated: ${invalidRules.join(', ')}`)
      .toStrictEqual([]);
  });
});
