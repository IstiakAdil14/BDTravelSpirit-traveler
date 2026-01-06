import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { tourId: string } }) {
  // Stub: UI reads this to determine whether to show report flow. No writes.
  const allowedToReport = true;
  return new Response(JSON.stringify({ allowedToReport }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}
