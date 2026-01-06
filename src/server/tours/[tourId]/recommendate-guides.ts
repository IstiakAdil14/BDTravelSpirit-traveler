import type { NextRequest } from 'next/server';
import { generateGuides } from '@/utils/faker-tours';
import { serializeDates } from '@/lib/serializers';

const DEV = process.env.NODE_ENV !== 'production';

export async function GET(req: NextRequest, { params }: { params: { tourId: string } }) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get('limit') ?? '10'), 50);
  const skip = Math.max(Number(searchParams.get('skip') ?? '0'), 0);

  let guides = [];
  let total = 0;

  if (DEV) {
    total = 50;
    guides = generateGuides(total).slice(skip, skip + limit);
  } else {
    throw new Error('Production DB queries not implemented. Use faker in dev.');
  }

  // Cache top results at edge in production
  return new Response(JSON.stringify({ guides: serializeDates(guides), total }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': DEV ? 'no-store' : 'public, s-maxage=600, stale-while-revalidate=900' }
  });
}
