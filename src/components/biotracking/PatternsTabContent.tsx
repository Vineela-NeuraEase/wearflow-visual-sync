
import { Card } from "@/components/ui/card";
import { WeeklyInsights } from "./WeeklyInsights";
import { PatternDetectionInsights } from "@/components/warning-system/PatternDetectionInsights";

interface PatternsTabContentProps {
  weeklyData: {
    sleep: number[];
    regulation: number[];
    heartRate: number[];
  };
  dataPoints: any[];
}

export const PatternsTabContent = ({
  weeklyData,
  dataPoints
}: PatternsTabContentProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <WeeklyInsights data={weeklyData} />
      </Card>
      
      <Card className="p-5">
        <PatternDetectionInsights realtimeData={dataPoints} />
      </Card>
    </div>
  );
};
