"use client"

import React, { useEffect, useState } from 'react';
import { X, Clock, Eye, TrendingUp, ArrowRight, Bookmark, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Mock hook - replace with your actual implementation
const useRecentViews = () => ({
  getRecentViews: () => [],
  clear: () => {}
});

type TourSummary = {
  id: string;
  encodedId: string;
  title: string;
  heroImage?: string;
  priceFrom?: number;
  rating?: number;
  reviews?: number;
  duration?: string;
  groupSize?: string;
  shortDescription?: string;
};

type Props = { initialTours?: TourSummary[] };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const skeletonVariants = {
  pulse: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

const TourCard = ({ tour, index, isSaved, onSave }: { tour: TourSummary; index: number; isSaved: boolean; onSave: () => void }) => {
  return (
    <motion.a
      href={`/tours/${tour.encodedId}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex-shrink-0 h-full"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-44">
        <motion.img
          src={tour.heroImage ?? '/placeholder.png'}
          alt={tour.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Top Badges Row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          {/* Rating Badge */}
          {tour.rating && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full shadow-lg"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-slate-800">{tour.rating}</span>
              <span className="text-xs text-slate-500">({tour.reviews})</span>
            </motion.div>
          )}

          {/* Bookmark Button */}
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              onSave();
            }}
            className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isSaved 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/95 text-slate-600 hover:bg-orange-50'
            }`}
          >
            <Bookmark className={`w-4.5 h-4.5 ${isSaved ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Trending Badge - Bottom Left */}
        {index === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Recently Viewed
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h5 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors duration-300">
          {tour.title}
        </h5>

        {/* Description */}
        {tour.shortDescription && (
          <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
            {tour.shortDescription}
          </p>
        )}

        {/* Tour Info Grid */}
        {(tour.duration || tour.groupSize) && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {tour.duration && (
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 rounded-lg">
                <div className="p-1 bg-blue-100 rounded">
                  <Clock className="w-3 h-3 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-medium">Duration</span>
                  <span className="text-xs font-semibold text-slate-800">{tour.duration}</span>
                </div>
              </div>
            )}
            
            {tour.groupSize && (
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 rounded-lg">
                <div className="p-1 bg-emerald-100 rounded">
                  <Eye className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-medium">Group</span>
                  <span className="text-xs font-semibold text-slate-800">{tour.groupSize}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-500 mb-0.5">From</p>
            <div className="flex items-baseline gap-1">
              <p className="text-xl font-bold text-orange-600">
                ${tour.priceFrom ?? '—'}
              </p>
              <span className="text-xs text-slate-500 font-medium">/person</span>
            </div>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-1.5 text-orange-600 font-semibold text-sm"
          >
            <span className="hidden sm:inline">View</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};

const SkeletonCard = () => (
  <motion.div
    variants={skeletonVariants}
    animate="pulse"
    className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 flex-shrink-0"
  >
    <div className="h-44 bg-slate-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-full" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-8 bg-slate-100 rounded-lg" />
        <div className="h-8 bg-slate-100 rounded-lg" />
      </div>
      <div className="h-4 bg-slate-200 rounded w-1/2" />
    </div>
  </motion.div>
);

export default function RecentlyViewed({ initialTours }: Props) {
  const { getRecentViews, clear } = useRecentViews();
  const [views, setViews] = useState<TourSummary[]>(() => initialTours ?? []);
  const [isLoading, setIsLoading] = useState(true);
  const [savedTours, setSavedTours] = useState<Set<string>>(new Set());
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const current = getRecentViews();
      if (current && current.length) setViews(current);
    } catch {}
    
    setIsLoading(false);

    const handler = () => {
      try {
        setViews(getRecentViews());
      } catch {}
    };
    window.addEventListener('recent-views-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('recent-views-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[260px] sm:w-[280px] lg:w-[290px] flex-shrink-0">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!views || views.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      className="bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100/50"
      aria-labelledby="recent-title"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <motion.h4 
            id="recent-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
              <Clock className="w-5 h-5 text-white" />
            </div>
            Recently Viewed
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            {views.length} tour{views.length !== 1 ? 's' : ''} in your history
          </motion.p>
        </div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            clear();
            setViews([]);
          }}
          className="group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white rounded-full shadow-md hover:shadow-lg hover:text-slate-800 transition-all duration-300 border border-slate-200 hover:border-slate-300"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          Clear All
        </motion.button>
      </div>

      {/* Cards Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {views.length > 3 && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 bg-white rounded-full shadow-xl items-center justify-center text-slate-700 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white transition-all duration-300 border-2 border-slate-100 hover:border-orange-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-14 h-14 bg-white rounded-full shadow-xl items-center justify-center text-slate-700 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white transition-all duration-300 border-2 border-slate-100 hover:border-orange-500"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {views.slice(0, 12).map((tour, index) => (
            <div
              key={tour.id}
              className="w-[260px] sm:w-[280px] lg:w-[290px] flex-shrink-0"
            >
              <TourCard 
                tour={tour} 
                index={index}
                isSaved={savedTours.has(tour.id)}
                onSave={() => {
                  setSavedTours(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(tour.id)) {
                      newSet.delete(tour.id);
                    } else {
                      newSet.add(tour.id);
                    }
                    return newSet;
                  });
                }}
              />
            </div>
          ))}
        </div>

        {/* Gradient Fade Overlays */}
        {views.length > 3 && (
          <>
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/80 via-slate-50/40 to-transparent pointer-events-none z-10" />
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/80 via-slate-50/40 to-transparent pointer-events-none z-10" />
          </>
        )}
      </div>

      {/* View More Link */}
      {views.length > 12 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-orange-600 bg-white rounded-full hover:shadow-lg transition-all duration-300 border border-orange-200 hover:border-orange-300">
            View {views.length - 12} more tour{views.length - 12 !== 1 ? 's' : ''}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}