import { getStripe, getTier, type TierId } from './stripe';
import funding from '../content/data/funding.json';

export type AllocationSnapshot = {
  legacy: { allocated: number; capacity: number; paid: number; baseline: number };
  dna: { allocated: number; capacity: number; paid: number; baseline: number };
  stripe_configured: boolean;
  source: 'stripe' | 'baseline-only';
};

async function countPaidForTier(tier: TierId): Promise<number> {
  const stripe = getStripe();
  if (!stripe) return 0;

  let count = 0;
  let starting_after: string | undefined;

  // Paginate completed checkout sessions with our metadata
  for (let page = 0; page < 20; page++) {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: 'complete',
      starting_after,
    });

    for (const s of sessions.data) {
      if (s.payment_status !== 'paid' && s.payment_status !== 'no_payment_required') continue;
      if (s.metadata?.tier === tier) count += 1;
    }

    if (!sessions.has_more) break;
    starting_after = sessions.data[sessions.data.length - 1]?.id;
  }

  return count;
}

export async function getAllocation(): Promise<AllocationSnapshot> {
  const legacyTier = getTier('legacy');
  const dnaTier = getTier('dna');
  const stripe = getStripe();

  let legacyPaid = 0;
  let dnaPaid = 0;
  let source: AllocationSnapshot['source'] = 'baseline-only';

  if (stripe) {
    try {
      [legacyPaid, dnaPaid] = await Promise.all([
        countPaidForTier('legacy'),
        countPaidForTier('dna'),
      ]);
      source = 'stripe';
    } catch (err) {
      console.error('Stripe allocation count failed:', err);
    }
  }

  const legacyBaseline = legacyTier.baseline_allocated ?? funding.tiers.legacy.baseline_allocated;
  const dnaBaseline = dnaTier.baseline_allocated ?? funding.tiers.dna.baseline_allocated;

  return {
    legacy: {
      paid: legacyPaid,
      baseline: legacyBaseline,
      allocated: legacyBaseline + legacyPaid,
      capacity: legacyTier.capacity,
    },
    dna: {
      paid: dnaPaid,
      baseline: dnaBaseline,
      allocated: dnaBaseline + dnaPaid,
      capacity: dnaTier.capacity,
    },
    stripe_configured: Boolean(stripe),
    source,
  };
}
