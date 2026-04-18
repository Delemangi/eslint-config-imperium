import { exec } from 'node:child_process';
import { readFile } from 'node:fs';

export function insecure(input: string) {
  require(input);
  exec(input);
  eval(input);
  readFile(input, () => {});
  new RegExp(input);
}
