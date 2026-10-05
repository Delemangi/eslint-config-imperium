import { ESLint } from 'eslint';
import unicornPlugin from 'eslint-plugin-unicorn';
import { resolve } from 'node:path';
import {
  describe,
  expect,
  it
} from 'vitest';

import baseRules from '../base/rules.js';
import { auto, react } from '../index.js';

const unsafeJsonSerializationRule = 'unicorn/no-unsafe-json-serialization';
const unusedIteratorHelperRule = 'unicorn/no-unused-iterator-helper';

const enabledPolicy = {
  'unicorn/no-async-iterator-callback': ['error'],
  'unicorn/no-conflicting-constraints': ['error'],
  'unicorn/no-incomplete-accessor-override': ['error'],
  'unicorn/no-ineffective-csp-directives': ['error'],
  'unicorn/no-invalid-boolean-attribute-value': ['error'],
  'unicorn/no-invalid-dom-token': ['error'],
  'unicorn/no-invalid-integrity': ['error'],
  'unicorn/no-invalid-intl-options': ['error'],
  'unicorn/no-invalid-property-descriptor': ['error'],
  'unicorn/no-invalid-response-options': ['error'],
  'unicorn/no-invalid-style-set-property': ['error'],
  'unicorn/no-invalid-temporal-arithmetic': ['error'],
  'unicorn/no-invalid-url-protocol-comparison': ['error'],
  'unicorn/no-prevent-default-in-passive-listener': ['error'],
  'unicorn/no-unnecessary-parameters': ['error', { minimumCallCount: 2 }],
  'unicorn/no-unsafe-json-serialization': ['error'],
  'unicorn/no-unused-iterator-helper': ['error'],
  'unicorn/no-url-in-search-params': ['error'],
  'unicorn/no-useless-set-construction': ['error'],
  'unicorn/no-using-resource-escape': ['error'],
  'unicorn/prefer-combined-guards': [
    'error',
    {
      checkCompoundConditions: false,
      checkMultiStatementBodies: false
    }
  ],
  'unicorn/prefer-escaped-irregular-whitespace': ['error'],
  'unicorn/prefer-short-escape-sequences': ['error'],
  'unicorn/prefer-temporal-conversion': ['error'],
  'unicorn/require-text-decoder-streaming': ['error']
} as const;

const disabledPolicy = {
  'unicorn/comma-spacing': ['off'],
  'unicorn/indent': ['off'],
  'unicorn/key-name-casing': ['off'],
  'unicorn/no-empty-link-text': ['off'],
  'unicorn/no-javascript-url': ['off'],
  'unicorn/no-leading-empty-lines': ['off'],
  'unicorn/no-loss-of-precision': ['off'],
  'unicorn/prefer-iterator-zip': ['off'],
  'unicorn/prefer-json-import': ['off'],
  'unicorn/prefer-literal-ascii': ['off'],
  'unicorn/prefer-promise-static-methods': ['off'],
  'unicorn/prefer-uint8array-hex': ['off']
} as const;

const policyRuleIds = [
  ...Object.keys(enabledPolicy),
  ...Object.keys(disabledPolicy)
];
const policyRules = Object.fromEntries(policyRuleIds.map((ruleId) => [
  ruleId,
  baseRules[ruleId as keyof typeof baseRules]
]));

const eslint = new ESLint({
  overrideConfig: [
    {
      files: ['**/*.{js,jsx}'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: true },
          ecmaVersion: 'latest',
          sourceType: 'module'
        }
      },
      plugins: { unicorn: unicornPlugin },
      rules: policyRules
    }
  ],
  overrideConfigFile: true
});

const fullConfigFixEslint = new ESLint({
  fix: true,
  overrideConfig: [...auto, react],
  overrideConfigFile: true
});

const enabledCases = [
  {
    bad: 'Iterator.from([1]).forEach(async (value) => value);',
    good: '[1].map(async (value) => value);',
    id: 'unicorn/no-async-iterator-callback'
  },
  {
    bad: 'const element = <input type="number" min="10" max="2" />;',
    good: 'const element = <input type="number" min="2" max="10" />;',
    id: 'unicorn/no-conflicting-constraints'
  },
  {
    bad: `class Base { get value() { return 1; } set value(value) {} }
      class Child extends Base { get value() { return 2; } }`,
    good: `class Base { get value() { return 1; } set value(value) {} }
      class Child extends Base { get value() { return 2; } set value(value) {} }`,
    id: 'unicorn/no-incomplete-accessor-override'
  },
  {
    bad: 'const element = <meta httpEquiv="Content-Security-Policy" content="frame-ancestors \'none\'" />;',
    good: 'const element = <meta httpEquiv="Content-Security-Policy" content="default-src \'self\'" />;',
    id: 'unicorn/no-ineffective-csp-directives'
  },
  {
    bad: 'const input = document.createElement("input"); input.setAttribute("disabled", "false");',
    good: 'const input = document.createElement("input"); input.setAttribute("disabled", "");',
    id: 'unicorn/no-invalid-boolean-attribute-value'
  },
  {
    bad: 'document.body.classList.add("alpha beta");',
    good: 'document.body.classList.add("alpha");',
    id: 'unicorn/no-invalid-dom-token'
  },
  {
    bad: 'const script = <script integrity="sha256-short" />;',
    good: `const script = <script integrity="sha256-${'A'.repeat(43)}" />;`,
    id: 'unicorn/no-invalid-integrity'
  },
  {
    bad: 'new Intl.NumberFormat("en", { minimumFractionDigits: -1 });',
    good: 'new Intl.NumberFormat("en", { minimumFractionDigits: 2 });',
    id: 'unicorn/no-invalid-intl-options'
  },
  {
    bad: 'Object.defineProperty({}, "value", { value: 1, get() { return 2; } });',
    good: 'Object.defineProperty({}, "value", { value: 1, writable: true });',
    id: 'unicorn/no-invalid-property-descriptor'
  },
  {
    bad: 'new Response("body", { status: 204 });',
    good: 'new Response("body", { status: 200 });',
    id: 'unicorn/no-invalid-response-options'
  },
  {
    bad: 'document.body.style.setProperty("backgroundColor", "red");',
    good: 'document.body.style.setProperty("background-color", "red");',
    id: 'unicorn/no-invalid-style-set-property'
  },
  {
    bad: 'Temporal.Instant.fromEpochMilliseconds(1).add({ days: 1 });',
    good: 'Temporal.Instant.fromEpochMilliseconds(1).add({ hours: 1 });',
    id: 'unicorn/no-invalid-temporal-arithmetic'
  },
  {
    bad: 'new URL("https://example.com").protocol === "HTTPS";',
    good: 'new URL("https://example.com").protocol === "https:";',
    id: 'unicorn/no-invalid-url-protocol-comparison'
  },
  {
    bad: 'addEventListener("touchstart", (event) => { event.preventDefault(); }, { passive: true });',
    good: 'addEventListener("touchstart", (event) => { event.preventDefault(); }, { passive: false });',
    id: 'unicorn/no-prevent-default-in-passive-listener'
  },
  {
    bad: 'JSON.stringify(new Map()); JSON.stringify(new Set()); JSON.stringify(1n); JSON.stringify(() => {});',
    good: 'JSON.stringify({ value: 1 }); JSON.stringify([1, 2]); JSON.stringify({ toJSON() { return "safe"; } });',
    id: unsafeJsonSerializationRule
  },
  {
    bad: 'Iterator.from([1, 2]).map((value) => value);',
    good: 'Iterator.from([1, 2]).map((value) => value).toArray();',
    id: unusedIteratorHelperRule
  },
  {
    bad: 'new URLSearchParams("https://example.com/?a=1");',
    good: 'new URL("https://example.com/?a=1").searchParams;',
    id: 'unicorn/no-url-in-search-params'
  },
  {
    bad: 'function get(value) { return value; } get(1); get(1);',
    good: 'function get(value) { return value; } get(1);',
    id: 'unicorn/no-unnecessary-parameters'
  },
  {
    bad: 'new Set(new Set([1]).union(new Set([2])));',
    good: 'new Set(values);',
    id: 'unicorn/no-useless-set-construction'
  },
  {
    bad: 'function get() { using resource = acquire(); return resource; }',
    good: 'function close() { using resource = acquire(); resource.close(); }',
    id: 'unicorn/no-using-resource-escape'
  },
  {
    bad: 'function check(a, b) { if (!a) return; if (!b) return; }',
    good: 'function check(a, b) { if (!a || !b) return; }',
    id: 'unicorn/prefer-combined-guards'
  },
  {
    bad: "const value = 'a\u{A0}b';",
    good: String.raw`const value = 'a\u00A0b';`,
    id: 'unicorn/prefer-escaped-irregular-whitespace'
  },
  {
    bad: String.raw`const value = '\u000A';`,
    good: String.raw`const value = '\n';`,
    id: 'unicorn/prefer-short-escape-sequences'
  },
  {
    bad: 'Temporal.PlainDate.from(Temporal.ZonedDateTime.from(value).toString());',
    good: 'Temporal.PlainDate.from(value);',
    id: 'unicorn/prefer-temporal-conversion'
  },
  {
    bad: `async function read() {
      const decoder = new TextDecoder();
      let text = "";
      for await (const chunk of (await fetch("/data")).body) {
        text += decoder.decode(chunk);
      }
    }`,
    good: 'async function read() { return (await fetch("/data")).text(); }',
    id: 'unicorn/require-text-decoder-streaming'
  }
] as const;

const lintForRule = async (ruleId: string, source: string) => {
  const filePath = resolve(`unicorn-policy.${source.includes('<') ? 'jsx' : 'js'}`);
  const [result] = await eslint.lintText(source, { filePath });
  if (!result) {
    throw new Error('Expected ESLint to return a lint result');
  }

  expect(result.fatalErrorCount).toBe(0);

  return result.messages.filter((message) => message.ruleId === ruleId);
};

describe('reviewed Unicorn policy', () => {
  it('configures the complete reviewed rule matrix and options', () => {
    expect(policyRules).toStrictEqual({
      ...enabledPolicy,
      ...disabledPolicy
    });
  });

  it('preserves the Promise executor TDZ throw under full-config autofix', async () => {
    const source =
      'function make() { const p = new Promise(resolve=>resolve(x)); const x=1;return p; }';
    const [result] = await fullConfigFixEslint.lintText(source, {
      filePath: resolve('promise-tdz-policy.js')
    });
    const fixedSource = result?.output ?? source;

    expect(result).toBeDefined();

    expect(result?.fatalErrorCount).toBe(0);

    expect(result?.messages.filter((message) => message.ruleId === null)).toHaveLength(0);

    const promiseRuleMessages =
      result?.messages.filter((message) => message.ruleId === 'unicorn/prefer-promise-static-methods') ?? [];

    expect(promiseRuleMessages).toHaveLength(0);

    expect(fixedSource).toContain('new Promise');

    expect(fixedSource).not.toContain('Promise.resolve(x)');

    expect(fixedSource.indexOf('new Promise')).toBeLessThan(fixedSource.indexOf('const x'));
  });

  it('preserves escaped closing-script text under full-config autofix', async () => {
    const source = String.raw`const closingTag = '\u003C/script>';`;
    const [result] = await fullConfigFixEslint.lintText(source, {
      filePath: resolve('escaped-closing-tag-policy.js')
    });
    const fixedSource = result?.output ?? source;

    expect(result).toBeDefined();

    expect(result?.fatalErrorCount).toBe(0);

    expect(result?.messages.filter((message) => message.ruleId === null)).toHaveLength(0);

    const asciiRuleMessages =
      result?.messages.filter((message) => message.ruleId === 'unicorn/prefer-literal-ascii') ?? [];

    expect(asciiRuleMessages).toHaveLength(0);

    expect(fixedSource).toContain(String.raw`\u003C/script>`);

    expect(fixedSource).not.toContain('</script>');
  });

  it('applies the reviewed constraint check through the exported TypeScript JSX configuration', async () => {
    const source = 'const field = <input type="number" min="10" max="2" />;';
    const [result] = await fullConfigFixEslint.lintText(source, {
      filePath: resolve('src/test/cases/react.tsx')
    });

    expect(result).toBeDefined();
    expect(result?.fatalErrorCount).toBe(0);

    const messages =
      result?.messages.filter((message) => message.ruleId === 'unicorn/no-conflicting-constraints') ?? [];

    expect(messages).not.toHaveLength(0);
  });

  it.each(enabledCases)('$id reports the unsafe or non-idiomatic case, not its boundary case', async ({
    bad,
    good,
    id
  }) => {
    await expect(lintForRule(id, bad)).resolves.not.toHaveLength(0);
    await expect(lintForRule(id, good)).resolves.toHaveLength(0);
  });

  it('does not flag JSON serialization that intentionally omits undefined properties or uses a replacer', async () => {
    const source =
      'JSON.stringify({ omitted: undefined }); ' +
      'JSON.stringify(new Map(), (_key, value) => value instanceof Map ? [...value] : value);';
    const messages = await lintForRule(unsafeJsonSerializationRule, source);

    expect(messages).toHaveLength(0);
  });

  it('reports JSON serialization that silently omits a function-valued property', async () => {
    const messages = await lintForRule(unsafeJsonSerializationRule, 'JSON.stringify({ callback() {} });');

    expect(messages).not.toHaveLength(0);
  });

  it('does not flag equal-value parameters when the function has fewer than two calls', async () => {
    const source = `export function get(value) { return value; }
      get(1);`;
    const messages = await lintForRule('unicorn/no-unnecessary-parameters', source);

    expect(messages).toHaveLength(0);
  });

  it('does not flag equal parameter values when repeated calls pass different values', async () => {
    const source = `function get(value) { return value; }
      get(1); get(2);`;
    const messages = await lintForRule('unicorn/no-unnecessary-parameters', source);

    expect(messages).toHaveLength(0);
  });

  it('respects the reviewed guard options for compound conditions and multi-statement bodies', async () => {
    const compound = `function check(a, b) { if (!a) return;
      if (b && ready) return; }`;
    const multipleStatements = `function check(a, b) { if (!a) { log(); return; }
      if (!b) { log(); return; } }`;
    const compoundCondition = await lintForRule('unicorn/prefer-combined-guards', compound);
    const multiStatementBody = await lintForRule('unicorn/prefer-combined-guards', multipleStatements);

    expect(compoundCondition).toHaveLength(0);
    expect(multiStatementBody).toHaveLength(0);
  });
});

describe('reviewed Unicorn static-analysis boundaries', () => {
  it('compares built-in name shadowing with reachable JSON and iterator detections', async () => {
    const shadowedJson =
      'function serialize(JSON) { return JSON.stringify(new Map()); }';
    const globalJson =
      'function serialize() { return JSON.stringify(new Map()); }';
    const shadowedIterator =
      'function discard(Iterator) { Iterator.from([1]).map((value) => value); }';
    const globalIterator = 'Iterator.from([1]).map((value) => value);';
    const serialization = await lintForRule(unsafeJsonSerializationRule, shadowedJson);
    const globalSerialization = await lintForRule(unsafeJsonSerializationRule, globalJson);
    const iterator = await lintForRule(unusedIteratorHelperRule, shadowedIterator);
    const globalIteratorMessages = await lintForRule(unusedIteratorHelperRule, globalIterator);

    expect(serialization).toHaveLength(0);
    expect(globalSerialization).not.toHaveLength(0);
    expect(iterator).toHaveLength(0);
    expect(globalIteratorMessages).not.toHaveLength(0);
  });

  it('does not infer conflicting constraints for custom components or through spreads', async () => {
    const custom = '<CustomInput type="number" min="10" max="2" />;';
    const spread =
      'const props = {}; const element = <input type="number" min="10" {...props} max="2" />;';
    const customComponent = await lintForRule('unicorn/no-conflicting-constraints', custom);
    const spreadAttribute = await lintForRule('unicorn/no-conflicting-constraints', spread);

    expect(customComponent).toHaveLength(0);
    expect(spreadAttribute).toHaveLength(0);
  });

  it('enables both iterator rules and assigns discarded results to the appropriate rule', async () => {
    const iteratorRules = new ESLint({
      overrideConfig: [
        {
          files: ['**/*.js'],
          languageOptions: {
            parserOptions: {
              ecmaVersion: 'latest',
              sourceType: 'module'
            }
          },
          plugins: { unicorn: unicornPlugin },
          rules: {
            'unicorn/no-unused-builtin-method-return':
              baseRules['unicorn/no-unused-builtin-method-return'],
            [unusedIteratorHelperRule]: baseRules[unusedIteratorHelperRule]
          }
        }
      ],
      overrideConfigFile: true
    });

    const lintRuleIds = async (source: string) => {
      const [result] = await iteratorRules.lintText(source, {
        filePath: resolve('iterator-policy.js')
      });
      if (!result) {
        throw new Error('Expected ESLint to return a lint result');
      }

      expect(result.fatalErrorCount).toBe(0);

      return result.messages.map(({ ruleId }) => ruleId);
    };

    expect(baseRules['unicorn/no-unused-builtin-method-return'][0]).toBe('error');
    expect(baseRules[unusedIteratorHelperRule][0]).toBe('error');

    const discardedLazySource = 'Iterator.from([1, 2]).map((value) => value);';
    const discardedArraySource = '[1, 2].map((value) => value);';
    const voidLazySource = 'void Iterator.from([1, 2]).map((value) => value);';

    await expect(lintRuleIds(discardedLazySource)).resolves.toStrictEqual([unusedIteratorHelperRule]);

    await expect(lintRuleIds(discardedArraySource)).resolves.toStrictEqual(['unicorn/no-unused-builtin-method-return']);

    await expect(lintRuleIds(voidLazySource)).resolves.toStrictEqual([unusedIteratorHelperRule]);
  });
});
