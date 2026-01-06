"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Shield, Share2, Bookmark, ChevronDown, Clock, CheckCircle2, Sparkles } from 'lucide-react';

type Props = {
  priceFrom: number;
  currency?: string;
  nextDeparture?: string;
  availabilityStatus?: string;
  bookUrl: string;
  onBook?: () => void;
};

export default function StickyBookingPanel({
  priceFrom,
  currency = 'USD',
  nextDeparture,
  availabilityStatus = 'Available',
  bookUrl,
  onBook
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleBook() {
    if (onBook) onBook();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50/40 to-transparent rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-50/30 to-transparent rounded-full blur-2xl -z-0" />

      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-6">
          {/* Price Section */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-baseline gap-2 mb-1"
            >
              <span className="text-sm font-medium text-slate-500">From</span>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-baseline gap-1"
              >
                <span className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(priceFrom)}
                </span>
                <span className="text-lg font-medium text-slate-500">
                  {currency}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mt-2"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">{availabilityStatus}</span>
              </div>
              {nextDeparture && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">
                    {formatDate(nextDeparture)}
                  </span>
                </div>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-slate-500 mt-2 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              per person
            </motion.p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-2.5 min-w-[140px]">
            <motion.a
              id="book"
              href={bookUrl}
              onClick={handleBook}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold text-sm text-center shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '0%' : '-100%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Now
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>

            <motion.button
              onClick={() => setCollapsed(!collapsed)}
              aria-expanded={!collapsed}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
            >
              <span>{collapsed ? 'Show Details' : 'Hide Details'}</span>
              <motion.div
                animate={{ rotate: collapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Expandable Details Section */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-slate-200"
              >
                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-3 mb-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm"
                  >
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Free Cancellation</h4>
                      <p className="text-xs text-slate-600">Cancel up to 14 days before departure</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Instant Confirmation</h4>
                      <p className="text-xs text-slate-600">Receive your booking details immediately</p>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3"
                >
                  <motion.button
                    onClick={() => setIsSaved(!isSaved)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isSaved
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    <motion.div
                      animate={{
                        scale: isSaved ? [1, 1.3, 1] : 1,
                        rotate: isSaved ? [0, -10, 10, 0] : 0
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </motion.div>
                    {isSaved ? 'Saved' : 'Save Tour'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all duration-200"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}