// app/tours/[EncodedTourId]/components/LightboxModal.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Media } from '@/types/tour';
import { trackEvent } from '@/lib/analyticsHooks';

type Props = { media: Media[]; startIndex: number; onClose: () => void };

export default function LightboxModal({ media, startIndex, onClose }: Props) {
  const [index, setIndex] = React.useState(startIndex);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setIndex((i) => (i === media.length - 1 ? 0 : i + 1));
    }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    trackEvent('lightbox_open', { index: startIndex });
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      trackEvent('lightbox_close', { index });
    };
  }, [media.length, onClose, startIndex, index]);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl h-[70vh] bg-black rounded">
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute right-3 top-3 bg-white/10 text-white rounded px-2 py-1">✕</button>

        <div className="w-full h-full flex items-center justify-center">
          {media[index].type === 'image' ? (
            <Image src={media[index].url} alt={media[index].alt ?? ''} width={1200} height={700} className="object-contain" />
          ) : (
            <video controls className="w-full h-full">
              <source src={media[index].url} />
            </video>
          )}
        </div>

        <button aria-label="Previous" onClick={() => setIndex((i) => (i === 0 ? media.length - 1 : i - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded">‹</button>
        <button aria-label="Next" onClick={() => setIndex((i) => (i === media.length - 1 ? 0 : i + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded">›</button>
      </div>
    </div>
  );
}
