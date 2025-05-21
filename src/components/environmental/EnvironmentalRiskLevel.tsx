
import { Progress } from "@/components/ui/progress";

interface EnvironmentalRiskLevelProps {
  riskLevel: string;
  riskPercentage: number;
  message: string;
  suggestions: string[];
}

export const EnvironmentalRiskLevel = ({ 
  riskLevel, 
  riskPercentage, 
  message,
  suggestions 
}: EnvironmentalRiskLevelProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Environmental Risk Level</h2>
      
      <div className="flex justify-between mb-2">
        <span className="text-amber-600 font-medium">{riskLevel}</span>
        <span className="font-medium">{riskPercentage}%</span>
      </div>
      
      <Progress value={riskPercentage} className="h-3 bg-amber-100" />
      
      <p className="mt-4 text-sm">
        {message}
      </p>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-2">Suggestions</h3>
        <ul className="text-sm space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
