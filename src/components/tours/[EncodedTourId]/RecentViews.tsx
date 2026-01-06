// app/tours/[EncodedTourId]/components/MediaCarousel.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Media } from '@/types/tour';
import LightboxModal from './LightboxModal';
import { trackEvent } from '@/lib/analyticsHooks';

type Props = { media: Media[]; lcpIndex?: number; startIndex?: number; showThumbnails?: boolean };

export default function MediaCarousel({ media, lcpIndex = 0, startIndex = 0, showThumbnails = true }: Props) {
  const [index, setIndex] = useState(Math.min(startIndex, Math.max(0, media.length - 1)));
  const [openLightbox, setOpenLightbox] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setIndex((i) => (i === media.length - 1 ? 0 : i + 1));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [media.length]);

  useEffect(() => { trackEvent('media_view', { index }); }, [index]);

  if (!media || media.length === 0) return null;

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="relative h-80 bg-gray-100">
        {media[index].type === 'image' ? (
          <Image src={media[index].url} alt={media[index].alt ?? 'media'} fill sizes="(min-width:1024px) 1000px, 800px" priority={index === lcpIndex} className="object-cover" />
        ) : (
          <video controls className="w-full h-full object-cover" preload={index === lcpIndex ? 'auto' : 'metadata'}>
            <source src={media[index].url} />
          </video>
        )}

        <button aria-label="Previous" onClick={() => setIndex((i) => (i === 0 ? media.length - 1 : i - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">‹</button>
        <button aria-label="Next" onClick={() => setIndex((i) => (i === media.length - 1 ? 0 : i + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">›</button>

        <button aria-label="Open gallery" onClick={() => setOpenLightbox(true)} className="absolute right-12 top-2 bg-white/80 px-2 py-1 rounded">Open</button>
      </div>

      {showThumbnails && (
        <div className="p-3 flex gap-2 overflow-x-auto">
          {media.map((m, i) => (
            <button key={m.url} onClick={() => setIndex(i)} aria-pressed={i === index} className={`w-24 h-16 rounded overflow-hidden ${i === index ? 'ring-2 ring-emerald-400' : ''}`}>
              <Image src={m.url} alt={m.alt ?? ''} width={160} height={96} className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {openLightbox && <LightboxModal media={media} startIndex={index} onClose={() => setOpenLightbox(false)} />}
    </div>
  );
}
