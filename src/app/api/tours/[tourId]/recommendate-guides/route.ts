import { NextRequest, NextResponse } from 'next/server';
import { generateGuides } from '@/utils/faker-tours';
import { serializeDates } from '@/lib/serializers';
import type { Guide } from '@/types/tour';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = parseInt(searchParams.get('skip') || '0');

  // In production, fetch from database with pagination
  const guides: Guide[] = generateGuides(limit + skip).slice(skip, skip + limit);
  const total = 100; // Mock total

  return NextResponse.json(
    serializeDates({ guides, total }),
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache
      },
    }
  );
}
