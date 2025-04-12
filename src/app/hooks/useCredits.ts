"use client"
import { useState, useEffect, useCallback } from 'react';
import useAuth from './useAuth';

let creditListeners: Array<(credits: number | null) => void> = [];

export default function useCredits() {
  const { session } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const notifyListeners = useCallback((newCredits: number | null) => {
    creditListeners.forEach(listener => listener(newCredits));
  }, []);

  const fetchCredits = useCallback(async () => {
    if (!session?.user?.id) {
      setCredits(null);
      notifyListeners(null);
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
      notifyListeners(data.credits);
    } catch (error) {
      console.error("Failed to fetch credits", error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id, notifyListeners]);

  const refreshCredits = useCallback(async () => {
    await fetch('/api/revalidate-credits', {
      method: 'POST',
    });
    await fetchCredits();
  }, [fetchCredits]);

  useEffect(() => {
    const listener = (newCredits: number | null) => {
      setCredits(newCredits);
    };
    creditListeners.push(listener);
    return () => {
      creditListeners = creditListeners.filter(l => l !== listener);
    };
  }, []);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  return { credits, isLoading, refreshCredits };
}