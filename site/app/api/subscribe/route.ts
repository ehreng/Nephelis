import { NextRequest, NextResponse } from 'next/server';
import {
  addToAudience,
  autoReply,
  crewSignalAutoReply,
  notifyTeam,
} from '@/lib/leads';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await addToAudience({
      email,
      tags: ['crew-signal'],
    });

    const team = await notifyTeam({
      fromKind: 'signals',
      replyTo: email,
      subject: `New Crew Signal Subscription: ${email}`,
      html: `
        <h2>New Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tag:</strong> crew-signal</p>
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        <hr />
        <p>Contact added to Resend audience (if configured).</p>
      `,
      text: `New Subscription\n\nEmail: ${email}\nAt: ${new Date().toISOString()}\n`,
    });

    if (!team.ok) {
      console.error('Resend error:', team.error);
      return NextResponse.json(
        { error: typeof team.error === 'string' ? team.error : 'Failed to send email' },
        { status: 500 }
      );
    }

    const reply = crewSignalAutoReply(email);
    const ar = await autoReply({
      to: email,
      fromKind: 'signals',
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
