// app/api/tours/[tourId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  generateTour,
  generateTours,
  generateGuides,
  generateFAQs,
  generateReviews,
  
} from '@/utils/faker-tours';
import { serializeDates } from '@/lib/serializers';
import type { TourFull, TourSummary, Guide } from '@/types/tour';

/**
 * Single API route that returns a tour plus optional related collections.
 * Supports query `include=reviews:10,faqs:10,recommendations,guides`
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { tourId: string } | Promise<{ tourId: string }> }
) {
  const { tourId } = await params;

  // Decode base64url-ish encoded id if provided
  let decodedTourId = tourId;
  try {
    if (/^[A-Za-z0-9_-]+$/.test(tourId) && tourId.includes('-') === false) {
      decodedTourId = Buffer.from(tourId, 'base64url').toString();
    }
  } catch {
    decodedTourId = tourId;
  }

  // parse include query
  const url = new URL(request.url);
  const includeRaw = url.searchParams.get('include') ?? '';
  const includes = includeRaw.split(',').map((s) => s.trim()).filter(Boolean);

  // deterministic seed for dev: call faker.seed inside your utils if available
  const seed = 12345;
  // If your utils expose an ensureSeed function, call it here. If not, they may internally seed.

  // Generate base collections (single-arg calls to match your utils' signatures)
  const tour: TourFull = generateTour(decodedTourId);
  const recommendations: TourSummary[] = generateTours(6);
  const topGuides: Guide[] = generateGuides(10);
  const recentViews: TourSummary[] = generateTours(8);

  const payload: any = {
    tour,
    recommendations,
    topGuides,
    recentViews,
  };

  function parseIncludeToken(token: string) {
    const [key, num] = token.split(':').map((t) => t.trim());
    const limit = num ? Math.max(0, Math.min(200, Number(num))) : undefined;
    return { key, limit };
  }

  for (const inc of includes) {
    const { key, limit } = parseIncludeToken(inc);

    if (key === 'faqs') {
      const count = limit ?? 10;
      const all = generateFAQs(decodedTourId, 200);
      payload.faqs = { faqs: all.slice(0, count), total: all.length };
    }

    if (key === 'reviews') {
      const count = limit ?? 10;
      const all = generateReviews(decodedTourId, 200);
      payload.reviews = { reviews: all.slice(0, count), total: all.length };
    }

    if (key === 'recommendations') {
      payload.recommendations = recommendations;
    }

    if (key === 'guides') {
      payload.topGuides = topGuides;
    }
  }

  return NextResponse.json(serializeDates(payload), {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
