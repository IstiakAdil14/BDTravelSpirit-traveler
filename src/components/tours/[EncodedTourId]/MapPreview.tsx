// app/tours/[EncodedTourId]/components/MapPreview.tsx
'use client';
import React, { useState } from 'react';

type Props = { coords?: { lat: number; lng: number }[] };

export default function MapPreview({ coords }: Props) {
  const [loaded, setLoaded] = useState(false);
  if (!coords || coords.length === 0) return null;

  return (
    <section className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-2">Map</h4>
      <div className="w-full h-64 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {!loaded ? (
          <button onClick={() => setLoaded(true)} className="px-4 py-2 bg-emerald-500 text-white rounded">Load map</button>
        ) : (
          <iframe title="Tour route" src={`https://www.google.com/maps?q=${coords[0].lat},${coords[0].lng}&z=8&output=embed`} className="w-full h-full border-0" />
        )}
      </div>
    </section>
  );
}
