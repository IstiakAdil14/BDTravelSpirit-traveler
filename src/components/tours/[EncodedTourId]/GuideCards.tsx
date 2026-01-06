'use client';
import { Guide } from '@/types/tour';
import React, { useState } from 'react';

type Props = { topGuides: Guide[]; loadMoreDelta?: number; tourId?: string };

export default function GuideCards({ topGuides, loadMoreDelta = 5 }: Props) {
  const [count, setCount] = useState(Math.min(10, topGuides.length));
  const show = topGuides.slice(0, count);

  async function loadMore() {
    // fetch additional guides from API; for simplicity, we rely on topGuides prop or client fetch if needed
    setCount((c) => Math.min(c + loadMoreDelta, topGuides.length));
  }

  return (
    <section className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Top guides</h3>
      <ul className="space-y-3">
        {show.map((g) => (
          <li key={g.id} className="flex items-center gap-3">
            <img src={g.profileImage} alt={g.name} className="w-12 h-12 rounded-full" />
            <div>
              <div className="font-medium">{g.name}</div>
              <div className="text-sm text-gray-600">{`${g.rating} • ${g.experienceYears} yrs • ${g.languages.join(', ')}`}</div>
            </div>
          </li>
        ))}
      </ul>

      {count < topGuides.length && (
        <div className="mt-3 text-center">
          <button onClick={loadMore} className="px-3 py-1 bg-gray-200 rounded">
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
