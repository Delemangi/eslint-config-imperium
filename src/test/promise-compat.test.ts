import { ESLint } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import base from '../base/index.js';

describe('Promise plugin compatibility', () => {
  it('runs Promise rules directly on ESLint 10', async () => {
    const eslint = new ESLint({
      overrideConfig: base,
      overrideConfigFile: true
    });
    const code = 'Promise.resolve().then(() => { doSomething(); });';
    const [result] = await eslint.lintText(code, {
      filePath: 'promise-policy.js'
    });

    expect(result?.fatalErrorCount).toBe(0);
    expect(result?.messages.map(({ ruleId }) => ruleId)).toContain('promise/always-return');
  });
});
