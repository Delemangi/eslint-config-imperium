import type { Rule } from 'eslint';

import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';
import stylisticPlugin from '@stylistic/eslint-plugin';
import vitestPlugin from '@vitest/eslint-plugin';
import { importX as importXPlugin } from 'eslint-plugin-import-x';
// @ts-expect-error missing types
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
// @ts-expect-error missing types
import promisePlugin from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error missing types
import securityPlugin from 'eslint-plugin-security';
import solidPlugin from 'eslint-plugin-solid';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import typescriptPlugin from 'typescript-eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import baseRules from '../base/rules.js';
import browserRules from '../browser/rules.js';
import jsxA11yRules from '../jsx-a11y/rules.js';
import nodeRules from '../node/rules.js';
import prettierRules from '../prettier/rules.js';
import reactRules from '../react/rules.js';
import solidRules from '../solid/rules.js';
import stylisticRules from '../stylistic/rules.js';
import typescriptRules from '../typescript/rules.js';
import vitestRules from '../vitest/rules.js';

type PluginRules = Record<string, Pick<Rule.RuleModule, 'meta'>>;

const allConfiguredRules: Record<string, unknown> = {
  ...baseRules,
  ...browserRules,
  ...jsxA11yRules,
  ...nodeRules,
  ...prettierRules,
  ...reactRules,
  ...solidRules,
  ...stylisticRules,
  ...typescriptRules,
  ...vitestRules
};

type PluginTestCase = {
  name: string;
  prefix: string;
  rules: PluginRules;
};

const isPluginRules = (value: unknown): value is PluginRules => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return Object.values(value).every((rule) => typeof rule === 'object' && rule !== null);
};

const getPluginRules = (value: unknown, pluginName: string): PluginRules => {
  if (!isPluginRules(value)) {
    throw new TypeError(`Expected rules for plugin ${pluginName}`);
  }

  return value;
};

const isDeprecatedRule = (rule: Pick<Rule.RuleModule, 'meta'>): boolean => {
  if (rule.meta === undefined) {
    return false;
  }

  return 'deprecated' in rule.meta && Boolean(Reflect.get(rule.meta, 'deprecated'));
};

const plugins: PluginTestCase[] = [
  {
    name: 'eslint-comments',
    prefix: '@eslint-community/eslint-comments',
    rules: getPluginRules(eslintCommentsPlugin.rules, 'eslint-comments')
  },
  {
    name: 'promise',
    prefix: 'promise',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- plugin lacks type definitions
    rules: getPluginRules(promisePlugin.rules, 'promise')
  },
  {
    name: 'regexp',
    prefix: 'regexp',
    rules: regexpPlugin.rules
  },
  {
    name: 'security',
    prefix: 'security',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- plugin lacks type definitions
    rules: getPluginRules(securityPlugin.rules, 'security')
  },
  {
    name: 'sonarjs',
    prefix: 'sonarjs',
    rules: getPluginRules(sonarjsPlugin.rules, 'sonarjs')
  },
  {
    name: 'unicorn',
    prefix: 'unicorn',
    rules: getPluginRules(unicornPlugin.rules, 'unicorn')
  },
  {
    name: 'n',
    prefix: 'n',
    rules: getPluginRules(nPlugin.rules, 'n')
  },
  {
    name: 'import-x',
    prefix: 'import-x',
    rules: getPluginRules(importXPlugin.rules, 'import-x')
  },
  {
    name: 'jsx-a11y',
    prefix: 'jsx-a11y',
    rules: getPluginRules(jsxA11yPlugin.rules, 'jsx-a11y')
  },
  {
    name: 'prettier',
    prefix: 'prettier',
    rules: getPluginRules(prettierPlugin.rules, 'prettier')
  },
  {
    name: 'react',
    prefix: 'react',
    rules: reactPlugin.rules
  },
  {
    name: 'react-hooks',
    prefix: 'react-hooks',
    rules: reactHooksPlugin.rules
  },
  {
    name: 'react-refresh',
    prefix: 'react-refresh',
    rules: reactRefreshPlugin.rules
  },
  {
    name: 'solid',
    prefix: 'solid',
    rules: solidPlugin.rules
  },
  {
    name: 'stylistic',
    prefix: '@stylistic',
    rules: stylisticPlugin.rules
  },
  {
    name: 'typescript',
    prefix: '@typescript-eslint',
    // @ts-expect-error rules exist on the plugin
    rules: getPluginRules(typescriptPlugin.plugin.rules, 'typescript')
  },
  {
    name: 'vitest',
    prefix: 'vitest',
    rules: vitestPlugin.rules
  }
];

describe('Rules Completeness', () => {
  it.each(plugins)('should configure all available $name rules', ({ prefix, rules }) => {
    const availableRules: string[] = [];
    for (const [name, rule] of Object.entries(rules)) {
      if (!isDeprecatedRule(rule)) {
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
      if (!isDeprecatedRule(rule)) {
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
