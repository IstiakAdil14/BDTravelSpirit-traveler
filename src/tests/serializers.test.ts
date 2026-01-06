import { describe, it, expect } from 'vitest';
import { serializeDates } from '@/lib/serializers';

describe('serializeDates', () => {
  it('converts Date objects to ISO strings in nested objects', () => {
    const input = {
      a: new Date('2020-01-01T00:00:00Z'),
      b: [{ c: new Date('2021-02-02T12:00:00Z') }]
    };
    const out = serializeDates(input as unknown);
    expect((out as any).a).toBe('2020-01-01T00:00:00.000Z');
    expect((out as any).b[0].c).toBe('2021-02-02T12:00:00.000Z');
  });
});
