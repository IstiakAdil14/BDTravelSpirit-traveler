'use client';
import { Media } from '@/types/tour';
import React from 'react';

type Props = {
  title: string;
  heroImage: string;
  gallery: Media[];
  rating: number;
  priceFrom: number;
  location: { country: string; region?: string };
};

export default function TourHero({ title, heroImage, gallery, rating, priceFrom, location }: Props) {
  return (
    <header className="relative rounded-lg overflow-hidden shadow">
      <img
        src={heroImage}
        alt={`Tour image of ${title}`}
        className="w-full h-72 object-cover object-center"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
        <div className="text-white">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm">{location.region ?? location.country}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="bg-white/10 px-3 py-1 rounded">{`★ ${rating}`}</span>
            <span className="bg-white/10 px-3 py-1 rounded">{`From $${priceFrom}`}</span>
            <a className="ml-4 inline-block bg-emerald-500 text-white px-3 py-1 rounded" href="#book">
              View dates
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
