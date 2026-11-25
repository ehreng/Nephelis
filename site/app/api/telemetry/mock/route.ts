import { NextRequest, NextResponse } from 'next/server';
import { mockPackets } from '@/lib/telemetry-mock';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  const n = Number(req.nextUrl.searchParams.get('n') || '24');
  const packets = mockPackets(n);
  return NextResponse.json(
    {
      schema: 'AETHER-G3/1',
      note: 'Simulated Gate 3 packets.',
      src: 'sim',
      count: packets.length,
      packets,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
