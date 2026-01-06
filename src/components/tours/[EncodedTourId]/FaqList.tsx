'use client';
import { FAQ } from '@/types/tour';
import React, { useState } from 'react';

type Props = { initialFaqs?: FAQ[]; tourId?: string };

export default function FaqList({ initialFaqs = [], tourId = '' }: Props) {
  const [displayedFaqs, setDisplayedFaqs] = useState<FAQ[]>(initialFaqs.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(10);

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tours/${tourId}/faqs?limit=5&skip=${skip}`);
      const data = await res.json();
      const newFaqs = data.faqs;
      setDisplayedFaqs(prev => [...prev, ...newFaqs].slice(-5));
      setSkip(prev => prev + 3);
    } catch (error) {
      console.error('Failed to load more FAQs', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      {displayedFaqs.map((f) => (
        <div key={f.id} className="border rounded">
          <button
            aria-expanded={!!f.liked}
            onClick={() =>
              setDisplayedFaqs((s) =>
                s.map((item) => (item.id === f.id ? { ...item, liked: !item.liked } : item))
              )
            }
            className="w-full text-left p-3 flex justify-between items-center"
          >
            <span className="font-medium">{f.question}</span>
            <span className="text-sm text-gray-600">{f.likes + (f.liked ? 1 : 0)}</span>
          </button>
          {f.liked && <div className="p-3 text-sm text-gray-700">{f.answer}</div>}
        </div>
      ))}
      <div className="mt-2 text-center">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load 3 more'}
        </button>
      </div>
    </div>
  );
}
