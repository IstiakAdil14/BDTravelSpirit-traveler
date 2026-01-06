'use client';
import React from 'react';
import Link from 'next/link';
import { TourSummary } from '@/types/tour';

type Props = { recommendations: TourSummary[] };

export default function Recommendations({ recommendations }: Props) {
  if (!recommendations || recommendations.length === 0) return null;
  return (
    <section className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Recommended</h3>
      <div className="flex gap-3 overflow-x-auto">
        {recommendations.map((r) => (
          <Link key={r.id} href={`/tours/${r.encodedId}`} className="min-w-[180px] block">
            <div className="rounded overflow-hidden shadow-sm">
              <img src={r.heroImage} alt={r.title} className="w-full h-28 object-cover" />
              <div className="p-2">
                <div className="font-medium text-sm">{r.title}</div>
                <div className="text-xs text-gray-600">{r.shortDescription}</div>
                <div className="mt-2 text-sm font-semibold">{`From $${r.priceFrom}`}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
