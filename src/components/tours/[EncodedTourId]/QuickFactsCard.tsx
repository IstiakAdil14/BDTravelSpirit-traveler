import React from 'react';
import { Calendar, Users, Star, MapPin, Sparkles } from 'lucide-react';
import { TourFull } from '@/types/tour';

type Props = { tour: Pick<TourFull, 'durationDays'|'stats'|'highlights'|'location'|'slug'> };

export default function QuickFactsCard({ tour }: Props) {
  const facts = [
    {
      icon: Calendar,
      label: 'Duration',
      value: `${tour.durationDays} days`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      label: 'Group size',
      value: `${tour.stats.participants} typical`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Star,
      label: 'Avg rating',
      value: `${tour.stats.averageRating} ★`,
      subValue: `${tour.stats.totalReviews} reviews`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: tour.location.region ?? tour.location.country,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    }
  ];

  return (
    <section 
      className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
      aria-labelledby="quickfacts-heading"
    >
      {/* Header */}
      <div className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-4">
        <h3 
          id="quickfacts-heading" 
          className="text-xl font-bold text-white flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Quick Facts
        </h3>
      </div>

      {/* Facts Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`${fact.bgColor} ${fact.color} rounded-lg p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                  <fact.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    {fact.label}
                  </dt>
                  <dd className="text-base font-semibold text-slate-900 truncate">
                    {fact.value}
                  </dd>
                  {fact.subValue && (
                    <dd className="text-xs text-slate-500 mt-0.5">
                      {fact.subValue}
                    </dd>
                  )}
                </div>
              </div>
              
              {/* Hover effect accent */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
          <h4 className="font-semibold text-base text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
            Tour Highlights
          </h4>
          <ul className="space-y-2.5">
            {tour.highlights.slice(0, 5).map((h, i) => (
              <li 
                key={i}
                className="flex items-start gap-3 text-sm text-slate-700 group"
              >
                <div className="mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:scale-150 transition-transform duration-300" />
                </div>
                <span className="leading-relaxed group-hover:text-slate-900 transition-colors duration-200">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
    </section>
  );
}