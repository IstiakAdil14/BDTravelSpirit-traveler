"use client"

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Star, Clock, Users, ChevronLeft, ChevronRight, Bookmark, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const mockRecommendations = [
  {
    id: '1',
    encodedId: 'tour-1',
    title: 'Sunset Desert Safari Adventure',
    shortDescription: 'Experience the magic of the Arabian desert with camel rides and traditional entertainment',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    priceFrom: 149,
    rating: 4.8,
    reviews: 234,
    duration: '6 hours',
    groupSize: 'Up to 15'
  },
  {
    id: '2',
    encodedId: 'tour-2',
    title: 'Historic City Walking Tour',
    shortDescription: 'Discover ancient architecture and hidden gems with expert local guides',
    heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
    priceFrom: 89,
    rating: 4.9,
    reviews: 456,
    duration: '4 hours',
    groupSize: 'Up to 20'
  },
  {
    id: '3',
    encodedId: 'tour-3',
    title: 'Mountain Hiking Expedition',
    shortDescription: 'Trek through breathtaking landscapes and reach stunning viewpoints',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    priceFrom: 199,
    rating: 4.7,
    reviews: 189,
    duration: '8 hours',
    groupSize: 'Up to 12'
  },
  {
    id: '4',
    encodedId: 'tour-4',
    title: 'Culinary Food Market Tour',
    shortDescription: 'Taste authentic local cuisine and explore vibrant food markets',
    heroImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    priceFrom: 120,
    rating: 5.0,
    reviews: 312,
    duration: '3 hours',
    groupSize: 'Up to 10'
  },
  {
    id: '5',
    encodedId: 'tour-5',
    title: 'Coastal Boat Cruise',
    shortDescription: 'Sail along pristine coastlines and discover hidden coves',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    priceFrom: 175,
    rating: 4.9,
    reviews: 278,
    duration: '5 hours',
    groupSize: 'Up to 25'
  },
  {
    id: '6',
    encodedId: 'tour-6',
    title: 'Wildlife Safari Experience',
    shortDescription: 'Get up close with exotic animals in their natural habitat',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    priceFrom: 225,
    rating: 4.8,
    reviews: 167,
    duration: '7 hours',
    groupSize: 'Up to 8'
  },
  {
    id: '7',
    encodedId: 'tour-7',
    title: 'Night Sky Stargazing',
    shortDescription: 'Explore the cosmos with professional telescopes and expert astronomers',
    heroImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    priceFrom: 95,
    rating: 4.9,
    reviews: 201,
    duration: '3 hours',
    groupSize: 'Up to 15'
  },
  {
    id: '8',
    encodedId: 'tour-8',
    title: 'Urban Photography Walk',
    shortDescription: 'Capture stunning cityscapes and street photography moments',
    heroImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    priceFrom: 79,
    rating: 4.7,
    reviews: 143,
    duration: '2.5 hours',
    groupSize: 'Up to 12'
  }
];

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

const TourCard = ({ tour, index }: { tour: any; index: number }) => {
  const [isSaved, setIsSaved] = React.useState(false);

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
      {/* Image Container - Compact & Professional */}
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

          {/* Bookmark Button */}
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
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

        {/* Popular Badge - Bottom Left */}
        {tour.reviews > 200 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Popular
          </motion.div>
        )}
      </div>

      {/* Content - Compact & Professional */}
      <div className="p-4">
        {/* Title */}
        <h5 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors duration-300">
          {tour.title}
        </h5>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
          {tour.shortDescription}
        </p>

        {/* Tour Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 rounded-lg">
            <div className="p-1 bg-blue-100 rounded">
              <Clock className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-medium">Duration</span>
              <span className="text-xs font-semibold text-slate-800">{tour.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 rounded-lg">
            <div className="p-1 bg-emerald-100 rounded">
              <Users className="w-3 h-3 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-medium">Group</span>
              <span className="text-xs font-semibold text-slate-800">{tour.groupSize}</span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-500 mb-0.5">From</p>
            <div className="flex items-baseline gap-1">
              <p className="text-xl font-bold text-orange-600">
                ${tour.priceFrom}
              </p>
              <span className="text-xs text-slate-500 font-medium">/person</span>
            </div>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-1.5 text-orange-600 font-semibold text-sm"
          >
            <span className="hidden sm:inline">Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};

export default function RecommendationsCards({ recommendations = mockRecommendations }: { recommendations?: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  if (!recommendations || recommendations.length === 0) return null;

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
    <section className="bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30 p-8 lg:p-10 rounded-3xl shadow-sm border border-orange-100/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <motion.h4 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-900 mb-1"
          >
            You Might Also Like
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm"
          >
            Handpicked experiences based on your interests
          </motion.p>
        </div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold text-orange-600 border border-orange-200 hover:border-orange-300"
        >
          View All Tours
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Cards Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {recommendations.length > 3 && (
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

        {/* Scrollable Container - Compact Card Sizing */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {recommendations.map((tour, index) => (
            <div
              key={tour.id}
              className="w-[260px] sm:w-[280px] lg:w-[290px] flex-shrink-0"
            >
              <TourCard tour={tour} index={index} />
            </div>
          ))}
        </div>

        {/* Gradient Fade Overlays */}
        {recommendations.length > 3 && (
          <>
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-orange-50/80 via-orange-50/40 to-transparent pointer-events-none z-10" />
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-50/80 via-orange-50/40 to-transparent pointer-events-none z-10" />
          </>
        )}
      </div>

      {/* Mobile View All Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden w-full mt-8 flex items-center justify-center gap-2 px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-base font-semibold text-orange-600 border border-orange-200"
      >
        View All Recommendations
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}