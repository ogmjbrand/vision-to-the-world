import { buffer } from 'node:stream/consumers';
import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  if (!req.body) {
    return new Response('Request body is missing', { status: 400 });
  }

  // Convert the web ReadableStream to a Buffer
    const arrayBuffer = await req.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return new Response('Missing stripe signature or webhook secret', { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    // Update booking to approved
    const { error } = await supabase
      .from('bookings')
      .update({
        payment_status: 'approved',
        transaction_id: session.payment_intent,
        updated_at: new Date().toISOString()
      })
      .match({
        user_email: session.metadata?.user_email,
        package_id: session.metadata?.packageId,
        payment_status: 'pending'
      });

    if (error) {
      console.error('Supabase update error:', error);
      return new Response('Error updating booking', { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}