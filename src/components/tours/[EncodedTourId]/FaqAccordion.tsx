"use client"
import React, { useMemo, useState, useEffect } from 'react';
import { ChevronDown, MessageCircleQuestion, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  initialFaqs?: FAQ[];
  total?: number;
  tourId: string;
};

// Skeleton loader component
const FaqSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl p-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
      </div>
    ))}
  </div>
);

// Individual FAQ Item Component
const FaqItem = ({ faq, index }: { faq: FAQ; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300"
          type="button"
          aria-expanded={isOpen}
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1 p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm">
              <MessageCircleQuestion className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 leading-relaxed pr-4">
              {faq.question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 pt-2">
                <div className="pl-11 pr-2">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                    {faq.answer || (
                      <span className="text-gray-400 italic">No answer available</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function FaqAccordion({ initialFaqs = [], total, tourId }: Props) {
  const initialCount = 10;
  const pageSize = 5;

  useEffect(() => {
    console.log('FaqAccordion props', { 
      initialFaqsLength: initialFaqs?.length, 
      total, 
      tourId, 
      sample: initialFaqs?.[0] 
    });
  }, [initialFaqs, total, tourId]);

  const sanitizedInitial = useMemo(() => {
    if (!Array.isArray(initialFaqs)) return [];
    return initialFaqs.slice(0, initialCount).map((f, i) => ({
      id: f?.id ?? `faq-init-${i}`,
      question: String(
        (f as any)?.question ??
        (f as any)?.attributes?.question ??
        (f as any)?.data?.attributes?.question ??
        ''
      ).trim() || `Question ${i + 1}`,
      answer: String(
        (f as any)?.answer ??
        (f as any)?.attributes?.answer ??
        (f as any)?.data?.attributes?.answer ??
        ''
      ),
    })) as FAQ[];
  }, [initialFaqs]);

  const [faqs, setFaqs] = useState<FAQ[]>(sanitizedInitial);
  const [skip, setSkip] = useState<number>(sanitizedInitial.length);
  const [loading, setLoading] = useState(false);
  const [fetchedAll, setFetchedAll] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    setFaqs(sanitizedInitial);
    setSkip(sanitizedInitial.length);
    setFetchedAll(false);
    // Simulate initial load
    const timer = setTimeout(() => setInitialLoading(false), 500);
    return () => clearTimeout(timer);
  }, [sanitizedInitial]);

  async function loadMore() {
    if (loading || fetchedAll) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tours/${tourId}/faqs?limit=${pageSize}&skip=${skip}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to load FAQs');
      const json = await res.json();
      const fetched: any[] = Array.isArray(json.faqs) ? json.faqs : [];

      if (fetched.length === 0) {
        setFetchedAll(true);
        return;
      }

      const sanitized = fetched.map((f: any, i: number) => ({
        id: f?.id ?? `faq-${skip + i}`,
        question:
          String(
            f?.question ?? f?.attributes?.question ?? f?.data?.attributes?.question ?? ''
          ).trim() || `Question ${skip + i + 1}`,
        answer: String(f?.answer ?? f?.attributes?.answer ?? f?.data?.attributes?.answer ?? ''),
      })) as FAQ[];

      setFaqs((s) => [...s, ...sanitized].slice(-10));
      setSkip((s) => s + sanitized.length);

      if (typeof total === 'number' && skip + sanitized.length >= total) {
        setFetchedAll(true);
      }
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  }

  const hasMore = !fetchedAll && (typeof total === 'number' ? skip < total : true);

  return (
    <section 
      className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl shadow-lg overflow-hidden"
      aria-labelledby="faqs-heading"
    >
      {/* Header */}
      <div className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 id="faqs-heading" className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h3>
            {typeof total === 'number' && total > 0 && (
              <p className="text-blue-100 text-sm mt-1">
                {total} questions answered for you
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {initialLoading ? (
          <FaqSkeleton />
        ) : faqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
              <MessageCircleQuestion className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No FAQs available at the moment</p>
            {typeof total === 'number' && total > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {total} questions exist on the server
              </p>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FaqItem key={faq.id} faq={faq} index={index} />
            ))}
          </div>
        )}

        {/* Load More Section */}
        {faqs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            {hasMore ? (
              <button
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                type="button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load {pageSize} More Questions</span>
                    <ChevronDown className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-medium rounded-xl border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All questions loaded</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}