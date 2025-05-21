
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface EnvironmentalFactor {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  icon: string;
}

interface CurrentEnvironmentProps {
  factors: EnvironmentalFactor[];
  onLogEnvironment: () => void;
}

export const CurrentEnvironment = ({ factors, onLogEnvironment }: CurrentEnvironmentProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Current Environment</h2>
      
      <div className="space-y-5">
        {factors.map((factor, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <span className="mr-2 text-xl">{factor.icon}</span>
                <span>{factor.name}</span>
              </div>
              <span className="font-medium">
                {factor.value} {factor.unit}
              </span>
            </div>
            
            <Progress 
              value={(factor.value / factor.threshold) * 100} 
              className={`h-2 ${factor.value > factor.threshold * 0.9 ? 'bg-amber-100' : 'bg-blue-100'}`}
            />
            
            <div className="flex justify-end mt-1">
              <span className="text-xs text-muted-foreground">
                Threshold: {factor.threshold} {factor.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <Button onClick={onLogEnvironment} className="w-full mt-6">
        Log Current Environment
      </Button>
    </div>
  );
};
