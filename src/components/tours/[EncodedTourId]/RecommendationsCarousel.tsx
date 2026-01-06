// app/tours/[EncodedTourId]/components/RecommendationsCarousel.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { TourSummary } from '@/types/tour';
import { trackEvent } from '@/lib/analyticsHooks';

type Props = { recommendations: TourSummary[] };

export default function RecommendationsCarousel({ recommendations }: Props) {
  if (!recommendations || recommendations.length === 0) return null;
  return (
    <section className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-3">You might also like</h4>
      <div className="flex gap-3 overflow-x-auto">
        {recommendations.map((r) => (
          <Link key={r.id} href={`/tours/${r.encodedId}`} onClick={() => trackEvent('recommendation_click', { id: r.id })} className="min-w-[180px] block">
            <div className="rounded overflow-hidden shadow-sm">
              <img src={r.heroImage} alt={r.title} className="w-full h-28 object-cover" />
              <div className="p-2">
                <div className="font-medium text-sm">{r.title}</div>
                <div className="text-xs text-slate-600">{r.shortDescription}</div>
                <div className="mt-2 text-sm font-semibold">{`From $${r.priceFrom}`}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
