import { ESLint, type Linter } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import astro from '../astro/index.js';
import jsxA11y from '../jsx-a11y/index.js';
import jsxA11yRules from '../jsx-a11y/rules.js';

const eslint = new ESLint({
  overrideConfig: [jsxA11y],
  overrideConfigFile: true
});

describe('JSX accessibility rules', () => {
  it('loads every configured rule with the migrated namespace', async () => {
    const config = (await eslint.calculateConfigForFile('accessible.jsx')) as
      Linter.Config | undefined;

    for (const ruleName of Object.keys(jsxA11yRules)) {
      expect(config?.rules?.[ruleName]).toBeDefined();
    }
  });

  it('accepts accessible JSX', async () => {
    const source =
      '<main><h1>Welcome</h1><img src="/logo.png" alt="Company logo" /><button>Continue</button></main>';
    const [result] = await eslint.lintText(source, {
      filePath: 'accessible.jsx'
    });

    expect(result?.fatalErrorCount).toBe(0);
    expect(result?.messages.filter(({ ruleId }) => ruleId?.startsWith('jsx-a11y-x/'))).toStrictEqual([]);
  });

  it('applies the migrated plugin through the Astro integration', async () => {
    const astroEslint = new ESLint({
      overrideConfig: astro,
      overrideConfigFile: true
    });
    const results = await astroEslint.lintFiles(['src/test/cases/astro.astro']);
    const ruleIds = results[0]?.messages.map(({ ruleId }) => ruleId) ?? [];

    expect(ruleIds).toContain('astro/jsx-a11y/alt-text');
  });

  it('reports multiple accessibility issues', async () => {
    const source =
      '<main><img src="/logo.png" /><div onClick={() => {}} /><span tabIndex={3}>Focus</span></main>';
    const [result] = await eslint.lintText(source, {
      filePath: 'inaccessible.jsx'
    });
    const ruleIds = result?.messages.map(({ ruleId }) => ruleId) ?? [];

    expect(result?.fatalErrorCount).toBe(0);
    expect(ruleIds).toContain('jsx-a11y-x/alt-text');
    expect(ruleIds).toContain('jsx-a11y-x/click-events-have-key-events');
    expect(ruleIds).toContain('jsx-a11y-x/no-static-element-interactions');
    expect(ruleIds).toContain('jsx-a11y-x/tabindex-no-positive');
  });
});
