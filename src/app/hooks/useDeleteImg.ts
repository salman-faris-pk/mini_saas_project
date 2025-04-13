import { useState } from 'react';

export function useDeleteImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteImage = async (imageUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/dashboard', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete image');
      }

      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteImage, loading, error };
}
