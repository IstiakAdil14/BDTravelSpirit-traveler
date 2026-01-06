// app/tours/[EncodedTourId]/page.tsx
import React from 'react';
import { headers } from 'next/headers';
import TourPageShell from './TourPageShell';
import HeadSeo from './HeadSeo';

import { serverFetch } from '@/lib/apiClient';
import { FAQ, Guide, Review, TourFull, TourSummary } from '@/types/tour';
import {
  FaqAccordion,
  GuideProfileList,
  HeroBanner,
  ItineraryAccordion,
  MediaCarousel,
  QuickFactsCard,
  RecentlyViewed,
  ReviewsList,
  StructuredDataRenderer,
} from '@/components/tours/[EncodedTourId]';
import RecommendationsCards from '@/components/tours/[EncodedTourId]/RecommendationsCards';

type ApiPayload = {
  tour: TourFull;
  recommendations: TourSummary[];
  topGuides: Guide[];
  reviews?: { reviews: Review[]; total: number };
  faqs?: { faqs: FAQ[]; total: number };
};

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { EncodedTourId: string } | Promise<{ EncodedTourId: string }>;
}) {
  const { EncodedTourId: encodedId } = await params;

  // Resolve base url: prefer NEXT_PUBLIC_BASE_URL for server-side fetch in production.
  // Fallback to building from headers for preview/local environments.
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  let base = envBase;
  if (!base) {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000';
    const proto = h.get('x-forwarded-proto') || 'http';
    base = `${proto}://${host}`;
  }

  const apiUrl = `${base}/api/tours/${encodedId}?include=reviews:10,faqs:10,recommendations,guides`;

  let data: ApiPayload;
  try {
    // serverFetch handles timeout and throws on non-2xx
    data = await serverFetch<ApiPayload>(apiUrl);
  } catch (err) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Tour not found</h1>
        <p className="text-sm text-slate-600">We could not load the requested tour right now. Please try again later.</p>
      </main>
    );
  }

  const { tour, recommendations = [], topGuides = [], reviews, faqs } = data;

  // ensure every review has an author object with id, name, avatar to satisfy the Review type
  const safeInitialReviews: Review[] = (reviews?.reviews ?? []).map((r, i) => ({
    // keep original fields where present
    ...r,
    id: r?.id ?? `review-fallback-${i}`,
    rating: typeof r?.rating === 'number' ? r.rating : 0,
    // safe body: prefer common fields, fallback to empty string
    body: r?.body ?? '',
    createdAt: r?.createdAt ?? new Date().toISOString(),
    author: {
      // prefer existing author id, otherwise synthesize one
      id: r?.author?.id ?? `anon-${i}`,
      name: typeof r?.author?.name === 'string' && r.author.name.trim() ? r.author.name : 'Anonymous',
      avatar:
        typeof r?.author?.avatar === 'string' && r.author.avatar.trim()
          ? r.author.avatar
          : '/avatar-placeholder.png',
    },
  }));

  // curated SSR fallback for RecentlyViewed (used only for first paint)
  const recentViewsFallback: TourSummary[] = recommendations.slice(0, 4);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30">
        <HeadSeo tour={tour} canonical={`${base}/tours/${tour.encodedId}`} faqs={faqs?.faqs} reviews={reviews?.reviews} />
        <StructuredDataRenderer
          tour={tour}
          faqs={faqs?.faqs}
          reviews={reviews?.reviews}
          canonical={`${base}/tours/${tour.encodedId}`}
        />

        <TourPageShell tour={tour} recommendations={recommendations} topGuides={topGuides}>
          <HeroBanner
            title={tour.title}
            subtitle={tour.short}
            heroImage={tour.heroImage}
            rating={tour.stats?.averageRating ?? undefined}
            priceFrom={tour.priceFrom}
            location={tour.location}
            gallery={tour.gallery}
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <QuickFactsCard tour={tour} />

              <MediaCarousel media={tour.gallery} />
              <RecentlyViewed initialTours={recentViewsFallback} />
              <RecommendationsCards recommendations={recommendations} />

              <ItineraryAccordion itinerary={tour.itinerary} />

              <section className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-3">About this trip</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tour.description }} />
              </section>

              <ReviewsList initialReviews={safeInitialReviews} total={reviews?.total ?? tour.stats.totalReviews} tourId={encodedId} />

              <FaqAccordion initialFaqs={faqs?.faqs ?? []} tourId={tour.id} />
            </div>
          </div>
        </TourPageShell>
      </div>
    </>
  );
}
