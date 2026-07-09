import { NextRequest, NextResponse } from 'next/server';
import {
  getStripe,
  getTier,
  siteBaseUrl,
  stripePriceId,
  type TierId,
} from '@/lib/stripe';
import { addToAudience, notifyTeam, reserveInterestAutoReply, autoReply } from '@/lib/leads';
import funding from '@/content/data/funding.json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tier = (body.tier === 'dna' ? 'dna' : 'legacy') as TierId;
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payments not configured (STRIPE_SECRET_KEY missing)' },
        { status: 503 }
      );
    }

    const tierConfig = getTier(tier);
    const base = siteBaseUrl();
    const successPath = funding.success_path || '/?checkout=success#funding';
    const cancelPath = funding.cancel_path || '/?checkout=cancel#funding';
    const priceId = stripePriceId(tier);

    const line_items = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: funding.currency || 'usd',
              unit_amount: Math.round(tierConfig.price_usd * 100),
              product_data: {
                name: `Nephelis — ${tierConfig.name}`,
                description: tierConfig.description,
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items,
      success_url: `${base}${successPath}`,
      cancel_url: `${base}${cancelPath}`,
      metadata: {
        tier,
        name,
        email,
        product: tierConfig.name,
      },
      payment_intent_data: {
        metadata: {
          tier,
          name,
          email,
        },
      },
    });

    // Soft lead capture while they go to Stripe
    await addToAudience({
      email,
      firstName: name.split(' ')[0],
      tags: [tier === 'dna' ? 'tier2' : 'tier1', 'reserve-interest'],
    });

    await notifyTeam({
      fromKind: 'reserves',
      replyTo: email,
      subject: `Checkout started: ${tierConfig.name} — ${name}`,
      html: `
        <h2>Stripe Checkout Started</h2>
        <p><strong>Tier:</strong> ${tierConfig.name}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Session:</strong> ${session.id}</p>
      `,
      text: `Checkout started: ${tierConfig.name} / ${name} / ${email} / ${session.id}`,
    });

    const reply = reserveInterestAutoReply(name, tierConfig.label);
    await autoReply({ to: email, fromKind: 'reserves', ...reply });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('Checkout error:', err);
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
