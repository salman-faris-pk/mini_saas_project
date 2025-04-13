'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export function useStripe() {
  const { data: session } = useSession();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (priceId: string, planName: string) => {

    if (!session?.user) {
      setError('You must be logged in to purchase a plan');
      return;
    }

    setLoadingPlan(planName);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoadingPlan(null);
    }
  };

  return {
    checkout,
    loadingPlan,
    error,
  };
}