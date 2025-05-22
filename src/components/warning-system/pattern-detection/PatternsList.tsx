
import { Button } from "@/components/ui/button";
import { Pattern } from "./types";
import { PatternCard } from "./PatternCard";

interface PatternsListProps {
  patterns: Pattern[];
}

export const PatternsList = ({ patterns }: PatternsListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Detected Patterns</h3>
      
      {patterns.map((pattern) => (
        <PatternCard key={pattern.id} pattern={pattern} />
      ))}
      
      <Button variant="outline" className="w-full mt-2">
        View All Detected Patterns
      </Button>
    </div>
  );
};
