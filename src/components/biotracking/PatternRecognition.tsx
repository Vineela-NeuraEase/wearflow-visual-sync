
import { Button } from "@/components/ui/button";

export const PatternRecognition = () => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Pattern Recognition</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Time Patterns</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Dysregulation tends to occur around 3-4PM on weekdays.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium">Environmental Factors</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Correlation detected between higher noise levels and reduced HRV.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium">Sleep Impact</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Sleep quality under 70% correlates with 40% higher chance of dysregulation next day.
          </p>
        </div>
      </div>
      
      <Button className="w-full mt-6" variant="outline">
        View Full Analysis
      </Button>
    </div>
  );
};
