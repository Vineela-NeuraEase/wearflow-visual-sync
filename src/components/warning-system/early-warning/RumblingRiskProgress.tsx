
import { TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RumblingRiskProgressProps {
  rumblingScore: number;
  warningLevel: 'normal' | 'notice' | 'watch' | 'alert';
  timeToThreshold: string | null;
}

export const RumblingRiskProgress = ({ 
  rumblingScore, 
  warningLevel,
  timeToThreshold 
}: RumblingRiskProgressProps) => {
  const getWarningColor = () => {
    switch (warningLevel) {
      case 'alert': return 'bg-red-500';
      case 'watch': return 'bg-amber-500';
      case 'notice': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">Rumbling Risk</span>
        <span>{rumblingScore}%</span>
      </div>
      <Progress value={rumblingScore} className={`h-3 ${getWarningColor()}`} />
      
      {timeToThreshold && (
        <div className="mt-2 text-sm text-muted-foreground flex items-center">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>Estimated time to threshold: {timeToThreshold}</span>
        </div>
      )}
    </div>
  );
};
