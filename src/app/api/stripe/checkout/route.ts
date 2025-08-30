// app/api/stripe/checkout/route.ts
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  const { price, package: packageName, packageId } = await req.json();
  const amountInCents = Math.round(price * 100);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_ {
        currency: 'usd',
        product_ { name: packageName },
        unit_amount: amountInCents,
      },
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/packages`,
    meta { packageId, packageName },
  });

  return Response.json({ url: session.url });
}