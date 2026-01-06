'use client';

import React from 'react';
import AllTourOperatorsUI from './AllTourOperatorsUI';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

// Static tour operators data
const TOUR_OPERATORS = [
  {
    id: 1,
    name: 'Bangladesh Tours Ltd.',
    logo: 'https://nijhoom.com/wp-content/uploads/2024/04/bangladesh-express-featured-800.jpg',
    rating: 4.8,
    reviews: 1250,
    specialties: ['Cultural Tours', 'Adventure', 'Heritage'],
    certified: true,
    experience: '15+ years'
  },
  {
    id: 2,
    name: 'Sundarbans Explorer',
    logo: '/images/tour-operators/sundarbans-explorer.png',
    rating: 4.9,
    reviews: 890,
    specialties: ['Wildlife', 'Eco-tourism', 'Nature'],
    certified: true,
    experience: '12+ years'
  },
  {
    id: 3,
    name: 'Hill Tracts Adventures',
    logo: '/images/tour-operators/hill-tracts.png',
    rating: 4.7,
    reviews: 675,
    specialties: ['Trekking', 'Cultural', 'Adventure'],
    certified: true,
    experience: '10+ years'
  },
  {
    id: 4,
    name: 'Dhaka Heritage Tours',
    logo: '/images/tour-operators/dhaka-heritage.png',
    rating: 4.6,
    reviews: 920,
    specialties: ['Heritage', 'City Tours', 'Photography'],
    certified: true,
    experience: '8+ years'
  },
  {
    id: 5,
    name: 'Cox\'s Bazar Beach Tours',
    logo: '/images/tour-operators/coxs-bazar.png',
    rating: 4.7,
    reviews: 1100,
    specialties: ['Beach', 'Adventure', 'Water Sports'],
    certified: true,
    experience: '11+ years'
  },
  {
    id: 6,
    name: 'Tea Garden Explorers',
    logo: '/images/tour-operators/tea-garden.png',
    rating: 4.5,
    reviews: 780,
    specialties: ['Nature', 'Cultural', 'Photography'],
    certified: true,
    experience: '9+ years'
  },
  {
    id: 7,
    name: 'Royal Bengal Safaris',
    logo: '/images/tour-operators/royal-bengal.png',
    rating: 4.8,
    reviews: 950,
    specialties: ['Wildlife', 'Photography', 'Adventure'],
    certified: true,
    experience: '13+ years'
  },
  {
    id: 8,
    name: 'Bangladesh River Cruises',
    logo: '/images/tour-operators/river-cruises.png',
    rating: 4.6,
    reviews: 680,
    specialties: ['River Tours', 'Luxury', 'Cultural'],
    certified: true,
    experience: '7+ years'
  },
  {
    id: 9,
    name: 'Tribal Culture Tours',
    logo: '/images/tour-operators/tribal-culture.png',
    rating: 4.4,
    reviews: 540,
    specialties: ['Cultural', 'Ethnic', 'Adventure'],
    certified: true,
    experience: '6+ years'
  },
  {
    id: 10,
    name: 'Chittagong Hill Tours',
    logo: '/images/tour-operators/tribal-culture.png',
    rating: 4.5,
    reviews: 620,
    specialties: ['Trekking', 'Cultural', 'Nature'],
    certified: true,
    experience: '8+ years'
  },
  {
    id: 11,
    name: 'Sylhet Valley Adventures',
    logo: '/images/tour-operators/tribal-culture.png',
    rating: 4.6,
    reviews: 710,
    specialties: ['Nature', 'Waterfalls', 'Tea Gardens'],
    certified: true,
    experience: '10+ years'
  },
  {
    id: 12,
    name: 'Kuakata Beach Escapes',
    logo: '/images/tour-operators/tribal-culture.png',
    rating: 4.3,
    reviews: 490,
    specialties: ['Beach', 'Relaxation', 'Sunset'],
    certified: true,
    experience: '5+ years'
  },
  {
    id: 13,
    name: 'Rangamati Lake Tours',
    logo: '/images/tour-operators/tribal-culture.png',
    rating: 4.7,
    reviews: 830,
    specialties: ['Lakes', 'Boating', 'Tribal'],
    certified: true,
    experience: '9+ years'
  }
];

export default function OperatorsPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40">
      {/* Hero Section */}
      <section className="relative pt-40 pb-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-cyan-600/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        {/* Breadcrumb */}
        <div className="flex items-start justify-start gap-2 text-lg text-gray-600 mb-6 px-4 relative z-10">
          <a href="/" className="hover:text-emerald-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Tour Operators</span>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >


            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Explore Our
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Trusted Tour Operators
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with certified and experienced tour operators across Bangladesh.
              Each operator is verified and rated by real travelers.
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-600">{TOUR_OPERATORS.length}</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">Operators</div>
                  <div className="text-xs text-gray-500">Verified</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">4.7</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">Avg Rating</div>
                  <div className="text-xs text-gray-500">Customer Score</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-600">10K+</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">Reviews</div>
                  <div className="text-xs text-gray-500">From Travelers</div>
                </div>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search operators by name or location..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Filter Button */}
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30">
                    <SlidersHorizontal className="w-5 h-5" />
                    <span className="hidden md:inline">Filters</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {['All Operators', 'Wildlife Tours', 'Cultural Tours', 'Beach Tours', 'Adventure Tours'].map((filter, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-lg font-medium text-sm cursor-pointer transition-all ${idx === 0
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tour Operators Grid Section */}
      <AllTourOperatorsUI operators={TOUR_OPERATORS} />

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-emerald-50 mb-8">
              Contact us and we'll help you find the perfect tour operator for your needs.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-xl">
              <MapPin className="w-5 h-5" />
              Get Personalized Recommendations
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}