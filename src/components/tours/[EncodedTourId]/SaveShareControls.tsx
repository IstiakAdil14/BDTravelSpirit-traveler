// app/tours/[EncodedTourId]/components/SaveShareControls.tsx
'use client';
import React, { useState } from 'react';

type Props = { tourId: string; encodedId: string; title?: string };

export default function SaveShareControls({ tourId, encodedId, title }: Props) {
  const [saved, setSaved] = useState(false);

  function toggleSave() {
    setSaved((s) => !s);
    try {
      const key = 'savedTours_v1';
      const raw = localStorage.getItem(key) || '[]';
      const arr = JSON.parse(raw) as string[];
      if (!saved) {
        localStorage.setItem(key, JSON.stringify([encodedId, ...arr.filter((a) => a !== encodedId)].slice(0,50)));
      } else {
        localStorage.setItem(key, JSON.stringify(arr.filter((a) => a !== encodedId)));
      }
    } catch {}
  }

  async function share() {
    const url = `${location.origin}/tours/${encodedId}`;
    if (navigator.share) {
      await navigator.share({ title: title ?? 'Tour', url });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard');
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={toggleSave} className={`px-3 py-1 rounded ${saved ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`} aria-pressed={saved}>
        {saved ? 'Saved' : 'Save'}
      </button>
      <button onClick={share} className="px-3 py-1 rounded bg-gray-100">Share</button>
    </div>
  );
}
