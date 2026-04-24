import type { Rule } from 'eslint';

import e18ePlugin from '@e18e/eslint-plugin';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';
import eslintReactPlugin from '@eslint-react/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import vitestPlugin from '@vitest/eslint-plugin';
import { importX as importXPlugin } from 'eslint-plugin-import-x';
import jsdocPlugin from 'eslint-plugin-jsdoc';
// @ts-expect-error -- untyped plugin
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nPlugin from 'eslint-plugin-n';
import noBarrelFilesPlugin from 'eslint-plugin-no-barrel-files';
import prettierPlugin from 'eslint-plugin-prettier';
// @ts-expect-error -- untyped plugin
import promisePlugin from 'eslint-plugin-promise';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error -- untyped plugin
import securityPlugin from 'eslint-plugin-security';
import solidPlugin from 'eslint-plugin-solid';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
// @ts-expect-error -- untyped plugin
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import vuePlugin from 'eslint-plugin-vue';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import typescriptPlugin from 'typescript-eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import baseRules from '../base/rules.js';
import browserRules from '../browser/rules.js';
import jsxA11yRules from '../jsx-a11y/rules.js';
import nextRules from '../next/rules.js';
import nodeRules from '../node/rules.js';
import prettierRules from '../prettier/rules.js';
import reactRules from '../react/rules.js';
import solidRules from '../solid/rules.js';
import stylisticRules from '../stylistic/rules.js';
import tailwindRules from '../tailwind/rules.js';
import tanstackQueryRules from '../tanstack-query/rules.js';
import testingLibraryRules from '../testing-library/rules.js';
import typescriptRules from '../typescript/rules.js';
import vitestRules from '../vitest/rules.js';
import vueRules from '../vue/rules.js';

type PluginRules = Record<string, Pick<Rule.RuleModule, 'meta'>>;

const allConfiguredRules: Record<string, unknown> = {
  ...baseRules,
  ...browserRules,
  ...jsxA11yRules,
  ...nextRules,
  ...nodeRules,
  ...prettierRules,
  ...reactRules,
  ...solidRules,
  ...stylisticRules,
  ...tailwindRules,
  ...tanstackQueryRules,
  ...testingLibraryRules,
  ...typescriptRules,
  ...vitestRules,
  ...vueRules
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

const isRuleDisabled = (config: unknown): boolean => {
  if (config === 'off' || config === 0) {
    return true;
  }

  if (Array.isArray(config)) {
    return config[0] === 'off' || config[0] === 0;
  }

  return false;
};

const getEslintReactRules = (): PluginRules => {
  const rules: PluginRules = {};
  for (const [name, rule] of Object.entries(eslintReactPlugin.rules ?? {})) {
    if (!name.startsWith('x-')) {
      rules[name] = rule;
    }
  }

  return rules;
};

const plugins: PluginTestCase[] = [
  {
    name: 'e18e',
    prefix: 'e18e',
    rules: getPluginRules(e18ePlugin.rules, 'e18e')
  },
  {
    name: 'eslint-comments',
    prefix: '@eslint-community/eslint-comments',
    rules: getPluginRules(eslintCommentsPlugin.rules, 'eslint-comments')
  },
  {
    name: 'promise',
    prefix: 'promise',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- untyped plugin
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- untyped plugin
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
    name: 'unused-imports',
    prefix: 'unused-imports',
    rules: getPluginRules(unusedImportsPlugin.rules, 'unused-imports')
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
    name: 'jsdoc',
    prefix: 'jsdoc',
    rules: getPluginRules(jsdocPlugin.rules, 'jsdoc')
  },
  {
    name: 'no-barrel-files',
    prefix: 'no-barrel-files',
    rules: getPluginRules(noBarrelFilesPlugin.rules, 'no-barrel-files')
  },
  {
    name: 'jsx-a11y',
    prefix: 'jsx-a11y',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- untyped plugin
    rules: getPluginRules(jsxA11yPlugin.rules, 'jsx-a11y')
  },
  {
    name: 'next',
    prefix: '@next/next',
    rules: getPluginRules(nextPlugin.rules, 'next')
  },
  {
    name: 'prettier',
    prefix: 'prettier',
    rules: getPluginRules(prettierPlugin.rules, 'prettier')
  },
  {
    name: '@eslint-react',
    prefix: '@eslint-react',
    rules: getEslintReactRules()
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
    name: 'tailwindcss',
    prefix: 'tailwindcss',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- untyped plugin
    rules: getPluginRules(tailwindPlugin.rules, 'tailwindcss')
  },
  {
    name: 'tanstack-query',
    prefix: '@tanstack/query',
    rules: getPluginRules(tanstackQueryPlugin.rules, 'tanstack-query')
  },
  {
    name: 'testing-library',
    prefix: 'testing-library',
    rules: getPluginRules(testingLibraryPlugin.rules, 'testing-library')
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
  },
  {
    name: 'vue',
    prefix: 'vue',
    rules: getPluginRules(vuePlugin.rules, 'vue')
  }
];

describe('Rules Completeness', () => {
  it('should configure all available core ESLint rules', () => {
    const configuredRuleNames = Object.keys(allConfiguredRules);
    const missingRules: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-deprecated -- no replacement API exists in ESLint v10
    for (const [name, rule] of builtinRules) {
      if (!name.includes('/') && !isDeprecatedRule(rule) && !configuredRuleNames.includes(name)) {
        missingRules.push(name);
      }
    }

    expect(missingRules, `The following core rules are not configured: ${missingRules.join(', ')}`).toStrictEqual([]);
  });

  it('should not have extraneous or deprecated core ESLint rules', () => {
    const validCoreRules = new Set<string>();
    const deprecatedCoreRules = new Set<string>();

    // eslint-disable-next-line @typescript-eslint/no-deprecated -- no replacement API exists in ESLint v10
    for (const [name, rule] of builtinRules) {
      if (!name.includes('/')) {
        if (isDeprecatedRule(rule)) {
          deprecatedCoreRules.add(name);
        } else {
          validCoreRules.add(name);
        }
      }
    }

    const configuredCoreRules = Object.keys(allConfiguredRules).filter((rule) => !rule.includes('/'));
    const invalidRules = configuredCoreRules.filter((rule) => {
      if (validCoreRules.has(rule)) {
        return false;
      }

      const config = allConfiguredRules[rule];
      const isDisabled = isRuleDisabled(config);

      if (deprecatedCoreRules.has(rule)) {
        return !isDisabled;
      }

      return !isDisabled;
    });

    expect(invalidRules, `The following core rules are extraneous or deprecated: ${invalidRules.join(', ')}`)
      .toStrictEqual([]);
  });

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
