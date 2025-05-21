
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Strategy {
  id: string;
  name: string;
  type: string;
  lastUsed: string;
  userRating?: number;
}

interface StrategyEffectivenessRaterProps {
  strategy: Strategy;
  onRatingSubmit: (rating: number, feedback: string) => void;
}

export const StrategyEffectivenessRater = ({
  strategy,
  onRatingSubmit
}: StrategyEffectivenessRaterProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState<number>(strategy.userRating || 0);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const handleSubmit = () => {
    onRatingSubmit(rating, feedback);
    setSubmitted(true);
    toast({
      title: "Feedback submitted",
      description: "Thank you for rating this strategy!"
    });
  };
  
  const renderStars = () => {
    return (
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-1 rounded-full focus:outline-none focus:ring-2 transition-colors
              ${rating >= star ? 'text-amber-500' : 'text-gray-300'}`}
          >
            <Star className="h-8 w-8" fill={rating >= star ? '#f59e0b' : 'none'} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-5">
      {!submitted ? (
        <>
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold mb-2">Rate Strategy Effectiveness</h2>
            <p className="text-sm text-muted-foreground">
              How helpful was "{strategy.name}" for you?
            </p>
          </div>
          
          {renderStars()}
          
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              What worked well? What could be improved?
            </label>
            <Textarea
              placeholder="Your feedback helps personalize future recommendations..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
          
          <div className="mt-6 space-y-2">
            <Button 
              className="w-full"
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Submit Feedback
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-muted-foreground"
              onClick={() => setSubmitted(true)}
            >
              Skip for now
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="font-medium text-lg mb-2">Thanks for your feedback!</h3>
          <p className="text-sm text-muted-foreground">
            Your input helps us personalize recommendations for you.
          </p>
          <Button 
            variant="link" 
            className="mt-2"
            onClick={() => setSubmitted(false)}
          >
            Rate another strategy
          </Button>
        </div>
      )}
    </Card>
  );
};
