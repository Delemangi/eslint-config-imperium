import { ESLint } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import solid from '../solid/index.js';

const eslint = new ESLint({
  overrideConfig: [solid],
  overrideConfigFile: true
});

const newRules = new Set([
  'solid/no-boolean-enumerated-attribute',
  'solid/no-store-mutation-outside-setter',
  'solid/no-unused-signal',
  'solid/no-write-in-pure-computation'
]);

const lint = async (code: string) => {
  const results = await eslint.lintText(code, { filePath: 'solid-policy.jsx' });

  expect(results).toHaveLength(1);

  const [result] = results;

  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.messages.map(({ ruleId }) => ruleId)).not.toContain(null);

  // Existing reactivity and proxy restrictions are outside this policy change.
  return (
    result?.messages.filter(({ ruleId }) => newRules.has(ruleId ?? '')) ?? []
  );
};

describe('Solid rule policy', () => {
  it('should configure all new rules without targeting a Solid major version', async () => {
    const config: unknown =
      await eslint.calculateConfigForFile('solid-policy.jsx');

    expect(config).toMatchObject({
      rules: {
        'solid/no-boolean-enumerated-attribute': [0],
        'solid/no-store-mutation-outside-setter': [2],
        'solid/no-unused-signal': [0],
        'solid/no-write-in-pure-computation': [0]
      }
    });
    expect(config).not.toHaveProperty('settings.solid.version');
  });

  it.each([
    'state.count = 1;',
    'state.count++;',
    'delete state.count;',
    'state.items.push(1);'
  ])('should reject direct store mutation: %s', async (mutation) => {
    const messages = await lint(`
      import { createStore } from 'solid-js/store';
      const [state] = createStore({ count: 0, items: [] });
      ${mutation}
    `);

    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      messageId: 'mutateStore',
      ruleId: 'solid/no-store-mutation-outside-setter',
      severity: 2
    });
  });

  it.each([
    {
      code: `
        import { createStore } from 'solid-js/store';
        const [state, setState] = createStore({ count: 0 });
        setState('count', 1);
        console.log(state.count);
      `,
      name: 'Solid 1 path setters'
    },
    {
      code: `
        import { createStore } from 'solid-js';
        const [state, setState] = createStore({ count: 0 });
        setState((state) => { state.count++; });
        console.log(state.count);
      `,
      name: 'Solid 2 setter drafts that shadow the store'
    },
    {
      code: `
        const state = { count: 0, items: [] };
        state.count++;
        state.items.push(1);
      `,
      name: 'plain object mutations'
    },
    {
      code: `
        import { createStore } from 'another-library';
        const [state] = createStore({ count: 0 });
        state.count++;
      `,
      name: 'foreign store mutations'
    },
    {
      code: 'const view = <button aria-expanded={false} draggable={false} />; console.log(view);',
      name: 'Solid 1 boolean attribute expressions'
    },
    {
      code: `
        import { createSignal, createEffect } from 'solid-js';
        const [value, setValue] = createSignal(0);
        createEffect(() => { setValue(1); return value(); }, 0);
      `,
      name: 'Solid 1 effects with an initial value'
    },
    {
      code: `
        import { createStore } from 'solid-js/store';
        const [state, setState] = createStore({ users: [] });
        const [, setUsers] = createStore(state.users);
        setUsers([{ name: 'Ada' }]);
        console.log(state.users);
        setState('users', []);
      `,
      name: 'nested store setters observed through the parent'
    },
    {
      code: `
        import { createStore } from 'solid-js/store';
        const [state, setState] = createStore({ users: [] });
        const [users] = createStore(state.users);
        setState('users', 0, { name: 'Ada' });
        console.log(users);
      `,
      name: 'nested store readers updated through the parent'
    }
  ])('should not report new rules for $name', async ({ code }) => {
    await expect(lint(code)).resolves.toStrictEqual([]);
  });
});
