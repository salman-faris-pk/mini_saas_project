import { authOptions } from '@/lib/auth';
import stripe from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { priceId } = await req.json();

  if (!priceId) {
    return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
  }

  const plans = {
    [process.env.STRIPE_PRO_PRICE_ID!]: { credits: 25, name: 'pro' },
    [process.env.STRIPE_ELITE_PRICE_ID!]: { credits: 50, name: 'elite' }
  };

  if (!process.env.STRIPE_PRO_PRICE_ID || !process.env.STRIPE_ELITE_PRICE_ID) {
    console.error('Stripe price IDs are not configured in environment variables');
    return NextResponse.json(
      { error: 'Server configuration error' }, 
      { status: 500 }
    );
  }

  const selectedPlan = plans[priceId];
  
  if (!selectedPlan) {
    return NextResponse.json(
      { error: 'Invalid plan - price ID not recognized' }, 
      { status: 400 }
    );
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        credits: selectedPlan.credits.toString(),
        plan: selectedPlan.name
      }
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error:any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}