import { ESLint } from 'eslint';
import vuePlugin from 'eslint-plugin-vue';
import {
  describe,
  expect,
  it
} from 'vitest';
import vueParser from 'vue-eslint-parser';

import vueRules from '../vue/rules.js';

const contentRule = 'vue/no-content-outside-block';
const modelRule = 'vue/no-define-model-default';
const shadowRule = 'vue/no-props-shadow';
const policyRules = {
  [contentRule]: vueRules[contentRule],
  [modelRule]: vueRules[modelRule],
  [shadowRule]: vueRules[shadowRule]
};

const eslint = new ESLint({
  overrideConfig: {
    files: ['**/*.vue'],
    languageOptions: { parser: vueParser },
    plugins: { vue: vuePlugin },
    rules: policyRules
  },
  overrideConfigFile: true
});

const lint = async (source: string) => {
  const [result] = await eslint.lintText(source, {
    filePath: 'vue-policy.vue'
  });
  if (!result) {
    throw new Error('Expected ESLint to return a lint result');
  }

  expect(result.fatalErrorCount).toBe(0);

  return result;
};

describe('Vue rule policy', () => {
  it('enables each correctness rule without options', () => {
    for (const config of Object.values(policyRules)) {
      expect(config).toStrictEqual(['error']);
    }
  });

  it.each([
    {
      name: 'discarded content outside a block',
      ruleId: contentRule,
      source: '<template><div>Hello</div></template>\nhello world'
    },
    {
      name: 'a model default that can desynchronize parent and child',
      ruleId: modelRule,
      source:
        '<script setup>const model = defineModel({ default: 1 })</script>'
    },
    {
      name: 'a named model default',
      ruleId: modelRule,
      source:
        '<script setup>const count = defineModel("count", { default: 1 })</script>'
    },
    {
      name: 'a local binding shadowing a prop',
      ruleId: shadowRule,
      source:
        '<script setup>defineProps({ title: String }); const title = "local"</script>'
    }
  ])('rejects $name', async ({ ruleId, source }) => {
    const result = await lint(source);

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toMatchObject({
      ruleId,
      severity: 2
    });
  });

  it.each([
    '<!-- valid comment --><template><div>Hello</div></template><docs>Custom content</docs>',
    '<script setup>const model = defineModel({ required: true })</script>',
    '<script setup>const count = defineModel("count")</script>',
    '<script setup>const { title } = defineProps({ title: String })</script>',
    '<script setup>const props = defineProps({ title: String }); const label = props.title</script>',
    '<script setup>defineProps({ title: String }); function label() { const title = "local"; return title }</script>'
  ])('accepts valid SFC content and unambiguous bindings: %s', async (source) => {
    const result = await lint(source);

    expect(result.messages).toStrictEqual([]);
  });
});
