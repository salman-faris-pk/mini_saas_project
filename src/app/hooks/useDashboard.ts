"use client"
import { useState, useEffect } from 'react';

const useImages = () => {
    
  const [count, setCount] = useState(0);
  const [recentImages, setRecentImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setCount(data.count);
        setRecentImages(data.recentImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { count, recentImages, isLoading, error };
};

export default useImages;