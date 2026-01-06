'use client';
import { Media } from '@/types/tour';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ImageIcon } from 'lucide-react';

type Props = { media: Media[] };

export default function MediaCarousel({ media }: Props) {
  const [index, setIndex] = useState(0);
  if (!media || media.length === 0) return null;

  const goToPrevious = () => setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  const goToNext = () => setIndex((i) => (i === media.length - 1 ? 0 : i + 1));

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="w-full scrollbar-none">
      {/* Main Image Display */}
      <div className="relative group">
        <div className="h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-xl border border-slate-200 scrollbar-none">
          {media[index].type === 'image' ? (
            <img 
              src={media[index].url} 
              alt={media[index].alt ?? 'Tour media'} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 scrollbar-none" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 mb-4 group-hover:bg-white/20 transition-all duration-300">
                <Play className="w-12 h-12" />
              </div>
              <p className="text-lg font-medium">Video Content</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {media.length > 1 && (
          <>
            <button
              aria-label="Previous"
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>

            <button
              aria-label="Next"
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          {index + 1} / {media.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-10 relative scrollbar-none">
        <div className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-none mt-10">
          {media.map((m, i) => (
            <button
              key={m.url}
              onClick={() => setIndex(i)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                i === index 
                  ? 'ring-4 ring-indigo-500 shadow-lg scale-105' 
                  : 'ring-2 ring-slate-200 hover:ring-indigo-300 hover:shadow-md opacity-70 hover:opacity-100 scrollbar-none '
              }`}
            >
              <img 
                src={m.url} 
                alt={m.alt ?? ''} 
                className="w-full h-full object-cover scrollbar-none " 
              />
              
              {/* Video Indicator */}
              {m.type === 'video' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
              )}
              
              {/* Active Indicator */}
              {i === index && (
                <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
        
        {/* Gradient Fade Edges */}
        <div className="absolute top-0 left-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}