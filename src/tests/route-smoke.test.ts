import { describe, it, expect } from 'vitest';
import { generateTour } from '@/utils/faker-tours';

describe('route smoke', () => {
  it('faker generator returns a TourFull with ISO dates', () => {
    const t = generateTour('test-1');
    expect(typeof t.id).toBe('string');
    expect(typeof t.createdAt).toBe('string');
    expect(new Date(t.createdAt).toString()).not.toBe('Invalid Date');
  });
});