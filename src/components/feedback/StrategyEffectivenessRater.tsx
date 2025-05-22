
import { useState } from "react";
import { Star } from "lucide-react";

interface StrategyEffectivenessRaterProps {
  rating: number;
  onChange: (rating: number) => void;
}

export const StrategyEffectivenessRater = ({
  rating,
  onChange
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
