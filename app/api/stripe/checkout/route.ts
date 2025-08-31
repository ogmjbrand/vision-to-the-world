import type { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

interface CheckoutBody {
  price: number;
  package: string;
  packageId: string;
  user: {
    name: string;
    email: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { price, package: packageName, packageId, user } = body;
    const amountInCents = Math.round(price * 100);

    // Create a pending booking in Supabase first
    const { error: bookingError } = await supabase.from('bookings').insert({
      package_id: packageId,
      package_name: packageName,
      amount: price,
      currency: 'usd',
      payment_status: 'pending',
      payment_method: 'stripe',
      user_name: user.name,
      user_email: user.email,
      created_at: new Date().toISOString(),
    });

    if (bookingError) {
      console.error('Supabase insert error:', bookingError);
      return Response.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { 
              name: packageName 
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        packageId,
        user_email: user.email
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/packages`,
    });

    if (!session.url) {
      return Response.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }

    return Response.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
        return Response.json({ error: (err as Error).message }, { status: 500 });
      }
    }