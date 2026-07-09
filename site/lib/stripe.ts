import Stripe from 'stripe';
import funding from '../content/data/funding.json';

export type TierId = 'legacy' | 'dna';

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function getFundingConfig() {
  return funding;
}

export function getTier(tier: TierId) {
  return funding.tiers[tier];
}

/** Prefer price IDs from env; fall back to ad-hoc price_data. */
export function stripePriceId(tier: TierId): string | null {
  if (tier === 'legacy') return process.env.STRIPE_PRICE_LEGACY || null;
  if (tier === 'dna') return process.env.STRIPE_PRICE_DNA || null;
  return null;
}

export function siteBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
