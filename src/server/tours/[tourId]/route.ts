import type { NextRequest } from 'next/server';
import { generateTour, generateTours, generateGuides } from '@/lib/faker-tours';
import { serializeDates } from '@/lib/serializers';
import { decodeTourId } from '@/utils/encodeTourId';
import type { TourFull, TourSummary } from '@/types/tour';

const DEV = process.env.NODE_ENV !== 'production';

export async function GET(req: NextRequest, { params }: { params: { tourId: string } }) {
  const { tourId: encoded } = params;
  // decode ID, fallback to encoded if decode fails
  let id = encoded;
  try {
    id = decodeTourId(encoded);
  } catch {
    // keep encoded as raw id
  }

  let tour: TourFull;
  let recommendations: TourSummary[] = [];
  let topGuides = [];

  if (DEV) {
    tour = generateTour(id);
    recommendations = generateTours(6);
    topGuides = generateGuides(10);
  } else {
    // Replace with real DB queries; placeholder throws for now
    throw new Error('Production DB queries not implemented. Use faker in dev.');
  }

  // Serialize dates (tour already has ISO strings from faker, but keep consistent)
  const payload = {
    tour: serializeDates(tour),
    recommendations: serializeDates(recommendations),
    topGuides: serializeDates(topGuides),
    recentViews: [] // placeholder: recent views are client-side localStorage
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // recommendation: cache top-guides on edge for 5 minutes; page chooses fetch mode
      'Cache-Control': DEV ? 'no-store' : 'public, s-maxage=300, stale-while-revalidate=600'
    }
  });
}
