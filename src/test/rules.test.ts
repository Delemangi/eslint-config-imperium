import { ESLint } from 'eslint';
import {
  describe,
  expect,
  it
} from 'vitest';

import { jsxA11y, prettier, security, sonarjs, solid } from '../index.js';

const eslint = new ESLint();

describe('Rules', () => {
  it('should verify base configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/base.ts']);

    expect(results[0]?.errorCount).toBe(3);

    expect(results[0]?.messages[0]?.ruleId).toBe('no-var');
    expect(results[0]?.messages[1]?.ruleId).toBe('no-console');
    expect(results[0]?.messages[2]?.ruleId).toBe('eqeqeq');
  });

  it('should verify browser configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/browser.ts']);

    expect(results[0]?.errorCount).toBe(3);

    expect(results[0]?.messages[0]?.ruleId).toBe('unicorn/prefer-dom-node-append');
    expect(results[0]?.messages[1]?.ruleId).toBe('unicorn/prefer-dom-node-text-content');
    expect(results[0]?.messages[2]?.ruleId).toBe('unicorn/prefer-query-selector');
  });

  it('should verify jsx-a11y configuration rules', async () => {
    const jsxA11yEslint = new ESLint({
      overrideConfig: [jsxA11y]
    });
    const results = await jsxA11yEslint.lintFiles(['src/test/cases/jsx-a11y.tsx']);

    expect(results[0]?.errorCount).toBe(7);

    expect(results[0]?.messages[0]?.ruleId).toBe('jsx-a11y/alt-text');
    expect(results[0]?.messages[1]?.ruleId).toBe('jsx-a11y/click-events-have-key-events');
    expect(results[0]?.messages[2]?.ruleId).toBe('jsx-a11y/no-static-element-interactions');
    expect(results[0]?.messages[3]?.ruleId).toBe('@stylistic/jsx-newline');
    expect(results[0]?.messages[4]?.ruleId).toBe('@stylistic/jsx-newline');
    expect(results[0]?.messages[5]?.ruleId).toBe('jsx-a11y/no-noninteractive-tabindex');
    expect(results[0]?.messages[6]?.ruleId).toBe('jsx-a11y/tabindex-no-positive');
  });

  it('should verify Node configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/node.ts']);

    expect(results[0]?.errorCount).toBe(6);

    expect(results[0]?.messages[0]?.ruleId).toBe('n/no-exports-assign');
    expect(results[0]?.messages[1]?.ruleId).toBe('unicorn/prefer-module');
    expect(results[0]?.messages[2]?.ruleId).toBe('n/exports-style');
    expect(results[0]?.messages[3]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(results[0]?.messages[4]?.ruleId).toBe('n/no-path-concat');
    expect(results[0]?.messages[5]?.ruleId).toBe('unicorn/prefer-module');
    expect(results[0]?.messages[6]?.ruleId).toBe('n/no-process-exit');
  });

  it('should verify Perfectionist configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/perfectionist.ts']);

    expect(results[0]?.errorCount).toBe(3);

    expect(results[0]?.messages[0]?.ruleId).toBe('perfectionist/sort-enums');
    expect(results[0]?.messages[1]?.ruleId).toBe('perfectionist/sort-enums');
    expect(results[0]?.messages[2]?.ruleId).toBe('perfectionist/sort-object-types');
  });

  it('should verify Prettier configuration rules', async () => {
    const prettierEslint = new ESLint({
      overrideConfig: [prettier]
    });
    const results = await prettierEslint.lintFiles(['src/test/cases/prettier.ts']);

    expect(results[0]?.errorCount).toBe(2);

    expect(results[0]?.messages[0]?.ruleId).toBe('prettier/prettier');
    expect(results[0]?.messages[1]?.ruleId).toBe('prettier/prettier');
  });

  it('should verify React configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/react.tsx']);

    expect(results[0]?.errorCount).toBe(4);

    expect(results[0]?.messages[0]?.ruleId).toBe('react/prefer-read-only-props');
    expect(results[0]?.messages[1]?.ruleId).toBe('react/self-closing-comp');
    expect(results[0]?.messages[2]?.ruleId).toBe('@stylistic/jsx-self-closing-comp');
    expect(results[0]?.messages[3]?.ruleId).toBe('react/no-children-prop');
  });

  it('should verify security configuration rules', async () => {
    const securityEslint = new ESLint({
      overrideConfig: [security]
    });
    const results = await securityEslint.lintFiles(['src/test/cases/security.ts']);

    expect(results[0]?.errorCount).toBe(13);

    expect(results[0]?.messages[0]?.ruleId).toBe('func-style');
    expect(results[0]?.messages[1]?.ruleId).toBe('n/global-require');
    expect(results[0]?.messages[2]?.ruleId).toBe('security/detect-non-literal-require');
    expect(results[0]?.messages[3]?.ruleId).toBe('@typescript-eslint/no-require-imports');
    expect(results[0]?.messages[4]?.ruleId).toBe('unicorn/prefer-module');
    expect(results[0]?.messages[5]?.ruleId).toBe('security/detect-child-process');
    expect(results[0]?.messages[6]?.ruleId).toBe('security/detect-eval-with-expression');
    expect(results[0]?.messages[7]?.ruleId).toBe('no-eval');
    expect(results[0]?.messages[8]?.ruleId).toBe('security/detect-non-literal-fs-filename');
    expect(results[0]?.messages[9]?.ruleId).toBe('n/prefer-promises/fs');
    expect(results[0]?.messages[10]?.ruleId).toBe('require-unicode-regexp');
    expect(results[0]?.messages[11]?.ruleId).toBe('security/detect-non-literal-regexp');
    expect(results[0]?.messages[12]?.ruleId).toBe('no-new');
  });

  it('should verify sonarjs configuration rules', async () => {
    const sonarjsEslint = new ESLint({
      overrideConfig: [sonarjs]
    });
    const results = await sonarjsEslint.lintFiles(['src/test/cases/sonarjs.ts']);

    expect(results[0]?.errorCount).toBe(18);

    expect(results[0]?.messages[0]?.ruleId).toBe('func-style');
    expect(results[0]?.messages[1]?.ruleId).toBe('sonarjs/no-duplicated-branches');
    expect(results[0]?.messages[2]?.ruleId).toBe('func-style');
    expect(results[0]?.messages[3]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(results[0]?.messages[4]?.ruleId).toBe('unicorn/no-lonely-if');
    expect(results[0]?.messages[5]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(results[0]?.messages[6]?.ruleId).toBe('unicorn/no-lonely-if');
    expect(results[0]?.messages[7]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(results[0]?.messages[8]?.ruleId).toBe('unicorn/no-lonely-if');
    expect(results[0]?.messages[9]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(results[0]?.messages[10]?.ruleId).toBe('unicorn/numeric-separators-style');
    expect(results[0]?.messages[11]?.ruleId).toBe('unicorn/no-lonely-if');
    expect(results[0]?.messages[12]?.ruleId).toBe('sonarjs/nested-control-flow');
    expect(results[0]?.messages[13]?.ruleId).toBe('unicorn/numeric-separators-style');
    expect(results[0]?.messages[14]?.ruleId).toBe('perfectionist/sort-modules');
    expect(results[0]?.messages[15]?.ruleId).toBe('func-style');
    expect(results[0]?.messages[16]?.ruleId).toBe('sonarjs/no-collapsible-if');
    expect(results[0]?.messages[17]?.ruleId).toBe('unicorn/no-lonely-if');
  });

  it('should verify Solid configuration rules', async () => {
    const solidEslint = new ESLint({
      overrideConfig: [solid]
    });
    const results = await solidEslint.lintFiles(['src/test/cases/solid.tsx']);

    expect(results[0]?.errorCount).toBe(9);

    expect(results[0]?.messages[0]?.ruleId).toBe('react/prefer-read-only-props');
    expect(results[0]?.messages[1]?.ruleId).toBe('solid/no-destructure');
    expect(results[0]?.messages[2]?.ruleId).toBe('arrow-body-style');
    expect(results[0]?.messages[3]?.ruleId).toBe('solid/no-react-specific-props');
    expect(results[0]?.messages[4]?.ruleId).toBe('@stylistic/jsx-quotes');
    expect(results[0]?.messages[5]?.ruleId).toBe('react/button-has-type');
    expect(results[0]?.messages[6]?.ruleId).toBe('@typescript-eslint/no-unsafe-assignment');
    expect(results[0]?.messages[7]?.ruleId).toBe('@stylistic/jsx-one-expression-per-line');
    expect(results[0]?.messages[8]?.ruleId).toBe('@stylistic/eol-last');
  });

  it('should verify Stylistic configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/stylistic.ts']);

    expect(results[0]?.errorCount).toBe(10);

    expect(results[0]?.messages[0]?.ruleId).toBe('perfectionist/sort-maps');
    expect(results[0]?.messages[1]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(results[0]?.messages[2]?.ruleId).toBe('perfectionist/sort-union-types');
    expect(results[0]?.messages[3]?.ruleId).toBe('perfectionist/sort-objects');
    expect(results[0]?.messages[4]?.ruleId).toBe('@stylistic/comma-dangle');
    expect(results[0]?.messages[5]?.ruleId).toBe('@stylistic/array-bracket-newline');
    expect(results[0]?.messages[6]?.ruleId).toBe('@stylistic/array-element-newline');
    expect(results[0]?.messages[7]?.ruleId).toBe('@stylistic/exp-list-style');
    expect(results[0]?.messages[8]?.ruleId).toBe('@stylistic/exp-list-style');
    expect(results[0]?.messages[9]?.ruleId).toBe('@stylistic/semi');
  });

  it('should verify TypeScript configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/typescript.ts']);

    expect(results[0]?.errorCount).toBe(3);

    expect(results[0]?.messages[0]?.ruleId).toBe('@typescript-eslint/no-unused-expressions');
    expect(results[0]?.messages[1]?.ruleId).toBe('@typescript-eslint/dot-notation');
    expect(results[0]?.messages[2]?.ruleId).toBe('@typescript-eslint/only-throw-error');
  });

  it('should verify Vitest configuration rules', async () => {
    const results = await eslint.lintFiles(['src/test/cases/vitest.ts']);

    expect(results[0]?.errorCount).toBe(13);

    expect(results[0]?.messages[0]?.ruleId).toBe('vitest/no-import-node-test');
    expect(results[0]?.messages[1]?.ruleId).toBe('@stylistic/object-curly-newline');
    expect(results[0]?.messages[2]?.ruleId).toBe('@stylistic/object-curly-newline');
    expect(results[0]?.messages[3]?.ruleId).toBe('vitest/prefer-importing-vitest-globals');
    expect(results[0]?.messages[4]?.ruleId).toBe('vitest/prefer-spy-on');
    expect(results[0]?.messages[5]?.ruleId).toBe('vitest/require-mock-type-parameters');
    expect(results[0]?.messages[6]?.ruleId).toBe('vitest/padding-around-all');
    expect(results[0]?.messages[7]?.ruleId).toBe('vitest/padding-around-before-all-blocks');
    expect(results[0]?.messages[8]?.ruleId).toBe('vitest/padding-around-test-blocks');
    expect(results[0]?.messages[9]?.ruleId).toBe('vitest/prefer-importing-vitest-globals');
    expect(results[0]?.messages[10]?.ruleId).toBe('vitest/no-standalone-expect');
    expect(results[0]?.messages[11]?.ruleId).toBe('@typescript-eslint/no-unnecessary-condition');
    expect(results[0]?.messages[12]?.ruleId).toBe('vitest/prefer-strict-boolean-matchers');
  });
});
