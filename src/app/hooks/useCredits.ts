"use client"
import { useState, useEffect, useCallback } from 'react';
import useAuth from './useAuth';

let creditListeners: Array<(credits: number | null, plan: string | null) => void> = [];

export default function useCredits() {
  const { session } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const notifyListeners = useCallback((newCredits: number | null, newPlan: string | null) => {
    creditListeners.forEach(listener => listener(newCredits, newPlan));
  }, []);

  const fetchCredits = useCallback(async () => {
    if (!session?.user?.id) {
      setCredits(null);
      setPlan(null);
      notifyListeners(null, null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/credits', {
        next: { tags: ['credits'] },
      });
      const data = await res.json();
      setCredits(data.credits);
      setPlan(data.plan);
      notifyListeners(data.credits, data.plan);
    } catch (error) {
      console.error("Failed to fetch credits", error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id, notifyListeners]);

  const refreshCredits = useCallback(async () => {
    await fetch('/api/credits', {
      method: 'POST',
    });
    await fetchCredits();
  }, [fetchCredits]);

  useEffect(() => {
    const listener = (newCredits: number | null, newPlan: string | null) => {
      setCredits(newCredits);
      setPlan(newPlan);
    };

    creditListeners.push(listener);
    return () => {
      creditListeners = creditListeners.filter(l => l !== listener);
    };
  }, []);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  return { credits, plan, isLoading, refreshCredits };
}
