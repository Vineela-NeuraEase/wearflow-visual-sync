
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignalAnalysisChart } from "@/components/warning-system/SignalAnalysisChart";

interface AnalysisTabContentProps {
  chartData: any[];
  warningActive: boolean;
  onShowStrategies: () => void;
}

export const AnalysisTabContent = ({
  chartData,
  warningActive,
  onShowStrategies
}: AnalysisTabContentProps) => {
  return (
    <div className="space-y-6">
      <SignalAnalysisChart 
        data={chartData} 
        title="Today's Signals"
      />
      
      {warningActive && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-medium text-amber-800 flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Potential Early Warning
          </h3>
          <p className="text-sm text-amber-700 mt-1">
            Your heart rate is increasing while HRV is decreasing. This pattern has 
            preceded regulation challenges in the past.
          </p>
          <div className="mt-3 flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={onShowStrategies}
            >
              Suggest Strategies
            </Button>
            <Button size="sm" variant="outline">Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  );
};
