import type { NextRequest } from 'next/server';
import { generateFAQs } from '@/utils/faker-tours';
import { serializeDates } from '@/lib/serializers';

const DEV = process.env.NODE_ENV !== 'production';

export async function GET(req: NextRequest, { params }: { params: { tourId: string } }) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get('limit') ?? '10'), 50);
  const skip = Math.max(Number(searchParams.get('skip') ?? '0'), 0);

  let faqs = [];
  let total = 0;

  if (DEV) {
    total = 42;
    faqs = generateFAQs(params.tourId, total).slice(skip, skip + limit);
  } else {
    throw new Error('Production DB queries not implemented. Use faker in dev.');
  }

  return new Response(JSON.stringify({ faqs: serializeDates(faqs), total }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}
