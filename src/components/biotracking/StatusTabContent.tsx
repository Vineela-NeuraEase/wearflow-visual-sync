
import { Card } from "@/components/ui/card";
import { CurrentMetrics } from "./CurrentMetrics";
import { DailyTrend } from "./DailyTrend";

interface StatusTabContentProps {
  currentMetrics: {
    heartRate: number;
    restingHeartRate: number;
    hrv: number;
    sleepQuality: number;
    regulationStatus: number;
  };
  dailyTrendData: Array<{ hour: string; heartRate: number; hrv: number }>;
  isConnected: boolean;
}

export const StatusTabContent = ({
  currentMetrics,
  dailyTrendData,
  isConnected
}: StatusTabContentProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <h2 className="text-lg font-medium mb-4">Today's Metrics</h2>
        <CurrentMetrics {...currentMetrics} />
        
        {!isConnected && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
            Connect a wearable device for real-time metrics and continuous monitoring.
          </div>
        )}
      </Card>
      
      <Card className="p-5">
        <DailyTrend data={dailyTrendData} />
      </Card>
    </div>
  );
};
