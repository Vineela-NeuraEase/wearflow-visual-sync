
import { Progress } from "@/components/ui/progress";

interface CurrentMetricsProps {
  heartRate: number;
  restingHeartRate: number;
  hrv: number;
  sleepQuality: number;
  regulationStatus: number;
}

export const CurrentMetrics = ({
  heartRate,
  restingHeartRate,
  hrv,
  sleepQuality,
  regulationStatus
}: CurrentMetricsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-1">
          <h3 className="font-medium">Heart Rate</h3>
          <span>{heartRate} bpm</span>
        </div>
        <Progress value={70} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>50</span>
          <span>Rest: {restingHeartRate}</span>
          <span>100</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <h3 className="font-medium">Heart Rate Variability</h3>
          <span>{hrv} ms</span>
        </div>
        <Progress value={60} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>20</span>
          <span>Target: 50+</span>
          <span>80</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <h3 className="font-medium">Sleep Quality</h3>
          <span>{sleepQuality}%</span>
        </div>
        <Progress value={sleepQuality} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Poor</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <h3 className="font-medium">Regulation Status</h3>
          <span>{regulationStatus}%</span>
        </div>
        <Progress value={regulationStatus} className="h-2 bg-green-100" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Support Needed</span>
          <span>Regulated</span>
        </div>
      </div>
    </div>
  );
};
