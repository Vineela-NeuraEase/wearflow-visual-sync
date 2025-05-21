
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Thresholds {
  heartRateHigh: number;
  heartRateLow: number;
  hrvHigh: number;
  hrvLow: number;
  sleepQuality: number;
}

interface AlertThresholdsProps {
  thresholds: Thresholds;
  onThresholdChange: (metric: keyof Thresholds, value: number) => void;
  onSave: () => void;
}

export const AlertThresholds = ({
  thresholds,
  onThresholdChange,
  onSave
}: AlertThresholdsProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-6">Alert Thresholds</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <Label>Heart Rate (High)</Label>
            <span>{thresholds.heartRateHigh} bpm</span>
          </div>
          <Slider 
            value={[thresholds.heartRateHigh]} 
            onValueChange={(values) => onThresholdChange('heartRateHigh', values[0])}
            min={70}
            max={120}
            step={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Alert when heart rate goes above this threshold.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Heart Rate (Low)</Label>
            <span>{thresholds.heartRateLow} bpm</span>
          </div>
          <Slider 
            value={[thresholds.heartRateLow]} 
            onValueChange={(values) => onThresholdChange('heartRateLow', values[0])}
            min={40}
            max={70}
            step={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Alert when heart rate goes below this threshold.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>HRV (Low)</Label>
            <span>{thresholds.hrvLow} ms</span>
          </div>
          <Slider 
            value={[thresholds.hrvLow]} 
            onValueChange={(values) => onThresholdChange('hrvLow', values[0])}
            min={20}
            max={50}
            step={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Low HRV can indicate stress or dysregulation.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <Label>Sleep Quality</Label>
            <span>{thresholds.sleepQuality}%</span>
          </div>
          <Slider 
            value={[thresholds.sleepQuality]} 
            onValueChange={(values) => onThresholdChange('sleepQuality', values[0])}
            min={50}
            max={90}
            step={5}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Adjust sensitivity based on sleep quality.
          </p>
        </div>
      </div>
      
      <Button onClick={onSave} className="w-full mt-6">
        Save Thresholds
      </Button>
    </div>
  );
};
