
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowUp, ArrowRight, Info } from "lucide-react";

interface FactorData {
  name: string;
  value: number;
  impact: "high" | "medium" | "low";
  trend: "increasing" | "decreasing" | "stable";
}

interface RegulationStatusProps {
  score: number;
  factors: FactorData[];
  timeLeft?: string;
  isWarningActive: boolean;
}

export const RegulationStatus = ({ 
  score, 
  factors,
  timeLeft,
  isWarningActive 
}: RegulationStatusProps) => {
  // Determine status message based on score
  const getStatusMessage = () => {
    if (score >= 80) return "Regulated";
    if (score >= 60) return "Stable";
    if (score >= 40) return "Watch";
    return "Alert";
  };

  // Determine status color based on score
  const getStatusColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  // Icon for trend direction
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "decreasing": return <ArrowDown className="h-4 w-4 text-red-600" />;
      default: return <ArrowRight className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className={`p-5 ${isWarningActive ? 'border-amber-500' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Regulation Status</h2>
        {isWarningActive && (
          <div className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full flex items-center">
            <Info className="h-4 w-4 mr-1" />
            Early Warning
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">{getStatusMessage()}</span>
          <span className="text-xl font-bold">{score}%</span>
        </div>
        <Progress 
          value={score} 
          className="h-3 bg-gray-100"
          color={getStatusColor()}
        />
        
        {timeLeft && isWarningActive && (
          <div className="mt-2 text-sm text-amber-800">
            Trending toward threshold in approximately {timeLeft}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Contributing Factors</h3>
        
        {factors.map((factor, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <Label className="font-medium">{factor.name}</Label>
                <div className="flex items-center mt-1">
                  <div 
                    className={`w-2 h-2 rounded-full mr-2 ${
                      factor.impact === "high" ? "bg-red-500" : 
                      factor.impact === "medium" ? "bg-amber-500" : "bg-blue-500"
                    }`} 
                  />
                  <span className="text-xs text-muted-foreground">
                    {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} impact
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium mr-2">{factor.value}</span>
                {getTrendIcon(factor.trend)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
