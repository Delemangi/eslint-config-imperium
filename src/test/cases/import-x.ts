const x = 1;

import { existsSync } from 'node:fs';
import { existsSync as existsSyncDuplicate } from 'node:fs';
import {} from 'node:path';
export let mutableExport = 'bad';

existsSync('/tmp');
existsSyncDuplicate('/tmp');
void x;
void mutableExport;
