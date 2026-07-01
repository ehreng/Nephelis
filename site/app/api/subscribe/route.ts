import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      // Use your verified domain once set up in Resend dashboard.
      // For testing you can use 'onboarding@resend.dev'
      from: 'Nephelis Crew Signals <signals@nephelisindustries.com>',
      to: ['ehren@nephelisindustries.com'],
      replyTo: email,
      subject: `New Crew Signal Subscription: ${email}`,
      html: `
        <h2>New Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        <hr />
        <p>Add this person to the crew signals list.</p>
      `,
      text: `
New Subscription

Email: ${email}
Submitted at: ${new Date().toISOString()}

Add this person to the crew signals list.
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
