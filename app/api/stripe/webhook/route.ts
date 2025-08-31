import { buffer } from 'node:stream/consumers';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

interface StripeSession extends Stripe.Checkout.Session {
  payment_intent: string;
  customer_details: Stripe.Checkout.Session.CustomerDetails | null;
}

export async function POST(req: NextRequest) {
  if (!req.body) {
    return new Response('Missing request body', { status: 400 });
  }

  const rawBody = await req.arrayBuffer();
  const buf = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as StripeSession;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error('Missing customer email:', session);
      return new Response('Customer email not found', { status: 400 });
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'approved',
          transaction_id: session.payment_intent,
          updated_at: new Date().toISOString(),
        })
        .match({
          user_email: customerEmail,
          payment_status: 'pending'
        });

      if (error) {
        console.error('Supabase update error:', error);
        return new Response('Error updating booking', { status: 500 });
      }
    } catch (err) {
      console.error('Database operation failed:', err);
      return new Response('Database error', { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}