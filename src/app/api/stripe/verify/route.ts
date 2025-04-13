import stripe from '@/lib/stripe';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?error=invalid_session`
    );
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'payment_intent', 'customer']
    });

    if (!stripeSession.metadata?.userId || !stripeSession.metadata.credits || !stripeSession.metadata.plan) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?error=missing_metadata`
      );
    }

    const credits = parseInt(stripeSession.metadata.credits);
    if (isNaN(credits)) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?error=invalid_credits`
      );
    }

    const userId = stripeSession.metadata.userId;
    const plan = stripeSession.metadata.plan;
    const subscriptionId = stripeSession.subscription && typeof stripeSession.subscription !== 'string' 
      ? stripeSession.subscription.id 
      : null;

      await User.findByIdAndUpdate(
        userId,
        {
          $inc: { credits },
          plan,
          stripeSubscriptionId: subscriptionId
        },
        { new: true }
      );
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true&credits=${credits}&plan=${encodeURIComponent(plan)}`
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?error=verification_failed`
    );
  }
}
