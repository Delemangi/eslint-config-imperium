import type { Linter } from 'eslint';

import perfectionistPlugin from 'eslint-plugin-perfectionist';

// @ts-expect-error Missing types
const perfectionist: Linter.Config = perfectionistPlugin.configs?.['recommended-natural'];

export default perfectionist;
