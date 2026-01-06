// src/lib/api/fetcher.ts
import { faker } from '@faker-js/faker';
export const api = {
  async GET(url: string) {
    if (process.env.NODE_ENV !== 'production' && url.startsWith('/api/tours/')) {
      // return small fake payload based on URL
      faker.seed(123);
      return { data: { /*...*/ } };
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  // POST similar...
};
