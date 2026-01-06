// app/tours/[EncodedTourId]/components/StructuredDataRenderer.tsx
import { FAQ, Review, TourFull } from '@/types/tour';
import React from 'react';

type Props = { tour: TourFull; faqs?: FAQ[]; reviews?: Review[]; canonical?: string };

export default function StructuredDataRenderer({ tour, faqs = [], reviews = [], canonical }: Props) {
  const site = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const url = canonical ?? `${site}/tours/${tour.encodedId}`;

  const tourLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.short || tour.description.slice(0,160),
    image: tour.heroImage,
    url,
    offers: { '@type': 'Offer', price: tour.priceFrom, priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: tour.stats.averageRating, reviewCount: tour.stats.totalReviews }
  };

  const faqLd = faqs.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) } : null;

  const reviewLd = reviews.length ? { '@context': 'https://schema.org', '@type': 'Review', review: reviews.map(r => ({ '@type': 'Review', author: r.author.name, reviewBody: r.body, datePublished: r.createdAt, reviewRating: { '@type': 'Rating', ratingValue: r.rating } })) } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {reviewLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />}
    </>
  );
}
