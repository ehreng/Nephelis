import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, type } = await request.json();

    if (!name || !email || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const tierLabel = type === 'sponsor' ? 'Balloon Engraving (Tier 1)' : 'DNA Capsule (Tier 2)';

    const { data, error } = await resend.emails.send({
      // Use your verified domain once set up in Resend dashboard.
      // For testing you can use 'onboarding@resend.dev'
      from: 'Nephelis Reserves <reserves@nephelisindustries.com>',
      to: ['ehren@nephelisindustries.com'],
      replyTo: email,
      subject: `New Reserve Request: ${tierLabel} from ${name}`,
      html: `
        <h2>New Reserve Submission</h2>
        <p><strong>Tier:</strong> ${tierLabel}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        <hr />
        <p>Please follow up with the integration kit details.</p>
      `,
      text: `
New Reserve Submission

Tier: ${tierLabel}
Name: ${name}
Email: ${email}
Submitted at: ${new Date().toISOString()}

Please follow up with the integration kit details.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
