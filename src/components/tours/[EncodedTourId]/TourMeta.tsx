'use client';
import { TourFull } from '@/types/tour';
import React from 'react';

type Props = {
  durationDays: number;
  location: TourFull['location'];
  stats: TourFull['stats'];
  slug: string;
  priceFrom: number;
};

export default function TourMeta({ durationDays, location, stats, slug, priceFrom }: Props) {
  return (
    <section className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Quick facts</h2>
          <p className="text-sm text-gray-600">{location.country}{location.region ? ` • ${location.region}` : ''}</p>
        </div>
        <div className="text-right">
          <div className="font-semibold">{`From $${priceFrom}`}</div>
          <div className="text-sm text-gray-600">{`${durationDays} days • ${stats.totalReviews} reviews`}</div>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="font-medium">Participants</dt>
          <dd className="text-gray-600">{stats.participants}</dd>
        </div>
        <div>
          <dt className="font-medium">Avg rating</dt>
          <dd className="text-gray-600">{stats.averageRating}</dd>
        </div>
      </dl>
    </section>
  );
}
