import { TourFull } from '@/types/tour';
import React from 'react';

type Props = {
  params: { EncodedTourId: string };
  // We can't fetch here synchronously in head, so expect parent to render SEO components server-side.
  // For simplicity, we fetch minimal data for metadata.
};

export default async function Head({ params }: Props) {
  const encoded = params.EncodedTourId;
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/tours/${encoded}`;
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  const tour: TourFull = json.tour;

  const title = `${tour.title} — From ${tour.priceFrom}`;
  const description = tour.short || tour.shortDescription || tour.description.slice(0, 150);
  const image = tour.heroImage;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description,
    image,
    provider: { '@type': 'Organization', name: 'YourTravel' },
    offers: { '@type': 'Offer', price: String(tour.priceFrom), priceCurrency: 'USD' }
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/tours/${encoded}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
