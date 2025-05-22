
import { ArrowRight } from "lucide-react";

interface DetectedPatternsProps {
  patterns: string[];
}

export const DetectedPatterns = ({ patterns }: DetectedPatternsProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Detected Patterns:</h3>
      <ul className="space-y-1">
        {patterns.length > 0 ? (
          patterns.map((pattern, index) => (
            <li key={index} className="text-sm flex items-start">
              <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
              <span>{pattern}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-muted-foreground">No specific patterns detected</li>
        )}
      </ul>
    </div>
  );
};
