"use client"

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, MapPin, Award, Lock, RotateCcw, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  tour: any;
  recommendations: any[];
  topGuides: any[];
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
};

export default function TourPageShell({
  tour,
  recommendations,
  topGuides,
  breadcrumbs = [],
  children,
}: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header Background Accent */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Breadcrumb Navigation */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Home size={16} />
            <span>Home</span>
          </Link>

          <ChevronRight size={18} className="text-slate-300" />

          <Link
            href="/tours"
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            Tours
          </Link>

          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={b.label}>
              <ChevronRight size={18} className="text-slate-300" />
              <Link
                href={b.href || '#'}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                {b.label}
              </Link>
            </React.Fragment>
          ))}

          <ChevronRight size={18} className="text-slate-300" />
          <span className="text-slate-900 font-medium">{tour.title}</span>
        </motion.nav>

        {/* Main Content Grid */}
        <article
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
          aria-labelledby="tour-title"
        >
          {/* Primary Content */}
          <motion.section
            className="lg:col-span-8 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {children}
          </motion.section>

          {/* Sidebar */}
          <motion.aside
            className="lg:col-span-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="sticky top-20 space-y-5">
              {/* Premium Booking Panel */}
              <motion.div
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-blue-100 mb-1">Price from</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">${tour.priceFrom}</span>
                      <span className="text-sm text-blue-100">per person</span>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs text-blue-100 mb-1">Availability</p>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                      Available
                    </p>
                  </div>

                  <Link
                    href={`/book/${tour.encodedId}`}
                    className="w-full bg-white text-emerald-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center block"
                  >
                    Book Now
                  </Link>

                  <button className="w-full border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    Ask a Question
                  </button>
                </div>
              </motion.div>

              {/* Top Guides Section */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
                variants={itemVariants}
              >
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Award size={20} className="text-blue-600" />
                  Expert Guides
                </h3>
                <div className="space-y-3">
                  {topGuides.slice(0, 3).map((guide, idx) => (
                    <motion.div
                      key={guide.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {guide.name?.charAt(0) || 'G'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{guide.name}</p>
                        <p className="text-xs text-slate-500">{guide.tourCount || 50}+ tours</p>
                      </div>
                      {idx === 0 && (
                        <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-semibold">
                          Top
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trust & Benefits Section */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
                variants={itemVariants}
              >
                <h4 className="font-semibold text-slate-900 mb-4 text-sm">Why Book With Us</h4>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lock size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Secure Payments</p>
                      <p className="text-xs text-slate-600">Trusted by thousands</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <RotateCcw size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Flexible Cancellation</p>
                      <p className="text-xs text-slate-600">On select fares</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Vetted Guides</p>
                      <p className="text-xs text-slate-600">Verified for safety</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 text-center"
                variants={itemVariants}
              >
                <p className="text-xs text-slate-600 mb-2">Trusted by</p>
                <p className="text-lg font-bold text-slate-900">50,000+ Travelers</p>
                <p className="text-xs text-slate-600 mt-1">4.9 ⭐ Rating</p>
              </motion.div>
            </div>
          </motion.aside>
        </article>
      </main>
    </div>
  );
}