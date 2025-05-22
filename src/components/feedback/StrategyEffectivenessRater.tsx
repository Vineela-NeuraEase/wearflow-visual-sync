
import { useState } from "react";
import { Star } from "lucide-react";

export interface StrategyEffectivenessRaterProps {
  rating?: number;
  onChange?: (rating: number) => void;
  strategy?: {
    id: string;
    name: string;
    type: string;
    lastUsed: string;
    effectiveness?: number;
  };
  onRatingSubmit?: (rating: number, feedback: string) => void;
}

export const StrategyEffectivenessRater = ({
  rating: initialRating = 0,
  onChange,
  strategy,
  onRatingSubmit
}: StrategyEffectivenessRaterProps) => {
  // Use internal rating state if not provided from props
  const [internalRating, setInternalRating] = useState<number>(strategy?.effectiveness || initialRating);
  const [feedback, setFeedback] = useState<string>("");
  
  // Use the rating provided in props if available, otherwise use internal state
  const displayRating = initialRating || internalRating;
  
  const handleRatingChange = (newRating: number) => {
    setInternalRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };
  
  const handleSubmit = () => {
    if (onRatingSubmit) {
      onRatingSubmit(displayRating, feedback);
      setFeedback("");
    }
  };

  return (
    <div className="space-y-4">
      {strategy && (
        <div className="mb-2">
          <h3 className="font-medium">{strategy.name}</h3>
          <p className="text-sm text-muted-foreground">Last used: {strategy.lastUsed}</p>
        </div>
      )}
      
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className={`p-1 rounded-full focus:outline-none focus:ring-2 transition-colors
              ${displayRating >= star ? 'text-amber-500' : 'text-gray-300'}`}
          >
            <Star className="h-5 w-5" fill={displayRating >= star ? '#f59e0b' : 'none'} />
          </button>
        ))}
      </div>
      
      {onRatingSubmit && (
        <div className="mt-2 space-y-3">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience with this strategy..."
            className="w-full px-3 py-2 border rounded-md text-sm"
            rows={2}
          />
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
};
