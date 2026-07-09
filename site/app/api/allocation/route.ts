import { NextResponse } from 'next/server';
import { getAllocation } from '@/lib/allocation';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allocation = await getAllocation();
    return NextResponse.json(allocation, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (err) {
    console.error('Allocation error:', err);
    return NextResponse.json({ error: 'Failed to load allocation' }, { status: 500 });
  }
}
