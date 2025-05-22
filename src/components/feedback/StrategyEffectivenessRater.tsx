
import { useState } from "react";
import { Star } from "lucide-react";

export interface StrategyEffectivenessRaterProps {
  rating: number;
  onChange: (rating: number) => void;
  // Add strategy prop to match usage in Insights.tsx
  strategy?: {
    id: string;
    name: string;
    type: string;
    lastUsed: string;
  };
  // Add onRatingSubmit prop to match usage in Insights.tsx
  onRatingSubmit?: (rating: number, feedback: string) => void;
}

export const StrategyEffectivenessRater = ({
  rating,
  onChange,
  strategy,
  onRatingSubmit
}: StrategyEffectivenessRaterProps) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`p-1 rounded-full focus:outline-none focus:ring-2 transition-colors
            ${rating >= star ? 'text-amber-500' : 'text-gray-300'}`}
        >
          <Star className="h-5 w-5" fill={rating >= star ? '#f59e0b' : 'none'} />
        </button>
      ))}
    </div>
  );
};
