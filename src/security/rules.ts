import type { Linter } from 'eslint';

const securityRules = {
  'security/detect-bidi-characters': ['error'],
  'security/detect-buffer-noassert': ['off'],
  'security/detect-child-process': ['error'],
  'security/detect-disable-mustache-escape': ['off'],
  'security/detect-eval-with-expression': ['error'],
  'security/detect-new-buffer': ['off'],
  'security/detect-no-csrf-before-method-override': ['off'],
  'security/detect-non-literal-fs-filename': ['error'],
  'security/detect-non-literal-regexp': ['error'],
  'security/detect-non-literal-require': ['error'],
  'security/detect-object-injection': ['off'],
  'security/detect-possible-timing-attacks': ['off'],
  'security/detect-pseudoRandomBytes': ['off'],
  'security/detect-unsafe-regex': ['off']
} satisfies Linter.Config['rules'];

export default securityRules;
