import { NextResponse } from 'next/server';
import { generateFAQs, topFAQs, faqPage } from '@/lib/faker-tours';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get('limit') ?? 10);
  const skip = Number(url.searchParams.get('skip') ?? 0);

  // Example dev behaviour: generate deterministic set per tour
  const all = generateFAQs(id, 37, { seed: 123 });
  const { total, faqs } = faqPage(all, skip, limit);

  return NextResponse.json({ total, faqs });
}
