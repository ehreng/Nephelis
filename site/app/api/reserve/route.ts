import { NextRequest, NextResponse } from 'next/server';
import {
  addToAudience,
  autoReply,
  notifyTeam,
  reserveInterestAutoReply,
} from '@/lib/leads';

export async function POST(request: NextRequest) {
  try {
    const { name, email, type } = await request.json();

    if (!name || !email || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const tierLabel =
      type === 'sponsor' || type === 'legacy'
        ? 'Balloon Engraving (Tier 1)'
        : 'DNA Capsule (Tier 2)';
    const tag = type === 'dna' ? 'tier2' : 'tier1';

    await addToAudience({
      email,
      firstName: String(name).split(' ')[0],
      tags: [tag, 'reserve-interest'],
    });

    const team = await notifyTeam({
      fromKind: 'reserves',
      replyTo: email,
      subject: `New Reserve Interest: ${tierLabel} from ${name}`,
      html: `
        <h2>New Reserve Interest</h2>
        <p><strong>Tier:</strong> ${tierLabel}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tag:</strong> ${tag}, reserve-interest</p>
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        <hr />
        <p>Interest-only (no payment yet). Follow up or wait for Stripe checkout.</p>
      `,
      text: `New Reserve Interest\n\nTier: ${tierLabel}\nName: ${name}\nEmail: ${email}\nAt: ${new Date().toISOString()}\n`,
    });

    if (!team.ok) {
      console.error('Resend team notify error:', team.error);
      return NextResponse.json(
        { error: typeof team.error === 'string' ? team.error : 'Failed to send email' },
        { status: 500 }
      );
    }

    const reply = reserveInterestAutoReply(name, tierLabel);
    const ar = await autoReply({
      to: email,
      fromKind: 'reserves',
      ...reply,
    });
    if (!ar.ok) {
      console.warn('Auto-reply failed (non-fatal):', ar.error);
    }

    return NextResponse.json({ success: true, id: team.id, auto_reply: ar.ok });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
