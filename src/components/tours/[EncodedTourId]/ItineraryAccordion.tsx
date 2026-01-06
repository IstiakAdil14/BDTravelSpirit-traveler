"use client"

import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Calendar, Clock, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryItem } from '@/types/tour';

interface ItineraryAccordionProps {
  itinerary?: ItineraryItem[];
  initiallyOpenDay?: number | null;
}

export default function ItineraryAccordion({ itinerary = [], initiallyOpenDay }: ItineraryAccordionProps) {
  const [openIndex, setOpenIndex] = useState(initiallyOpenDay ?? null);

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash.startsWith('#day-')) {
      const day = Number(hash.replace('#day-', ''));
      setOpenIndex(Number.isFinite(day) ? day : null);
    }
  }, []);

  const toggleAccordion = (day: number) => {
    setOpenIndex(openIndex === day ? null : day);
  };

  return (
    <section aria-labelledby="itinerary-heading" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 rounded-2xl shadow-lg">
      <div className="mb-8">
        <h2 id="itinerary-heading" className="text-3xl font-bold text-gray-900 mb-2">
          Your Journey Itinerary
        </h2>
        <p className="text-gray-600">Explore each day of your unforgettable adventure</p>
      </div>

      <div className="space-y-4">
        {itinerary.map((item, idx) => {
          const isOpen = openIndex === item.day;

          return (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${isOpen
                ? 'border-blue-500 shadow-xl bg-white'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}>
                <button
                  aria-expanded={isOpen}
                  aria-controls={`day-${item.day}`}
                  onClick={() => toggleAccordion(item.day)}
                  className="w-full p-6 flex justify-between items-start text-left transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 ${isOpen
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-110'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:text-blue-700'
                        }`}>
                        {item.day}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {item.location && (
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </span>
                          )}
                          {item.duration && (
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              {item.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {!isOpen && (
                      <p className="text-sm text-gray-600 line-clamp-2 ml-15">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ${isOpen ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                      }`}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`day-${item.day}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5">
                          <div className="flex items-start gap-3 mb-4">
                            <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <p className="text-gray-700 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {item.highlights && item.highlights.length > 0 && (
                            <div className="mt-5">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                Highlights
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.highlights.map((highlight, hIdx) => (
                                  <motion.div
                                    key={hIdx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: hIdx * 0.1 }}
                                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                                    <span className="text-sm text-gray-700">{highlight}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 p-5 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold text-blue-700">Pro Tip:</span> Click on any day to expand and view detailed information about activities, duration, and highlights.
        </p>
      </div>
    </section>
  );
}