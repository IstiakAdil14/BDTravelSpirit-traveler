// src/app/tours/[EncodedTourId]/components/RecentlyViewed.client.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecentViews, clearViews, type RecentItem } from '@/utils/recentViews';

export default function RecentlyViewed({ initialTours }: { initialTours?: RecentItem[] }) {
  const [views, setViews] = useState<RecentItem[]>(() => initialTours ?? []);

  useEffect(() => {
    // Sync from storage on mount
    const current = getRecentViews();
    if (current && current.length > 0) setViews(current);
    // react to cross-tab and local updates
    const handler = () => setViews(getRecentViews());
    window.addEventListener('recent-views-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('recent-views-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  if (!views || views.length === 0) return null;

  return (
    <section aria-labelledby="recent-title" className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-2">
        <h4 id="recent-title" className="font-semibold">Recent views</h4>
        <button
          onClick={() => { clearViews(); setViews([]); }}
          className="text-xs text-slate-500"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {views.slice(0, 8).map((v) => (
          <Link key={v.id} href={`/tours/${v.encodedId}`} className="block">
            <div className="rounded overflow-hidden border hover:shadow-sm transition">
              <img src={v.heroImage ?? '/placeholder.png'} alt={v.title} className="w-full h-20 object-cover" />
              <div className="p-2">
                <div className="font-medium text-sm">{v.title}</div>
                <div className="text-xs text-slate-500 mt-1">{`From $${v.priceFrom ?? ''}`}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
