import { describe, it } from 'node:test';
import { beforeAll, expect, vi } from 'vitest';

describe('Test', () => {
  beforeAll(() => {
    Date.now = vi.fn();
  });
  it('should work', () => {
    expect(1 > 2).toBeFalsy();
  });
});
