'use client';
import { FaCoins } from 'react-icons/fa';

interface CreditCounterProps {
  credits: number | null;
  isLoading?: boolean;
}

export default function CreditCounter({ credits, isLoading }: CreditCounterProps) {
  if (isLoading || credits === 0) return null;

  return (
    <div className="flex items-center justify-center bg-cyan-600 rounded-full px-3 py-2 gap-2">
      <FaCoins className="text-yellow-400" />
      <span className="text-sm font-semibold text-white">
        {credits}
      </span>
      <span className="h-4 w-px bg-gray-600"></span>
      <span className="text-xs text-slate-100">Credits</span>
    </div>
  );
}
