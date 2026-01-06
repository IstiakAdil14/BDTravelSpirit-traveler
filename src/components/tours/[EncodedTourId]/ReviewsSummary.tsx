// app/tours/[EncodedTourId]/components/ReviewsSummary.tsx
import React from 'react';

type Props = { averageRating: number; totalReviews: number; buckets?: number[] };

export default function ReviewsSummary({ averageRating, totalReviews, buckets = [] }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow flex items-center gap-4">
      <div className="text-3xl font-bold text-emerald-600">{averageRating.toFixed(1)}</div>
      <div className="text-sm">
        <div className="font-medium">{averageRating.toFixed(1)} average</div>
        <div className="text-slate-600">{totalReviews} reviews</div>
      </div>
      <div className="ml-auto text-sm text-slate-500">Filtered by recent travellers</div>
    </div>
  );
}
