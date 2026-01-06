'use client';
import { FAQ, Review } from '@/types/tour';
import React, { useState } from 'react';
import ReviewsList from './ReviewsList';
import FaqList from './FaqList';

type Props = {
  reviews: Review[]; // initial SSR page could pass first 10
  faqs: FAQ[];
  totalReviews: number;
  totalFaqs: number;
  tourId: string;
};

export default function TabsReviewsFaqs({ reviews, faqs, totalReviews, totalFaqs, tourId }: Props) {
  const [tab, setTab] = useState<'reviews' | 'faqs'>('reviews');

  return (
    <section className="bg-white p-4 rounded shadow">
      <div role="tablist" aria-label="Reviews and FAQs" className="flex gap-2">
        <button
          role="tab"
          aria-selected={tab === 'reviews'}
          onClick={() => setTab('reviews')}
          className={`px-3 py-1 rounded ${tab === 'reviews' ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}
        >
          Reviews ({totalReviews})
        </button>
        <button
          role="tab"
          aria-selected={tab === 'faqs'}
          onClick={() => setTab('faqs')}
          className={`px-3 py-1 rounded ${tab === 'faqs' ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}
        >
          FAQs ({totalFaqs})
        </button>
      </div>

      <div className="mt-4">
        {tab === 'reviews' ? (
          <ReviewsList initialReviews={reviews} tourId={tourId} />
        ) : (
          <FaqList initialFaqs={faqs} tourId={tourId} />
        )}
      </div>
    </section>
  );
}
