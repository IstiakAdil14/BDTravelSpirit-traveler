'use client';
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, ThumbsUp, Calendar, User, ChevronDown } from 'lucide-react';
import { Review } from '@/types/tour';
import useDateFormat from '@/hooks/useDateFormat';

type Props = { initialReviews?: Review[]; total?: number; tourId: string };

// Mock data for demo
const mockReviews: Review[] = [
  {
    id: '1',
    body: 'Absolutely fantastic tour! Our guide was knowledgeable and entertaining. The scenery was breathtaking and the whole experience exceeded our expectations. Highly recommend to anyone visiting!',
    rating: 5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 'u1', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' }
  },
  {
    id: '2',
    body: 'Great experience overall. The tour was well-organized and informative. Only minor issue was the timing felt a bit rushed at some locations.',
    rating: 4,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 'u2', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=2' }
  },
  {
    id: '3',
    body: 'Wonderful tour with stunning views! The small group size made it feel personal and intimate. Our guide shared amazing stories about the local culture.',
    rating: 5,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 'u3', name: 'Emma Williams', avatar: 'https://i.pravatar.cc/150?img=3' }
  }
];

export default function ReviewsList({ initialReviews = mockReviews, total = 127, tourId }: Props) {
  const sanitizedInitial = useMemo(() => {
    if (!Array.isArray(initialReviews)) return [];
    return initialReviews.map((r, i) => ({
      ...r,
      id: r?.id ?? `review-fallback-${i}`,
      body: r?.body ?? '',
      rating: typeof r?.rating === 'number' ? r.rating : 0,
      createdAt: r?.createdAt ?? new Date().toISOString(),
      author: {
        id: r?.author?.id ?? `anon-${i}`,
        name: typeof r?.author?.name === 'string' && r.author.name.trim() ? r.author.name : 'Anonymous',
        avatar: typeof r?.author?.avatar === 'string' && r.author.avatar.trim() ? r.author.avatar : '/avatar-placeholder.png',
      },
    })) as Review[];
  }, [initialReviews]);

  const [reviews, setReviews] = useState<Review[]>(
    sanitizedInitial.slice(0, 5).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(total > 5);
  const format = useDateFormat();

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach(r => {
      const rating = Math.max(0, Math.min(5, Math.round(r.rating)));
      if (rating > 0) dist[rating - 1]++;
    });
    return dist.reverse();
  }, [reviews]);

  async function loadMore() {
    setLoading(true);
    try {
      const res = await fetch(`/api/tours/${decodeURIComponent(tourId)}/reviews?page=${page}&limit=3`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load');
      const json = await res.json();
      const fetched = Array.isArray(json.reviews) ? json.reviews : [];
      const sanitized = fetched.map((r: any, i: number) => ({
        ...r,
        id: r?.id ?? `review-fetched-${(page - 1) * 3 + i}`,
        body: r?.body ?? r?.comment ?? r?.text ?? r?.content ?? '',
        rating: typeof r?.rating === 'number' ? r.rating : 0,
        createdAt: r?.createdAt ?? r?.created_at ?? new Date().toISOString(),
        author: {
          id: r?.author?.id ?? r?.user?.id ?? `anon-f-${(page - 1) * 3 + i}`,
          name: r?.author?.name ?? r?.user?.name ?? 'Anonymous',
          avatar: r?.author?.avatar ?? r?.user?.avatar ?? '/avatar-placeholder.png',
        },
      })) as Review[];
      setReviews((s) => [...s, ...sanitized].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setPage((p) => p + 1);
      if (sanitized.length < 3) {
        setHasMore(false);
      }
    } catch {
      // Error handling
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-md">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Guest Reviews</h3>
              <p className="text-sm text-slate-500 mt-0.5">{total} verified reviews</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-900">{avgRating.toFixed(1)}</span>
              <span className="text-lg text-slate-400">/5</span>
            </div>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(avgRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2 mt-4">
          {ratingDistribution.map((count, idx) => {
            const starNum = 5 - idx;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={starNum} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-slate-600">{starNum}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  />
                </div>
                <span className="text-sm text-slate-500 w-12 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="p-6">
        <AnimatePresence mode="popLayout">
          {reviews.map((r, idx) => {
            const authorName = r?.author?.name ?? 'Anonymous';
            const authorAvatar = r?.author?.avatar ?? '/avatar-placeholder.png';
            const rating = Math.max(0, Math.min(5, Math.round(r?.rating ?? 0)));
            const reviewText = (r?.body ?? '').toString().trim();

            return (
              <motion.div
                key={r?.id ?? `rev-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="mb-4 last:mb-0"
              >
                <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-300">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0"
                    >
                      <div className="relative">
                        <img
                          src={authorAvatar}
                          alt={authorName}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/avatar-placeholder.png';
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 text-base">{authorName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${star <= rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                              {rating}.0
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{format(r?.createdAt)}</span>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-700 text-sm leading-relaxed mb-3">
                        {reviewText || 'No review text available'}
                      </p>

                      {/* Footer Actions */}
                      <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors text-xs font-medium"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful</span>
                        </motion.button>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-400">Verified booking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-32 mb-2" />
                    <div className="h-3 bg-slate-200 rounded w-24 mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        <div className="mt-6 text-center">
          {hasMore ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={loadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full animate-spin" />
                  <span>Loading reviews...</span>
                </>
              ) : (
                <>
                  <span>Load more reviews</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 font-medium rounded-xl"
            >
              <span>You've reached the end</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}