// app/tours/[EncodedTourId]/HeadSeo.tsx
import React from 'react';
import type { TourFull, FAQ, Review } from '@/types/tour';

type Props = { tour: TourFull; canonical?: string; faqs?: FAQ[]; reviews?: Review[] };

export default function HeadSeo({ tour, canonical, faqs = [], reviews = [] }: Props) {
  const title = `${tour.title} — From $${tour.priceFrom}`;
  const description = tour.short || (tour.description || '').replace(/<[^>]+>/g, '').slice(0, 160);
  const url = canonical ?? `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/tours/${tour.encodedId}`;
  const image = tour.heroImage;

  const tourLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description,
    image,
    url,
    offers: {
      '@type': 'Offer',
      price: tour.priceFrom,
      priceCurrency: 'USD',
      url,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.stats.averageRating,
      reviewCount: tour.stats.totalReviews
    }
  };

  const faqLd = faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
  } : null;

  const reviewLd = reviews.length ? {
    '@context': 'https://schema.org',
    '@type': 'Review',
    review: reviews.map((r) => ({ '@type': 'Review', author: r.author.name, reviewBody: r.body, datePublished: r.createdAt, reviewRating: { '@type': 'Rating', ratingValue: r.rating } }))
  } : null;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {reviewLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />}
    </>
  );
}
