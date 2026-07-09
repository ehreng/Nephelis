import { Resend } from 'resend';

export type LeadTag =
  | 'crew-signal'
  | 'tier1'
  | 'tier2'
  | 'reserve-interest'
  | 'paid'
  | 'volunteer'
  | 'partner';

const TEAM_EMAIL = process.env.TEAM_EMAIL || 'ehren@nephelisindustries.com';

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export function fromAddress(kind: 'signals' | 'reserves' | 'crew' = 'signals') {
  const configured = process.env.RESEND_FROM_EMAIL;
  if (configured) return configured;
  const map = {
    signals: 'Nephelis Crew Signals <onboarding@resend.dev>',
    reserves: 'Nephelis Reserves <onboarding@resend.dev>',
    crew: 'Nephelis Crew <onboarding@resend.dev>',
  };
  return map[kind];
}

/** Add contact to Resend Audience when RESEND_AUDIENCE_ID is set. */
export async function addToAudience(opts: {
  email: string;
  firstName?: string;
  tags?: LeadTag[];
}) {
  const resend = getResend();
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!resend || !audienceId) {
    return { skipped: true as const, reason: 'missing RESEND_API_KEY or RESEND_AUDIENCE_ID' };
  }

  try {
    const { data, error } = await resend.contacts.create({
      email: opts.email,
      firstName: opts.firstName,
      audienceId,
      unsubscribed: false,
    });
    if (error) {
      // Duplicate contacts are non-fatal
      console.warn('Resend contact create:', error);
      return { skipped: false as const, error };
    }
    return { skipped: false as const, data, tags: opts.tags || [] };
  } catch (err) {
    console.warn('Resend contact create failed:', err);
    return { skipped: false as const, error: err };
  }
}

export async function notifyTeam(opts: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  fromKind?: 'signals' | 'reserves' | 'crew';
}) {
  const resend = getResend();
  if (!resend) {
    return { ok: false as const, error: 'RESEND_API_KEY not configured' };
  }

  const { data, error } = await resend.emails.send({
    from: fromAddress(opts.fromKind || 'signals'),
    to: [TEAM_EMAIL],
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });

  if (error) return { ok: false as const, error };
  return { ok: true as const, id: data?.id };
}

export async function autoReply(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  fromKind?: 'signals' | 'reserves' | 'crew';
}) {
  const resend = getResend();
  if (!resend) {
    return { ok: false as const, error: 'RESEND_API_KEY not configured' };
  }

  const { data, error } = await resend.emails.send({
    from: fromAddress(opts.fromKind || 'signals'),
    to: [opts.to],
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });

  if (error) return { ok: false as const, error };
  return { ok: true as const, id: data?.id };
}

export function crewSignalAutoReply(email: string) {
  return {
    subject: 'You are on the Nephelis crew signal list',
    html: `
      <h2>Welcome to Project AETHER</h2>
      <p>Thanks for subscribing. We'll send low-volume mission updates and crew calls — no spam.</p>
      <p>Next steps:</p>
      <ul>
        <li>Follow progress on <a href="https://nephelisindustries.com/updates">Mission Updates</a></li>
        <li>See the public <a href="https://nephelisindustries.com/roadmap">Roadmap</a></li>
        <li>Reserve a payload slot: <a href="https://nephelisindustries.com/#funding">Sponsor</a></li>
      </ul>
      <p style="color:#888;font-size:12px">Confirmed for: ${email}</p>
    `,
    text: `Welcome to Project AETHER.\n\nThanks for subscribing. Low-volume mission updates only.\n\nUpdates: https://nephelisindustries.com/updates\nRoadmap: https://nephelisindustries.com/roadmap\nSponsor: https://nephelisindustries.com/#funding\n`,
  };
}

export function reserveInterestAutoReply(name: string, tierLabel: string) {
  return {
    subject: `Nephelis: we received your interest — ${tierLabel}`,
    html: `
      <h2>Transmission received, ${name}</h2>
      <p>Thanks for interest in <strong>${tierLabel}</strong>.</p>
      <p>What happens next:</p>
      <ol>
        <li>Complete payment (if you haven't) to lock your slot.</li>
        <li>We'll email integration kit details for your tier.</li>
        <li>Your allocation is counted against mission capacity.</li>
      </ol>
      <p>Questions? Reply to this email or write ehren@nephelisindustries.com.</p>
    `,
    text: `Transmission received, ${name}.\n\nInterest: ${tierLabel}.\nNext: complete payment to lock your slot, then we'll send kit details.\n\nQuestions: ehren@nephelisindustries.com\n`,
  };
}

export function paidAutoReply(name: string, tierLabel: string) {
  return {
    subject: `Nephelis: payment confirmed — ${tierLabel}`,
    html: `
      <h2>You're on the flight, ${name}</h2>
      <p>Payment confirmed for <strong>${tierLabel}</strong>.</p>
      <p>We'll follow up with:</p>
      <ul>
        <li>Name spelling / engraving confirmation (Tier 1)</li>
        <li>DNA / sample kit instructions (Tier 2)</li>
        <li>Mission timeline updates</li>
      </ul>
      <p>Thank you for helping fund Cloudseeker.</p>
    `,
    text: `Payment confirmed for ${tierLabel}, ${name}.\nWe'll follow up with kit / engraving details.\nThank you for funding Cloudseeker.\n`,
  };
}

export function volunteerAutoReply(name: string) {
  return {
    subject: 'Nephelis: volunteer signal received',
    html: `
      <h2>Thanks for volunteering, ${name}</h2>
      <p>We review every crew application. If there's a fit, we'll reach out with next steps and open tasks.</p>
      <p>Meanwhile:</p>
      <ul>
        <li><a href="https://github.com/ehreng/Nephelis">GitHub repo</a></li>
        <li><a href="https://github.com/ehreng/Nephelis/blob/main/CONTRIBUTING.md">Contributing guide</a></li>
        <li><a href="https://nephelisindustries.com/roadmap">Public roadmap</a></li>
      </ul>
    `,
    text: `Thanks for volunteering, ${name}.\nWe'll review and follow up if there's a fit.\nRepo: https://github.com/ehreng/Nephelis\n`,
  };
}
