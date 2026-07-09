import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import {
  addToAudience,
  autoReply,
  notifyTeam,
  paidAutoReply,
} from '@/lib/leads';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook not configured' }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === 'paid' || session.payment_status === 'no_payment_required') {
      const name = session.metadata?.name || session.customer_details?.name || 'Crew member';
      const email =
        session.metadata?.email ||
        session.customer_email ||
        session.customer_details?.email ||
        '';
      const tier = session.metadata?.tier || 'legacy';
      const product = session.metadata?.product || (tier === 'dna' ? 'DNA Capsule' : 'Balloon Engraving');
      const tierLabel = tier === 'dna' ? 'TIER 2: THE IMMORTAL' : 'TIER 1: THE LEGACY';

      if (email) {
        await addToAudience({
          email,
          firstName: name.split(' ')[0],
          tags: [tier === 'dna' ? 'tier2' : 'tier1', 'paid'],
        });

        await notifyTeam({
          fromKind: 'reserves',
          replyTo: email,
          subject: `PAID: ${product} — ${name}`,
          html: `
            <h2>Payment Confirmed</h2>
            <p><strong>Product:</strong> ${product}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Tier:</strong> ${tier}</p>
            <p><strong>Amount:</strong> ${session.amount_total != null ? (session.amount_total / 100).toFixed(2) : '?'} ${session.currency?.toUpperCase() || ''}</p>
            <p><strong>Session:</strong> ${session.id}</p>
            <p>Send integration kit / engraving confirmation.</p>
          `,
          text: `PAID ${product} / ${name} / ${email} / session ${session.id}`,
        });

        const reply = paidAutoReply(name, tierLabel);
        await autoReply({ to: email, fromKind: 'reserves', ...reply });
      }
    }
  }

  return NextResponse.json({ received: true });
}
